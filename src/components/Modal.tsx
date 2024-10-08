import { FC, useEffect, useRef, KeyboardEvent, useState } from "react";
import { Gif } from "../types";
import styled from "styled-components";
import { CloseIcon } from "../assets/icons";
import SkeletonLoader from "./SkeletonLoader";

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

const StyledCloseButton = styled.button`
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

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 0.5rem 0;
`;

const StyledGif = styled.img`
  width: 0;
  aspect-ratio: 1/1;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin: 1rem 0;
  visibility: hidden;
  max-width: 480px;
  &.loaded {
    visibility: visible;
    width: 100%;
  }
`;

const StyledSkeletonContainer = styled.div`
  width: 100%;
  max-width: 480px;
  padding: 1rem 0;
  aspect-ratio: 1/1;
  &.loaded {
    display: none;
  }
`;

const SROnly = styled.span`
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

export const Modal: FC<ModalProps> = ({ gif, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        event.target.classList.contains("modal-overlay")
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey as any);

    // Focus the close button when the modal opens
    closeButtonRef.current?.focus();

    // Save the previously focused element
    const previouslyFocusedElement = document.activeElement as HTMLElement;

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey as any);

      // Restore focus to the previously focused element when the modal closes
      previouslyFocusedElement?.focus();
    };
  }, [onClose]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  return (
    <StyledModalContainer
      className="open modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <StyledModalContent ref={modalRef} onKeyDown={handleKeyDown}>
        <StyledHeader>
          <StyledTitle id="modal-title">
            {gif.title.substring(0, 100)}
            {gif.title.length > 100 ? "..." : ""}
          </StyledTitle>
          <StyledCloseButton
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon />
          </StyledCloseButton>
        </StyledHeader>
        <StyledDivider />
        <StyledSkeletonContainer className={imageLoaded ? "loaded" : ""}>
          <SkeletonLoader />
        </StyledSkeletonContainer>
        <StyledGif
          className={imageLoaded ? "loaded" : ""}
          src={gif.images.original.url}
          loading="lazy"
          alt={gif.alt_text || `GIF: ${gif.title}`}
          onLoad={() => setImageLoaded(true)}
        />
        <SROnly id="modal-description">
          This modal displays a GIF image. Use the Escape key or the close
          button to exit.
        </SROnly>
      </StyledModalContent>
    </StyledModalContainer>
  );
};
