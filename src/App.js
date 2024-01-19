import React from "react";
import { Route, Routes } from 'react-router-dom';
import PostListPage from "./pages/PostListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UploadPage from "./pages/UploadPage";
import PostPage from "./pages/PostPage";
import MyPage from "./pages/MyPage";
import StartPage from "./pages/StartPage";
import AuctionPage from "./pages/AuctionPage";
import AuctionViewerPage from "./pages/AuctionViewerPage";

const App = () => {
  return (
    <Routes>
      <Route path="/postlist" element={<PostListPage />} />
      <Route path="/auctionlist" element={<AuctionPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/" element={<StartPage />} />
      <Route path="/:username">
        <Route index element={<PostListPage />} />
        <Route path="post/:postId" element={<PostPage />} />
        <Route path="auction/:postId" element={<AuctionViewerPage />} />
      </Route>
    </Routes>
  );
};

export default App;
