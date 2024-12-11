import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookmarkPlus, MessageSquare } from "lucide-react";

interface LibraryItemProps {
  id: number;
  title: string;
  subtitle: string;
  type: string;
  onItemClick: (id: number, type: string) => void;
  onBookmark: (title: string) => void;
  onAIResearch: (title: string) => void;
}

export const LibraryItem = ({
  id,
  title,
  subtitle,
  type,
  onItemClick,
  onBookmark,
  onAIResearch,
}: LibraryItemProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow bg-white/5 border-white/10">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="cursor-pointer" onClick={() => onItemClick(id, type)}>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm opacity-80">{subtitle}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onBookmark(title)}
              className="bg-[#FFD700] hover:bg-[#FFD700]/80"
            >
              <BookmarkPlus className="h-4 w-4 text-[#1B3B35]" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onAIResearch(title)}
              className="bg-[#FFD700] hover:bg-[#FFD700]/80"
            >
              <MessageSquare className="h-4 w-4 text-[#1B3B35]" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};