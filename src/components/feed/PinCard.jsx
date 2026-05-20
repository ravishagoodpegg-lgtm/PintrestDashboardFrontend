import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toggleLike } from '../../services/pinService';

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
    <div
      className="relative mb-4 break-inside-avoid rounded-2xl overflow-hidden cursor-zoom-in"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={pin.imageUrl} alt={pin.title} className="w-full rounded-2xl block" loading="lazy" />
      
      {hovered && user && (
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4 rounded-2xl">
          <div className="flex justify-end">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full backdrop-blur-sm text-white text-sm font-bold flex items-center gap-1 transition ${
                liked ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              ♥ {pin.likes?.length || 0}
            </button>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">{pin.title}</p>
            <p className="text-white/80 text-xs mt-1">{pin.userId?.name || 'Unknown'}</p>
          </div>
        </div>
      )}
    </div>
  );
}