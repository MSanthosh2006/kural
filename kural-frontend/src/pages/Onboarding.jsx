import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Onboarding() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleStart = () => {
    if (!name || !phone || !email || !role) {
      alert("⚠️ Please fill all details");
      return;
    }

    // 💾 Save user info
    localStorage.setItem(
      "user",
      JSON.stringify({ name, phone, email, role })
    );

    // 🚀 Navigate
    if (role === "Public") nav("/need-help");
    else nav("/provide-help");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white relative">

      {/* 🌄 BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1509099836639-18ba1795216d"
          className="w-full h-full object-cover blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 📦 CARD */}
      <div className="z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-[350px] shadow-2xl text-center">

        <h2 className="text-2xl font-bold mb-6">Welcome to KURAL</h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-3 rounded-lg text-black outline-none"
        />

        {/* PHONE */}
        <input
          type="number"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-3 p-3 rounded-lg text-black outline-none"
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-5 p-3 rounded-lg text-black outline-none"
        />

        {/* ROLE */}
        <p className="mb-2 text-gray-300">Who are you?</p>

        <div className="flex flex-col gap-2 mb-5">

          <button
            onClick={() => setRole("Public")}
            className={`py-2 rounded ${
              role === "Public" ? "bg-red-500" : "bg-gray-500"
            }`}
          >
            👤 Public
          </button>

          <button
            onClick={() => setRole("Volunteer")}
            className={`py-2 rounded ${
              role === "Volunteer" ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            🤝 Volunteer
          </button>

          <button
            onClick={() => setRole("NGO")}
            className={`py-2 rounded ${
              role === "NGO" ? "bg-blue-500" : "bg-gray-500"
            }`}
          >
            🏢 NGO
          </button>

        </div>

        {/* START */}
        <button
          onClick={handleStart}
          className="bg-white text-black w-full py-3 rounded-xl font-semibold"
        >
          Start
        </button>

      </div>
    </div>
  );
}

export default Onboarding;