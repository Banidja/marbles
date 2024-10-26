import { ReactNode, useEffect, useRef } from "react";

type Props = {
  onHold: () => void;
  disabled?: boolean;
  children: ReactNode;
};

const HoldButton = ({ onHold, disabled, children }: Props) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleMouseDown = () => {
    if (disabled) return;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(onHold, 100);
    }, 500);
  };

  const handleMouseUp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      handleMouseUp();
    };
  }, []);

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      disabled={disabled}
      onClick={onHold}
    >
      {children}
    </button>
  );
};

export default HoldButton;
