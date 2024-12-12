import { useEffect, useState } from "react";
import { getCancelOrder } from "../getOrder/getOrder";

function CancelOrderTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getCancelOrder();
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
      <h2>Cancel Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>From Address</th>
            <th>To Address</th>
            <th>Receiver Name</th>
            <th>Receiver Phone</th>
            <th>Notes</th>
            <th>Total Price</th>
            <th>Reason To Cancel</th>
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
              <td>{order.reasonToCancel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CancelOrderTab;
