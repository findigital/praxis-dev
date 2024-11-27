import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const handleSend = () => {
    if (!message.trim()) return;
    // Here you would typically handle sending the message
    setMessage("");
  };

  return (
    <div className="flex min-h-screen h-full">
      {/* Left Sidebar */}
      <div className="w-64 bg-primary text-white border-r border-accent min-h-screen flex flex-col">
        <div className="p-4 flex-1 flex flex-col">
          <h1 className="text-2xl font-bold text-secondary mb-6">Praxis</h1>
          <div className="mb-8">
            <Button 
              className="w-full bg-secondary text-primary hover:bg-secondary/90 font-semibold shadow-lg"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat Header */}
        <div className="border-b p-4 bg-white">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Legal Research Chat</h2>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm max-w-[80%]">
              <p className="text-sm text-gray-800">
                Hello! I'm your AI legal research assistant. How can I help you with Nigerian law today?
              </p>
            </div>
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;