import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavigationSection } from "@/components/NavigationSection";
import { BookmarkPlus, Search, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const isChat = location.pathname === "/chat";

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-[#1B3B35] text-white min-h-screen flex flex-col">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#FFD700] mb-4">Praxis</h1>
          <Button 
            variant="secondary" 
            className="w-full bg-[#FFD700] text-[#1B3B35] hover:bg-[#FFD700]/90 mb-8"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
        <div className="flex-1 px-4">
          <NavigationSection />
        </div>
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full text-white hover:bg-white/10 flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isChat && (
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <h1 className="text-xl font-semibold ml-3">Legal Research Chat</h1>
                </div>
              )}
            </div>
            {isChat && (
              <div className="flex space-x-4">
                <Button variant="outline" className="flex items-center">
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Save Search
                </Button>
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  Add to Case
                </Button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};