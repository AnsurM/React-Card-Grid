import { useEffect } from "react";

type EventType =
  | "keydown"
  | "mousedown"
  | "click"
  | "focus"
  | "resize"
  | "scroll";

type CallbackEvent = Event | KeyboardEvent | MouseEvent;

type UseEventListenerProps = {
  element: EventTarget;
  eventType: EventType;
  callback: (event: CallbackEvent) => void;
};

/**
 * A custom hook to add an event listener to an element.
 * @param {UseEventListenerProps} props - The props for the useEventListener hook.
 * @param {EventTarget} props.element - The element to add the event listener to. Defaults to the document.
 * @param {string} props.eventType - The type of event to listen for.
 * @param {function} props.callback - The callback function to call when the event occurs.
 */
const useEventListener = ({
  element,
  eventType,
  callback,
}: UseEventListenerProps) => {
  if (!element || !eventType || !callback) {
    throw new Error(
      "Not enough arguments for useEventListener. element, eventType and callback are required."
    );
  }

  useEffect(() => {
    element.addEventListener(eventType, callback);
    return () => element.removeEventListener(eventType, callback);
  }, [eventType, callback, element]);
};

export type { CallbackEvent };
export { useEventListener };
