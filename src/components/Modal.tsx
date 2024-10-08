import { FC } from "react";
import { Gif } from "../types";

interface ModalProps {
  gif: Gif;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ gif, onClose }) => {
  return (
    <div className="modal">
      <img src={gif.images.original.url} alt={gif.alt_text} />
      <button onClick={onClose}>Close</button>
    </div>
  );
};
