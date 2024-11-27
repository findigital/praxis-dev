import { ArrowRight } from "lucide-react";

interface StarterQueriesProps {
  onQuerySelect: (query: string) => void;
}

export const StarterQueries = ({ onQuerySelect }: StarterQueriesProps) => {
  const starterQueries = [
    "What are the recent Supreme Court decisions on land ownership in Nigeria?",
    "Explain the key elements of Nigerian corporate law in simple terms",
    "Find cases related to fundamental human rights in Nigerian courts",
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent h-4 z-10"></div>
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <div className="space-y-3">
          {starterQueries.map((query, index) => (
            <button
              key={index}
              onClick={() => onQuerySelect(query)}
              className="w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-primary/5 border border-gray-200 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700 group-hover:text-primary">{query}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};