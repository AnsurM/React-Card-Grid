import { FC, useCallback, useEffect, useRef, useState } from "react";

// components
import { SkeletonLoader } from "..";

// assets
import { CloseIcon } from "../../assets/icons";

// utils
import { MODAL_TITLE_LENGTH } from "../../utils/constants";
import { Gif } from "../../utils/types";
import { KeyboardHelpers, MouseHelpers } from "../../utils/helpers";
import { CallbackEvent } from "../../utils/helpers/eventListeners";
import { KeyboardEvent } from "../../utils/helpers/keyboardHelpers";

// styles
import * as Styled from "./modal.styles";

interface ModalProps {
  gif: Gif;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ gif, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClickOutside = useCallback(
    (event: CallbackEvent) => {
      if (
        event.target instanceof Element &&
        event.target.classList.contains("modal-overlay")
      ) {
        onClose();
      }
    },
    [onClose]
  );

  const handleEscapeKey = (event: KeyboardEvent) => {
    const keyPressInfo = KeyboardHelpers.getKeyPressInfo(event);
    if (keyPressInfo.isEscape) {
      event.preventDefault();
      onClose();
    }
  };

  MouseHelpers.useMouseDownEventListener(document, handleClickOutside);
  KeyboardHelpers.useKeyDownEventListener(document, (event) =>
    handleEscapeKey(event as unknown as KeyboardEvent)
  );

  const handleKeyDown = (event: KeyboardEvent) => {
    const keyPressInfo = KeyboardHelpers.getKeyPressInfo(event);
    // Prevent default tab behavior and focus the close button
    // Shift + Tab is not needed because isTab will also be true in this case
    if (keyPressInfo.isTab) {
      event.preventDefault();
      closeButtonRef.current?.focus();
    }
  };

  useEffect(() => {
    // Focus the close button when the modal opens
    closeButtonRef.current?.focus();
    // Save the previously focused element
    const previouslyFocusedElement = document.activeElement as HTMLElement;
    return () => {
      // Restore focus to the previously focused element when the modal closes
      previouslyFocusedElement?.focus();
    };
  }, [onClose]);

  return (
    <Styled.ModalContainer
      className="open modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Styled.ModalContent ref={modalRef} onKeyDown={handleKeyDown}>
        <Styled.Header>
          <Styled.Title id="modal-title">
            {gif.title.substring(0, MODAL_TITLE_LENGTH)}
            {gif.title.length > MODAL_TITLE_LENGTH ? "..." : ""}
          </Styled.Title>
          <Styled.CloseButton
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon />
          </Styled.CloseButton>
        </Styled.Header>
        <Styled.Divider />
        {!imageLoaded && (
          <Styled.SkeletonContainer>
            <SkeletonLoader />
          </Styled.SkeletonContainer>
        )}
        <Styled.Gif
          className={imageLoaded ? "loaded" : ""}
          src={gif.images.original.url}
          loading="lazy"
          alt={gif.alt_text || `GIF: ${gif.title}`}
          onLoad={() => setImageLoaded(true)}
        />
        <Styled.SROnly id="modal-description">
          This modal displays a GIF image. Use the Escape key or the close
          button to exit.
        </Styled.SROnly>
      </Styled.ModalContent>
    </Styled.ModalContainer>
  );
};
