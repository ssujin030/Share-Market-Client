import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import AuctionModal from './AuctionModal';

const AuctionViewerBlock = styled(Responsive)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7rem;
`;

const AuctionInfoContainer = styled.div`
  display: flex;
  flex-direction: row; 
  width: 100%;
  height: 350px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const InfoContent = styled.div`
  flex: 1;
  position: relative;
  top: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Section = styled.div`
  margin-bottom: 1rem;
  border-bottom: 1px solid #EFEFEF;
  padding-bottom: 1rem;
`;

const Title = styled.div`
  margin-left: 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #262626;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
`;

const ProductInfo = styled.div`
  margin-left: 20px;
  margin-top: 15px;
  font-size: 1rem;
  color: #868e96;
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis; 
`;

const ProductBody = styled.div`
  margin-left: 20px;
  font-size: 1rem;
  color: #868e96;
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis; 
`;

const Price = styled.div`
  margin-left: 20px;
  margin-top: 15px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #ff5722;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
`;

const ImageContainer = styled.div`
  flex: 1;
  overflow: hidden;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuctionImage = styled.img`
  width: 100%;
  height: auto;
`;

const DateInfo = styled.div`
  margin-left: 20px;
  font-size: 0.55rem;
  color: #868e96;
`;

const AuctionButton = styled.button`
  margin-left: 20px;
  background-color: #ff5722;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.4rem 3.7rem;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e64a19;
  }
`;

const AuctionViewer = ({ post, error, loading }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  }; 

  const handlePageRefreshClick = () => {
    window.location.reload();
  };
  
  if (error) {
    if (error.response && error.response.status === 404) {
      return <AuctionViewerBlock>존재하지 않는 경매입니다.</AuctionViewerBlock>;
    }
    return <AuctionViewerBlock>오류 발생!</AuctionViewerBlock>;
  }

  if (loading || !post) {
    return null;
  }

  const { title, body, photo, price, user, productName, publishedDate, auctionPrice } = post;

  return (
    <AuctionViewerBlock>
      <AuctionInfoContainer>
        <ImageContainer>
          <AuctionImage src={photo} alt={productName} />
        </ImageContainer>
        <InfoContent>
          <Section>
            <Title>{user.username}</Title>
          </Section>
          <Section>
            <Title>{title}</Title>
            <ProductInfo>[{productName}]</ProductInfo>
            <ProductBody dangerouslySetInnerHTML={{ __html: body }} />
            <Price>최저 입찰가 {parseInt(price).toLocaleString()}원</Price>
            <DateInfo>{publishedDate}</DateInfo>
          </Section >
          <Price onClick={handlePageRefreshClick} style={{ color: '#007BFF' }}>현재 최고 입찰가 :<br/> {parseInt(auctionPrice).toLocaleString()}원</Price>
          <AuctionButton onClick={openModal}>경매 입찰하기</AuctionButton>
        </InfoContent>
      </AuctionInfoContainer>
      {isModalOpen && <AuctionModal post={post} onClose={closeModal} />}
    </AuctionViewerBlock>
  );
};

export default AuctionViewer;
