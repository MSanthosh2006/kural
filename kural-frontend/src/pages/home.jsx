import { useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center text-white">

      {/* 🌄 BETTER BACKGROUND (people + hope vibe) */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1509099836639-18ba1795216d"
          alt="bg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* 🔝 TITLE (moved UP) */}
      <div className="z-10 absolute top-20 text-center px-4">
        <h1 className="text-6xl md:text-7xl font-bold tracking-wider">
          KURAL
        </h1>
        <p className="text-lg mt-2 text-gray-200">
          Community Driven Resilience App
        </p>
      </div>

      {/* 📦 BUTTON BOX */}
      <div className="z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-[320px] shadow-xl">

        <div className="flex flex-col gap-5">

          <button
            onClick={() => nav("/need-help")}
            className="bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-4 rounded-xl shadow-md transition transform active:scale-95"
          >
            🚨 I Need Help
          </button>

          <button
            onClick={() => nav("/provide-help")}
            className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-4 rounded-xl shadow-md transition transform active:scale-95"
          >
            🤝 I Provide Help
          </button>

        </div>
      </div>

      {/* 🔻 FOOTER (corner) */}
      <p className="z-10 absolute bottom-4 right-6 text-xs text-gray-300">
        KURAL 2026
      </p>

    </div>
  );
}

export default Home;