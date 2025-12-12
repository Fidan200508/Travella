export default function CitySelector({ cities, selectedCity, setSelectedCity, loading }) {
  if (loading) return <p>Loading cities...</p>;
  if (!cities || cities.length === 0) return <p>No cities found.</p>;

  return (
    <div id="city-buttons">
      {cities.map((city) => (
        <button
          key={city}
          className={selectedCity === city ? "active" : ""}
          onClick={() => setSelectedCity(city)}
        >
          {city}
        </button>
      ))}
    </div>
  );
}
