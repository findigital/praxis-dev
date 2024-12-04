import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, BookOpen, MessageSquare, BookmarkPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LawLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleBookmark = (title: string) => {
    toast({
      title: "Bookmarked",
      description: `${title} has been added to your bookmarks`,
    });
  };

  const handleAIResearch = (topic: string) => {
    toast({
      title: "AI Research Assistant",
      description: "Opening research chat for: " + topic,
    });
  };

  // Mock data for demonstration
  const lawReports = [
    { id: 1, title: "Supreme Court Reports 2023", category: "Supreme Court", date: "2023" },
    { id: 2, title: "Court of Appeal Reports 2023", category: "Court of Appeal", date: "2023" },
  ];

  const caseLaw = [
    { id: 1, title: "Smith v. State (2023)", jurisdiction: "Supreme Court", citation: "SC.123/2023" },
    { id: 2, title: "Johnson v. Federal Republic", jurisdiction: "Court of Appeal", citation: "CA.456/2023" },
  ];

  const federationLaws = [
    { id: 1, title: "Constitution of Nigeria", year: "1999", lastAmended: "2023" },
    { id: 2, title: "Criminal Code Act", year: "1990", lastAmended: "2020" },
  ];

  return (
    <div className="h-full bg-white">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search law library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <BookmarkPlus className="mr-2 h-4 w-4" />
            My Bookmarks
          </Button>
        </div>

        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="reports">Law Reports</TabsTrigger>
            <TabsTrigger value="cases">Case Library</TabsTrigger>
            <TabsTrigger value="laws">Laws of Federation</TabsTrigger>
          </TabsList>

          <TabsContent value="reports">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="grid gap-4">
                {lawReports.map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow bg-primary text-white">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-white">{report.title}</h3>
                          <p className="text-sm text-white/80">{report.category} • {report.date}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleBookmark(report.title)}
                          >
                            <BookmarkPlus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleAIResearch(report.title)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="cases">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="grid gap-4">
                {caseLaw.map((case_) => (
                  <Card key={case_.id} className="hover:shadow-md transition-shadow bg-primary text-white">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-white">{case_.title}</h3>
                          <p className="text-sm text-white/80">
                            {case_.jurisdiction} • {case_.citation}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleBookmark(case_.title)}
                          >
                            <BookmarkPlus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleAIResearch(case_.title)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="laws">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="grid gap-4">
                {federationLaws.map((law) => (
                  <Card key={law.id} className="hover:shadow-md transition-shadow bg-primary text-white">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-white">{law.title}</h3>
                          <p className="text-sm text-white/80">
                            Year: {law.year} • Last Amended: {law.lastAmended}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleBookmark(law.title)}
                          >
                            <BookmarkPlus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleAIResearch(law.title)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LawLibrary;