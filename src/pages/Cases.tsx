import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";
import { CaseCard } from "@/components/CaseCard";

const Cases = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in a real app this would come from an API
  const cases = [
    {
      id: "1",
      title: "Johnson vs State",
      description: "Criminal appeal case regarding evidence admissibility",
      date: "2024-02-15",
      documentsCount: 5,
      chatsCount: 2,
    },
    {
      id: "2",
      title: "Lagos Property Dispute",
      description: "Land ownership dispute in Lagos State",
      date: "2024-02-10",
      documentsCount: 3,
      chatsCount: 1,
    },
    {
      id: "3",
      title: "Corporate Merger Review",
      description: "Legal review of proposed merger documentation",
      date: "2024-02-05",
      documentsCount: 7,
      chatsCount: 4,
    },
  ];

  const filteredCases = cases.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Cases</h1>
        <Button 
          onClick={() => navigate("/cases/new")}
          className="bg-primary text-white hover:bg-primary/90"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Case
        </Button>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search cases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((caseItem) => (
          <CaseCard key={caseItem.id} {...caseItem} />
        ))}
      </div>
    </div>
  );
};

export default Cases;