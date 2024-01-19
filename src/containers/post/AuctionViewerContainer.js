import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readPost, unloadPost } from '../../modules/post';
import AuctionViewer from '../../components/post/AuctionViewer';
import { useParams } from 'react-router-dom';

const AuctionViewerContainer = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user,
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  return (
    <AuctionViewer
      post={post}
      loading={loading}
      error={error}
    />
  );
};

export default AuctionViewerContainer;
