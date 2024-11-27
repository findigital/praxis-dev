import { RecentlyLaunchedCard } from "./RecentlyLaunchedCard";
import { DocumentItem } from "./DocumentItem";
import { MessageSquare, Folder, BookOpen } from "lucide-react";
import { Card } from "./ui/card";

export const RecentSection = () => {
  const recentlyLaunched = [
    {
      title: "Legal Brief Generator",
      description: "New Template: Generate comprehensive legal briefs for Nigerian court submissions...",
      date: "Nov 27 2024",
      tag: "Brief Generator"
    },
    {
      title: "Case Law Summary Generator",
      description: "Nigerian Supreme Court Cases: Generate detailed summaries of landmark decisions...",
      date: "Nov 27 2024",
      tag: "Case Summary",
      badge: "Premium"
    },
  ];

  const documents = [
    {
      icon: MessageSquare,
      title: "Legal Notice Template",
      description: "Create professional legal notices compliant with Nigerian law",
      date: "Jul 15, 2024",
      location: "in Templates"
    },
    {
      icon: Folder,
      title: "Case Brief Generator",
      description: "Generate comprehensive case briefs for Nigerian court proceedings",
      date: "Jul 15, 2024",
      location: "in Workbook"
    },
    {
      icon: BookOpen,
      title: "Legal Research Guide",
      description: "Complete guide to Nigerian legal research methodology",
      date: "Jul 15, 2024",
      location: "in Guides"
    },
  ];

  return (
    <>
      {/* Recently Launched Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Recently Launched</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentlyLaunched.map((item, index) => (
            <RecentlyLaunchedCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Documents Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Documents</h2>
        <Card className="divide-y bg-gray-50">
          {documents.map((doc, index) => (
            <DocumentItem key={index} {...doc} />
          ))}
        </Card>
      </div>
    </>
  );
};