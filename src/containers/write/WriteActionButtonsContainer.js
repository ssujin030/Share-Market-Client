import React, { useEffect, useCallback } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeField, writePost, updatePost } from '../../modules/write';

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { photo, title, body, price, productName, tags, post, postError, sold, auction, auctionPrice, auctionName, originalPostId } = useSelector(
    ({ write }) => ({
    photo: write.photo,
    title: write.title,
    body: write.body,
    price: write.price,
    productName: write.productName,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
    sold: write.sold,
    auction: write.auction,
    auctionPrice: write.auctionPrice,
    auctionName: write.auctionName,
    originalPostId: write.originalPostId,
  }),
);

  const onPublish = () => {
    if (originalPostId) {
      dispatch(updatePost({ title, body, price, photo, productName, tags, auction, sold, auctionPrice, auctionName, id: originalPostId }));
      return;
    }
    dispatch(
      writePost({
        title,
        body,
        price,
        photo,
        productName,
        tags,
        sold,
        auction,
        auctionPrice,
        auctionName,
      }),
    );
  };

  const onCancel = () => {
    navigate(-1);
  };

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch]
  );

  const handleSoldClick = () => {
    if (price && !sold) {
      onChangeField({ key: "sold", value: price });
    }
  };

  useEffect(() => {
    if (post) {
      navigate(`/postlist`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigate, post, postError]);
  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
      onSoldClick={handleSoldClick}
    />
  );
};

export default WriteActionButtonsContainer;
