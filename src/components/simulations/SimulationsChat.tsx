import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Sparkles, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "Como posso economizar R$500 por mês?",
  "Vale a pena reduzir gastos diários ou fixos?",
  "Como acelerar minha meta de viagem?",
  "Qual o impacto de um aumento de R$200 no aluguel?",
];

export function SimulationsChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! 👋 Sou seu assistente financeiro. Posso te ajudar a simular cenários e entender como suas decisões afetam suas metas. O que você gostaria de explorar?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (will be replaced with actual AI call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getSimulatedResponse(messageText),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-card rounded-xl border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-muted/30">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">Assistente Financeiro</h3>
          <p className="text-xs text-muted-foreground">Simule cenários com IA</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === 'user' && "flex-row-reverse"
              )}
            >
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className={cn(
                  message.role === 'assistant' 
                    ? "bg-primary/10 text-primary" 
                    : "bg-secondary text-secondary-foreground"
                )}>
                  {message.role === 'assistant' ? (
                    <Sparkles className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                  message.role === 'assistant'
                    ? "bg-muted text-foreground rounded-tl-sm"
                    : "bg-primary text-primary-foreground rounded-tr-sm"
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Sparkles className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Analisando...</span>
                </div>
              </div>
            </div>
          )}

          {/* Suggested questions - only show at start */}
          {messages.length === 1 && !isLoading && (
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-3">Sugestões:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(question)}
                    className="px-3 py-1.5 text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte algo sobre suas finanças..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Simulated responses for demo (will be replaced with actual AI)
function getSimulatedResponse(question: string): string {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes('economizar') || lowerQuestion.includes('500')) {
    return `Ótima pergunta! Para economizar R$500/mês, você tem algumas opções:

📉 **Reduzir gasto diário**: De R$80 para R$63/dia = R$510/mês de economia

🏠 **Revisar custos fixos**: Renegociar aluguel ou cortar streaming pode liberar R$200-400/mês

💡 **Combinação**: Reduzir R$10/dia + cortar R$150 em fixos = R$450/mês

Quer que eu simule algum desses cenários em detalhes?`;
  }

  if (lowerQuestion.includes('diário') || lowerQuestion.includes('fixo')) {
    return `Excelente comparação! Veja a diferença:

**Reduzir R$10/dia:**
• Impacto mensal: R$300
• Mais flexível, você decide diariamente
• Requer disciplina constante

**Cortar R$300 em fixos:**
• Mesmo impacto financeiro
• Decisão única, efeito permanente
• Pode ser mais difícil de reverter

Na sua situação atual, reduzir gastos diários traria mais flexibilidade. Quer explorar isso na simulação?`;
  }

  if (lowerQuestion.includes('viagem') || lowerQuestion.includes('acelerar')) {
    return `Para acelerar sua meta de viagem para Itália (faltam R$16.500):

🚀 **Opção 1**: Aumentar dedicação de 34% para 50%
• Novo aporte: R$2.950/mês
• Tempo: 6 meses (3 meses a menos!)

💰 **Opção 2**: Reduzir R$15/dia + aumentar dedicação
• Economia extra: R$450/mês
• Tempo: 5 meses

Posso simular essas opções para você visualizar o impacto completo?`;
  }

  if (lowerQuestion.includes('aluguel') || lowerQuestion.includes('200')) {
    return `Um aumento de R$200 no aluguel teria este impacto:

📊 **Situação atual:**
• Disponível para metas: R$5.900/mês
• Viagem para Itália: 9 meses

📉 **Com aumento de R$200:**
• Novo disponível: R$5.700/mês
• Viagem para Itália: ~10 meses (+1 mês)

💡 **Para compensar**: Reduzir R$7/dia neutraliza o aumento

Quer ver isso na simulação de custos fixos?`;
  }

  return `Entendi sua dúvida! Com base no seu planejamento atual:

• **Renda total**: R$15.000/mês
• **Gastos diários**: R$80/dia (R$2.400/mês)
• **Custos fixos**: R$4.500/mês
• **Disponível para metas**: R$5.900/mês

Posso te ajudar a simular diferentes cenários. Você gostaria de:
1. Reduzir gastos diários
2. Ajustar custos fixos
3. Redistribuir entre metas

O que faz mais sentido para você?`;
}
