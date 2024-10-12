import { KeyboardEvent as ReactKeyboardEvent } from "react";

type EventElement = HTMLDivElement | HTMLButtonElement;
type KeyboardEvent = ReactKeyboardEvent<EventElement>;

/**
 * Checks if the pressed key is the Enter key.
 * @param {KeyboardEvent} event - The keyboard event object.
 * @returns {boolean} True if the Enter key was pressed, false otherwise.
 */
const isEnterKey = (event: KeyboardEvent) => {
  return event.key === "Enter";
};

/**
 * Checks if the pressed key is the Escape key.
 * @param {KeyboardEvent} event - The keyboard event object.
 * @returns {boolean} True if the Escape key was pressed, false otherwise.
 */
const isEscapeKey = (event: KeyboardEvent) => {
  return event.key === "Escape";
};

/**
 * Checks if the pressed key is the Tab key.
 * @param {KeyboardEvent} event - The keyboard event object.
 * @returns {boolean} True if the Tab key was pressed, false otherwise.
 */
const isTabKey = (event: KeyboardEvent) => {
  return event.key === "Tab";
};

/**
 * Checks if the pressed key combination is Shift + Tab.
 * @param {KeyboardEvent} event - The keyboard event object.
 * @returns {boolean} True if Shift + Tab was pressed, false otherwise.
 */
const isShiftTabKey = (event: KeyboardEvent) => {
  return event.shiftKey && isTabKey(event);
};

/**
 * Checks if the pressed key is the Space key.
 * @param {KeyboardEvent} event - The keyboard event object.
 * @returns {boolean} True if the Space key was pressed, false otherwise.
 */
const isSpaceKey = (event: KeyboardEvent) => {
  return event.key === " ";
};

/**
 * Checks if the pressed key is an arrow key (Left, Right, Up, or Down).
 * @param {KeyboardEvent} event - The keyboard event object.
 * @returns {boolean} True if an arrow key was pressed, false otherwise.
 */
const isArrowKey = (event: KeyboardEvent) => {
  const isLeftArrow = event.key === "ArrowLeft";
  const isRightArrow = event.key === "ArrowRight";
  const isUpArrow = event.key === "ArrowUp";
  const isDownArrow = event.key === "ArrowDown";
  return isLeftArrow || isRightArrow || isUpArrow || isDownArrow;
};

type ArrowKey = "arrowleft" | "arrowright" | "arrowup" | "arrowdown";

/**
 * Represents information about a key press event.
 */
type KeyPressInfo = {
  isSpace: boolean;
  isEnter: boolean;
  isTab: boolean;
  isShiftTab: boolean;
  isEscape: boolean;
  isArrow: boolean;
  arrowKey: ArrowKey | null;
};

/**
 * Retrieves detailed information about a key press event.
 * @param {KeyboardEvent} event - The keyboard event object.
 * @returns {KeyPressInfo} An object containing information about the key press.
 */
const getKeyPressInfo = (event: KeyboardEvent): KeyPressInfo => {
  return {
    isSpace: isSpaceKey(event),
    isEnter: isEnterKey(event),
    isTab: isTabKey(event),
    isShiftTab: isShiftTabKey(event),
    isEscape: isEscapeKey(event),
    isArrow: isArrowKey(event),
    arrowKey: isArrowKey(event) ? (event.key.toLowerCase() as ArrowKey) : null,
  };
};

/**
 * Represents information about a key press event along with the original event.
 */
type KeyPressCallbackInfo = {
  event: KeyboardEvent;
  keyPressInfo: KeyPressInfo;
};

/**
 * Properties for the key press handler function.
 */
type KeyPressHandlerProps = {
  event: KeyboardEvent;
  callback: (keyPressInfo: KeyPressCallbackInfo) => void;
};

/**
 * Handles a key press event and returns detailed information about the key press.
 * @param {KeyPressHandlerProps} props - The properties for the key press handler.
 * @param {KeyboardEvent} props.event - The keyboard event object.
 * @returns {KeyPressCallbackInfo} An object containing the original event and detailed key press information.
 */
const keyPressHandler = ({
  event,
}: KeyPressHandlerProps): KeyPressCallbackInfo => {
  return {
    event,
    keyPressInfo: getKeyPressInfo(event),
  };
};

export { keyPressHandler };
