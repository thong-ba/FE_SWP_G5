// import { useEffect, useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import Route from "../route/Route";
// import './MapView.module.css';

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
// import styles from './MapView.module.css';

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

//   const sampleAddresses = [
//     "District 1", "District 2", "District 3", "District 4",
//     "District 5", "District 6", "District 7", "District 8",
//     "District 9", "District 10"
//   ];

//   if (mapLocation.latitude === null || mapLocation.longitude === null) {
//     return <p>Loading location...</p>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.infoTable}>
//         <h2>Driver Information</h2>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Point</th>
//               <th>Address</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sampleAddresses.map((address, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{address}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className={styles.map}>
//         <MapContainer
//           center={[mapLocation.latitude, mapLocation.longitude]}
//           zoom={13}
//           style={{ height: "100%", width: "100%" }}
//           whenCreated={(map) => {
//             map.invalidateSize();
//             map.setView([mapLocation.latitude, mapLocation.longitude], 13);
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
import styles from './MapView.module.css';

function MapView({ location }) {
  const [mapLocation, setMapLocation] = useState({
    latitude: 10.8231, // Default latitude for Ho Chi Minh City
    longitude: 106.6297, // Default longitude for Ho Chi Minh City
  });

  const driverId = localStorage.getItem("driverId") || "SampleDriverId";
  const [sampleAddresses, setSampleAddresses] = useState([
    "District 1", "District 2", "District 3", "District 4",
    "District 5", "District 6", "District 7", "District 8",
    "District 9", "District 10"
  ]);

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

  const handleRemoveStop = () => {
    if (sampleAddresses.length > 0) {
      setSampleAddresses((prevAddresses) => prevAddresses.slice(1));
    } else {
      console.log("All stops completed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoTable}>
        <h2>Driver Information</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Point</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {sampleAddresses.map((address, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleRemoveStop} className={styles.removeButton}>
          Complete Stop
        </button>
      </div>

      <div className={styles.map}>
        <MapContainer
          center={[mapLocation.latitude, mapLocation.longitude]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
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
      </div>
    </div>
  );
}

export default MapView;
