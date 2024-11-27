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

  const recentActivities = [
    "Updated Case Group: Lagos High Court 2024",
    "Transcribed: Supreme Court Hearing Feb 15",
    "Research: Nigerian Commercial Law Updates",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-primary p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">LegalAI Nigeria</h1>
          <div className="hidden md:flex space-x-6">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center space-x-2 hover:text-secondary transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Nigerian Legal Research Assistant
          </h2>
          <p className="text-gray-600 mb-8">
            Powered by AI, tailored for Nigerian legal professionals
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter your legal research query..."
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="bg-secondary hover:bg-secondary/90">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 hover:bg-gray-50 p-2 rounded-md transition-colors"
                >
                  <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                  {activity}
                </li>
              ))}
            </ul>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {navigationItems.slice(0, 4).map((item) => (
                <Button
                  key={item.label}
                  variant="outline"
                  className="flex items-center justify-center space-x-2 h-20"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;