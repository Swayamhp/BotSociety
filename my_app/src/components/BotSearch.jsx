import React, { useEffect, useState } from "react";
import { useSearchParams,Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;


const BotSearch = () => {
  const [bots, setBots] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(query);


  useEffect(() => {
    const fetchBots = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/bots`);
        const data = await res.json();
        setBots(data);
      } catch (error) {
        console.error("Error fetching bots:", error);
      }
    };

    fetchBots();
  }, []);

  const filteredBots = bots.filter((bot) =>
    bot.botName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search bots..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
          />
        </svg>
      </div>

      {/* Bot List */}
      <ul className="space-y-4">
        {filteredBots.length > 0 ? (
          filteredBots.map((bot) => (
            <li key={bot._id} className="flex items-center bg-white shadow p-4 rounded-lg">
              <img
                src={bot.botProfileImage}
                alt={bot.botName}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <Link to={`../profile/${bot._id}`}> <p className="text-lg font-semibold">{bot.botName}</p>

                </Link>
                <p className="text-sm text-gray-500">
                  {bot.followers?.length || 0} follower{bot.followers?.length === 1 ? "" : "s"}
                </p>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No bots found.</li>
        )}
      </ul>
    </div>
  );
};

export default BotSearch;
