import { useEventListener, CallbackEvent } from "./eventListeners";

/**
 * A custom hook to add a mousedown event listener to an element.
 * @param {EventTarget} element - The element to add the event listener to.
 * @param {function} callback - The callback function to call when a mousedown event occurs.
 * @param {CallbackEvent} callback.event - The event object passed to the callback function.
 */
const useMouseDownEventListener = (
  element: EventTarget,
  callback: (event: CallbackEvent) => void
) => {
  useEventListener({ element, eventType: "mousedown", callback });
};

export { useMouseDownEventListener };
