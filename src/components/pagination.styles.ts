import styled from "styled-components";

export const PaginationContainer = styled.nav`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin: 1rem;
`;

export const PaginationButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus {
    outline: 2px solid #0056b3;
    outline-offset: 2px;
  }

  &:first-child {
    margin-right: 1rem;
  }
`;
