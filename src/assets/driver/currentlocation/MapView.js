import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Route from "../route/Route";

function MapView({ location }) {
  const [mapLocation, setMapLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const driverId = localStorage.getItem("driverId");

  useEffect(() => {
    if (
      location &&
      typeof location.latitude === "number" &&
      typeof location.longitude === "number"
    ) {
      setMapLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      updateDriverLocation(driverId, location.latitude, location.longitude);
    }
  }, [location, driverId]);

  const updateDriverLocation = async (driverId, latitude, longitude) => {
    try {
      const response = await fetch(
        `https://localhost:7046/api/Location/${driverId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            DriverId: driverId,
            Latitude: latitude,
            Longitude: longitude,
          }),
        }
      );

      if (!response.ok) {
        console.error(
          "Failed to update driver location: ",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error updating driver location: ", error);
    }
  };

  if (mapLocation.latitude === null || mapLocation.longitude === null) {
    return <p>Loading location...</p>;
  }

  return (
    <div>
      <MapContainer
        center={[mapLocation.latitude, mapLocation.longitude]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        whenCreated={(map) => {
          map.invalidateSize();
          map.setView([mapLocation.latitude, mapLocation.longitude], 13);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={[mapLocation.latitude, mapLocation.longitude]}>
          <Popup>Your Location</Popup>
        </Marker>
      </MapContainer>

      <Route driverId={driverId} />
    </div>
  );
}

export default MapView;