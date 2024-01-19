import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

/* 회원가입/로그인 페이지의 레이아웃을 담당하는 컴포넌트 */

/* 화면 전체 */
const AuthTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    background: #E6E5F3;
    justify-content: center;
    align-items: center;
`;

/* 흰색 박스 */
const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bolder;
    letter-spacing: 2px;
    font-size: 25px;
    color: #425166;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 330px;
  background: white;
  border-radius: 2px;
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo-area">
          <Link to="/postlist" style={{ fontSize: '14px' }}>SHARE</Link><br/>
          <Link to="/postlist">MARKET</Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
