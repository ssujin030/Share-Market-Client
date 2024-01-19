import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    background: #FDFDFD;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
    z-index: 999; 
`;

const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 1px;
        color: #425166;
    }
    .right {
        display: flex;
        align-items: center;
        color: #323F50;
    }
`;

const Spacer = styled.div`
    height: 4rem;
`;

const Header = ({ user, onLogout }) => {
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link to="/postlist" className='logo'>
                        <span style={{ fontSize: '14px' }}>SHARE</span><br/>
                        <span>MARKET</span>
                    </Link>
                    {user ? (
                        <div className="right">
                            <UserInfo>
                                <Link to="/my">
                                    {user.username}
                                </Link>
                            </UserInfo>
                            <Button onClick={onLogout}>로그아웃</Button>
                        </div>
                    ) : (
                        <div className='right'>
                            <Button to="/login">로그인</Button>
                        </div>
                    )}
                </Wrapper>
            </HeaderBlock>
            <Spacer />
        </>
    );
};

const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
`;

export default Header;
