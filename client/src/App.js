import "./App.css";
import { useEffect } from "react";

const App = () => {
 useEffect(() => {
  const postTest = async () => {
   const res = await fetch("/trackings", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: "julian@parcellab.com" }),
   });
   const data = await res.json();
   console.log(data);
  };
  postTest();
 }, []);
 return <div className="App"></div>;
};

export default App;
