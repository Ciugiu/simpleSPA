import { useState } from "react";

const HomePage = () => {
  const [product] = useState(null);

  return (
    <div>
      <h1 className="text-center">App</h1>
      {!product && "No products found"}
    </div>
  );
};

export default HomePage;
