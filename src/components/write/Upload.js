import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const UploadBlock = styled(Responsive)`
  padding-top: 2rem;
  font-size: 1.35rem;
  font-weight: 800;
  color: #3B495B;
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  display: block;
  color: #3B495B;
  padding: 0.7rem;
  text-align: center;
  cursor: pointer;
  border: 1px solid #3B495B;
  border-radius: 5px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;

  label {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
`;

const Upload = ({ title, body, price, productName, onChangeField }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isAuctionActive, setIsAuctionActive] = useState(false);

  const onChangeTitle = e => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  const onChangeBody = e => {
    onChangeField({ key: 'body', value: e.target.value });
  };

  const onChangePrice = e => {
    onChangeField({ key: 'price', value: e.target.value });
  };

  const onChangeProductName = e => {
    onChangeField({ key: 'productName', value: e.target.value });
  };

  const toggleAuction = () => {
    setIsAuctionActive(!isAuctionActive);
    onChangeField({ key: 'auction', value: isAuctionActive ? 'Inactive' : 'Active' });
  };

  useEffect(() => {
    onChangeField({ key: 'auction', value: isAuctionActive ? 'Active' : 'Inactive' });
  }, [isAuctionActive, onChangeField]);  

  const onChangePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
      onChangeField({ key: 'photo', value: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }; 

  return (
    <UploadBlock>
      이미지 업로드
      <ImageLabel htmlFor="imageInput">+</ImageLabel>
      <ImageInput
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={onChangePhoto}
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="이미지 미리보기"
          style={{ maxWidth: '100%', marginTop: '1rem' }}
        />
      )}<br/>
      <FormSection>
        <label>제목</label>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          onChange={onChangeTitle}
          value={title}
        />
      </FormSection>
      <FormSection>
        <label>내용</label>
        <input
          type="text"
          placeholder="게시할 내용을 작성하세요"
          onChange={onChangeBody}
          value={body}
        />
      </FormSection>
      <FormSection>
        <label>제품 명</label>
        <input
          type="text"
          placeholder="제품 명을 정확히 기입해 주세요"
          onChange={onChangeProductName}
          value={productName}
        />
      </FormSection>
      <FormSection>      
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ marginRight: "14px" }}>가격 입력</label>
          <label style={{ marginRight: "4px" }}>
            <input
              type="checkbox"
              checked={isAuctionActive}
              onChange={toggleAuction}
            />
          </label>
          <label style={{ fontSize: "12px" }}>
            {isAuctionActive ? "경매 활성화" : "경매 시작하기"}
          </label>
        </div>
        <input
          type="number"
          placeholder="$ 판매 가격 "
          onChange={onChangePrice}
          value={price}
        />
      </FormSection>
    </UploadBlock>
  );
};

export default Upload;
