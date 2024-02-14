import React, { useState } from "react";
import Products_details from "./Product_details";
import Product_view from "./Product_view";
import Products_view_flote from "./Product_view_flote";

function ProductPage({propertyDetails}) {
  console.log("------>",propertyDetails)
  const [zoomin, setZoomin] = useState(false);

  return (
    <>
      <div className="max-w-[1718px] mx-auto grid md:grid-flow-col justify-center items-center sm:mt-6 md:mt-[91px] p-0 sm:px-6 md:gap-6 lg:gap-[126px] flex-shrink-0" style={{margin:'50px'}}>
        <Product_view setZoomin={setZoomin} propertyDetails={propertyDetails} />
        <Products_details propertyDetails={propertyDetails} />
      </div>
      {zoomin && <Products_view_flote setZoomin={setZoomin} />}
      <div className="py-5"></div>
    </>
  );
}

export default ProductPage;
