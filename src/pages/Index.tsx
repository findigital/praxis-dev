import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Search, PlusCircle, History, Pin } from "lucide-react";
import { NavigationSection } from "@/components/NavigationSection";
import { StarterQueries } from "@/components/StarterQueries";
import { RecentSection } from "@/components/RecentSection";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

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
      description: "Your AI research assistant is analyzing Nigerian law databases.",
    });
  };

  return (
    <div className="flex min-h-screen h-full">
      {/* Left Sidebar */}
      <div className="w-64 bg-primary text-white border-r border-accent min-h-screen flex flex-col">
        <div className="p-4 flex-1 flex flex-col">
          <h1 className="text-2xl font-bold text-secondary mb-6 text-center">Praxis</h1>
          <div className="mb-8">
            <Button 
              className="w-full bg-secondary text-primary hover:bg-secondary/90 font-semibold shadow-lg"
              onClick={() => toast({ title: "Starting new research session..." })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Research
            </Button>
          </div>

          <div className="space-y-6 flex-1">
            <div className="bg-accent/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold">Pinned Research</h2>
                <Pin className="h-4 w-4 text-secondary/80" />
              </div>
              <p className="text-sm text-gray-300">No pinned research yet</p>
            </div>

            <NavigationSection />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* AI Chat Interface */}
            <div className="mb-8 space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">How can I assist with your Nigerian legal research today?</h2>
                <p className="text-gray-600">Ask me anything about Nigerian laws, cases, or legal concepts</p>
              </div>

              <StarterQueries onQuerySelect={handleSearch} />

              {/* Chat Input */}
              <div className="relative mt-4">
                <Input
                  type="text"
                  placeholder="Search Nigerian legal cases, statutes, or ask a legal question..."
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

            <RecentSection />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;