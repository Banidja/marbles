import { useEffect, useState } from "react";

type HoldButtonProps = {
  onHold: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const HoldButton = ({ onHold, disabled, children }: HoldButtonProps) => {
  const [isHolding, setIsHolding] = useState(false);
  const [isInitialPress, setIsInitialPress] = useState(true);

  useEffect(() => {
    let initialTimeout: ReturnType<typeof setTimeout>;
    let holdInterval: ReturnType<typeof setTimeout>;

    if (isHolding && !disabled) {
      initialTimeout = setTimeout(
        () => {
          onHold();
          holdInterval = setInterval(onHold, 100);
        },
        isInitialPress ? 500 : 0
      );
      setIsInitialPress(false);
    }

    return () => {
      if (isInitialPress && isHolding && !disabled) {
        onHold();
      }
      clearTimeout(initialTimeout);
      clearTimeout(holdInterval);
    };
  }, [isHolding, isInitialPress, onHold, disabled]);

  const handleMouseDown = () => {
    setIsHolding(true);
    setIsInitialPress(true);
  };

  const handleMouseUp = () => {
    setIsHolding(false);
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
