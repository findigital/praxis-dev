import { MessageSquare, Folder, BookOpen, Mic, Users, Settings, History } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const NavigationSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigationItems = [
    { icon: MessageSquare, label: "Legal Research Chat", href: "/chat" },
    { icon: Folder, label: "My Cases", href: "/cases" },
    { icon: BookOpen, label: "Nigerian Law Library", href: "/library" },
    { icon: Mic, label: "Court Transcripts", href: "#" },
    { icon: Users, label: "Legal Team", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  const recentChats = [
    { title: "Research on Contract Law", date: "2024-02-20" },
    { title: "Criminal Procedure Analysis", date: "2024-02-19" },
    { title: "Property Law Research", date: "2024-02-18" },
  ];

  return (
    <div className="space-y-8">
      <nav className="space-y-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.href)}
              className={`w-full flex items-center px-3 py-2.5 text-sm rounded-lg transition-colors group ${
                isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/80 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-[#FFD700]' : 'text-white/60 group-hover:text-white/80'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-3">
          <h2 className="text-sm font-semibold text-white/80">Recent Chats</h2>
          <History className="h-4 w-4 text-white/60" />
        </div>
        <div className="space-y-1">
          {recentChats.map((chat) => (
            <button
              key={chat.title}
              className="w-full text-left px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <p className="font-medium">{chat.title}</p>
              <p className="text-xs text-white/50">{chat.date}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};