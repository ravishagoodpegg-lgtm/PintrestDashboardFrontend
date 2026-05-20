import { useEffect, useState } from 'react';
import { getFeed } from '../services/pinService';
import PinCard from '../components/feed/PinCard';
import MasonryGrid from '../components/feed/MasonryGrid';
import TagFilter from '../components/feed/TagFilter';

export default function Feed() {
  const [pins, setPins] = useState([]);
  const [tag, setTag] = useState('');

  useEffect(() => {
    fetchPins();
  }, [tag]);

  const fetchPins = async () => {
    try {
      const { data } = await getFeed(tag);
      setPins(data);
    } catch (err) {
      console.error('Failed to fetch pins', err);
    }
  };

  const updatePin = (updated) => {
    setPins(prev => prev.map(p => p._id === updated._id ? updated : p));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <TagFilter activeTag={tag} onChange={setTag} />
      <MasonryGrid>
        {pins.map(pin => (
          <PinCard key={pin._id} pin={pin} onUpdate={updatePin} />
        ))}
      </MasonryGrid>
      {pins.length === 0 && (
        <p className="text-center text-gray-400 mt-20">No pins found. Be the first to create one!</p>
      )}
    </div>
  );
}