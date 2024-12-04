import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, MessageSquare, PlusCircle } from "lucide-react";
import { DocumentItem } from "@/components/DocumentItem";

const CaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - in a real app this would come from an API
  const caseData = {
    id,
    title: "Johnson vs State",
    description: "Criminal appeal case regarding evidence admissibility",
    date: "2024-02-15",
    documents: [
      {
        id: 1,
        title: "Initial Brief",
        description: "Opening arguments and case summary",
        date: "2024-02-15",
        location: "Legal Briefs"
      },
      {
        id: 2,
        title: "Evidence List",
        description: "Comprehensive list of submitted evidence",
        date: "2024-02-14",
        location: "Evidence"
      }
    ],
    chats: [
      {
        id: 1,
        title: "Research on Evidence Admissibility",
        date: "2024-02-15",
        preview: "Discussion about similar cases and precedents..."
      },
      {
        id: 2,
        title: "Case Law Analysis",
        date: "2024-02-14",
        preview: "Analysis of relevant Nigerian court decisions..."
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate("/cases")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cases
      </Button>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{caseData.title}</h1>
          <p className="text-gray-600">{caseData.description}</p>
        </div>
        <Button className="bg-primary text-white hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Document
        </Button>
      </div>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="documents" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="chats" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Research Chats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          {caseData.documents.map((doc) => (
            <DocumentItem
              key={doc.id}
              icon={FileText}
              title={doc.title}
              description={doc.description}
              date={doc.date}
              location={doc.location}
            />
          ))}
        </TabsContent>

        <TabsContent value="chats">
          {caseData.chats.map((chat) => (
            <div key={chat.id} className="p-4 flex items-center justify-between hover:bg-gray-50 border-b last:border-b-0">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-gray-100">
                  <MessageSquare className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">{chat.title}</h3>
                  <p className="text-sm text-gray-600">{chat.preview}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{chat.date}</span>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CaseDetail;