import styled from "styled-components";

export const ModalContainer = styled.div`
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

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-height: 80%;
  max-width: 80%;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 1rem;
  gap: 0.5rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  max-width: 80%;
`;

export const CloseButton = styled.button`
  cursor: pointer;
  color: #000;
  background: none;
  border: none;
  border-radius: 25%;
  padding: 0.25rem;
  &:hover,
  &:focus {
    text-decoration: none;
    outline: 2px solid #007bff;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.25);
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 0.5rem 0;
`;

export const Gif = styled.img`
  width: 0;
  aspect-ratio: 1/1;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin: auto 0;
  visibility: hidden;
  max-width: 480px;
  &.loaded {
    visibility: visible;
    width: 100%;
  }
`;

export const SkeletonContainer = styled.div`
  width: 100%;
  max-width: 480px;
  padding: 1rem 0;
  aspect-ratio: 1/1;
`;

export const SROnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
