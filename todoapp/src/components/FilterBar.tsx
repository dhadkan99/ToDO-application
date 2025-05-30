export default function FilterBar() {
    const filters = ["All", "Active", "Today", "Upcoming", "Completed"];
    return (
      <div className="flex gap-4 justify-center mt-6 text-white/80">
        {filters.map((filter) => (
          <button
            key={filter}
            className="px-3 py-1 bg-white/10 rounded-lg text-sm"
          >
            {filter} <span className="opacity-50">0</span>
          </button>
        ))}
      </div>
    );
  }
  