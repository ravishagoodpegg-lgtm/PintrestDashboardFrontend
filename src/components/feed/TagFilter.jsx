const TAGS = ['all', 'minimal', 'nature', 'interior', 'fashion', 'food'];

export default function TagFilter({ activeTag, onChange }) {
  return (
    <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
      {TAGS.map(t => (
        <button
          key={t}
          onClick={() => onChange(t === 'all' ? '' : t)}
          className={`px-4 py-2 rounded-full capitalize whitespace-nowrap text-sm font-medium transition ${
            activeTag === t || (!activeTag && t === 'all')
              ? 'bg-black text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}