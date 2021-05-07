import React, { useState, useEffect } from "react";
import OrderCard from "./orderCard";

const Orders = ({ orders, trackingNumbers }) => {
 const [trackingData, setTrackingData] = useState();
 const [isLoading, setIsLoading] = useState(true);
 const [orderCard, setOrderCard] = useState();

 useEffect(() => {
  const getTrackingStatus = async (tracking_numbers) => {
   try {
    const res = await fetch("/checkpoint", {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({ tracking_numbers }),
    });
    const data = await res.json();
    setTrackingData(data);
    setIsLoading(false);
   } catch (e) {
    setIsLoading(false);
   }
  };
  getTrackingStatus(trackingNumbers);
 }, [trackingNumbers]);

 const handleClick = (orderNum) => {
  const orderData = orders.filter((o) => o.orderNo === orderNum);
  setOrderCard(orderData);
 };
 if (orderCard) {
  return <OrderCard data={orderCard} />;
 }
 return (
  <div>
   <h2>Your Orders</h2>
   {isLoading ? (
    <span>loading...</span>
   ) : (
    trackingData.map((trackData) => {
     const currOrder = orders.find(
      (o) => o.tracking_number === trackData.tracking_number,
     );
     const { city, street, zip_code } = currOrder;
     const address = `${street} ${zip_code} ${city}`;
     return (
      <div
       className="block orderBlock"
       key={trackData.tracking_number}
       onClick={() => handleClick(currOrder.orderNo)}
      >
       <OrderItem label={"Order Number"}>{currOrder.orderNo}</OrderItem>
       <OrderItem label={"Delivery Address"}>{address}</OrderItem>
       <OrderItem label={"Current Status"}>{trackData.status_text}</OrderItem>
      </div>
     );
    })
   )}
  </div>
 );
};

const OrderItem = ({ label, children }) => (
 <div>
  <p className="orderLabel">{label}</p>
  <p className="orderFont">{children}</p>
 </div>
);

export default Orders;
