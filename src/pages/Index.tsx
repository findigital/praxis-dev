import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Search, PlusCircle } from "lucide-react";
import { StarterQueries } from "@/components/StarterQueries";
import { RecentSection } from "@/components/RecentSection";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

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
  );
};

export default Index;