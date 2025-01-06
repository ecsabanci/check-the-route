import { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
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
            placeholder="Başlangıç Noktası"
            value={startPoint}
            onChange={(e) => {
              setStartPoint(e.target.value);
              handlePlaceSearch(e.target.value, setStartSuggestions);
            }}
            className="p-2 border dark:border-emerald-900 rounded w-full dark:bg-gray-900 outline-none"
          />
          {startSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded-b shadow-lg max-h-60 overflow-y-auto dark:bg-gray-700">
              {startSuggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="p-2 cursor-pointer dark:hover:bg-gray-600"
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
            placeholder="Bitiş Noktası"
            value={endPoint}
            onChange={(e) => {
              setEndPoint(e.target.value);
              handlePlaceSearch(e.target.value, setEndSuggestions);
            }}
            className="p-2 border dark:border-emerald-900 rounded w-full dark:bg-gray-900 outline-none"
          />
          {endSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded-b shadow-lg max-h-60 overflow-y-auto dark:bg-gray-700">
              {endSuggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="p-2 cursor-pointer dark:hover:bg-gray-600"
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
          className="bg-blue-500 text-white p-2 rounded bg-emerald-600 flex items-center justify-center group"
        >
          Yol Durumunu Kontrol Et
          <ArrowRightIcon className="h-4 w-4 text-white ml-2 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}

export default RouteForm;