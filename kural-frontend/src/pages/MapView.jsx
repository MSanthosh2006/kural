import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import { useNavigate, useLocation } from "react-router-dom";

// 🔴 Critical
const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

// 🟡 Normal
const yellowIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  iconSize: [32, 32],
});

// 🔵 Vehicle
const vehicleIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
});

function MapView() {
  const nav = useNavigate();
  const location = useLocation();

  const selectedRequest = location.state?.request;

  const [vehiclePos, setVehiclePos] = useState(null);

  // 🚐 FAKE LIVE TRACKING
  useEffect(() => {
    if (!selectedRequest) return;

    if (!selectedRequest.location.includes(",")) return;

    const [targetLat, targetLon] = selectedRequest.location
      .split(",")
      .map(Number);

    let lat = targetLat - 0.01;
    let lon = targetLon - 0.01;

    const interval = setInterval(() => {
      lat += 0.0005;
      lon += 0.0005;

      setVehiclePos([lat, lon]);

      if (Math.abs(lat - targetLat) < 0.001) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedRequest]);

  return (
    <div className="h-screen w-full relative">

      {/* 🔙 BACK */}
      <div className="absolute top-4 left-4 z-[1000]">
        <button
          onClick={() => nav("/provide-help")}
          className="bg-white px-4 py-2 rounded shadow"
        >
          ← Back
        </button>
      </div>

      <MapContainer
        center={[11.077, 77.142]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 📍 SELECTED REQUEST ONLY */}
        {selectedRequest && selectedRequest.location.includes(",") && (() => {
          const [lat, lon] = selectedRequest.location.split(",").map(Number);

          return (
            <Marker
              position={[lat, lon]}
              icon={
                selectedRequest.priority === "Critical"
                  ? redIcon
                  : yellowIcon
              }
            >
              <Popup>
                <b>{selectedRequest.type}</b><br />
                👥 {selectedRequest.people}<br />
                ⚠️ {selectedRequest.priority}
              </Popup>
            </Marker>
          );
        })()}

        {/* 🚐 MOVING VEHICLE */}
        {vehiclePos && (
          <Marker position={vehiclePos} icon={vehicleIcon}>
            <Popup>🚐 Vehicle Moving...</Popup>
          </Marker>
        )}

      </MapContainer>
    </div>
  );
}

export default MapView;