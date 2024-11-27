import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface DocumentItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  date: string;
  location: string;
}

export const DocumentItem = ({
  icon: Icon,
  title,
  description,
  date,
  location,
}: DocumentItemProps) => (
  <div className="p-4 flex items-center justify-between hover:bg-gray-50">
    <div className="flex items-center space-x-4">
      <div className="p-2 rounded-lg bg-gray-100">
        <Icon className="h-5 w-5 text-gray-600" />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-1">{description}</p>
      </div>
    </div>
    <div className="flex items-center space-x-4 text-sm text-gray-500">
      <span>{location}</span>
      <span>{date}</span>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
  </div>
);