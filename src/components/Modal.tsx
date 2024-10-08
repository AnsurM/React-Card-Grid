import { FC } from "react";
import { Gif } from "../types";
import styled from "styled-components";
import { CloseIcon } from "../assets/icons";

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
  &.open {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 80%;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 1rem;
  gap: 0.5rem;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  max-width: 80%;
`;

const StyledCloseButton = styled.span`
  cursor: pointer;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
  }
`;

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 0.5rem 0;
`;

const StyledGif = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  max-width: 480px;
  max-height: 480px;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin: 1rem 0;
`;

export const Modal: FC<ModalProps> = ({ gif, onClose }) => {
  return (
    <StyledModalContainer className="open">
      <StyledModalContent>
        <StyledHeader>
          <StyledTitle>
            {gif.title.substring(0, 100)}
            {gif.title.length > 100 ? "..." : ""}
          </StyledTitle>
          <StyledCloseButton onClick={onClose}>
            <CloseIcon />
          </StyledCloseButton>
        </StyledHeader>
        <StyledDivider />
        <StyledGif src={gif.images.original.url} alt={gif.alt_text} />
      </StyledModalContent>
    </StyledModalContainer>
  );
};
