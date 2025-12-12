import { useEffect, useState } from "react";

export default function Modal({
  setIsModalOpen,
  tripList,
  setTripList,
  cities,
  selectedCity,
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Restaurant");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState(selectedCity || "");
  const [error, setError] = useState("");

  useEffect(() => {
    // Keep city in sync with parent selection
    setCity((prev) => (prev ? prev : selectedCity || ""));
  }, [selectedCity]);

  const addCustomPlace = () => {
    if (!name || price === "" || !city) {
      setError("Please fill name, price, and select a city.");
      return;
    }

    setError("");

    //Update trip list by adding a new custom place
    setTripList([
      ...tripList,
      {
        id: Date.now(),//Generate a unique id using timestamp
        name,
        category,
        price: Number(price),
        description: "Custom place",
        city,
      },
    ]);
    //Close the modal after adding the place
    setIsModalOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Add Custom Place</h2>

        {error && <p style={{ color: "salmon" }}>{error}</p>}

        <label>City</label>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select a city</option>
          {cities?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label>Place Name</label>
        <input
          type="text"
          placeholder="e.g. Local Restaurant"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Restaurant</option>
          <option>Museum</option>
          <option>Park</option>
          <option>Landmark</option>
          <option>Shopping</option>
        </select>

        <label>Price ($)</label>
        <input
          type="number"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="primary-btn" onClick={addCustomPlace}>
          Add to Trip
        </button>

        <button
          className="secondary-btn"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
