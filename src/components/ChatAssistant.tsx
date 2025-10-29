import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi Katie! Fall is just around the corner — what are you shopping for today?" },
    { role: "user", content: "I have a friend's wedding in two months and her colors are burgundy, cream, and fall tones. I prefer something long and silky, nothing over $250." },
    { role: "assistant", content: "How exciting — that sounds like such a beautiful event! You're going to love these options I've found." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'd love to help you find that! Could you tell me more about your style preferences?"
      }]);
    }, 1000);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full shadow-elegant bg-foreground text-background hover:bg-foreground/90"
        size="icon"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 left-6 z-50 w-80 h-[500px] shadow-elegant flex flex-col animate-scale-in">
          <div className="p-4 border-b bg-gradient-primary text-primary-foreground rounded-t-lg">
            <h3 className="font-semibold">AI Shopping Assistant</h3>
            <p className="text-sm opacity-90">Always here to help you shop smarter</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 text-black"
            />
            <Button onClick={handleSend} size="icon" className="bg-gradient-primary">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatAssistant;