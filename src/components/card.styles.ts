import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 200px;
  aspect-ratio: 1/1;
  position: relative;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  &:hover,
  &:focus {
    transform: scale(1.1);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
`;

export const SkeletonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 60%;
  &.loaded {
    display: none;
  }
`;

export const Title = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 0 0 5px 5px;
`;
