import { useEffect, useState } from "react";
import { getCompletedOrder } from "../getOrder/getOrder";

function CompletedOrderTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getCompletedOrder();
        console.log("Fetched data: ", data);
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
          setError("No data found");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch pending orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading pending orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Completed Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>From Address</th>
            <th>To Address</th>
            <th>Receiver Name</th>
            <th>Receiver Phone</th>
            <th>Notes</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.fromAddress}</td>
              <td>{order.toAddress}</td>
              <td>{order.receiverName}</td>
              <td>{order.receiverPhone}</td>
              <td>{order.notes}</td>
              <td>{order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompletedOrderTab;
