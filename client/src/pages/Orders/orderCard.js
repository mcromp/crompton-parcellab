import React from "react";

const OrderCard = ({ data }) => {
 return (
  <div>
   <h3>Third view</h3>
   {data.map((item) => {
    return (
     <div key={item.articleImageUrl}>
      <p>{item.product_name}</p>
      <img src={item.articleImageUrl} alt="" />
     </div>
    );
   })}
  </div>
 );
};

export default OrderCard;
