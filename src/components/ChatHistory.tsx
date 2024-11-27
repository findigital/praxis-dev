import { MessageSquare } from "lucide-react";
import { Button } from "./ui/button";

interface ChatHistoryItem {
  id: string;
  title: string;
  date: string;
}

const recentChats: ChatHistoryItem[] = [
  {
    id: "1",
    title: "Research on Contract Law",
    date: "2024-02-20",
  },
  {
    id: "2",
    title: "Criminal Procedure Analysis",
    date: "2024-02-19",
  },
  {
    id: "3",
    title: "Property Law Research",
    date: "2024-02-18",
  },
];

export const ChatHistory = () => {
  return (
    <div className="space-y-2">
      {recentChats.map((chat) => (
        <Button
          key={chat.id}
          variant="ghost"
          className="w-full justify-start text-left hover:bg-accent/30"
        >
          <MessageSquare className="h-4 w-4 mr-2 text-secondary/80" />
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-100">{chat.title}</span>
            <span className="text-xs text-gray-400">{chat.date}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};