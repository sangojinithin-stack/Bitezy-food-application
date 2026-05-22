import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeOrder, clearOrder } from "./redux/orderSlice";
import "./Order.css";

function Order() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders) || [];

  // ✅ VALID ORDERS ONLY
  const validOrders = orders.filter(
    (order) =>
      order &&
      order.orderId &&
      Array.isArray(order.items)
  );

  // ================= REMOVE ORDER =================
  const handleRemoveOrder = (id) => {
    dispatch(removeOrder(id));
  };

  // ================= CLEAR ALL =================
  const handleClearOrders = () => {
    dispatch(clearOrder());
  };

  return (
    <div className="orders-page">

      <div className="orders-top">
        <h1>Your Order History</h1>

        {validOrders.length > 0 && (
          <button onClick={handleClearOrders}>
            Clear All Orders
          </button>
        )}
      </div>

      {validOrders.length === 0 ? (
        <p className="empty-orders">No Orders Found</p>
      ) : (
        validOrders.map((order) => (
          <div key={order.orderId} className="order-card">

            {/* ORDER HEADER */}
            <div className="order-header">
              <div>
                <h3>Order ID: {order.orderId}</h3>
                <p>{order.date}</p>
              </div>

              <button
                onClick={() =>
                  handleRemoveOrder(order.orderId)
                }
              >
                Remove
              </button>
            </div>

            {/* ITEMS */}
            <div className="order-items">

              {order.items.map((item, index) => (
                <div key={index} className="order-item">

                  {/* ✅ FIXED IMAGE HANDLING */}
                  <img
                    src={
                      item.image ||
                      item.imageUrl ||
                      "https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                    }
                    alt={item.name}
                    className="order-item-image"
                    onError={(e) => {
                      e.target.src =
                        "https://cdn-icons-png.flaticon.com/512/1046/1046784.png";
                    }}
                  />

                  <div className="order-item-info">
                    <h4>{item.name}</h4>

                    <p>
                      Price: ₹{item.price}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    <p>
                      Total: ₹
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                </div>
              ))}

            </div>

            {/* ORDER TOTAL */}
            <div className="order-total">
              <h3>
                Total: ₹
                {Number(order.totalPrice || 0).toFixed(2)}
              </h3>
            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Order;