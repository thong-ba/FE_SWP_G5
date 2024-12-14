// import axios from "axios";
// import { getPendingOrder } from "../getOrder/getOrder";
// import React, { useEffect, useState } from "react";

// function PendingOrderTab() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const cancelOrder = async (orderId) => {
//     try {
//       const response = await axios.put(
//         `https://localhost:7046/api/Order/Update-Order-Status-Canceled?OrderId=${orderId}`,
//         {},
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.isSuccess) {
//         alert("Order canceled successfully");

//         setOrders((prevOrders) =>
//           prevOrders.filter((order) => order.id !== orderId)
//         );
//       } else alert("Failed to cancel the order");
//     } catch (error) {
//       console.error("Error canceling order:", error);
//       alert("Error canceling the order");
//     }
//   };

//   const pendingPickUpOrder = async (orderId) => {
//     try {
//       const response = await axios.put(
//         `https://localhost:7046/api/Order/Update-Order-Status-PendingPickUp?OrderId=${orderId}`,
//         {},
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.isSuccess) {
//         alert("Order pending pick up successfully");

//         setOrders((prevOrders) =>
//           prevOrders.filter((order) => order.id !== orderId)
//         );
//       } else alert("Failed to pending pick up the order");
//     } catch (error) {
//       console.error("Error pending pick up order:", error);
//       alert("Error pending pick up the order");
//     }
//   };

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await getPendingOrder();
//         console.log("Fetched data: ", data);
//         if (Array.isArray(data)) {
//           setOrders(data);
//         } else {
//           setOrders([]);
//           setError("No data found");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setError("Failed to fetch pending orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) return <div>Loading pending orders...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>Pending Orders</h2>
//       <table className="order-table">
//         <thead>
//           <tr>
//             <th>No.</th>
//             <th>From Address</th>
//             <th>To Address</th>
//             <th>Receiver Name</th>
//             <th>Receiver Phone</th>
//             <th>Notes</th>
//             <th>Total Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order, index) => (
//             <tr key={order.id}>
//               <td>{index + 1}</td>
//               <td>{order.fromAddress}</td>
//               <td>{order.toAddress}</td>
//               <td>{order.receiverName}</td>
//               <td>{order.receiverPhone}</td>
//               <td>{order.notes}</td>
//               <td>{order.totalPrice}</td>
//               <td>
//                 <button className="btn-detail">View Details</button>
//                 {/* <button
//                   className="btn-confirm"
//                   onClick={() => pendingPickUpOrder(order.id)}
//                 >
//                   Confirm
//                 </button> */}
//                 <button
//                   className="btn-cancel"
//                   onClick={() => cancelOrder(order.id)}
//                 >
//                   Cancel
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default PendingOrderTab;




import axios from "axios";
import { getPendingOrder } from "../getOrder/getOrder";
import React, { useEffect, useState } from "react";
import './PendingOrderTab.css';

function PendingOrderTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Number of orders per page

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `https://localhost:7046/api/Order/Update-Order-Status-Canceled?OrderId=${orderId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isSuccess) {
        alert("Order canceled successfully");
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      } else {
        alert("Failed to cancel the order");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Error canceling the order");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getPendingOrder();
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(orders.length / pageSize);
  const displayedOrders = orders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) return <div>Loading pending orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pending-orders-container">
      <h2 className="pending-orders-title">Pending Orders</h2>
      <table className="pending-orders-table">
        <thead className="pending-orders-header">
          <tr>
            <th className="pending-orders-header-cell">No.</th>
            <th className="pending-orders-header-cell">From Address</th>
            <th className="pending-orders-header-cell">To Address</th>
            <th className="pending-orders-header-cell">Receiver Name</th>
            <th className="pending-orders-header-cell">Receiver Phone</th>
            <th className="pending-orders-header-cell">Notes</th>
            <th className="pending-orders-header-cell">Total Price</th>
            <th className="pending-orders-header-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedOrders.map((order, index) => (
            <tr key={order.id}>
              <td>{(currentPage - 1) * pageSize + index + 1}</td>
              <td>{order.fromAddress}</td>
              <td>{order.toAddress}</td>
              <td>{order.receiverName}</td>
              <td>{order.receiverPhone}</td>
              <td>{order.notes}</td>
              <td>{order.totalPrice}</td>
              <td>
                <button className="btn-detail">View Details</button>
                <button
                  className="btn-cancel"
                  onClick={() => cancelOrder(order.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PendingOrderTab;
