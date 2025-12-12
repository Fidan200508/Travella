export default function Filters({
  filterCategory,
  setFilterCategory,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy
}) {
  const categories = ["All", "Museum", "Restaurant", "Park", "Landmark", "Shopping"];

  return (
    <div className="filters">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search places..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Category buttons */}
      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={filterCategory === cat ? "active" : ""}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="price-low">Price: Low → High</option>
        <option value="price-high">Price: High → Low</option>
      </select>
    </div>
  );
}
