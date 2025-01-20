const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <h2>Find Countries</h2>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Type to search"
      />
    </div>
  );
};

export default Filter;
