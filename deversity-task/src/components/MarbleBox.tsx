import { Trash2 } from "lucide-react";
import HoldButton from "./HoldButton";

type Props = {
  count: number;
  setCount: (count: number) => void;
  removeBox: () => void;
};

const MarbleBox = ({ count, setCount, removeBox }: Props) => {
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <HoldButton onHold={handleDecrement} disabled={count === 0}>
        -
      </HoldButton>
      <div>{count}</div>
      <HoldButton onHold={handleIncrement}>+</HoldButton>
      <button onClick={removeBox}>
        <Trash2 />
      </button>
    </div>
  );
};

export default MarbleBox;
