
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-inventory-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Item Nexus Catalog</h1>
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline">Inventory Management System</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
