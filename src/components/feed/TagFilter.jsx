const TAGS = ["all", "minimal", "nature", "interior", "fashion", "food"];

export default function TagFilter({ activeTag, onChange }) {
  return (
    <div className="mb-8 overflow-x-auto pb-2">
      <div className="flex gap-3">
        {TAGS.map((t) => {
          const selected = activeTag === t || (!activeTag && t === "all");
          return (
            <button
              key={t}
              onClick={() => onChange(t === "all" ? "" : t)}
              className={`px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                selected
                  ? "bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-soft"
                  : "bg-slate-900/70 text-slate-300 hover:bg-slate-800/90 hover:text-white"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
