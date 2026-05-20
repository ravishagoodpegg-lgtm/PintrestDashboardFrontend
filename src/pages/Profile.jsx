import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStats } from '../services/pinService';
import { getBoards } from '../services/boardService';

export default function Profile() {
  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getStats().then(res => setStats(res.data));
    getBoards().then(res => setBoards(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold">{stats.totalPins}</p>
            <p className="text-sm text-gray-500">Pins Created</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold">{stats.totalLikes}</p>
            <p className="text-sm text-gray-500">Total Likes</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold">{stats.totalSaves}</p>
            <p className="text-sm text-gray-500">Total Saves</p>
          </div>
        </div>
      )}

      <h2 className="text-lg font-bold mb-4">Your Boards</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {boards.map(board => (
          <div key={board._id} className="bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition cursor-pointer">
            <p className="font-semibold">{board.title}</p>
            <p className="text-sm text-gray-500">{board.isPrivate ? 'Private' : 'Public'}</p>
          </div>
        ))}
        {boards.length === 0 && <p className="text-gray-400 col-span-full">No boards yet.</p>}
      </div>
    </div>
  );
}