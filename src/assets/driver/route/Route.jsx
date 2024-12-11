import axios from "axios";
import { useEffect, useState } from "react";

const Route = ({ driverId }) => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7046/api/Route/GetAllRouteWithRouteStatusBy/${driverId}`
        );
        console.log("response: ", response);
        setRoutes(response.data.result);
        setLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred");
        setLoading(false);
      }
    };

    if (driverId) {
      fetchRoutes();
    }
  }, [driverId]);

  const completeStop = async (routeId) => {
    try {
      setUpdating(true);
      await axios.put(
        `https://localhost:7046/api/Route/UpdateStopOrderAndStatus?RouteId=${routeId}`
      );

      setRoutes((prevRoutes) =>
        prevRoutes.map((route) =>
          route.id === routeId
            ? {
                ...route,
                isCompleted: true,
              }
            : route
        )
      );
    } catch (error) {
      console.error("Error completing stop: ", error);
      alert("Failed to complete the stop");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error}</div>;

  if (routes.length === 0) return <div>Waiting for orders...</div>;

  return (
    <div>
      <h1>Route</h1>
      {routes.map((route) => {
        const allStopsCompleted = route.routeStops.every(
          (stop) => stop.routeStopStatus === 1
        );
        return (
          <div key={route.id}>
            <p>
              <strong>Notes:</strong> {route.notes}
            </p>

            <div>
              <h3>Route Stops</h3>
              <ul>
                {route.routeStops.map((stop) => (
                  <li key={stop.id}>
                    <p>
                      <strong>Stop {stop.stopOrder}:</strong> {stop.address}
                    </p>

                    <p>
                      <strong>Status: </strong>{" "}
                      {stop.routeStopStatus === 1 ? "Completed" : "Pending"}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {!route.isCompleted && allStopsCompleted && (
              <button
                onClick={() => completeStop(route.id)}
                disabled={updating}
              >
                {updating ? "Completing Order..." : "Complete Order"}
              </button>
            )}
            {!allStopsCompleted && (
              <p>Please complete all stops before finishing the route.</p>
            )}
            {route.isCompleted && <p>Order Completed!</p>}
          </div>
        );
      })}
    </div>
  );
};

export default Route;
