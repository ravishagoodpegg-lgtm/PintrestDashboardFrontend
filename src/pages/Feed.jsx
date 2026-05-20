import { useEffect, useState } from "react";
import { getFeed } from "../services/pinService";
import PinCard from "../components/feed/PinCard";
import MasonryGrid from "../components/feed/MasonryGrid";
import TagFilter from "../components/feed/TagFilter";

export default function Feed() {
  const [pins, setPins] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    fetchPins();
  }, [tag]);

  const fetchPins = async () => {
    try {
      const { data } = await getFeed(tag);
      const normalizedPins = Array.isArray(data)
        ? data
        : data?.pins || data?.data || [];
      setPins(normalizedPins);
    } catch (err) {
      console.error("Failed to fetch pins", err);
      setPins([]);
    }
  };

  const updatePin = (updated) => {
    setPins((prev) =>
      Array.isArray(prev)
        ? prev.map((p) => (p._id === updated._id ? updated : p))
        : []
    );
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.2),_transparent_18%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.18),_transparent_20%)]" />
      <div className="relative px-6 pb-16 pt-10 max-w-7xl mx-auto">
        <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">
                Discover
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
                Curated inspiration for every mood.
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300">
                Browse trending boards, create your own visual ideas, and save
                the looks that spark your next project.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-950/90 px-5 py-4 text-sm text-slate-200 shadow-soft">
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              {tag ? `Filtering by ${tag}` : "Showing all categories"}
            </div>
          </div>
        </section>

        <TagFilter activeTag={tag} onChange={setTag} />

        <MasonryGrid>
          {pins.map((pin) => (
            <PinCard key={pin._id} pin={pin} onUpdate={updatePin} />
          ))}
        </MasonryGrid>

        {pins.length === 0 && (
          <div className="mt-24 rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-300">
            <p className="text-xl font-semibold text-white">
              No pins found yet.
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Create a pin to start filling this moodboard with stunning ideas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
