
export default function Steps({sortOrder, setSortOrder}) {
  
  return (
    <div className="sort-dropdown">
      Sort by:
      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option >Default</option>
      <option value="asc">Ascending</option>
        <option value="desc"> Descending</option>
      </select>
    </div>
  );
}


