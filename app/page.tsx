"use client"
import { useState } from "react";
import { Loader2, TrendingUp, ExternalLink, Zap } from "lucide-react";

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

      {/* NEW: The Interactive Guide Banner */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-blue-900 dark:text-blue-300">Don't want to copy-paste manually?</h4>
          <p className="text-sm text-blue-700 dark:text-blue-400">Use a free scraper to instantly extract comments from any video link.</p>
        </div>
        <a 
          href="https://exportcomments.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="shrink-0 bg-white dark:bg-black border border-blue-200 dark:border-blue-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
        >
          Get Comments <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="flex flex-col gap-4">
        <textarea 
          className="w-full min-h-[200px] p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] focus:ring-2 focus:ring-primary outline-none transition-all resize-y"
          placeholder="Paste exported comments here..."
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

      {/* UPDATED: Richer Output Cards */}
      {results && (
        <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <TrendingUp className="text-primary" /> Actionable Product Blueprints
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((idea, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="text-lg font-bold leading-tight">{idea.title}</h4>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                      {idea.suggestedPrice}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{idea.description}</p>
                  <div className="pt-4 border-t border-[var(--border)]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">Core Pain Solved</span>
                    <p className="text-sm mt-1">{idea.painPoint}</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--border)] bg-gray-50 dark:bg-gray-900/50 -mx-6 -mb-6 p-6 rounded-b-xl">
                  <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-orange-500 mb-2">
                    <Zap className="h-3 w-3" /> Next Step
                  </span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{idea.firstActionStep}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
