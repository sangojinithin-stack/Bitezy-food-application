import React, { useState, useMemo } from "react";

import "./Cart.css";

import { useDispatch, useSelector } from "react-redux";

import {
  removeCart,
  clearCart,
  incrementQty,
  decrementQty,
} from "./redux/cartSlice";

import {
  applyCoupon,
  resetCoupon,
} from "./redux/couponSlice";

import { addOrder } from "./redux/orderSlice";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { QRCode } from "react-qr-code";

import Swal from "sweetalert2";

import emailjs from "@emailjs/browser";

import Confetti from "react-confetti";

function Cart() {
  const dispatch = useDispatch();

  /* =========================
     REDUX STATE
  ========================= */

  const cartItems = useSelector(
    (state) => state.cart || []
  );

  const {
    discount,
    applied,
    message,
  } = useSelector(
    (state) => state.couponDetails || {}
  );

  /* =========================
     LOCAL STATE
  ========================= */

  const [discountPercent, setDiscountPercent] =
    useState(0);

  const [coupon, setCoupon] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [customerEmail, setCustomerEmail] =
    useState("");

  const [showConfetti, setShowConfetti] =
    useState(false);

  /* =========================
     BILL CALCULATIONS
  ========================= */

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );
  }, [cartItems]);

  const manualDiscountAmount =
    (subtotal * discountPercent) / 100;

  const afterManualDiscount =
    subtotal - manualDiscountAmount;

  const couponDiscountAmount =
    (afterManualDiscount * discount) / 100;

  const afterCouponDiscount =
    afterManualDiscount -
    couponDiscountAmount;

  const taxAmount =
    (afterCouponDiscount * 18) / 100;

  const shipping = 50;

  const netAmount =
    afterCouponDiscount +
    taxAmount +
    shipping;

  /* =========================
     APPLY COUPON
  ========================= */

  const handleApplyCoupon = () => {
    if (!coupon.trim()) {
      toast.warning(
        "Please Enter Coupon Code"
      );

      return;
    }

    dispatch(applyCoupon(coupon));

    Swal.fire({
      icon: "success",
      title: "Coupon Applied 🎉",
      text: `${coupon} applied successfully`,
      timer: 1500,
      showConfirmButton: false,
    });

    toast.success(
      `Coupon ${coupon} Applied`
    );
  };

  /* =========================
     REMOVE ITEM
  ========================= */

  const handleRemoveItem = (item) => {
    Swal.fire({
      title: "Remove Item?",
      text: `Remove ${item.name} from cart?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeCart(item.id));

        toast.error(
          `${item.name} Removed`
        );

        if (cartItems.length <= 1) {
          dispatch(resetCoupon());

          setCoupon("");

          setDiscountPercent(0);

          setPaymentMethod("");
        }
      }
    });
  };

  /* =========================
     CLEAR CART
  ========================= */

  const handleClearCart = () => {
    Swal.fire({
      title: "Clear Cart?",
      text: "All items will be removed",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());

        dispatch(resetCoupon());

        setCoupon("");

        setDiscountPercent(0);

        setPaymentMethod("");

        toast.error("Cart Cleared");
      }
    });
  };

  /* =========================
     PAYMENT SUCCESS
  ========================= */

  const handlePayment = () => {
    Swal.fire({
      icon: "success",
      title: "Payment Successful 🎉",
      text: `₹${netAmount.toFixed(
        2
      )} paid successfully`,
      timer: 2000,
      showConfirmButton: false,
    });

    toast.success(
      "Payment Successful"
    );
  };

  /* =========================
     SAVE ORDER
  ========================= */

  const saveOrder = () => {
    const order = {
      orderId:
        "ORD-" +
        Math.floor(
          Math.random() * 1000000
        ),

      date: new Date().toLocaleString(),

      items: [...cartItems],

      totalPrice: netAmount,

      paymentMethod,
    };

    dispatch(addOrder(order));
  };

  /* =========================
     SEND EMAIL
  ========================= */

  const sendEmail = () => {

  const templateParams = {
    order_id: "ORDER123",

    orders: cartItems.map(item => ({
      name: item.name,
      price: (item.price * item.quantity).toFixed(2),
      units: item.quantity
    })),

    cost: {
      shipping: 50,
      tax: taxAmount.toFixed(2),
      total: netAmount.toFixed(2)
    },

    email: customerEmail,
  };

  return emailjs.send(
    "service_uwxgjru",
    "template_rusd7g8",
    templateParams,
    "99DXzE7fDfK1ypqGU"
  )

  .then((response) => {

    console.log(
      "EMAIL SUCCESS:",
      response
    );

    return response;

  })

  .catch((error) => {

    console.log(
      "EMAIL ERROR:",
      error
    );

  });

};

  /* =========================
     CHECKOUT
  ========================= */

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error(
        "Cart is Empty 🛒"
      );

      return;
    }

    if (!customerEmail.trim()) {
      toast.error(
        "Please Enter Email 📧"
      );

      return;
    }

    if (!paymentMethod) {
      toast.error(
        "Please Select Payment Method 💳"
      );

      return;
    }

    Swal.fire({
      title: "Confirm Order?",
      text: "Do you want to place order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText:
        "Yes, Place Order",
    }).then(async (result) => {
      if (!result.isConfirmed)
        return;

      try {
        await sendEmail();

        toast.success(
          "Email Sent Successfully ✅"
        );

        setShowConfetti(true);

        setTimeout(() => {
          setShowConfetti(false);
        }, 4000);

        saveOrder();

        Swal.fire({
          title:
            "Order Success 🎉",
          html: `
            <p>Your order placed successfully</p>
            <br/>
            <b>${customerEmail}</b>
          `,
          icon: "success",
        });

        dispatch(clearCart());

        dispatch(resetCoupon());

        setCoupon("");

        setDiscountPercent(0);

        setPaymentMethod("");

        setCustomerEmail("");

      } catch (error) {
        console.log(error);

        toast.error(
          "Email Sending Failed ❌"
        );

        Swal.fire({
          title: "Failed",
          text:
            "Unable to send confirmation email",
          icon: "error",
        });
      }
    });
  };

  /* =========================
     EMPTY CART
  ========================= */

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h1>
          Your Cart is Empty 🛒
        </h1>

        <ToastContainer />
      </div>
    );
  }

  /* =========================
     UI
  ========================= */

  return (
    <div className="cart-page">

      {showConfetti && (
        <Confetti />
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      <div className="cart-container">

        {/* ================= LEFT ================= */}

        <div className="cart-left">

          <h2>
            Your Cart (
            {cartItems.length} items)
          </h2>

          {cartItems.map((item) => (
            <div
              className="cart-row"
              key={item.id}
            >

              {/* IMAGE */}
              <img
                src={
                  item.image ||
                  item.imageUrl ||
                  "https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                }
                alt={item.name}
                className="cart-image"
                onError={(e) => {
                  e.target.src =
                    "https://cdn-icons-png.flaticon.com/512/1046/1046784.png";
                }}
              />

              {/* INFO */}
              <div className="cart-info">

                <h3>
                  {item.name}
                </h3>

                <div className="qty-controls">

                  <button
                    onClick={() =>
                      dispatch(
                        decrementQty(
                          item.id
                        )
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(
                        incrementQty(
                          item.id
                        )
                      )
                    }
                  >
                    +
                  </button>

                </div>

              </div>

              {/* PRICE */}
              <div className="cart-price">
                ₹
                {(
                  item.price *
                  item.quantity
                ).toFixed(2)}
              </div>

              {/* REMOVE */}
              <button
                className="remove-btn"
                onClick={() =>
                  handleRemoveItem(
                    item
                  )
                }
              >
                Remove
              </button>

            </div>
          ))}

          <button
            className="clear-btn"
            onClick={
              handleClearCart
            }
          >
            Clear Cart
          </button>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="cart-right">

          <div className="summary-box">

            <h2>
              Bill Summary
            </h2>

            <hr />

            <div className="summary-row">
              <span>
                Subtotal:
              </span>

              <span>
                ₹
                {subtotal.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Tax (18%):
              </span>

              <span>
                ₹
                {taxAmount.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="summary-row discount-text">
              <span>
                Manual Discount:
              </span>

              <span>
                - ₹
                {manualDiscountAmount.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="summary-row discount-text">
              <span>
                Coupon Discount:
              </span>

              <span>
                - ₹
                {couponDiscountAmount.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Shipping:
              </span>

              <span>
                ₹{shipping}
              </span>
            </div>

            <hr />

            <div className="summary-row grand-total">
              <span>
                Grand Total:
              </span>

              <span>
                ₹
                {netAmount.toFixed(
                  2
                )}
              </span>
            </div>

            {/* DISCOUNTS */}

            <div className="manual-discounts-section">

              <label>
                Manual Discounts
              </label>

              <div className="discount-buttons">

                <button
                  className={
                    discountPercent ===
                    10
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setDiscountPercent(
                      10
                    )
                  }
                >
                  10%
                </button>

                <button
                  className={
                    discountPercent ===
                    20
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setDiscountPercent(
                      20
                    )
                  }
                >
                  20%
                </button>

                <button
                  className={
                    discountPercent ===
                    30
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setDiscountPercent(
                      30
                    )
                  }
                >
                  30%
                </button>

              </div>

            </div>

            {/* COUPON */}

            <div className="coupon-box">

              <input
                type="text"
                value={coupon}
                onChange={(e) =>
                  setCoupon(
                    e.target.value
                  )
                }
                placeholder="Enter Coupon"
              />

              <button
                onClick={
                  handleApplyCoupon
                }
              >
                Apply
              </button>

            </div>

            {/* COUPON STATUS */}

            {applied && (
              <p
                style={{
                  color:
                    "green",
                  marginTop:
                    "10px",
                  fontWeight:
                    "bold",
                }}
              >
                {message}
              </p>
            )}

            {/* EMAIL */}

            <div className="email-section">

              <label>
                Email Address
              </label>

              <input
                type="email"
                value={
                  customerEmail
                }
                onChange={(e) =>
                  setCustomerEmail(
                    e.target.value
                  )
                }
                placeholder="you@example.com"
              />

            </div>

            {/* PAYMENT */}

            <div className="payment-method-section">

              <label>
                Select Payment
              </label>

              <div className="payment-buttons">

                <button
                  className={
                    paymentMethod ===
                    "qr"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setPaymentMethod(
                      "qr"
                    )
                  }
                >
                  QR Payment
                </button>

                <button
                  className={
                    paymentMethod ===
                    "card"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setPaymentMethod(
                      "card"
                    )
                  }
                >
                  Card
                </button>

              </div>

              {/* QR */}

              {paymentMethod ===
                "qr" && (
                <div className="qr-section">

                  <QRCode
                    size={150}
                    value={`upi://pay?pa=7032030240@axl&pn=FoodOrder&am=${netAmount.toFixed(
                      2
                    )}&cu=INR`}
                  />

                  <p>
                    Scan to Pay ₹
                    {netAmount.toFixed(
                      2
                    )}
                  </p>

                  <button
                    className="pay-btn"
                    onClick={
                      handlePayment
                    }
                  >
                    Verify & Pay
                  </button>

                </div>
              )}

            </div>

            {/* CHECKOUT */}

            <button
              className="checkout-btn"
              onClick={
                handleCheckout
              }
            >
              Checkout & Send Mail
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Cart;