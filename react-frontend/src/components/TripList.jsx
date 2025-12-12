export default function TripList({ tripList, removeFromTrip, totalCost }) {
  //If trip list is empty or not provided, show a placeholder message
  if (!tripList || tripList.length === 0) {
    return <p>Trips will appear here</p>;
  }

  return (
    <div className="trip-panel">
      <h3>Your Trip</h3>

      <ul className="trip-list-items">
        {tripList.map((place) => (
          <li key={place.id} className="trip-item">
            <div className="trip-item-main">
              <span className="trip-item-name">{place.name}</span>
              <span className="trip-item-price">${place.price}</span>
            </div>

            <small className="trip-item-city">{place.category}</small>

            <button
              className="trip-remove"
              onClick={() => removeFromTrip(place.id)}
            >
              ✕ Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="trip-total">
        <span>Total cost:</span>
        <strong>${totalCost}</strong>
      </div>
    </div>
  );
}
