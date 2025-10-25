import React from "react";
import ProductListContainer from "./components/ProductListContainer";

const App = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* <h1 className="text-3xl font-bold text-blue-800 mb-6">Container-Presenter Pattern</h1> */}
      <ProductListContainer />
    </div>
  );
};

export default App;
