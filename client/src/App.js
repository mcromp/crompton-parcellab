import "./App.css";
import { useState } from "react";
import Orders from "./pages/Orders";

const App = () => {
 const [orders, setOrders] = useState();
 const [textVal, setTextVal] = useState("julian@parcellab.com");
 const [isLoading, setIsLoading] = useState(false);
 const [trackingNumbers, setTrackingNumbers] = useState();

 const getOrders = async (email = "julian@parcellab.com") => {
  try {
   const res = await fetch("/orders", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
   });
   const data = await res.json();
   //  console.log(data);
   if (!data[0]) {
    setIsLoading(false);
    alert("No order for that email");
   }
   //gets and returns all unique tracking numbers from user's orders
   const trackingNumbers = [];
   data.forEach((order) => {
    if (trackingNumbers.indexOf(order.tracking_number) === -1) {
     trackingNumbers.push(order.tracking_number);
    }
   });
   setTrackingNumbers(trackingNumbers);
   setOrders(data);
   setIsLoading(false);
  } catch (e) {
   console.warn(e);
   setIsLoading(false);
  }
 };

 const handleSubmit = () => {
  setIsLoading(true);
  getOrders(textVal);
  setTextVal("");
 };

 if (orders && trackingNumbers) {
  return <Orders orders={orders} trackingNumbers={trackingNumbers} />;
 }
 return (
  <div className="App">
   <p>Please enter your email address to see your recent orders</p>
   {isLoading ? (
    <div>Loading...</div>
   ) : (
    <div>
     <div className="input-label">Email</div>
     <input
      type="text"
      value={textVal}
      onChange={(e) => setTextVal(e.target.value)}
      disabled={isLoading}
     />
     <button disabled={isLoading || !textVal} onClick={handleSubmit}>
      Submit
     </button>
    </div>
   )}
  </div>
 );
};

export default App;
