import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, BookmarkPlus } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useToast } from "@/components/ui/use-toast";
import { ragieService } from "@/services/ragieService";

interface Citation {
  id: string;
  title: string;
  citation: string;
  summary: string;
}

interface Message {
  content: string;
  isUser: boolean;
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([{
    content: "Hello! I'm your AI legal research assistant. How can I help you with Nigerian law today?",
    isUser: false
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const sampleCitation: Citation = {
    id: "1",
    title: "Adesina v. State",
    citation: "[2012] NLR-7720(SC)",
    summary: "The Supreme Court held that for a confession to be admissible, it must be voluntary and not obtained through duress, coercion, or inducement. The court emphasized that the prosecution bears the burden of proving the voluntariness of a confession beyond reasonable doubt."
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { content: message, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await ragieService.generateAnswer(message);
      setMessages(prev => [...prev, { content: response.answer || "I apologize, I couldn't generate an answer.", isUser: false }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  const handleSaveCitation = (citation: Citation) => {
    toast({
      title: "Citation Saved",
      description: `Citation "${citation.title}" has been saved to your library.`,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`bg-white p-4 rounded-lg shadow-sm max-w-[80%] ${
                msg.isUser ? "ml-auto" : ""
              }`}
            >
              <p className="text-sm text-gray-800">{msg.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="bg-white p-4 rounded-lg shadow-sm max-w-[80%]">
              <p className="text-sm text-gray-500">Thinking...</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4 bg-white">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;