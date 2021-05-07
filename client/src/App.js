import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
 const [user, setUser] = useState("");

 //  useEffect(() => {
 //   const postTest = async () => {
 //    const res = await fetch("/checkpoint", {
 //     method: "POST",
 //     headers: {
 //      "Content-Type": "application/json",
 //     },
 //     body: JSON.stringify({ tracking_number: "00340000161200000001" }),
 //    });
 //    const data = await res.json();
 //    console.log(data);
 //   };
 //   postTest();
 //  }, []);
 return <div className="App"></div>;
};

export default App;
