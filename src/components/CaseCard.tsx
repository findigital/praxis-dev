import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CaseCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  documentsCount: number;
  chatsCount: number;
}

export const CaseCard = ({
  id,
  title,
  description,
  date,
  documentsCount,
  chatsCount,
}: CaseCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer hover-scale"
      onClick={() => navigate(`/cases/${id}`)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex space-x-4">
            <span className="flex items-center text-muted-foreground">
              <FileText className="h-4 w-4 mr-1" />
              {documentsCount} docs
            </span>
            <span className="flex items-center text-muted-foreground">
              <MessageSquare className="h-4 w-4 mr-1" />
              {chatsCount} chats
            </span>
          </div>
          <span className="text-muted-foreground">{new Date(date).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};