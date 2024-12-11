import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Play, FileText, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TranscriptItem {
  id: string;
  title: string;
  date: string;
  duration: string;
  summary: string;
}

const mockTranscripts: TranscriptItem[] = [
  {
    id: "1",
    title: "Initial Hearing - Smith vs. Johnson",
    date: "2024-02-20",
    duration: "45:23",
    summary: "Discussion of preliminary motions and scheduling of main hearing dates. Key points included defendant's request for additional discovery time."
  },
  {
    id: "2",
    title: "Witness Testimony - Dr. Anderson",
    date: "2024-02-19",
    duration: "1:15:45",
    summary: "Expert witness testimony regarding medical evidence. Detailed analysis of patient records and professional opinion on causation."
  }
];

const Transcripts = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: "Recording Started",
      description: "Your court session is now being recorded.",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Recording Stopped",
      description: "Your recording has been saved and is being transcribed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Court Transcripts</h1>
        <Button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          variant={isRecording ? "destructive" : "default"}
          className="flex items-center gap-2"
        >
          <Mic className="h-4 w-4" />
          {isRecording ? "Stop Recording" : "Start New Recording"}
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Recent Transcripts</h2>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {mockTranscripts.map((transcript) => (
                  <Card 
                    key={transcript.id}
                    className="hover:shadow-md transition-shadow cursor-pointer bg-gray-50 border-gray-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-gray-800">{transcript.title}</h3>
                          <p className="text-sm text-gray-600">{transcript.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Play className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4 text-gray-600" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <List className="h-4 w-4" />
                        <span>Duration: {transcript.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600 bg-white p-3 rounded-md border border-gray-200">
                        {transcript.summary}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transcripts;