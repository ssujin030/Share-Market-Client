import React, { useState } from "react";
import styled, { css } from "styled-components";
import Button from "../common/Button";

const WriteActionButtonsBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 550px;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }

  margin-top: 1.5rem;
  padding-bottom: 5rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }

  ${(props) =>
    props.isComplete &&
    css`
      background-color: orange;
  `}
`;

const WriteActionButtons = ({ onCancel, onPublish, isEdit, onSoldClick }) => {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <WriteActionButtonsBlock>
      {isEdit && (
        <>
          <StyledButton
            onClick={() => {
              setIsComplete(true);
              onSoldClick();
            }}
            isComplete={isComplete}
          >
            {isComplete ? "완료" : "판매 종료 처리"}
          </StyledButton>
        </>
      )}
      <StyledButton onClick={onPublish}>
        게시물 {isEdit ? "수정" : "등록"}
      </StyledButton>
      <StyledButton onClick={onCancel}>취소</StyledButton>
    </WriteActionButtonsBlock>
  );
};

export default WriteActionButtons;
