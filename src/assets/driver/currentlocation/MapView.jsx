import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styles from "./MapView.module.css";

function MapView({ location }) {
  const [mapLocation, setMapLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [routeDetails, setRouteDetails] = useState(null);
  const [status, setStatus] = useState("Loading...");
  const [stopCoordinates, setStopCoordinates] = useState([]);
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

  useEffect(() => {
    fetchRouteDetails(driverId);
    fetchDriverStatus(driverId);
  }, [driverId]);

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

  const fetchRouteDetails = async (driverId) => {
    try {
      const response = await fetch(
        `https://localhost:7046/api/Route/GetRouteByDriver/${driverId}`
      );
      const data = await response.json();
      console.log("Route Details:", data); // Thêm log để kiểm tra dữ liệu
      setRouteDetails(data.result[0]);

      // Dùng geocoding để lấy tọa độ từ địa chỉ
      if (data.result[0]?.routeStops) {
        const stopsWithCoordinates = await Promise.all(
          data.result[0].routeStops.map(async (stop) => {
            const coordinates = await getCoordinatesFromAddress(stop.address);
            return {
              ...stop,
              latitude: coordinates.lat,
              longitude: coordinates.lon,
            };
          })
        );
        setStopCoordinates(stopsWithCoordinates);
      }
    } catch (error) {
      console.error("Error fetching route details: ", error);
    }
  };

  const fetchDriverStatus = async (driverId) => {
    try {
      const response = await fetch(
        `https://localhost:7046/api/DriverStatus/${driverId}`
      );
      const data = await response.json();
      setStatus(data.status || "Unavailable");
    } catch (error) {
      console.error("Error fetching driver status: ", error);
    }
  };

  // Hàm để lấy tọa độ từ địa chỉ (Sử dụng OpenStreetMap Nominatim API)
  const getCoordinatesFromAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
      }
      return { lat: null, lon: null };
    } catch (error) {
      console.error("Error geocoding address: ", error);
      return { lat: null, lon: null };
    }
  };

  if (mapLocation.latitude === null || mapLocation.longitude === null) {
    return <p>Loading location...</p>;
  }

  return (
    <div className={styles.container}>
      {/* Left Side: Information */}
      <div className={styles.infoTable}>
        <h2>Driver Information</h2>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Driver ID</th>
              <td>{driverId}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{status}</td>
            </tr>
            <tr>
              <th>Latitude</th>
              <td>{mapLocation.latitude}</td>
            </tr>
            <tr>
              <th>Longitude</th>
              <td>{mapLocation.longitude}</td>
            </tr>
          </tbody>
        </table>

        {routeDetails && (
          <>
            <h3>Route Details</h3>
            <p><strong>Route Notes:</strong> {routeDetails.notes}</p>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Stop Order</th>
                  <th>Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {routeDetails.routeStops.map((stop) => (
                  <tr key={stop.id}>
                    <td>{stop.stopOrder}</td>
                    <td>{stop.address}</td>
                    <td>{stop.routeStopStatus === 0 ? "Pending" : "Completed"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Right Side: Map */}
      <div className={styles.map}>
        <MapContainer
          center={[mapLocation.latitude, mapLocation.longitude]}
          zoom={15}
          style={{ height: "80vh", width: "100%" }}
          whenCreated={(map) => {
            map.invalidateSize();
            map.setView([mapLocation.latitude, mapLocation.longitude], 15);
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={[mapLocation.latitude, mapLocation.longitude]}>
            <Popup>Your Location</Popup>
          </Marker>

          {stopCoordinates.map((stop) =>
            stop.latitude && stop.longitude ? (
              <Marker key={stop.id} position={[stop.latitude, stop.longitude]}>
                <Popup>
                  <strong>Stop Order:</strong> {stop.stopOrder}<br />
                  <strong>Address:</strong> {stop.address}<br />
                  <strong>Status:</strong> {stop.routeStopStatus === 0 ? "Pending" : "Completed"}
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;
