import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function MapView({ location, driverId }) {
    const [mapLocation, setMapLocation] = useState({
        latitude: null,
        longitude: null,
    });

    useEffect(() => {
        if (location || typeof location.latitude === "number" || typeof location.longitude === "number") {
            setMapLocation({
                latitude: location.latitude,
                longitude: location.longitude,
            });
            updateDriverLocation(driverId, location.latitude, location.longitude);
        }
    }, [location, driverId]);

    const updateDriverLocation = async (driverId, latitude, longitude) => {
        try {
            const response = await fetch(`https://localhost:7046/api/Location/${driverId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    DriverId: driverId,
                    Latitude: latitude,
                    Longitude: longitude,
                }),
            });

            if (!response.ok) {
                console.error("Failed to update driver location: ", await response.text());
            }
        } 
        catch (error) {
            console.error("Error updating driver location: ", error);
        }
    };

    if (mapLocation.latitude === null || mapLocation.longitude === null) {
        return <p>Loading location...</p>;
    }
    

    return (
        <MapContainer
            center={[mapLocation.latitude, mapLocation.longitude]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
            whenCreated={(map) => map.invalidateSize()}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[mapLocation.latitude, mapLocation.longitude]}>
                <Popup>Your Location</Popup>
            </Marker>
        </MapContainer>
    );
}

export default MapView;