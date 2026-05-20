import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { getStats } from '../services/pinService';
import { getBoards, createBoard } from '../services/boardService';

export default function Profile() {
  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [boards, setBoards] = useState([]);
  const [boardForm, setBoardForm] = useState({ title: '', coverImage: '', isPrivate: false });
  const [creatingBoard, setCreatingBoard] = useState(false);

  useEffect(() => {
    getStats().then(res => setStats(res.data));
    getBoards().then(res => setBoards(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-white">Your Profile</h1>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-white">{stats.totalPins}</p>
            <p className="text-sm text-slate-300">Pins Created</p>
          </div>
          <div className="glass p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-white">{stats.totalLikes}</p>
            <p className="text-sm text-slate-300">Total Likes</p>
          </div>
          <div className="glass p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-white">{stats.totalSaves}</p>
            <p className="text-sm text-slate-300">Total Saves</p>
          </div>
        </div>
      )}

      <div className="mb-8 p-6 glass rounded-2xl border border-white/6">
        <h2 className="text-lg font-semibold mb-4 text-white">Create New Board</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!boardForm.title.trim()) return;
            setCreatingBoard(true);
            try {
              await createBoard(boardForm);
              setBoardForm({ title: '', coverImage: '', isPrivate: false });
              const res = await getBoards();
              setBoards(Array.isArray(res.data) ? res.data : res.data?.boards || []);
            } catch (err) {
              alert(err.response?.data?.message || 'Failed to create board');
            } finally {
              setCreatingBoard(false);
            }
          }}
          className="space-y-4"
        >
          <Input
            label="Board title"
            placeholder="e.g. Interior design"
            value={boardForm.title}
            onChange={e => setBoardForm({ ...boardForm, title: e.target.value })}
            required
          />
          <Input
            label="Cover image URL"
            placeholder="https://images.unsplash.com/your-cover-image"
            value={boardForm.coverImage}
            onChange={e => setBoardForm({ ...boardForm, coverImage: e.target.value })}
          />
          <div className="flex items-center gap-3">
            <input
              id="isPrivate"
              type="checkbox"
              checked={boardForm.isPrivate}
              onChange={e => setBoardForm({ ...boardForm, isPrivate: e.target.checked })}
              className="h-4 w-4 text-cyan-400 border-gray-600 rounded"
            />
            <label htmlFor="isPrivate" className="text-sm text-slate-300">
              Private board
            </label>
          </div>
          <Button type="submit" disabled={creatingBoard} className="w-full">
            {creatingBoard ? 'Creating board...' : 'Create Board'}
          </Button>
        </form>
      </div>

      <h2 className="text-lg font-semibold mb-4 text-white">Your Boards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {boards.map(board => (
          <Link
            key={board._id}
            to={`/board/${board._id}`}
            className="relative block rounded-2xl overflow-hidden h-44 shadow-soft transition-transform hover:-translate-y-1"
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: board.coverImage ? `url(${board.coverImage})` : 'linear-gradient(135deg,#0f172a,#4c1d95)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
              <div>
                <p className="text-white font-semibold text-lg drop-shadow">{board.title}</p>
                <p className="text-sm text-slate-200/80">{board.isPrivate ? 'Private' : 'Public'}</p>
              </div>
            </div>
          </Link>
        ))}
        {boards.length === 0 && <p className="text-slate-300 col-span-full">No boards yet.</p>}
      </div>
    </div>
  );
}