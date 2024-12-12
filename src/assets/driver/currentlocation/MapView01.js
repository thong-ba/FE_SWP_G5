// import { useEffect, useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import Route from "../route/Route";

// function MapView({ location }) {
//   const [mapLocation, setMapLocation] = useState({
//     latitude: null,
//     longitude: null,
//   });

//   const driverId = localStorage.getItem("driverId");

//   useEffect(() => {
//     if (
//       location &&
//       typeof location.latitude === "number" &&
//       typeof location.longitude === "number"
//     ) {
//       setMapLocation({
//         latitude: location.latitude,
//         longitude: location.longitude,
//       });
//       updateDriverLocation(driverId, location.latitude, location.longitude);
//     }
//   }, [location, driverId]);

//   const updateDriverLocation = async (driverId, latitude, longitude) => {
//     try {
//       const response = await fetch(
//         `https://localhost:7046/api/Location/${driverId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             DriverId: driverId,
//             Latitude: latitude,
//             Longitude: longitude,
//           }),
//         }
//       );

//       if (!response.ok) {
//         console.error(
//           "Failed to update driver location: ",
//           await response.text()
//         );
//       }
//     } catch (error) {
//       console.error("Error updating driver location: ", error);
//     }
//   };

//   if (mapLocation.latitude === null || mapLocation.longitude === null) {
//     return <p>Loading location...</p>;
//   }

//   return (
//     <div>
//       <MapContainer
//         center={[mapLocation.latitude, mapLocation.longitude]}
//         zoom={13}
//         style={{ height: "400px", width: "100%" }}
//         whenCreated={(map) => {
//           map.invalidateSize();
//           map.setView([mapLocation.latitude, mapLocation.longitude], 13);
//         }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         <Marker position={[mapLocation.latitude, mapLocation.longitude]}>
//           <Popup>Your Location</Popup>
//         </Marker>
//       </MapContainer>

//       <Route driverId={driverId} />
//     </div>
//   );
// }

// export default MapView;






// import { useEffect, useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import Route from "../route/Route";

// function MapView({ location }) {
//   const [mapLocation, setMapLocation] = useState({
//     latitude: null,
//     longitude: null,
//   });

//   const driverId = localStorage.getItem("driverId");

//   useEffect(() => {
//     if (
//       location &&
//       typeof location.latitude === "number" &&
//       typeof location.longitude === "number"
//     ) {
//       setMapLocation({
//         latitude: location.latitude,
//         longitude: location.longitude,
//       });
//       updateDriverLocation(driverId, location.latitude, location.longitude);
//     }
//   }, [location, driverId]);

//   const updateDriverLocation = async (driverId, latitude, longitude) => {
//     try {
//       const response = await fetch(
//         `https://localhost:7046/api/Location/${driverId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             DriverId: driverId,
//             Latitude: latitude,
//             Longitude: longitude,
//           }),
//         }
//       );

//       if (!response.ok) {
//         console.error(
//           "Failed to update driver location: ",
//           await response.text()
//         );
//       }
//     } catch (error) {
//       console.error("Error updating driver location: ", error);
//     }
//   };

//   if (mapLocation.latitude === null || mapLocation.longitude === null) {
//     return <p>Loading location...</p>;
//   }

//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
//       {/* Left Side: Information */}
//       <div style={{ flex: 1, minWidth: "300px" }}>
//         <h2>Driver Information</h2>
//         <p>Driver ID: {driverId}</p>
//         <p>Latitude: {mapLocation.latitude}</p>
//         <p>Longitude: {mapLocation.longitude}</p>
//         {/* Add other information as needed */}
//         <Route driverId={driverId} />
//       </div>

//       {/* Right Side: Map */}
//       <div style={{ flex: 2 }}>
//         <MapContainer
//           center={[mapLocation.latitude, mapLocation.longitude]}
//           zoom={15}
//           style={{ height: "80vh", width: "100%" }}
//           whenCreated={(map) => {
//             map.invalidateSize();
//             map.setView([mapLocation.latitude, mapLocation.longitude], 15);
//           }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />

//           <Marker position={[mapLocation.latitude, mapLocation.longitude]}>
//             <Popup>Your Location</Popup>
//           </Marker>
//         </MapContainer>
//       </div>
//     </div>
//   );
// }

// export default MapView;




import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Route from "../route/Route";

function MapView({ location }) {
  const [mapLocation, setMapLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [stop1Visible, setStop1Visible] = useState(true);
  const [stop2Visible, setStop2Visible] = useState(true);

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

  const toggleStop1 = () => {
    setStop1Visible(!stop1Visible);
  };

  const toggleStop2 = () => {
    setStop2Visible(!stop2Visible);
  };

  if (mapLocation.latitude === null || mapLocation.longitude === null) {
    return <p>Loading location...</p>;
  }

  return (
    <div className="container">
      {/* Left Side: Information */}
      <div className="infoTable">
        <h2>Driver Information</h2>
        <p>Driver ID: {driverId}</p>
        <p>Latitude: {mapLocation.latitude}</p>
        <p>Longitude: {mapLocation.longitude}</p>
        <Route driverId={driverId} />

        <button className="toggleButton" onClick={toggleStop1}>Toggle Stop 1</button>
        {stop1Visible && <p>Stop 1 is visible</p>}

        <button className="toggleButton" onClick={toggleStop2}>Toggle Stop 2</button>
        {stop2Visible && <p>Stop 2 is visible</p>}
      </div>

      {/* Right Side: Map */}
      <div className="map">
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
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;
