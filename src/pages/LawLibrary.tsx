import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, BookOpen, MessageSquare, BookmarkPlus, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const LawLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [courtFilter, setCourtFilter] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleItemClick = (id: number, type: string) => {
    navigate(`/library/${type}/${id}`);
  };

  // Mock data for demonstration
  const lawReports = [
    { id: 1, title: "Supreme Court Reports 2023", category: "Supreme Court", date: "2023", citation: "SCR/2023/123" },
    { id: 2, title: "Court of Appeal Reports 2023", category: "Court of Appeal", date: "2023", citation: "CAR/2023/456" },
  ];

  const caseLaw = [
    { id: 1, title: "Smith v. State (2023)", jurisdiction: "Supreme Court", citation: "SC.123/2023", year: "2023" },
    { id: 2, title: "Johnson v. Federal Republic", jurisdiction: "Court of Appeal", citation: "CA.456/2023", year: "2023" },
  ];

  const federationLaws = [
    { id: 1, title: "Constitution of Nigeria", year: "1999", lastAmended: "2023", category: "Constitutional Law" },
    { id: 2, title: "Criminal Code Act", year: "1990", lastAmended: "2020", category: "Criminal Law" },
  ];

  const years = ["2023", "2022", "2021", "2020", "2019"];
  const courts = ["Supreme Court", "Court of Appeal", "Federal High Court", "State High Court"];

  const filterItems = (items: any[]) => {
    return items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = yearFilter === "all" || item.year === yearFilter || item.date === yearFilter;
      const matchesCourt = courtFilter === "all" || 
        item.jurisdiction === courtFilter || 
        item.category === courtFilter;
      return matchesSearch && matchesYear && matchesCourt;
    });
  };

  return (
    <div className="h-full bg-[#1B3B35] text-white">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search law library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="flex space-x-2">
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={courtFilter} onValueChange={setCourtFilter}>
              <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by Court" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courts</SelectItem>
                {courts.map((court) => (
                  <SelectItem key={court} value={court}>{court}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="mb-4 bg-white/10">
            <TabsTrigger value="reports" className="text-white data-[state=active]:bg-white/20">Law Reports</TabsTrigger>
            <TabsTrigger value="cases" className="text-white data-[state=active]:bg-white/20">Case Library</TabsTrigger>
            <TabsTrigger value="laws" className="text-white data-[state=active]:bg-white/20">Laws of Federation</TabsTrigger>
          </TabsList>

          <TabsContent value="reports">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="grid gap-4">
                {filterItems(lawReports).map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow bg-white/10 border-white/20">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="cursor-pointer" onClick={() => handleItemClick(report.id, 'reports')}>
                          <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                          <p className="text-sm opacity-80">
                            {report.category} • {report.date} • {report.citation}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleBookmark(report.title)}
                            className="bg-[#FFD700] hover:bg-[#FFD700]/80"
                          >
                            <BookmarkPlus className="h-4 w-4 text-[#1B3B35]" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleAIResearch(report.title)}
                            className="bg-[#FFD700] hover:bg-[#FFD700]/80"
                          >
                            <MessageSquare className="h-4 w-4 text-[#1B3B35]" />
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
                {filterItems(caseLaw).map((case_) => (
                  <Card key={case_.id} className="hover:shadow-md transition-shadow bg-white/10 border-white/20">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="cursor-pointer" onClick={() => handleItemClick(case_.id, 'cases')}>
                          <h3 className="font-semibold text-lg mb-2">{case_.title}</h3>
                          <p className="text-sm opacity-80">
                            {case_.jurisdiction} • {case_.citation}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleBookmark(case_.title)}
                            className="bg-[#FFD700] hover:bg-[#FFD700]/80"
                          >
                            <BookmarkPlus className="h-4 w-4 text-[#1B3B35]" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleAIResearch(case_.title)}
                            className="bg-[#FFD700] hover:bg-[#FFD700]/80"
                          >
                            <MessageSquare className="h-4 w-4 text-[#1B3B35]" />
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
                {filterItems(federationLaws).map((law) => (
                  <Card key={law.id} className="hover:shadow-md transition-shadow bg-white/10 border-white/20">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="cursor-pointer" onClick={() => handleItemClick(law.id, 'laws')}>
                          <h3 className="font-semibold text-lg mb-2">{law.title}</h3>
                          <p className="text-sm opacity-80">
                            {law.category} • Year: {law.year} • Last Amended: {law.lastAmended}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleBookmark(law.title)}
                            className="bg-[#FFD700] hover:bg-[#FFD700]/80"
                          >
                            <BookmarkPlus className="h-4 w-4 text-[#1B3B35]" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => handleAIResearch(law.title)}
                            className="bg-[#FFD700] hover:bg-[#FFD700]/80"
                          >
                            <MessageSquare className="h-4 w-4 text-[#1B3B35]" />
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