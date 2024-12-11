import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Mail, Phone, Calendar } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Partner",
    specialty: "Corporate Law",
    email: "sarah.johnson@praxis.com",
    phone: "+234 123 456 7890",
    availability: "Available",
    imageUrl: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Michael Okonjo",
    role: "Associate",
    specialty: "Criminal Law",
    email: "michael.okonjo@praxis.com",
    phone: "+234 123 456 7891",
    availability: "In Court",
    imageUrl: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    name: "Amina Bello",
    role: "Partner",
    specialty: "Property Law",
    email: "amina.bello@praxis.com",
    phone: "+234 123 456 7892",
    availability: "Available",
    imageUrl: "https://i.pravatar.cc/150?img=3"
  }
];

const LegalTeam = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Legal Team</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg border border-gray-200">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search team members..."
          className="border-0 focus-visible:ring-0 bg-transparent"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id} className="bg-white border-gray-200">
            <CardHeader className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <CardTitle className="text-lg text-gray-900">{member.name}</CardTitle>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {member.availability}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{member.specialty}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {member.phone}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LegalTeam;