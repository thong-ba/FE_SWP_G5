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
import "./PendingOrderTab.css";

function PendingOrderTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
      } else alert("Failed to cancel the order");
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Error canceling the order");
    }
  };

  const pendingPickUpOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `https://localhost:7046/api/Order/Update-Order-Status-PendingPickUp?OrderId=${orderId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isSuccess) {
        alert("Order pending pick up successfully");

        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
      } else alert("Failed to pending pick up the order");
    } catch (error) {
      console.error("Error pending pick up order:", error);
      alert("Error pending pick up the order");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
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

  // Pagination logic
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const currentOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

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
        <tbody className="pending-orders-body">
          {currentOrders.map((order, index) => (
            <tr key={order.id} className="pending-orders-row">
              <td className="pending-orders-cell">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="pending-orders-cell">{order.fromAddress}</td>
              <td className="pending-orders-cell">{order.toAddress}</td>
              <td className="pending-orders-cell">{order.receiverName}</td>
              <td className="pending-orders-cell">{order.receiverPhone}</td>
              <td className="pending-orders-cell">{order.notes}</td>
              <td className="pending-orders-cell">{order.totalPrice}</td>
              <td className="pending-orders-cell">
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
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PendingOrderTab;
