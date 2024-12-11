import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/library/SearchBar";
import { LibraryItem } from "@/components/library/LibraryItem";

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
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          courtFilter={courtFilter}
          setCourtFilter={setCourtFilter}
          years={years}
          courts={courts}
        />

        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="mb-4 bg-white/10">
            <TabsTrigger value="reports" className="text-white data-[state=active]:bg-white/20">
              Law Reports
            </TabsTrigger>
            <TabsTrigger value="cases" className="text-white data-[state=active]:bg-white/20">
              Case Library
            </TabsTrigger>
            <TabsTrigger value="laws" className="text-white data-[state=active]:bg-white/20">
              Laws of Federation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="grid gap-4">
                {filterItems(lawReports).map((report) => (
                  <LibraryItem
                    key={report.id}
                    id={report.id}
                    title={report.title}
                    subtitle={`${report.category} • ${report.date} • ${report.citation}`}
                    type="reports"
                    onItemClick={handleItemClick}
                    onBookmark={handleBookmark}
                    onAIResearch={handleAIResearch}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="cases">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="grid gap-4">
                {filterItems(caseLaw).map((case_) => (
                  <LibraryItem
                    key={case_.id}
                    id={case_.id}
                    title={case_.title}
                    subtitle={`${case_.jurisdiction} • ${case_.citation}`}
                    type="cases"
                    onItemClick={handleItemClick}
                    onBookmark={handleBookmark}
                    onAIResearch={handleAIResearch}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="laws">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="grid gap-4">
                {filterItems(federationLaws).map((law) => (
                  <LibraryItem
                    key={law.id}
                    id={law.id}
                    title={law.title}
                    subtitle={`${law.category} • Year: ${law.year} • Last Amended: ${law.lastAmended}`}
                    type="laws"
                    onItemClick={handleItemClick}
                    onBookmark={handleBookmark}
                    onAIResearch={handleAIResearch}
                  />
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