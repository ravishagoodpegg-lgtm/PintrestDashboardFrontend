import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Plus, Sparkles } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-slate-950/80 px-6 py-4 shadow-soft">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 text-white">
          <div className="grid h-11 w-11 place-items-center rounded-3xl bg-linear-to-br from-violet-500 to-cyan-400 shadow-floating">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
              MoodBoard
            </p>
            <p className="text-xl font-semibold tracking-tight">
              Inspire the next idea
            </p>
          </div>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          {user ? (
            <>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-soft transition hover:-translate-y-0.5 hover:shadow-floating"
              >
                <Plus size={16} />
                Create
              </Link>
              <Link
                to={`/profile/${user._id}`}
                className="text-sm font-medium text-slate-100 hover:text-white"
              >
                {user.name}
              </Link>
              <button
                onClick={logout}
                className="text-sm text-slate-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-100 hover:text-white"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-soft transition hover:-translate-y-0.5 hover:shadow-floating"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
