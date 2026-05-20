import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Heart } from "lucide-react";
import { toggleLike } from "../../services/pinService";

export default function PinCard({ pin, onUpdate }) {
  const { user } = useAuth();
  const [hovered, setHovered] = useState(false);

  const liked = pin.likes?.includes(user?._id);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) return;
    try {
      const { data } = await toggleLike(pin._id);
      onUpdate(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className="relative mb-6 break-inside-avoid rounded-[2rem] overflow-hidden shadow-soft transition-shadow duration-300 hover:shadow-floating"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={pin.imageUrl}
        alt={pin.title}
        className="w-full rounded-[2rem] block object-cover"
        loading="lazy"
      />

      <div className="absolute inset-x-0 bottom-0 rounded-b-[2rem] bg-gradient-to-t from-slate-950/90 to-transparent p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">{pin.title}</p>
            <p className="mt-1 text-xs text-slate-300">
              {pin.userId?.name || "Unknown"}
            </p>
          </div>
          <button
            onClick={handleLike}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${
              liked
                ? "bg-red-500 text-white shadow-soft"
                : "bg-white/10 text-slate-100 hover:bg-white/20"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${liked ? "text-white" : "text-slate-100"}`}
            />
            {pin.likes?.length || 0}
          </button>
        </div>
      </div>

      {hovered && user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-[2rem] bg-black/20"
        />
      )}
    </motion.div>
  );
}
