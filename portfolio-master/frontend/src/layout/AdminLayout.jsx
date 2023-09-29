import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/admin/Navbar';
import Footer from '../components/admin/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default AdminLayout;
