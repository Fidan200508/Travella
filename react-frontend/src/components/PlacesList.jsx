export default function PlacesList({ places, tripList, addToTrip }) {
  //if nothing to show
  if (!places || places.length === 0) {
    return <p>Places will appear here</p>;
  }

  const isInTrip = (id) => tripList.some((p) => p.id === id);

  return (
    <div className="places-list">
      {places.map((place) => {
        const added = isInTrip(place.id);

        return (
          <div
            key={place.id}
            className={`place-card ${added ? "added" : ""}`}
            onClick={() => {
              if (!added) addToTrip(place);
            }}
          >
            {place.image && (
              <img
                src={place.image}
                alt={place.name}
                className="place-image"
              />
            )}

            <div className="place-text">
              <div className="place-header">
                <h4>{place.name}</h4>
                <span className="place-category">{place.category}</span>
              </div>

              <small>{place.description}</small>

              <div className="place-footer">
                <span className="place-price">${place.price}</span>

                <button className="add-trip-btn" onClick={() => addToTrip(place)}>
                    Add to trip
                </button>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
