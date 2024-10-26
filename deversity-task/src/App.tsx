import { useState } from "react";
import "./App.css";
import MarbleBox from "./components/MarbleBox";

type BoxType = { id: number; count: number };

function App() {
  const [boxes, setBoxes] = useState<BoxType[]>([]);

  const totalBoxes = boxes.length;
  const totalMarbles = boxes.reduce((sum, box) => sum + box.count, 0);

  const handleAddBox = () => {
    setBoxes([...boxes, { id: Math.random(), count: 0 }]);
  };

  const handleSetCount = (id: number, newCount: number) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === id ? { ...box, count: newCount } : box
      )
    );
  };

  const handleRemoveBox = (id: number) => {
    setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2">
        <p>Boxes count:</p>
        <p>{totalBoxes}</p>
      </div>
      <div className="flex items-center gap-2">
        <p>Marbles count:</p>
        <p>{totalMarbles}</p>
      </div>
      <button onClick={handleAddBox}>Add new box</button>
      {boxes.length === 0 && <p>No marble boxes, yet</p>}
      {boxes.map((box) => (
        <MarbleBox
          key={box.id}
          count={box.count}
          setCount={(newCount) => handleSetCount(box.id, newCount)}
          removeBox={() => handleRemoveBox(box.id)}
        />
      ))}
    </div>
  );
}

export default App;
