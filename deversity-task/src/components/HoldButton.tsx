import { ReactNode, useEffect, useState } from "react";

type HoldButtonProps = {
  onHold: () => void;
  disabled?: boolean;
  children: ReactNode;
};

const HoldButton = ({ onHold, disabled, children }: HoldButtonProps) => {
  const [isPRessing, setisPRessing] = useState(false);
  const [isInitialPress, setIsInitialPress] = useState(true);

  useEffect(() => {
    let initialTimeout: ReturnType<typeof setTimeout>;
    let holdInterval: ReturnType<typeof setTimeout>;

    if (isPRessing && !disabled) {
      initialTimeout = setTimeout(() => {
        setIsInitialPress(false);
        onHold();
        holdInterval = setInterval(onHold, 100);
      }, 500);
    }

    return () => {
      if (isInitialPress && isPRessing && !disabled) onHold();

      clearTimeout(initialTimeout);
      clearTimeout(holdInterval);
    };
  }, [isPRessing, isInitialPress, onHold, disabled]);

  const handleMouseDown = () => {
    setisPRessing(true);
    setIsInitialPress(true);
  };

  const handleMouseUp = () => {
    setisPRessing(false);
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default HoldButton;
