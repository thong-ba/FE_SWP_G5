// import { LoadScript } from "@react-google-maps/api";
// import axios from "axios";
// import { useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// const Route = () => {
//   const [routeRequest, setRouteRequest] = useState({
//     notes: "",
//     driverId: 0,
//   });

//   const [routeStopRequests, setRouteStopRequests] = useState([
//     {
//       stopOrder: 0,
//       address: "",
//       orderId: 0,
//       latitude: null, //new
//       longitude: null, //new
//     },
//   ]);

//   const handleAddRouteStop = () => {
//     setRouteStopRequests((prev) => [
//       ...prev,
//       {
//         stopOrder: prev.length + 1,
//         address: "",
//         orderId: 0,
//         latitude: null,
//         longitude: null,
//       },
//     ]);
//   };

//   const handleUpdateRouteStop = async (index, field, value) => {
//     // setRouteStopRequests((prev) =>
//     //   prev.map((stop, i) => (i === index ? { ...stop, [field]: value } : stop))
//     // );

//     const updatedStops = routeStopRequests.map((stop, i) =>
//       i === index ? { ...stop, [field]: value } : stop
//     );

//     if (field === "address" && value) {
//       const coordinates = await getCoordinatesFromAddress(value);
//       if (coordinates) {
//         updatedStops[index].latitude = coordinates.lat;
//         updatedStops[index].longitude = coordinates.lng;

//         setCenter({ lat: coordinates.lat, lng: coordinates.lng });
//       }
//     }

//     setRouteStopRequests(updatedStops);
//   };

//   const handleSubmit = async () => {
//     const requestBody = {
//       routeRequest,
//       routeStopRequests,
//     };

//     try {
//       const response = await axios.post(
//         "https://localhost:7046/api/Route",
//         requestBody,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Response:", response.data);
//       alert("Route created successfully");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to create route.");
//     }
//   };

//   const getCoordinatesFromAddress = async (address) => {
//     try {
//       const response = await axios.get(
//         `https://api.gomaps.pro/geocode?address=${encodeURIComponent(address)}`
//       );

//       return response.data.location;
//     } catch (error) {
//       console.error("Error fetching coordinates:", error);
//       return null;
//     }
//   };

//   const containerStyle = { width: "100%", height: "500px" };
//   const [center, setCenter] = useState({ lat: 10.762622, lng: 106.660172 });

//   return (
//     <div>
//       <h2>Create Route</h2>

//       <div>
//         <label>Notes:</label>
//         <input
//           type="text"
//           value={routeRequest.notes}
//           onChange={(e) =>
//             setRouteRequest((prev) => ({ ...prev, notes: e.target.value }))
//           }
//         />
//       </div>

//       <div>
//         <label>Driver ID:</label>
//         <input
//           type="number"
//           value={routeRequest.driverId}
//           onChange={(e) =>
//             setRouteRequest((prev) => ({ ...prev, driverId: +e.target.value }))
//           }
//         />
//       </div>

//       <h3>Route Stops</h3>
//       {routeStopRequests.map((stop, index) => (
//         <div key={index} style={{ marginBottom: "10px" }}>
//           <label>Stop Order:</label>
//           <input
//             type="number"
//             value={stop.stopOrder}
//             onChange={(e) =>
//               handleUpdateRouteStop(index, "stopOrder", +e.target.value)
//             }
//           />

//           <label>Address:</label>
//           <input
//             type="text"
//             value={stop.address}
//             onChange={(e) =>
//               handleUpdateRouteStop(index, "address", e.target.value)
//             }
//           />

//           <label>Order ID:</label>
//           <input
//             type="number"
//             value={stop.orderId}
//             onChange={(e) =>
//               handleUpdateRouteStop(index, "orderId", +e.target.value)
//             }
//           />
//         </div>
//       ))}

//       <button onClick={handleAddRouteStop}>Add Stop</button>
//       <button onClick={handleSubmit}>Submit Route</button>

//       {/* Map */}
//       <h3>Route Stops Map</h3>
//       <MapContainer
//         center={center}
//         zoom={13}
//         style={{ height: "400px", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//         />
//         {routeStopRequests.map((stop, index) => (
//           stop.latitude && stop.longitude && (
//           <Marker
//             key={index}
//             position={{ lat: stop.latitude, lng: stop.longitude }}
//           >
//             <Popup>
//               <strong>Stop {stop.stopOrder}</strong>
//               <br />
//               Address: {stop.address}
//               <br />
//               Order ID: {stop.orderId}
//             </Popup>
//           </Marker>
//           )
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default Route;
