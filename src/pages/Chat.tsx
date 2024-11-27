import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, BookmarkPlus, FolderPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useToast } from "@/components/ui/use-toast";
import { ChatHistory } from "@/components/ChatHistory";

interface Citation {
  id: string;
  title: string;
  citation: string;
  summary: string;
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const sampleCitation: Citation = {
    id: "1",
    title: "Adesina v. State",
    citation: "[2012] LPELR-7720(SC)",
    summary: "The Supreme Court held that for a confession to be admissible, it must be voluntary and not obtained through duress, coercion, or inducement. The court emphasized that the prosecution bears the burden of proving the voluntariness of a confession beyond reasonable doubt."
  };

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage("");
  };

  const handleSaveSearch = () => {
    toast({
      title: "Search Saved",
      description: "Your search has been saved successfully.",
    });
  };

  const handleSaveCitation = (citation: Citation) => {
    toast({
      title: "Citation Saved",
      description: `Citation "${citation.title}" has been saved to your library.`,
    });
  };

  const handleAddToCase = () => {
    toast({
      title: "Added to Case Folder",
      description: "This chat has been added to your case folder.",
    });
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
          
          <div className="space-y-6 flex-1">
            <div className="bg-accent/20 rounded-lg p-4">
              <h2 className="text-sm font-semibold mb-4">Recent Chats</h2>
              <ChatHistory />
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat Header */}
        <div className="border-b p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Legal Research Chat</h2>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleAddToCase}>
                <FolderPlus className="h-4 w-4 mr-2" />
                Add to Case
              </Button>
              <Button variant="outline" onClick={handleSaveSearch}>
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Save Search
              </Button>
            </div>
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

            {/* AI Response with Citation */}
            <div className="bg-white p-4 rounded-lg shadow-sm max-w-[80%] ml-auto">
              <p className="text-sm text-gray-800 mb-2">
                Based on Nigerian law, confessions must be voluntary to be admissible in court. In the case of{" "}
                <HoverCard>
                  <HoverCardTrigger className="text-primary underline cursor-pointer">
                    {sampleCitation.title}
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-semibold">{sampleCitation.title}</h4>
                      <p className="text-sm text-muted-foreground">{sampleCitation.citation}</p>
                      <p className="text-sm">{sampleCitation.summary}</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full mt-2 text-primary hover:text-primary-foreground"
                        onClick={() => handleSaveCitation(sampleCitation)}
                      >
                        <BookmarkPlus className="h-4 w-4 mr-2" />
                        Save Citation
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                , the Supreme Court established clear guidelines for the admissibility of confessions.
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