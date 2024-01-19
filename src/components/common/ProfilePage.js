import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Responsive from "./Responsive";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const ProfileBlock = styled(Responsive)`
    margin-top: 2rem;
    padding-left: 2rem;
`;

const InformationBlock = styled.h1`
    font-size: 20px;
    margin-bottom: 1.5rem;
`;

const WhiteBox = styled.div`
    background-color: #f4f6f8;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 1.5rem;
    position: relative;
    width: 95%;
    color: #666666;
    font-weight: bolder;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const OrangeBox = styled.div`
    position: absolute;
    top: -20px;
    left: 5px;
    width: 130px;
    height: 22px;
    background-color: orange;
    border-radius: 20px;
    margin: 10px;
    color: white;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
`;

const GreenBox = styled.div`
    position: absolute;
    top: -20px;
    left: 5px;
    width: 130px;
    height: 22px;
    background-color: #548235;
    border-radius: 20px;
    margin: 10px;
    color: white;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
`;

const BlueBox = styled.div`
    position: absolute;
    top: -20px;
    left: 5px;
    width: 130px;
    height: 22px;
    background-color: #355abf;
    border-radius: 20px;
    margin: 10px;
    color: white;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
`;

const LocationInput = styled.input`
    width: 95%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: -10px;
`;

const SecurityInput = styled.div`
    margin-top: 10px;
    margin-left: 10px; 
`;

const SecurityInfoItem = styled.div` 
`;

const SecurityAccess = styled.div` 
    margin-top: 5px;
    margin-left: 30px; 
    font-size: 10px;
`;

const SecurityTest = styled.input`
    width: 70%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 10px;
`;

const ProfilePage = () => {
    const { post, user } = useSelector(
        ({ post, user }) => ({
            post: post.post,
            user: user.user,
        }),
    );

    const [showLocationInput, setShowLocationInput] = useState(false);
    const [showSecurityInfo, setShowSecurityInfo] = useState(false);
    const [showSecurityAccess, setShowSecurityAccess] = useState(false);
    const [showSecurityXSS, setShowSecurityXSS] = useState(false);
    const [locationValue, setLocationValue] = useState("");
    const [XSSInput, setXSSInput] = useState('');
    const [currentDeviceInfo, setCurrentDeviceInfo] = useState(null);    

    const handleLocationClick = () => {
        setShowLocationInput(!showLocationInput);
    };

    const handleSecurityInfoClick = () => {
        setShowSecurityInfo(!showSecurityInfo);
    };

    const handleSecurityAccessClick = () => {
        setShowSecurityAccess(!showSecurityAccess);
    };

    const handleSecurityXSSClick = () => {
        setShowSecurityXSS(!showSecurityXSS);
    };

    const handleLocationInputChange = (e) => {
        setLocationValue(e.target.value);
    }

    const handleLocationInputEnter = (e) => {
        if (e.key === "Enter") {
            window.location.href = `/postlist?tag=${locationValue}`;
        }
    }

    // useEffect 내에서 사용자의 디바이스 정보를 가져오는 함수
    useEffect(() => {
        const getDeviceInfo = () => {
            const deviceInfo = {
                userAgent: window.navigator.userAgent,
            };
            setCurrentDeviceInfo(deviceInfo);
        };

        if (showSecurityAccess) {
            getDeviceInfo();
        }

        return () => {
            setCurrentDeviceInfo(null);
        };
    }, [showSecurityAccess]); 

    const [prevDeviceInfo, setPrevDeviceInfo] = useState(null);

    // useEffect를 사용하여 이전 디바이스 정보 갱신
    useEffect(() => {
        setPrevDeviceInfo(currentDeviceInfo);
    }, [currentDeviceInfo]);

    // 이전 디바이스와 현재 디바이스를 비교하여 다르면 경고 표시
    const isDifferentDevice = prevDeviceInfo && prevDeviceInfo.userAgent !== currentDeviceInfo?.userAgent;

    if (!user || !user.username) {
        return <ProfileBlock>로그아웃이 완료되었습니다. <br />
        페이지 이용을 원하실 경우 다시 로그인해 주세요. </ProfileBlock>
    }

    return (
        <ProfileBlock post={post}>
            <InformationBlock>
                안녕하세요~ {user.username} 님, <br/>
                진행중인 거래가 3건 있어요!
            </InformationBlock>
            <Link to={`/@${user.username}`}>
                <WhiteBox>
                    올린 게시물 목록 확인하기
                    <OrangeBox>
                        올린 게시물 목록
                    </OrangeBox>
                </WhiteBox>
            </Link>
            <WhiteBox onClick={handleLocationClick} style={{ cursor: "pointer" }}>
                지역 정보로 찾기
                <OrangeBox>
                    지역 정보 찾기
                </OrangeBox>
            </WhiteBox>
            {showLocationInput && (
                <LocationInput
                    type="text"
                    placeholder="지역을 입력하세요"
                    value={locationValue}
                    onChange={handleLocationInputChange}
                    onKeyDown={handleLocationInputEnter}
                />
            )}
            <InformationBlock>
                제품 등록하기
            </InformationBlock>
            <Link to="/upload">
                <WhiteBox>
                    클릭하여 게시물 등록하기
                    <GreenBox>
                        게시물 올리기
                    </GreenBox>
                </WhiteBox>
            </Link>
            <InformationBlock>
                보안 시스템
            </InformationBlock>
            <WhiteBox onClick={handleSecurityInfoClick}>
                적용중인 보안 정보 확인하기
                {showSecurityInfo && (
                    <SecurityInput>
                        <SecurityInfoItem
                            onClick={(e) => {
                            handleSecurityAccessClick(e);
                            e.stopPropagation();
                            }}
                            style={{ cursor: "pointer" }}>
                            - 계정 보안 위협 감지
                            {showSecurityAccess && (
                            <SecurityAccess>
                                사용자의 특정 작업 로그를 분석하여 이상 행동을 감지합니다.<br/>
                                정상 범위를 벗어날 경우 이를 감지할 수 있습니다.<br/>
                                <div style={{ color: 'green', fontSize: '15px', fontWeight: 'bolder', marginTop: '5px' }}>
                                    ✔️ 계정 상태 안전
                                </div>
                                {currentDeviceInfo && (
                                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                                        현재 디바이스: {currentDeviceInfo.userAgent}
                                    </div>
                                )}
                                {isDifferentDevice && (
                                    <div style={{ color: '#FF8C00', fontSize: '15px', fontWeight: 'bolder', marginTop: '5px' }}>
                                        ⚠️ 보안 위협 감지 : 디바이스 변경 감지됨
                                    </div>
                                )}
                            </SecurityAccess>
                            )}
                        </SecurityInfoItem>
                        <SecurityInfoItem
                            onClick={(e) => {
                            handleSecurityXSSClick(e);
                            e.stopPropagation();
                            }}
                            style={{ cursor: "pointer" }}>
                            - 크로스 사이트 스크립팅(XSS)
                            {showSecurityXSS && (
                            <SecurityAccess>
                                클라이언트에서 악성 스크립트 실행을 방지합니다.<br/>
                                입력을 안전하게 처리하여 보안 취약성을 최소화 합니다.
                                <SecurityTest
                                    value={XSSInput}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => setXSSInput(e.target.value)}
                                    placeholder="스크립트를 작성하여 결과 확인"/>
                                <div dangerouslySetInnerHTML={{ __html: XSSInput }} />
                                <div>결과: {DOMPurify.sanitize(XSSInput, { ALLOWED_TAGS: [] })}</div>
                            </SecurityAccess>
                            )}
                        </SecurityInfoItem>
                        <SecurityInfoItem>- Cross-Origin Resource Sharing(CORS) 적용</SecurityInfoItem>
                        <SecurityInfoItem>- Cookie Security Measures 적용</SecurityInfoItem>
                        <SecurityInfoItem>- Cross-Site Request Forgery(CSRF) 방어</SecurityInfoItem>
                        <SecurityInfoItem>- SQL Injection 방어</SecurityInfoItem>
                    </SecurityInput>           
                )}
                <BlueBox>
                    보안 정보 확인
                </BlueBox>
            </WhiteBox>
            <InformationBlock style={{ fontSize: '8px', color: '#666666' }}>
                마이 페이지 - copyright@ by 안전한 거래와 편리한 서비스를 위한 ShareMarket
            </InformationBlock>
        </ProfileBlock>
    );
};

export default ProfilePage;
