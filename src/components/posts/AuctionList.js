import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  display: flex;
  overflow: auto;
  gap: 1rem; 
  justify-content: center;
  margin-top: 2rem;
  padding-bottom: 1rem;
`;

const PostItemBlock = styled.div`
  width: 170px; 
  height: 255px; 
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-block;

  .thumbnail {
    img {
      width: 100%;
      height: 120px; 
      object-fit: cover;
    }
  }

  .content {
    padding: 1rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .title {
      font-size: 1.2rem; 
      font-weight: bold;
      color: #007bff;
      margin-bottom: 0.5rem;
      &:hover {
        color: #0056b3;
      }
    }

    .price {
      font-size: 1rem; 
      font-weight: bold;
      color: #ff5722;
      margin-top: 0.5rem;
    }

    .description {
      font-size: 0.9rem; 
      color: #555;
      margin-top: 0.5rem;
    }

    .info {
      font-size: 0.7rem; 
      color: #888;
      margin-top: 0.5rem;
    }
  }

  & + & {
    margin-top: 0;
  }
`;

const PostItem = ({ post }) => {
  const { publishedDate, user, tags, photo, price, title, productName, _id } = post;

  return (
    <PostItemBlock>
      <Link to={`/@${user.username}/auction/${_id}`} className="thumbnail">
        {photo && <img src={photo} alt="Post" />}
      </Link>
      <div className="content">
        <Link to={`/@${user.username}/auction/${_id}`} className="title">
          {title}
        </Link>
        <div className="price">$ {parseInt(price).toLocaleString()}</div>
        <div className="description">{productName}</div>
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

const AuctionList = ({ posts, loading, error }) => {
  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }

  return (
    <PostListBlock>
      {!loading && posts && (
        <div>
          {posts
            .filter(post => post.auction === 'Active')
            .map(post => (
              <PostItem post={post} key={post._id} />
            ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default AuctionList;
