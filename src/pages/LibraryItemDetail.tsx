import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookmarkPlus, MessageSquare, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type LawReport = {
  title: string;
  category: string;
  date: string;
  citation: string;
  content: string;
  summary: string;
  relatedCases: string[];
};

type CaseLaw = {
  title: string;
  jurisdiction: string;
  citation: string;
  summary: string;
  judgment: string;
  significance: string;
};

type FederationLaw = {
  title: string;
  year: string;
  lastAmended: string;
  category: string;
  description: string;
  sections: string[];
};

type MockData = {
  reports: Record<string, LawReport>;
  cases: Record<string, CaseLaw>;
  laws: Record<string, FederationLaw>;
};

const LibraryItemDetail = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - in a real app, this would come from an API
  const mockData: MockData = {
    reports: {
      "1": {
        title: "Supreme Court Reports 2023",
        category: "Supreme Court",
        date: "2023",
        citation: "SCR/2023/123",
        content: "This is a detailed view of the Supreme Court Reports for 2023...",
        summary: "Key findings and precedents set in major cases during 2023",
        relatedCases: ["Smith v. State", "Johnson v. Federal Republic"],
      },
    },
    cases: {
      "1": {
        title: "Smith v. State (2023)",
        jurisdiction: "Supreme Court",
        citation: "SC.123/2023",
        summary: "Landmark case regarding constitutional interpretation...",
        judgment: "The Supreme Court held that...",
        significance: "This case established the precedent for...",
      },
    },
    laws: {
      "1": {
        title: "Constitution of Nigeria",
        year: "1999",
        lastAmended: "2023",
        category: "Constitutional Law",
        description: "The fundamental law of Nigeria...",
        sections: ["Chapter 1: General Provisions", "Chapter 2: Fundamental Rights"],
      },
    },
  };

  if (!type || !id || !["reports", "cases", "laws"].includes(type)) {
    return (
      <div className="p-6 text-white">
        <Button variant="outline" onClick={() => navigate("/library")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
        </Button>
        <p>Item not found</p>
      </div>
    );
  }

  const item = mockData[type as keyof MockData][id];

  if (!item) {
    return (
      <div className="p-6 text-white">
        <Button variant="outline" onClick={() => navigate("/library")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
        </Button>
        <p>Item not found</p>
      </div>
    );
  }

  const handleBookmark = () => {
    toast({
      title: "Bookmarked",
      description: `${item.title} has been added to your bookmarks`,
    });
  };

  const handleAIResearch = () => {
    toast({
      title: "AI Research Assistant",
      description: "Opening research chat for: " + item.title,
    });
  };

  const renderContent = () => {
    switch (type) {
      case "reports":
        const reportItem = item as LawReport;
        return (
          <div className="space-y-4">
            <p className="text-sm opacity-80">Citation: {reportItem.citation}</p>
            <p className="text-sm opacity-80">Category: {reportItem.category}</p>
            <p className="text-sm opacity-80">Date: {reportItem.date}</p>
            <h3 className="font-semibold mt-4">Summary</h3>
            <p>{reportItem.summary}</p>
            <h3 className="font-semibold mt-4">Related Cases</h3>
            <ul className="list-disc list-inside">
              {reportItem.relatedCases.map((case_, index) => (
                <li key={index} className="text-sm opacity-80">{case_}</li>
              ))}
            </ul>
            <p className="mt-4">{reportItem.content}</p>
          </div>
        );

      case "cases":
        const caseItem = item as CaseLaw;
        return (
          <div className="space-y-4">
            <p className="text-sm opacity-80">Citation: {caseItem.citation}</p>
            <p className="text-sm opacity-80">Jurisdiction: {caseItem.jurisdiction}</p>
            <h3 className="font-semibold mt-4">Summary</h3>
            <p>{caseItem.summary}</p>
            <h3 className="font-semibold mt-4">Judgment</h3>
            <p>{caseItem.judgment}</p>
            <h3 className="font-semibold mt-4">Significance</h3>
            <p>{caseItem.significance}</p>
          </div>
        );

      case "laws":
        const lawItem = item as FederationLaw;
        return (
          <div className="space-y-4">
            <p className="text-sm opacity-80">Category: {lawItem.category}</p>
            <p className="text-sm opacity-80">Year: {lawItem.year}</p>
            <p className="text-sm opacity-80">Last Amended: {lawItem.lastAmended}</p>
            <h3 className="font-semibold mt-4">Description</h3>
            <p>{lawItem.description}</p>
            <h3 className="font-semibold mt-4">Sections</h3>
            <ul className="list-disc list-inside">
              {lawItem.sections.map((section, index) => (
                <li key={index} className="text-sm opacity-80">{section}</li>
              ))}
            </ul>
          </div>
        );

      default:
        return <p>Invalid item type</p>;
    }
  };

  return (
    <div className="p-6 bg-[#1B3B35] min-h-screen text-white">
      <Button 
        variant="outline" 
        onClick={() => navigate("/library")}
        className="mb-4 text-white border-white/20 hover:bg-white/10"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
      </Button>

      <div className="grid gap-6">
        <Card className="bg-white/10 border-white/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-white">{item.title}</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={handleBookmark}
                className="bg-[#FFD700] hover:bg-[#FFD700]/80"
              >
                <BookmarkPlus className="h-4 w-4 text-[#1B3B35]" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleAIResearch}
                className="bg-[#FFD700] hover:bg-[#FFD700]/80"
              >
                <MessageSquare className="h-4 w-4 text-[#1B3B35]" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LibraryItemDetail;