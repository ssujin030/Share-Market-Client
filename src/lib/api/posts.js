import client from './client';

export const writePost = ({ photo, title, body, price, productName, auction, tags }) =>
    client.post('/api/posts', { photo, title, body, price, productName, auction, tags });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
  return client.get(`/api/posts`, {
    params: { page, username, tag },
  });
};

export const updatePost = ({ id, title, body, photo, price, productName, auction, tags, sold, auctionPrice, auctionName }) =>
  client.patch(`/api/posts/${id}`, {
    title,
    body,
    photo,
    productName,
    price,
    auction,
    tags,
    sold,
    auctionPrice,
    auctionName,
  });

export const removePost = (id) => client.delete(`/api/posts/${id}`);
