import { FC } from "react";
import { Gif } from "../types";
import styled from "styled-components";

interface ModalProps {
  gif: Gif;
  onClose: () => void;
}

const StyledModalContainer = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  transition: transform 0.3s ease-in-out;
  &.open {
    display: block;
  }
`;

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80%;
  height: 80%;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  // top: 10%;
  // transform: translateY(-10%);
  border-radius: 1rem;
`;

const StyledCloseButton = styled.button`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const StyledTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 1rem;
  text-align: center;
`;

const StyledDivider = styled.div`
  width: 90%;
  height: 1px;
  background-color: #000;
  margin: 1rem 0;
`;

const StyledGif = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  aspect-ratio: 1/1;
  max-width: 480px;
  max-height: 480px;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

export const Modal: FC<ModalProps> = ({ gif, onClose }) => {
  return (
    <StyledModalContainer className="open">
      <StyledModalContent>
        <StyledCloseButton onClick={onClose}>Close</StyledCloseButton>
        <StyledDivider />
        <StyledGif src={gif.images.original.url} alt={gif.alt_text} />
        <StyledTitle>{gif.title}</StyledTitle>
      </StyledModalContent>
    </StyledModalContainer>
  );
};
