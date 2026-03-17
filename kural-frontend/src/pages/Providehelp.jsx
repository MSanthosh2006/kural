import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function ProvideHelp() {
  const nav = useNavigate();

  const [requests, setRequests] = useState([]);
  const prevCountRef = useRef(0);
  const [userLoc, setUserLoc] = useState(null);
  const [filter, setFilter] = useState("ALL");

  // 🔊 AUDIO REF (IMPORTANT)
  const audioRef = useRef(null);

  // 📍 Get location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => console.log("Location denied")
    );
  }, []);

  // 🔊 Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(
      "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
    );
  }, []);

  // 🔥 Initialize data (avoid first alert)
  useEffect(() => {
    axios.get("https://kural-1.onrender.com/requests").then((res) => {
      prevCountRef.current = res.data.length;
      setRequests(res.data);
    });
  }, []);

  // 🔄 Fetch + ALERT (FIXED)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://kural-1.onrender.com/requests");

        if (res.data.length > prevCountRef.current) {
          console.log("🚨 New Request");

          // 🔊 PLAY SOUND
          audioRef.current?.play().catch(() => {
            console.log("Sound blocked until interaction");
          });

          // 🔔 ALERT
          alert("🚨 New Help Request!");

          prevCountRef.current = res.data.length;
        }

        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  // 📏 Distance
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  // 🔥 FILTER
  let filteredRequests = [...requests];

  if (filter === "CRITICAL") {
    filteredRequests = filteredRequests.filter(
      (r) => r.priority === "Critical"
    );
  }

  if (filter === "NORMAL") {
    filteredRequests = filteredRequests.filter(
      (r) => r.priority === "Normal"
    );
  }

  if (filter === "APPROVED") {
    filteredRequests = filteredRequests.filter(
      (r) => r.status === "Accepted"
    );
  }

  // 🔥 SORT
  filteredRequests.sort((a, b) =>
    a.priority === "Critical" && b.priority !== "Critical" ? -1 : 1
  );

  // 🔁 Toggle Accept
  const handleToggle = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Accepted" ? "Pending" : "Accepted";

    try {
      await axios.put(
        `https://kural-1.onrender.com/request/${id}`,
        { status: newStatus }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center text-white">

      {/* 🔊 ENABLE SOUND BUTTON (IMPORTANT FIX) */}
      <button
        onClick={() => {
          audioRef.current?.play().catch(() => {});
          alert("🔊 Sound Enabled!");
        }}
        className="absolute top-4 right-4 bg-black px-3 py-1 rounded text-xs"
      >
        🔊 Enable Sound
      </button>

      {/* 🌄 BG */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1509099836639-18ba1795216d"
          className="w-full h-full object-cover blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 📦 CARD */}
      <div className="z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-6 w-[380px] shadow-2xl">

        {/* 🔙 BACK */}
        <button
          onClick={() => nav("/")}
          className="text-sm text-gray-300 mb-3"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold text-center mb-2">
          Available Requests
        </h2>

        <p className="text-center text-xs text-gray-300 mb-3">
          Showing: {filter}
        </p>

        {/* 🔥 FILTER */}
        <div className="flex gap-2 mb-3 text-sm justify-center">

          <button onClick={() => setFilter("ALL")}
            className={`px-3 py-1 rounded ${filter === "ALL" ? "bg-white text-black" : "bg-gray-500"}`}>
            All
          </button>

          <button onClick={() => setFilter("CRITICAL")}
            className={`px-3 py-1 rounded ${filter === "CRITICAL" ? "bg-red-600" : "bg-red-400"}`}>
            Critical
          </button>

          <button onClick={() => setFilter("NORMAL")}
            className={`px-3 py-1 rounded ${filter === "NORMAL" ? "bg-yellow-500 text-black" : "bg-yellow-300 text-black"}`}>
            Normal
          </button>

          <button onClick={() => setFilter("APPROVED")}
            className={`px-3 py-1 rounded ${filter === "APPROVED" ? "bg-green-600" : "bg-green-400"}`}>
            Approved
          </button>

        </div>

        {/* 🗺 MAP */}
        <button
          onClick={() => nav("/map")}
          className="bg-blue-500 w-full py-2 rounded mb-4"
        >
          🗺 View Map
        </button>

        {/* 📋 LIST */}
        <div className="flex flex-col gap-4 max-h-[420px] overflow-y-auto">

          {filteredRequests.length === 0 && (
            <p className="text-center text-gray-300">
              No requests found
            </p>
          )}

          {filteredRequests.map((r) => {
            let distanceText = "";

            if (userLoc && r.location.includes(",")) {
              const [lat, lon] = r.location.split(",").map(Number);
              const dist = getDistance(
                userLoc.lat,
                userLoc.lon,
                lat,
                lon
              );

              distanceText =
                dist < 1
                  ? "Very close 🚨"
                  : `${dist} km away`;
            }

            return (
              <div key={r.id} className="bg-white/20 rounded-xl p-4">

                <div className="flex justify-between">
                  <p className="font-semibold">{r.type}</p>

                  <span className={`text-xs px-2 py-1 rounded ${
                    r.priority === "Critical"
                      ? "bg-red-500"
                      : "bg-yellow-400 text-black"
                  }`}>
                    {r.priority}
                  </span>
                </div>

                <p className="text-sm">
                  📍 {r.location} • {distanceText}
                </p>

                <p>👥 {r.people}</p>
                <p>Status: {r.status}</p>

                {/* 🚐 VEHICLE */}
                {r.vehicle && (
                  <div className="mt-2 text-sm bg-blue-900/40 p-2 rounded">
                    🚐 <b>{r.vehicle.org}</b><br />
                    {r.vehicle.number}<br />
                    📞 {r.vehicle.phone}
                  </div>
                )}

                {/* 📞 CALL */}
                {r.vehicle && (
                  <button
                    onClick={() =>
                      window.location.href = `tel:${r.vehicle.phone}`
                    }
                    className="w-full mt-2 py-2 rounded bg-blue-500"
                  >
                    📞 Contact Vehicle
                  </button>
                )}

                {/* 🚗 NAVIGATE */}
                {r.status === "Accepted" && (
                  <button
                    onClick={() => {
                      const [lat, lon] = r.location.split(",").map(Number);
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
                        "_blank"
                      );
                    }}
                    className="w-full mt-2 py-2 rounded bg-purple-500"
                  >
                    🚗 Navigate
                  </button>
                )}

                {/* 🚐 TRACK */}
                {r.vehicle && (
                  <button
                    onClick={() => nav("/map", { state: { request: r } })}
                    className="w-full mt-2 py-2 rounded bg-indigo-500"
                  >
                    🚐 Track Vehicle
                  </button>
                )}

                {/* 🔁 ACCEPT */}
                <button
                  onClick={() => handleToggle(r.id, r.status)}
                  className={`w-full mt-2 py-2 rounded ${
                    r.status === "Accepted"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {r.status === "Accepted"
                    ? "Undo ❌"
                    : "Accept"}
                </button>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProvideHelp;
