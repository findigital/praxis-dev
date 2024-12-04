import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder, Search, PlusCircle } from "lucide-react";

const Cases = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const cases = [
    {
      id: 1,
      title: "Johnson vs State",
      description: "Criminal appeal case regarding evidence admissibility",
      date: "2024-02-15",
      documentsCount: 5,
    },
    {
      id: 2,
      title: "Lagos Property Dispute",
      description: "Land ownership dispute in Lagos State",
      date: "2024-02-10",
      documentsCount: 3,
    },
    {
      id: 3,
      title: "Corporate Merger Review",
      description: "Legal review of proposed merger documentation",
      date: "2024-02-05",
      documentsCount: 7,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Cases</h1>
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
          className="pl-10 w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((caseItem) => (
          <Card 
            key={caseItem.id}
            className="hover:shadow-lg transition-shadow cursor-pointer hover-scale"
            onClick={() => navigate(`/cases/${caseItem.id}`)}
          >
            <CardHeader className="flex flex-row items-center space-y-0 gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Folder className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">{caseItem.title}</CardTitle>
                <p className="text-sm text-gray-500">{new Date(caseItem.date).toLocaleDateString()}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{caseItem.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Folder className="h-4 w-4 mr-2" />
                <span>{caseItem.documentsCount} documents</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cases;