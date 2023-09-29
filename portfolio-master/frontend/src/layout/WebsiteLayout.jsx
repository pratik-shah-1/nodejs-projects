import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/website/Navbar';
import Footer from '../components/website/Footer';

const GeneralLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default GeneralLayout;
