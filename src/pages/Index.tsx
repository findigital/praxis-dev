import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
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
  ArrowRight,
  MoreVertical,
} from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const starterQueries = [
    "What are the recent Supreme Court decisions on intellectual property?",
    "Explain the key elements of contract law in simple terms",
    "Find cases related to employment discrimination in tech companies",
  ];

  const recentlyLaunched = [
    {
      title: "Article Generator",
      description: "New Workbook: Please provide the subject or topic you want the article to focus on...",
      date: "Nov 27 2024",
      tag: "Article Generator"
    },
    {
      title: "FAQ Generator (All Datas)",
      description: "GTA 6 FAQ: **Grumpy FAQ About GTA 6****Welcome to the Rockstar Games GTA 6",
      date: "Nov 27 2024",
      tag: "FAQ Generator",
      badge: "Improve"
    },
  ];

  const documents = [
    {
      icon: MessageSquare,
      title: "Cold Email",
      description: "Create an effective cold email to reach out to potential clients",
      date: "Jul 15, 2024",
      location: "in Workbook"
    },
    {
      icon: Folder,
      title: "Article Generator",
      description: "Instantly create unique articles on any topic. Boost engagement",
      date: "Jul 15, 2024",
      location: "in Workbook"
    },
    {
      icon: BookOpen,
      title: "Startup Ideas (w/ quantities)",
      description: "Generate innovative startup ideas along with estimated quantities",
      date: "Jul 15, 2024",
      location: "in Workbook"
    },
  ];

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      toast({
        title: "Please enter a research query",
        variant: "destructive",
      });
      return;
    }
    setSearchQuery(query);
    toast({
      title: "Processing your request...",
      description: "Your AI research assistant is analyzing your query.",
    });
  };

  const navigationItems = [
    { icon: MessageSquare, label: "AI Research Chat", href: "#" },
    { icon: Folder, label: "My Cases", href: "#" },
    { icon: BookOpen, label: "Law Library", href: "#" },
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
          <div className="max-w-4xl mx-auto space-y-8">
            {/* AI Chat Interface */}
            <div className="mb-8 space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">How can I assist with your legal research today?</h2>
                <p className="text-gray-600">Ask me anything about laws, cases, or legal concepts</p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent h-4 z-10"></div>
                <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                  {/* Starter Messages */}
                  <div className="space-y-3 mb-6">
                    {starterQueries.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(query)}
                        className="w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-primary/5 border border-gray-200 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 group-hover:text-primary">{query}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="relative mt-4">
                    <Input
                      type="text"
                      placeholder="Type your legal research query..."
                      className="w-full pl-5 pr-14 py-6 bg-white border-2 border-primary/10 placeholder-gray-400 text-gray-800 rounded-xl focus:border-primary focus:ring-primary text-base shadow-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                    />
                    <Button 
                      onClick={() => handleSearch(searchQuery)}
                      size="icon"
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white shadow-md"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recently Launched Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Recently Launched</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentlyLaunched.map((item, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className="bg-gray-100">
                        {item.tag}
                      </Badge>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                          {item.badge}
                        </Badge>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                    <div className="text-sm text-gray-500">{item.date}</div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Documents Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Documents</h2>
              <Card className="divide-y">
                {documents.map((doc, index) => (
                  <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <doc.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-1">{doc.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{doc.location}</span>
                      <span>{doc.date}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
