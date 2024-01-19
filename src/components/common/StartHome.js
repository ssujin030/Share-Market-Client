import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StartHomeWrapper = styled.div`
  background: ${(props) => (props.bgColor ? props.bgColor : "#f4f6f8")};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background 1s ease;
`;

const StartHomeBlock = styled.div`
  text-align: center;

  .logo,
  .slogan,
  .button-wrapper,
  .hashtag-box {
    opacity: ${(props) => (props.isVisible ? "1" : "0")};
    transition: opacity 1s ease;
    transition-delay: ${(props) => `${props.delay}s`};
  }

  .logo {
    font-size: 3rem;
    font-weight: 800;
    color: #E0E0E0;
    margin-bottom: 2rem;
    margin-top: -1rem;
  }

  .slogan {
    font-size: 1.5rem;
    font-weight: 800;
    color: #425166;
    letter-spacing: 3px;
    position: relative;
  }

  .hashtag-box {
    background-color: white;
    border-radius: 10px;
    display: inline-block;
    padding: 5px 10px;
    margin: 0 5px;
    opacity: ${(props) => (props.isVisible ? "1" : "0")};
  }

  .button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }

  button {
    background-color: #425166;
    color: white;
    font-weight: 800;
    padding: 0.5rem 3rem;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
  }

  button:hover {
    background-color: #283240;
  }

  @media (max-width: 768px) {
    /* 모바일 화면 크기 */
    .logo {
      font-size: 2.5rem;
    }
    .slogan {
      font-size: 1.2rem;
    }
  }
`;

const HashtagContainer = ({ isVisible }) => {
  return (
    <div>
      <span className="hashtag-box" style={{ transitionDelay: "0.5s", opacity: isVisible ? "1" : "0" }}>
        #AI와 함께하는
      </span>
      <span className="hashtag-box" style={{ transitionDelay: "1s", opacity: isVisible ? "1" : "0" }}>
        #지혜로운 소비
      </span>
      <span className="hashtag-box" style={{ transitionDelay: "1.3s", opacity: isVisible ? "1" : "0" }}>
        #플렛폼
      </span>
    </div>
  );
};

const StartHome = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bgColor, setBgColor] = useState("#f4f6f8");
  const [logoColor, setLogoColor] = useState("#E0E0E0");

  useEffect(() => {
    setTimeout(() => {
      setBgColor("#23262D");
    }, 1000);
    setTimeout(() => {
      setIsVisible(true);
    }, 2000); 
    setTimeout(() => {
      setIsVisible(true);
    }, 3000); 
    setTimeout(() => {
      setIsVisible(true);
      setBgColor("#f4f6f8");
      setLogoColor("#425166");
    }, 4000); 
  }, []);

  return (
    <StartHomeWrapper bgColor={bgColor}>
      <StartHomeBlock isVisible={isVisible} delay={0}>
        <div className="logo" style={{ color: logoColor }}>
          <span>SHARE</span>
          <br />
          <span>MARKET</span>
        </div>
      </StartHomeBlock>
      <StartHomeBlock isVisible={isVisible} delay={0.7}>
        <div className="slogan">
          <HashtagContainer isVisible={isVisible} />
        </div>
      </StartHomeBlock>
      <StartHomeBlock isVisible={isVisible} delay={2}>
        <Link to="/postlist">
          <div className="button-wrapper">
            <button to="/postlist">시작하기</button>
          </div>
        </Link>
      </StartHomeBlock>
    </StartHomeWrapper>
  );
};

export default StartHome;
