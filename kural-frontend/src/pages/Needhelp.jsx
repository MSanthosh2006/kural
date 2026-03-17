import { useNavigate } from "react-router-dom";
import { useState } from "react";

function NeedHelp() {
  const nav = useNavigate();
  const [people, setPeople] = useState(1);

  const handleEmergency = () => {
    const message = `🚨 CRITICAL HELP | People: ${people} | Location: auto`;
    console.log(message);
    alert("🚨 Help is on the way. Stay calm.");
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
          onClick={() => nav("/")}
          className="text-sm text-gray-300 mb-3"
        >
          ← Back
        </button>

        {/* 🚨 CRITICAL */}
        <div className="mb-8">

          <h2 className="text-2xl font-bold mb-3 text-red-300">
            Emergency
          </h2>

          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-white/20 text-center outline-none"
            placeholder="Number of people"
          />

          <button
            onClick={handleEmergency}
            className="bg-red-500 hover:bg-red-600 w-full py-4 rounded-xl font-semibold text-lg shadow-md transition"
          >
            🚨 Send Emergency Alert
          </button>

        </div>

        {/* 🟩 NORMAL */}
        <h3 className="text-lg font-semibold mb-4 text-gray-200">
          Normal Request
        </h3>

        <div className="flex flex-col gap-4">

          <button
            onClick={() => nav("/need-help/Medical")}
            className="py-4 rounded-xl font-medium bg-red-400/80 hover:bg-red-400 transition"
          >
            🏥 Medical 
          </button>

          <button
            onClick={() => nav("/need-help/Food")}
            className="py-4 rounded-xl font-medium bg-yellow-400/80 text-black hover:bg-yellow-400 transition"
          >
            🍚 Food 
          </button>

          <button
            onClick={() => nav("/need-help/Shelter")}
            className="py-4 rounded-xl font-medium bg-green-400/80 hover:bg-green-400 transition"
          >
            🏠 Shelter
          </button>

        </div>

      </div>
    </div>
  );
}

export default NeedHelp;