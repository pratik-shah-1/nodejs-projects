import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WebsiteLayout from './layout/WebsiteLayout';
import AdminLayout from './layout/AdminLayout';

import Home from './pages/website/Home';

import Private from './components/Private';
import NotFound from './components/NotFound';
import Loader from './components/Loader';

import './assets/css/index.css';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<WebsiteLayout />}>
            <Route index element={<Home />} />
            {/* <Route path='contact' element={<Contact />} />
          <Route path='portfolio' element={<Portfolio />}>
            <Route path=':name' element={<PortfolioDetails />} />
          </Route> */}
          </Route>
          <Route path='/admin' element={<Private component={<AdminLayout />} />}>
            {/* <Route path='portfolio/view' element={<AdminAllPortfolio />} />
          <Route path='portfolio/add' element={<AdminPortfolio />} />
          <Route path='portfolio/edit/:id' element={<AdminPortfolio />} />
          <Route path='portfolio/arrange' element={<AdminTopPortfolio />} />
          <Route path='social-media-links' element={<AdminSocialMediaLinks />} />
          <Route path='resume-uploader' element={<AdminResumeUploader />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='verify-otp' element={<OTP />} />
          <Route path='set-new-password' element={<SetNewPassword />} />
          <Route path='change-password' element={<ChangePassword />} />
          <Route path='login' element={<Login />} />
          <Route path='logout' element={<Logout />} /> */}
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
