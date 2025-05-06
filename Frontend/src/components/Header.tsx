import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-purple-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          InventKU{" "}
          <span role="img" aria-label="box">
            📦
          </span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
