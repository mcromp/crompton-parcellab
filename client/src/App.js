import "./App.css";
import { useState } from "react";
import Orders from "./pages/Orders";

const App = () => {
 const [orders, setOrders] = useState();
 const [textVal, setTextVal] = useState("");
 const [isLoading, setIsLoading] = useState(false);

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

 if (orders) {
  return <Orders orders={orders} />;
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
