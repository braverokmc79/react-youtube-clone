
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../hoc/auth";
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import VideoUploadPage from './views/VideoUploadPage.js/VideoUploadPage';
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage';

function App() {
  const AuthLandingPage = Auth(LandingPage, null); //null  : 아무나 출입이 가능한 페이지
  const AuthLoginPage = Auth(LoginPage, false); //false : 로그인한 유저는 출입불가
  const AuthRegisterPage = Auth(RegisterPage, false);//false :로그인한 유저는 출입불가
  const AuthVideoUploadPage = Auth(VideoUploadPage, true);//true :로그인한 유저만  출입
  const AuthVideoDetailPage = Auth(VideoDetailPage, null);//null :아무나 출입이 가능한 페이지
  const AuthSubscriptionPage = Auth(SubscriptionPage, null);//null :아무나 출입이 가능한 페이지


  return (
    <BrowserRouter>
      <Suspense fallback={(<div>Loading...</div>)}>

        <NavBar />
        <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>


          <Routes>
            <Route path="/" element={<AuthLandingPage />} />
            <Route path="/login" element={<AuthLoginPage />} />
            <Route path="/register" element={<AuthRegisterPage />} />
            <Route path="/video/upload" element={<AuthVideoUploadPage />} />
            <Route path="/video/:videoId" element={<AuthVideoDetailPage />} />
            <Route path="/subscription" element={<AuthSubscriptionPage />} />

          </Routes>


        </div>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
