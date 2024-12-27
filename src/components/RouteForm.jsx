import { useState } from 'react';

function RouteForm({ onSubmit }) {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);

  const handlePlaceSearch = async (input, setSuggestions) => {
    if (!input || !window.google) {
      setSuggestions([]);
      return;
    }

    try {
      const autocompleteService = new window.google.maps.places.AutocompleteService();
      const results = await autocompleteService.getPlacePredictions({
        input,
        types: ['geocode'],
        componentRestrictions: { country: 'TR' }
      });
      
      setSuggestions(results.predictions || []);
    } catch (error) {
      console.error('Error fetching place suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(startPoint, endPoint);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Starting Point"
            value={startPoint}
            onChange={(e) => {
              setStartPoint(e.target.value);
              handlePlaceSearch(e.target.value, setStartSuggestions);
            }}
            className="p-2 border rounded w-full"
          />
          {startSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded-b shadow-lg max-h-60 overflow-y-auto">
              {startSuggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setStartPoint(suggestion.description);
                    setStartSuggestions([]);
                  }}
                >
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Destination"
            value={endPoint}
            onChange={(e) => {
              setEndPoint(e.target.value);
              handlePlaceSearch(e.target.value, setEndSuggestions);
            }}
            className="p-2 border rounded w-full"
          />
          {endSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded-b shadow-lg max-h-60 overflow-y-auto">
              {endSuggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setEndPoint(suggestion.description);
                    setEndSuggestions([]);
                  }}
                >
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Yol Durumunu Kontrol Et
        </button>
      </div>
    </form>
  );
}

export default RouteForm;