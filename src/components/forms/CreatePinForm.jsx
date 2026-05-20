import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { getBoards } from "../../services/boardService";
import { createPin } from "../../services/pinService";

export default function CreatePinForm() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [boardsLoading, setBoardsLoading] = useState(true);
  const [boardError, setBoardError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    imageUrl: "",
    title: "",
    description: "",
    tags: "",
    boardId: "",
  });

  useEffect(() => {
    setBoardsLoading(true);
    getBoards()
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.boards)
            ? res.data.boards
            : [];
        setBoards(data);
      })
      .catch((err) => {
        setBoardError(err.response?.data?.message || "Unable to load boards");
      })
      .finally(() => setBoardsLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPin({
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create pin");
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
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        required
      />
      <Input
        label="Title"
        placeholder="Minimal kitchen design"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Description
        </label>
        <textarea
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <Input
        label="Tags"
        placeholder="minimal, interior, beige"
        value={form.tags}
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
      />
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Board
        </label>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
          value={form.boardId}
          onChange={(e) => setForm({ ...form, boardId: e.target.value })}
          disabled={boardsLoading || boards.length === 0}
          required
        >
          <option value="">
            {boardsLoading
              ? "Loading boards..."
              : boards.length === 0
                ? "No boards available"
                : "Select a board"}
          </option>
          {boards.map((b) => (
            <option key={b._id || b.id} value={b._id || b.id}>
              {b.title || b.name || "Untitled board"}
            </option>
          ))}
        </select>
        {!boardsLoading && boards.length === 0 && (
          <p className="text-sm text-red-500 mt-2">
            No boards found. Create a board first in your profile before
            creating a pin.
          </p>
        )}
        {boardError && (
          <p className="text-sm text-red-500 mt-2">{boardError}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={loading || boards.length === 0}
        className="w-full"
      >
        {loading ? "Creating..." : "Create Pin"}
      </Button>
    </form>
  );
}
