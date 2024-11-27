import { MessageSquare, Folder, BookOpen, Mic, Users, Settings, History } from "lucide-react";

export const NavigationSection = () => {
  const navigationItems = [
    { icon: MessageSquare, label: "Legal Research Chat", href: "#" },
    { icon: Folder, label: "My Cases", href: "#" },
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
  );
};