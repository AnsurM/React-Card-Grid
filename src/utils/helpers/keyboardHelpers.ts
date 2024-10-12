import { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEventListener, CallbackEvent } from "./eventListeners";

/**
 * Type representing the event element for keyboard events.
 */
type EventElement = HTMLDivElement | HTMLButtonElement;

/**
 * Type representing a keyboard event, extending React's KeyboardEvent.
 */
export type KeyboardEvent = ReactKeyboardEvent<EventElement>;

/**
 * Enum representing keyboard key codes.
 * This enum provides a mapping of common keyboard keys to their lowercase string representations.
 */
enum KeyDictionary {
  LEFT = "arrowleft",
  RIGHT = "arrowright",
  UP = "arrowup",
  DOWN = "arrowdown",
  ENTER = "enter",
  SPACE = " ",
  ESCAPE = "escape",
  TAB = "tab",
}

/**
 * Type representing arrow keys.
 */
type ArrowKey =
  | KeyDictionary.LEFT
  | KeyDictionary.RIGHT
  | KeyDictionary.UP
  | KeyDictionary.DOWN;

/**
 * Type representing a key check function.
 */
type KeyCheckFunction = (event: KeyboardEvent) => boolean;

/**
 * Object storing key check functions for each key in the KeyDictionary.
 */
const keyChecks: Record<keyof typeof KeyDictionary, KeyCheckFunction> = {
  LEFT: (event) => event.key.toLowerCase() === KeyDictionary.LEFT,
  RIGHT: (event) => event.key.toLowerCase() === KeyDictionary.RIGHT,
  UP: (event) => event.key.toLowerCase() === KeyDictionary.UP,
  DOWN: (event) => event.key.toLowerCase() === KeyDictionary.DOWN,
  ENTER: (event) => event.key.toLowerCase() === KeyDictionary.ENTER,
  SPACE: (event) => event.key.toLowerCase() === KeyDictionary.SPACE,
  ESCAPE: (event) => event.key.toLowerCase() === KeyDictionary.ESCAPE,
  TAB: (event) => event.key.toLowerCase() === KeyDictionary.TAB,
};

/**
 * Individual key check functions using the keyChecks object.
 */
const isEnterKey: KeyCheckFunction = keyChecks.ENTER;
const isEscapeKey: KeyCheckFunction = keyChecks.ESCAPE;
const isTabKey: KeyCheckFunction = keyChecks.TAB;
const isSpaceKey: KeyCheckFunction = keyChecks.SPACE;

/**
 * Checks if the pressed key combination is Shift + Tab.
 * @param {KeyboardEvent} event - The keyboard event object.
 * @returns {boolean} True if Shift + Tab was pressed, false otherwise.
 */
const isShiftTabKey = (event: KeyboardEvent) => {
  return event.shiftKey && isTabKey(event);
};

/**
/**
 * Checks if the pressed key is an arrow key (Left, Right, Up or Down).
 * @param {KeyboardEvent} event - The keyboard event object.
 * @returns {boolean} True if an arrow key was pressed, false otherwise.
 */
const isArrowKey = (event: KeyboardEvent) => {
  return ["LEFT", "RIGHT", "UP", "DOWN"].some((key) =>
    keyChecks[key as keyof typeof KeyDictionary](event)
  );
};

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
 * A custom hook to add a keydown event listener to an element.
 * @param {EventTarget} element - The element to add the event listener to.
 * @param {function} callback - The callback function to call when a keydown event occurs.
 * @param {CallbackEvent} callback.event - The event object passed to the callback function.
 */
const useKeyDownEventListener = (
  element: EventTarget,
  callback: (event: CallbackEvent) => void
) => {
  useEventListener({ element, eventType: "keydown", callback });
};

/**
 * Represents information about navigation based on keyboard input.
 */
type NavigationInfo = {
  /** Indicates if the navigation is to the next item */
  isNext: boolean;
  /** Indicates if the navigation is to the previous item */
  isPrevious: boolean;
};

/**
 * Determines the navigation direction based on the keyboard event input.
 * Down or Right arrow keys navigate to the next, while Up or Left arrow keys navigate to the previous.
 * @param {KeyboardEvent} event - The keyboard event object.
 * @returns {NavigationInfo} An object containing information about the navigation direction.
 */
const getNavigationInfo = (event: KeyboardEvent): NavigationInfo => {
  const { isArrow, arrowKey } = getKeyPressInfo(event);
  const isNext =
    isArrow &&
    (arrowKey === KeyDictionary.RIGHT || arrowKey === KeyDictionary.DOWN);
  return { isNext, isPrevious: isArrow && !isNext };
};

/**
 * Determines if a keyboard event represents a "click" action.
 * This function checks if the event is triggered by either the Space or Enter key.
 *
 * @param {KeyboardEvent} event - The keyboard event to check.
 * @returns {boolean} True if the event is a Space or Enter key press, false otherwise.
 */
const isKeyboardClick = (event: KeyboardEvent) => {
  return isSpaceKey(event) || isEnterKey(event);
};

/**
 * Export types and functions for use in other modules.
 */
export type { KeyPressInfo, NavigationInfo };
export {
  useKeyDownEventListener,
  getKeyPressInfo,
  getNavigationInfo,
  isKeyboardClick,
};
