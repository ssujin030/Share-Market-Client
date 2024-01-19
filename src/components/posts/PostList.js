import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 1.5rem;
`;

const NavItem = styled.div`
  padding: 0.5rem;
  font-size: 0.7rem;
  font-weight: bold;  
  cursor: pointer;
  border-bottom: ${props => (props.active ? '2px solid #425166' : 'none')};
`;

const PostListBlock = styled(Responsive)`
  margin-top: 1rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  position: fixed;
  margin-left: 447px;
  top: 80%;

  @media (max-width: 768px) { 
    top: 77%;
    margin-left: 77%;
  }
`;

const PostItemBlock = styled.div`
  display: flex;
  flex-direction: row; /* 이미지와 내용을 가로로 배열합니다 */
  align-items: flex-start; /* 내용을 위로 정렬합니다 */
  transition: 0.2s;

  .thumbnail {
    flex: 0 0 40%; /* 이미지 영역이 40%의 너비를 가지도록 설정합니다 */
    margin-right: 1rem; /* 이미지와 내용 사이에 간격을 둡니다 */
    img {
      max-width: 100%;
      height: auto;
    }
  }

  .content {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title {
    font-size: 1.7rem;
    font-weight: bold;  
    &:hover {
      color: #868e96;
    }
  }

  .price {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #ff5722;
  }

  .description {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #495057;
  }

  .info {
    margin-top: 1rem;    
    font-size: 0.875rem;
  }

  & + & {
    margin-top: 1rem; 
    padding-top: 2rem; 
    border-top: 1px solid #e9ecef; 
  }
`;

const PostItem = ({ post }) => {
  const { publishedDate, user, tags, photo, price, title, body, _id } = post;

  return (
    <PostItemBlock>
      <Link to={`/@${user.username}/post/${_id}`} className="thumbnail" style={{ display: 'flex', justifyContent: 'center', backgroundColor: "#FBFBFB" }}>
        {photo && <img src={photo} alt="Post" style={{ maxWidth: '250px', height: '155px' }} />}
      </Link>
      <div className="content">
        <Link to={`/@${user.username}/post/${_id}`} className="title">
          {title}
        </Link>
        <div className="price">$ {parseInt(price).toLocaleString()}</div>
        <div className="description">{body}</div>
        <div className="info">
          <SubInfo
            username={user.username}
            publishedDate={new Date(publishedDate)}
          />
          <Tags tags={tags} />
        </div>
      </div>
    </PostItemBlock>
  );
};

const PostList = ({ posts, loading, error, showWriteButton }) => {    
  const [activeTab, setActiveTab] = useState('게시물');
  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }

  return (
    <PostListBlock>
      <NavBar>
        <NavItem
          active={activeTab === '게시물'}
          onClick={() => handleTabClick('게시물')}
        >
          게시물
        </NavItem>
        <NavItem
          active={activeTab === '옥션'}
          onClick={() => handleTabClick('옥션')}
        >
          옥션
        </NavItem>
      </NavBar>
      {activeTab === '게시물' && !loading && posts && (
        <div>
          {posts
            .filter(post => post.auction === 'Inactive')
            .map(post => (
              <PostItem post={post} key={post._id} />
            ))}
        </div>
      )}
      {activeTab === '옥션' && (
        <div>
          <Link to="/auctionlist" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
            <div style={{ padding: '10px', border: '1px solid #007bff', borderRadius: '5px', cursor: 'pointer', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              경매에 입장하기
            </div>
          </Link>
          <div>
            {posts
              .filter(post => post.auction === 'Active')
              .map(post => (
                <PostItem post={post} key={post._id} />
              ))}
          </div>         
        </div>
      )}
      <WritePostButtonWrapper>
        {showWriteButton && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button
            to="/upload"
            style={{
              borderRadius: '50%',
              background: 'orange',
              width: '50px', 
              height: '50px', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
            }}
          >
            +
          </Button>
          <div 
            style={{ 
              marginTop: '7px', 
              fontSize: '12px', 
              fontWeight: 'bold', 
              color: '#FF8C00',
            }}
          >
            새 글 작성
          </div>
        </div>        
      )}
      </WritePostButtonWrapper>
    </PostListBlock>
  );
};

export default PostList;
