import { MessageSquare, Folder, BookOpen, Mic, Users, Settings, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NavigationSection = () => {
  const navigate = useNavigate();
  
  const navigationItems = [
    { icon: MessageSquare, label: "Legal Research Chat", href: "/chat" },
    { icon: Folder, label: "My Cases", href: "/cases" },
    { icon: BookOpen, label: "Nigerian Law Library", href: "#" },
    { icon: Mic, label: "Court Transcripts", href: "#" },
    { icon: Users, label: "Legal Team", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold">History</h2>
        <History className="h-4 w-4 text-secondary/80" />
      </div>
      <nav className="space-y-1">
        {navigationItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.href)}
            className="w-full flex items-center px-3 py-2.5 text-sm rounded-lg hover:bg-accent/30 transition-colors group"
          >
            <item.icon className="w-5 h-5 mr-3 text-secondary/80 group-hover:text-secondary" />
            <span className="text-gray-100 group-hover:text-white">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};