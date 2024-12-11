import axios from "axios";
import { useEffect, useState } from "react";

const Route = ({ driverId }) => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await axios.get(`https://localhost:7046/api/Route/GetAllRouteWithRouteStatusBy/${driverId}`);
                console.log("response: ", response);
                setRoutes(response.data.result);
                setLoading(false);
            }
            catch (error) {
                setError(error.message || "An error occurred");
                setLoading(false);
            }
        };

        if (driverId) {
            fetchRoutes();
        }
    }, [driverId]);

    if (loading) return <div>Loading data...</div>
    if (error) return <div>Error: {error}</div>

    if (routes.length === 0) return <div>Waiting for orders...</div>;

    return (
        <div>
            <h1>Route</h1>
            {routes.map((route) => (
                <div key={route.id}>
                <p><strong>Notes:</strong> {route.notes}</p>

                {route.routeStops.length > 0 ? (
                    <div>
                        <h3>Route Stops</h3>
                        <ul>
                            {route.routeStops.map((stop) => (
                                <li key={stop.id}>
                                     <p><strong>Stop {stop.stopOrder}:</strong> {stop.address}</p>
                                </li>
                            ))}
                        </ul>
                        </div>
                ) : (
                    <p>No stops available for this route.</p>
                )}
                </div>
            ))} 
        </div>
    );
};

export default Route;