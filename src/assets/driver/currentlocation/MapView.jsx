import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import styles from "./MapView.module.css";
import { Modal, Input } from "antd";

function MapView({ location }) {
  const [mapLocation, setMapLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [routeDetails, setRouteDetails] = useState(null);
  const [status, setStatus] = useState("Loading...");
  const [stopCoordinates, setStopCoordinates] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]); // Lưu trữ stopOrder được chọn
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [image, setImage] = useState(null);
  const driverId = sessionStorage.getItem("driverId");
  const driverName = sessionStorage.getItem("driverName");


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
        `https://localhost:7046/api/Route/GetAllRouteWithRouteStatusBy/${driverId}`
      );
      const data = await response.json();
      setRouteDetails(data.result[0]);

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
      const response = await axios.get(
        `https://localhost:7046/api/Driver/GetDriverBy/${driverId}`
      );
      setStatus(response.data.result.status || "Unavailable");
    } catch (error) {
      console.error("Error fetching driver status: ", error);
    }
  };

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

  const handleUpdateStatus = async () => {
    const routeId = routeDetails ? routeDetails.id : 1;

    try {
      const response = await fetch(
        `https://localhost:7046/api/Route/UpdateStopOrderAndStatus?RouteId=${routeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const data = await response.json();
      if (data.statusCode === 200 && data.isSuccess) {
        alert("Update successfully");
        fetchRouteDetails(driverId);
      } else {
        alert("Update failed: " + data.errorMessage);
      }
    } catch (error) {
      console.error("Error updating stop order status: ", error);
      alert("Error updating stop order status");
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      className: 'custom-modal',
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this stop order?',
      onOk() {
        if (cancelReason && image) {
          // Implement delete logic here, make API call to delete the stop
          alert("Stop order deleted!");
          setShowCancelPopup(false); // Close popup
        } else {
          alert("Please provide a reason and upload an image.");
        }
      },
      okButtonProps: {
        className: 'custom-ok-button',
      },
      cancelButtonProps: {
        className: 'custom-cancel-button',
      },
    });
  };

  const handleSelectStop = (stopOrder) => {
    setSelectedStops((prevSelected) =>
      prevSelected.includes(stopOrder)
        ? prevSelected.filter((item) => item !== stopOrder)
        : [...prevSelected, stopOrder]
    );
  };

  const NumberedMarker = ({ position, number }) => {
    const map = useMap();

    useEffect(() => {
      const icon = L.divIcon({
        className: styles.numberedMarker,
        html: `<div class='marker-number'>${number}</div>`,
      });
      const marker = L.marker(position, { icon }).addTo(map);

      return () => {
        map.removeLayer(marker);
      };
    }, [map, position, number]);

    return null;
  };

  if (mapLocation.latitude === null || mapLocation.longitude === null) {
    return <p>Loading location...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoTable}>
        <h2>Driver Information</h2>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Driver ID</th>
              <td>{driverId}</td>
            </tr>
            <tr>
              <th>Driver Name</th>
              <td>{driverName}</td>
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
            <h3><strong>Route Notes:</strong> {routeDetails.notes}</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Stop Order</th>
                  <th>Address</th>
                  <th>Route Status</th>
                </tr>
              </thead>
              <tbody>
                {routeDetails.routeStops
                  .filter((stop) => stop.stopOrder > 0)
                  .map((stop) => (
                    <tr key={stop.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedStops.includes(stop.stopOrder)}
                          onChange={() => handleSelectStop(stop.stopOrder)}
                        />
                      </td>
                      <td>{stop.stopOrder}</td>
                      <td>{stop.address}</td>
                      <td>{stop.routeStopStatus === 0 ? "Pending" : "Completed"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
        <div className={styles.buttonGroup}>
          <button className={styles.routeButton} onClick={handleUpdateStatus}>
            Update Stop Order Status
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => setShowCancelPopup(true)}
          >
            Delete
          </button>
        </div>
      </div>

      <Modal
        title="Confirm Deletion"
        visible={showCancelPopup}
        onOk={handleDelete}
        onCancel={() => setShowCancelPopup(false)}
      >
        <label>Reason for cancellation:</label>
        <Input.TextArea
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Enter reason"
        />
        <label>Upload image:</label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Modal>

      <MapContainer
        center={[mapLocation.latitude, mapLocation.longitude]}
        zoom={13}
        style={{ height: "900px", width: "50%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <NumberedMarker
          position={mapLocation.latitude && mapLocation.longitude ? [mapLocation.latitude, mapLocation.longitude] : [0, 0]}
          number={1}
        />
        {stopCoordinates.length > 0 && stopCoordinates.map((stop, index) => (
          stop.latitude && stop.longitude ? (
            <Marker
              key={index}
              position={[stop.latitude, stop.longitude]}
              icon={L.divIcon({
                className: styles.numberedMarker,
                html: `<div class='marker-number'>${stop.stopOrder}</div>`,
              })}
            >
              <Popup>
                <div>{stop.address}</div>
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
