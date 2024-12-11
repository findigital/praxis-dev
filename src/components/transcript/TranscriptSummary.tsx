import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Speaker, Info, BookOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TranscriptSummaryProps {
  transcript: {
    id: string;
    title: string;
    date: string;
    duration: string;
    summary: string;
    content: string;
  };
}

export const TranscriptSummary = ({ transcript }: TranscriptSummaryProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-100">
            <FileText className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{transcript.title}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {transcript.duration}
              </span>
              <span>{transcript.date}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Speaker className="h-4 w-4" />
            Play Audio
          </Button>
          <Button className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Full Transcript
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Info className="h-5 w-5 text-gray-600" />
              AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <p className="text-gray-600 leading-relaxed">{transcript.summary}</p>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-600" />
              Transcript Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {transcript.content}
              </p>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};