import React from "react";
import styled, { css } from "styled-components";
import { Link } from 'react-router-dom';

const buttonStyle = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: Bolder;
    padding: 0.25rem 1rem;
    color: white;
    outline: none; 
    cursor: pointer;
    background: #44546A;
    &:hover {
        background: #7F93AD;
    }
    &:disabled {
        background: #dee2e6;
        color: abd5bd;
        cursor: not-allowed;
    }
`;

const StyledButton = styled.button`
    ${buttonStyle}
`;

const StyledLink = styled(Link)`
    ${buttonStyle}
`;

const Button = props => {
    return props.to ? (
        <StyledLink {...props} />
    ) : (
        <StyledButton {...props} />
    );
};

export default Button;
