import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  MessageSquare,
  Folder,
  BookOpen,
  Mic,
  Users,
  Settings,
  Search,
  PlusCircle,
  History,
  Pin,
} from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Searching...",
      description: "Your AI research assistant is processing your query.",
    });
  };

  const navigationItems = [
    { icon: MessageSquare, label: "AI Research Chat", href: "#" },
    { icon: Folder, label: "Case Groups", href: "#" },
    { icon: BookOpen, label: "Law Reports", href: "#" },
    { icon: Mic, label: "Transcription", href: "#" },
    { icon: Users, label: "Team", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  return (
    <div className="flex h-screen bg-primary text-white">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-accent p-4 flex flex-col">
        <div className="mb-8">
          <Button 
            className="w-full bg-secondary text-primary hover:bg-secondary/90 font-semibold"
            onClick={() => toast({ title: "Starting new chat..." })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold">Pinned chats</h2>
              <Pin className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-sm text-gray-400">No pinned chats yet</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold">History</h2>
              <History className="h-4 w-4 text-gray-400" />
            </div>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center px-2 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Type your legal research query..."
                  className="w-full pl-4 pr-12 py-3 bg-accent/50 border-accent placeholder-gray-400 text-white rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-accent/50"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>

            <div className="space-y-4">
              {/* Recent Activities Card */}
              <Card className="p-6 bg-accent/30 border-accent">
                <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  {["Research on Commercial Law", "Supreme Court Updates", "New Case Analysis"].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions Card */}
              <Card className="p-6 bg-accent/30 border-accent">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {navigationItems.slice(0, 4).map((item) => (
                    <Button
                      key={item.label}
                      variant="outline"
                      className="flex items-center justify-center space-x-2 h-20 border-accent hover:bg-accent/50"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;