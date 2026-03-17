const express = require("express");
const cors = require("cors");

const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());

// 🗄️ storage
let requests = [];

// 🚐 VEHICLE LIST (🔥 ADD THIS)
const vehicles = [
  { number: "TN 38 AB 1234", phone: "9876543210", org: "Red Cross" },
  { number: "TN 38 XY 5678", phone: "9123456780", org: "Relief NGO" },
  { number: "TN 38 CD 9012", phone: "9012345678", org: "Gov Rescue" }
];

// 🟢 ADD REQUEST
app.post("/request", (req, res) => {

  // 🔥 PICK RANDOM VEHICLE
  const randomVehicle =
    vehicles[Math.floor(Math.random() * vehicles.length)];

  const newRequest = {
    id: Date.now(),
    ...req.body,
    status: "Pending",
    vehicle: randomVehicle // 🚐 ADD THIS
  };

  requests.push(newRequest);

  console.log("✅ Added:", newRequest);

  // 🔥 SIMULATED SMS
  const message = `HELP ${newRequest.type} | People: ${newRequest.people} | Location: ${newRequest.location}`;
  console.log("📩 SMS (SIMULATED):", message);

  // 🚐 LOG VEHICLE
  console.log("🚐 Assigned Vehicle:", randomVehicle);

  res.status(200).json(newRequest);
});

// 🔵 GET ALL
app.get("/requests", (req, res) => {
  res.status(200).json(requests);
});

// 🟡 UPDATE STATUS
app.put("/request/:id", (req, res) => {
  const id = Number(req.params.id);

  requests = requests.map((r) =>
    r.id === id ? { ...r, status: req.body.status } : r
  );

  console.log("🔄 Updated:", id);

  res.status(200).json({ message: "Updated" });
});

// 🚀 START
app.listen(5001, () => {
  console.log("🚀 Server running on http://localhost:5001");
});