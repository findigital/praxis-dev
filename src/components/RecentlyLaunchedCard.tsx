import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";

interface RecentlyLaunchedCardProps {
  title: string;
  description: string;
  date: string;
  tag: string;
  badge?: string;
}

export const RecentlyLaunchedCard = ({
  title,
  description,
  date,
  tag,
  badge,
}: RecentlyLaunchedCardProps) => (
  <Card className="p-6 hover:shadow-lg transition-shadow bg-gray-50">
    <div className="flex justify-between items-start mb-4">
      <Badge variant="outline" className="bg-gray-100">
        {tag}
      </Badge>
      {badge && (
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
          {badge}
        </Badge>
      )}
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
    <h3 className="font-semibold mb-2 line-clamp-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
    <div className="text-sm text-gray-500">{date}</div>
  </Card>
);