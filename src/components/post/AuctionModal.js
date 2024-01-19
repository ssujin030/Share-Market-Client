import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { changeField, updatePost } from '../../modules/write';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const ModalOverlay = styled.div`
  position: fixed;
  margin-top: 30px; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  background: #2DA5BD; 
  width: 320px
`;

const StyledBid = styled.div`
  color: white;
  font-weight: bold;
  padding-bottom: 1rem;
`;

const StyledTitle = styled.div`
  color: white;
  font-weight: bold;
  text-align: center; 
  background-color: #186786; 
  padding: 12px; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const StyledInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const StyledInfo = styled.div`
  background-color: #2487A8;
  padding: 7px;
  width: 135px;
  text-align: center; 
  border-radius: 24px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const StyledTimeInfo = styled.div`
  background-color: #4670B4;
  padding: 5px;
  border-radius: 24px;
  margin-top: 25px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-align: center; 
`;

const StyledPriceTitle = styled.div`
  color: white;
  font-weight: bold;
  text-align: center; 
  background-color: #2487A8; 
  padding: 12px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-top: 10px; 
`;

const StyledPriceInfo = styled.div`
  color: #F4B183;
  font-weight: bold;
  text-align: center; 
  background-color: #186786; 
  border-radius: 24px;
  padding: 3px; 
  margin-top: 5px; 
`;

const StyledInputPrice = styled.div`
  font-weight: bold;
  background-color: #EEEEEE; 
  padding: 10px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-top: 10px; 
`;

const StyledInputInfo = styled.div`
  color: #595959;
  font-weight: bold;
  margin-top: 5px; 
`;

const StyledAuctionPrice = styled.div`
  color: #595959;
  font-weight: bold;
  font-size: 14px;
  text-align: center; 
  background-color: #D1D1D1; 
  border-radius: 10px;
  padding: 10px; 
  margin-top: 5px; 
`;

const ColoredText = styled.span`
  color: #ED7D31; 
`;

const ColoredError = styled.div`
  color: tomato; 
  font-size: 9px;
  text-align: center; 
`;

const StyledButton = styled.button`
  background-color: #186786;
  color: white;
  font-weight: bold;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 0.7rem; 

  &:hover {
    background-color: #155770; 
  }
`;

const StyledButtonCancel = styled.button`
  background-color: #2487A8;
  color: white;
  font-weight: bold;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 0.7rem; 

  &:hover {
    background-color: #2380A1; 
  }
`;

const SpaceButton = styled.div`
  justify-content: space-between;
  display: flex;
`;

const AuctionModal = ({ post, onClose }) => {
  const [inputValue, setInputValue] = useState(post ? post.auctionPrice.toString() : "");
  const [displayedValue, setDisplayedValue] = useState(post ? post.auctionPrice.toString() : "");
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const { user } = useSelector(({ user }) => ({user: user.user,}),);

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch]
  );

  const onChangeAuctionPrice = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setDisplayedValue(parseInt(value, 10) + parseInt(post.auctionPrice, 10));
    onChangeField({ key: 'auctionPrice', value: value });
  };

  const handleUpdateClick = () => {
    const updatedAuctionPrice = parseInt(inputValue, 10) + parseInt(post.auctionPrice, 10);

    if (remainingTime.isAuctionClosed) {
      window.alert(`경매가 마감되었습니다. ${post.auctionName} 님이 ${post.auctionPrice}원에 낙찰되셨습니다. 이용해 주셔서 감사합니다!`);
      onClose();
      return;
    }

    if (!user || !user.username) {
      window.alert('로그인 후 이용 가능합니다.');
      return;
    }

    if (user.username === post.user.username) {
      window.alert('죄송합니다. 판매자는 경매에 참여할 수 없습니다.');
      return;
    }

    if (user.username === post.auctionName) {
      window.alert('이미 이 경매에 입찰하셨습니다. 따라서 추가 입찰은 불가능합니다.');
      return;
    }

    if (displayedValue <= parseInt(post.auctionPrice, 10)) {
      setErrorMessage('입찰가는 현재 최고 입찰가보다 커야 합니다.');
      return;
    }

    dispatch(
      updatePost({
        id: post._id,
        auctionPrice: updatedAuctionPrice.toString(),
        auctionName: user.username,
      })
    );
    onClose();
    window.location.reload();
  };

  const calculateRemainingTime = useCallback(() => {
    const currentDate = new Date();
    const targetDate = new Date(post.publishedDate);
    targetDate.setHours(targetDate.getHours() + 24); // 24시간 추가

    const timeDifference = targetDate - currentDate;
    if (timeDifference <= 0) {
      return { remainingHours: 0, remainingMinutes: 0, remainingSeconds: 0, isAuctionClosed: true, remainingText: '경매 마감' };
    }

    const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    let remainingText;
    if (timeDifference <= 600000) { // 10분 (600,000밀리초)
        remainingText = '마감 임박!';
    } else {
        remainingText = `${remainingHours}시간 ${remainingMinutes}분 ${remainingSeconds}초`;
    }

    return { remainingHours, remainingMinutes, remainingSeconds, isAuctionClosed: false, remainingText };
  }, [post.publishedDate]);

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [calculateRemainingTime]);

  return (
    <ModalOverlay>
      <ModalContent>
        <StyledBid>입찰하기</StyledBid>
        <StyledTitle>{post.productName}</StyledTitle>
        <StyledInfoContainer>
          <StyledInfo>
            판매자: {post.user.username}
          </StyledInfo>
          <StyledInfo>
            입찰자: {post.auctionName}
          </StyledInfo>
        </StyledInfoContainer>
        <StyledTimeInfo>
          남은시간 : {remainingTime.remainingText}
        </StyledTimeInfo>
        <StyledPriceTitle>
          현재 최고 입찰가<br/>
          <StyledPriceInfo>
            ₩ {parseInt(post.auctionPrice).toLocaleString()}
          </StyledPriceInfo>
        </StyledPriceTitle>
        <StyledInputPrice>
          <StyledInputInfo style={{ fontSize: '12px' }}>
            입찰가 ({parseInt(post.auctionPrice).toLocaleString()}원) + @
          </StyledInputInfo>
          <StyledInputInfo style={{ textDecoration: 'underline' }}>
            입찰 단위
            <input
              type="number"
              onChange={onChangeAuctionPrice}
              placeholder=" + 금액을 입력하세요"
              style={{
                fontSize: '11px',
                borderRadius: '24px',
                padding: '7px',
                border: 'none',
                outline: 'none',
                marginLeft: '10px'
              }}
            />
          </StyledInputInfo>
          <StyledInputInfo style={{ color: '#7F7F7F', fontSize: '9px', textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)', marginTop: '10px' }}>
            입력하신 내용이 맞는지 확인해 주세요!
          </StyledInputInfo>
          <StyledAuctionPrice style={{ marginBottom: '7px'}}>
            총 입찰 금액 <ColoredText>₩ {parseInt(displayedValue).toLocaleString()}</ColoredText>
          </StyledAuctionPrice>
          <ColoredError>{errorMessage && errorMessage}</ColoredError>
        </StyledInputPrice>
        <SpaceButton>
          <StyledButtonCancel onClick={onClose}>취소</StyledButtonCancel>
          <StyledButton onClick={handleUpdateClick}>입찰하기</StyledButton>
        </SpaceButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuctionModal;
