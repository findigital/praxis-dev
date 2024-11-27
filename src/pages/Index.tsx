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
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-primary text-white border-r border-accent p-4 flex flex-col">
        <div className="mb-8">
          <Button 
            className="w-full bg-secondary text-primary hover:bg-secondary/90 font-semibold shadow-lg"
            onClick={() => toast({ title: "Starting new chat..." })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>

        <div className="space-y-6">
          <div className="bg-accent/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold">Pinned chats</h2>
              <Pin className="h-4 w-4 text-secondary/80" />
            </div>
            <p className="text-sm text-gray-300">No pinned chats yet</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">History</h2>
              <History className="h-4 w-4 text-secondary/80" />
            </div>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center px-3 py-2.5 text-sm rounded-lg hover:bg-accent/30 transition-colors group"
                >
                  <item.icon className="w-5 h-5 mr-3 text-secondary/80 group-hover:text-secondary" />
                  <span className="text-gray-100 group-hover:text-white">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Type your legal research query..."
                  className="w-full pl-5 pr-14 py-4 bg-white border-2 border-primary/10 placeholder-gray-400 text-gray-800 rounded-xl focus:border-primary focus:ring-primary text-base shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary hover:bg-accent text-white shadow-md"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>

            <div className="grid gap-6">
              {/* Recent Activities Card */}
              <Card className="p-6 bg-white border border-primary/10 shadow-sm rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-primary">Recent Activities</h3>
                <div className="space-y-4">
                  {["Research on Commercial Law", "Supreme Court Updates", "New Case Analysis"].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 text-base text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="w-2.5 h-2.5 bg-secondary rounded-full" />
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions Card */}
              <Card className="p-6 bg-white border border-primary/10 shadow-sm rounded-xl">
                <h3 className="text-xl font-semibold mb-5 text-primary">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {navigationItems.slice(0, 4).map((item) => (
                    <Button
                      key={item.label}
                      variant="outline"
                      className="flex items-center justify-center space-x-3 h-24 border-2 border-primary/10 hover:bg-primary hover:text-white transition-all duration-200 rounded-xl shadow-sm group"
                    >
                      <item.icon className="w-6 h-6 text-primary group-hover:text-white" />
                      <span className="font-medium">{item.label}</span>
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