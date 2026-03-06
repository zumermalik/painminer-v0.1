"use client"
import { useState } from "react";
import { Loader2, TrendingUp } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleAnalyze = async () => {
    if (!input) return;
    setLoading(true);
    
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ text: input }),
      });
      const data = await response.json();
      setResults(data.ideas);
    } catch (error) {
      console.error("Failed to analyze", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 flex flex-col gap-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Mine Your Comments.</h2>
        <p className="text-gray-500 dark:text-gray-400">Paste your raw TikTok, IG, or YouTube comments below to uncover what your audience actually wants to buy.</p>
      </div>

      <div className="flex flex-col gap-4">
        <textarea 
          className="w-full min-h-[200px] p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] focus:ring-2 focus:ring-primary outline-none transition-all resize-y"
          placeholder="Paste comments here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          onClick={handleAnalyze}
          disabled={loading || !input}
          className="bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2 w-fit"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Analyze Audience Pains"}
        </button>
      </div>

      {results && (
        <div className="mt-8 space-y-6">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <TrendingUp className="text-primary" /> Validated Product Ideas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((idea, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4">
                <h4 className="text-lg font-bold">{idea.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{idea.description}</p>
                <div className="pt-4 border-t border-[var(--border)]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">Core Pain Solved</span>
                  <p className="text-sm mt-1">{idea.painPoint}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
