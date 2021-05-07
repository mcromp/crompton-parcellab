import React, { useState, useEffect } from "react";

const Orders = ({ orders, trackingNumbers }) => {
 const [trackingData, setTrackingData] = useState();
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  console.log("orders, ", orders);
  console.log("new data", trackingData);
 }, [trackingData, orders]);

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

 return (
  <div>
   <h2>Your Orders</h2>
   {isLoading ? (
    <span>loading...</span>
   ) : (
    trackingData.map((trackNum) => {
     const currOrder = orders.find(
      (o) => o.tracking_number === trackNum.tracking_number,
     );
     const { city, street, zip_code } = currOrder;
     const address = `${street}\n${zip_code} ${city}`;
     return (
      <div>
       <OrderItem label={"Order Number"}>{currOrder.orderNo}</OrderItem>
       <OrderItem label={"Delivery Address"}>{address}</OrderItem>
       <OrderItem label={"Current Status"}>{trackNum.status_text}</OrderItem>
      </div>
     );
    })
   )}
  </div>
 );
};

const OrderItem = ({ label, children }) => (
 <div>
  <small style={{ color: "#bbb" }}>{label}</small>
  <p>{children}</p>
 </div>
);

export default Orders;
