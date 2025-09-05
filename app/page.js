"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [startups, setStartups] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all form submissions from the API
  useEffect(() => {
    async function fetchStartups() {
      try {
        const res = await fetch("/api/get-submissions");
        const data = await res.json();
        if (res.ok) {
          setStartups(data);
        } else {
          console.error("Failed to fetch submissions:", data.error);
        }
      } catch (err) {
        console.error("Error fetching startups:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStartups();
  }, []);

  // Filter startups based on search query
  const filteredStartups = startups.filter((startup) =>
    startup.name.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700">
      <h1 className="text-3xl md:text-5xl font-bold text-yellow-400 drop-shadow-lg text-center">
        Welcome to StartupIdeas Website ✨
      </h1>
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-10">
      {/* Search bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search Startup Ideas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border-2 border-orange-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredStartups.map((startup) => (
          <motion.div
            key={startup._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/70 backdrop-blur-lg border-2 border-transparent hover:border-orange-500 shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300"
          >
            <div className="w-full h-48 relative rounded-t-xl overflow-hidden">
              <Image
                src={startup.imageUrl}
                alt={startup.name}
                fill
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 50vw,
                       33vw"
                className="object-cover"
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-orange-600">
              {startup.name}
            </h2>
            <p className="text-gray-700 text-sm">{startup.description}</p>
            <Link
              href={startup.website}
              target="_blank"
              className="mt-4 px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
            >
              View
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredStartups.length === 0 && !loading && (
         <p className="text-center text-gray-400 mt-10">
          No startup ideas found for &quot;{query}&quot;
        </p>
      )}
    </div>
  );
}
