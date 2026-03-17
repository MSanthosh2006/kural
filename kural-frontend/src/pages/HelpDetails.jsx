import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function HelpDetails() {
  const { type } = useParams();
  const nav = useNavigate();

  const [people, setPeople] = useState(1);
  const [notes, setNotes] = useState("");

  const handleSend = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const newRequest = {
          type,
          people: Number(people),
          location: `${lat}, ${lon}`,
          priority: type === "Medical" ? "Critical" : "Normal",
          distance: "Nearby",
        };

        try {
          // ✅ FIXED PORT HERE
          const res = await axios.post(
            "http://localhost:5001/request",
            newRequest
          );

          console.log("✅ Backend response:", res.data);

          alert("✅ Request saved successfully!");

          // 📩 Optional SMS log
          console.log(
            "📩 SMS:",
            `HELP ${type} | People: ${people} | Location: https://maps.google.com/?q=${lat},${lon}`
          );

          // 🔙 Navigate after success
          setTimeout(() => {
          }, 500);

        } catch (err) {
          console.error("❌ FULL ERROR:", err);
          console.error("❌ RESPONSE:", err?.response);

          alert("❌ Failed to send request");
        }
      },
      (err) => {
        console.error("❌ Location error:", err);
        alert("Location access denied");
      }
    );
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center text-white">

      {/* 🌄 BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1509099836639-18ba1795216d"
          alt="bg"
          className="w-full h-full object-cover blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* 📦 CARD */}
      <div className="z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-[380px] shadow-2xl text-center">

        {/* 🔙 BACK */}
        <button
          onClick={() => nav("/need-help")}
          className="text-sm text-gray-300 mb-3"
        >
          ← Back
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-5">
          {type} Request
        </h2>

        {/* PEOPLE */}
        <div className="mb-4">
          <p className="text-sm text-gray-300 mb-1">
            Number of People
          </p>
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-center outline-none"
          />
        </div>

        {/* NOTES */}
        <div className="mb-4">
          <p className="text-sm text-gray-300 mb-1">
            Additional Notes (optional)
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 outline-none"
            placeholder="e.g. elderly, urgent medicine..."
          />
        </div>

        {/* SEND */}
        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-600 w-full py-4 rounded-xl font-semibold text-lg transition"
        >
          Send Request
        </button>

      </div>
    </div>
  );
}

export default HelpDetails;