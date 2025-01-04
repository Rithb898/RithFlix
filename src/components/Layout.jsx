import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <main className="mt-20 min-h-screen px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
