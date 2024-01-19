import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

const PostViewerBlock = styled(Responsive)`
  margin-top: 0.5rem;
  padding-bottom: 0.1rem;
  position: relative;
  z-index: 1000; 
`;

const PostImageContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-color: #F5F5F5;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
`;

const PostImage = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 450px; 
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
`;

const InfoContainer = styled.div`
  background-color: #fff;
  border-radius: 7px;
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; 
  top: -0.7rem; 
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #262626;
  margin: 0;
`;

const ProductName = styled.div`
  font-size: 1rem;
  color: #595959;
  margin-top: 1rem;
  font-weight: bold;
  margin-left: 10px;
  text-decoration: underline;
`;

const ProductInfoContainer = styled.div`
  font-weight: bold;
  background-color: #F5F5F5;
  border-radius: 8px; 
  padding: 17px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 5px; 
`;

const ProductInfoContainerSpace = styled.div`
  justify-content: space-between;
  margin-left: 7px;
  display: flex;
`;

const ProductInfo = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: tomato;
`;

const ProductQuality = styled.div`
  font-size: 1rem;
  font-weight: bolder;
  margin-top: 30px; 
  position: relative;
  cursor: pointer;
  text-decoration: ${props => props.isHovered ? 'underline' : 'none'};
  color: ${props => props.quality === '제품 상태 좋음' ? '#007bff' : '#0D47A1'};
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff5722;
  margin-top: 7px; 
`;

const Section = styled.div`
  margin-bottom: 1rem;
  border-bottom: 1px solid #EFEFEF;
  padding-bottom: 1rem;
`;

const PostContent = styled.div`
  font-size: 1.17rem;
  font-weight: bold;
  color: #333;
  line-height: 1.6;
`;

const SoldPost = styled.button`
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.2rem 1rem;
  color: white;
  outline: none; 
  background: orange;
`;

const DamagedImage = styled.img`
  max-width: 35%;
  height: auto;
  max-height: 450px; 
  position: absolute;
  top: 20px;
  right: 20px;
  display: ${props => props.isHovered ? 'block' : 'none'};
`;

const ButtonSpace = styled.div`
  justify-content: space-between;
  display: flex;
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  }

  if (loading || !post) {
    return null;
  }

  const { title, body, photo, price, user, productName, publishedDate, tags, cost, recentPrice, sold, quality, damagedImage } = post;
  const isSold = sold === price;

  return (
    <PostViewerBlock>
      <PostImageContainer>
        <PostImage src={photo} alt={productName} />
      </PostImageContainer>
      <InfoContainer>
        <Title>[제목] {title}</Title>
        <Section/>
        <PostContent style={{ fontSize: '10px', color: '#C2C2C2', marginTop: '1rem' }}>게시물 내용</PostContent>
        <PostContent dangerouslySetInnerHTML={{ __html: body }} />
        <ProductName>제품 정보 : {productName}</ProductName>
        <ProductInfoContainer>
          <ProductInfoContainerSpace>
            <ProductInfo style={{ color: '#328E76' }}>정가 정보 :<br/>{parseInt(cost).toLocaleString()}원</ProductInfo> 
            <ProductInfo style={{ marginRight: '20%' }}>최근 시세 조회 :<br/>{parseInt(recentPrice).toLocaleString()}원</ProductInfo>
          </ProductInfoContainerSpace>
          <div style={{ fontSize: '10px', marginTop: '25px', marginLeft: '7px', color: '#595959' }}> 정가 정보 [네이버 쇼핑] / 최근 시세 조회 [당근 마켓]</div>
        </ProductInfoContainer>
        {isHovered && damagedImage && quality !== '제품 상태 좋음' && (
            <DamagedImage src={damagedImage} alt="이미지 분석 중..." isHovered={isHovered} />
        )}
        <ProductQuality
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isHovered={isHovered}
          quality={quality}
        >
          [ {quality} ]
        </ProductQuality>
        <ButtonSpace>
          <Price>가격 : {parseInt(price).toLocaleString()}원</Price>
          <Price>{isSold && <SoldPost>판매완료</SoldPost>}</Price>
        </ButtonSpace>
        <Section/>
        <SubInfo username={user.username} publishedDate={publishedDate} />
        <ButtonSpace>
          <Tags tags={tags} />         
          {actionButtons}
        </ButtonSpace>          
      </InfoContainer>
    </PostViewerBlock>
  );
};

export default PostViewer;
