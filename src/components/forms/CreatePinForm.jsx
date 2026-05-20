import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { getBoards } from '../../services/boardService';
import { createPin } from '../../services/pinService';

export default function CreatePinForm() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    imageUrl: '',
    title: '',
    description: '',
    tags: '',
    boardId: ''
  });

  useEffect(() => {
    getBoards().then(res => setBoards(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPin({
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
      });
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create pin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Image URL"
        placeholder="https://images.unsplash.com/..."
        value={form.imageUrl}
        onChange={e => setForm({ ...form, imageUrl: e.target.value })}
        required
      />
      <Input
        label="Title"
        placeholder="Minimal kitchen design"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        required
      />
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
        <textarea
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20"
          rows={3}
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <Input
        label="Tags"
        placeholder="minimal, interior, beige"
        value={form.tags}
        onChange={e => setForm({ ...form, tags: e.target.value })}
      />
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Board</label>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
          value={form.boardId}
          onChange={e => setForm({ ...form, boardId: e.target.value })}
          required
        >
          <option value="">Select a board</option>
          {boards.map(b => (
            <option key={b._id} value={b._id}>{b.title}</option>
          ))}
        </select>
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating...' : 'Create Pin'}
      </Button>
    </form>
  );
}