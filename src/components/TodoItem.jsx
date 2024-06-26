/* eslint-disable react/prop-types */
import { useState } from "react";
import ContextMenu from "./ContextMenu";

const TodoItem = ({ item, onMove }) => {
  const [showContextMent, setShowContextMent] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleRightClick = (e) => {
    e.preventDefault();
    setShowContextMent(true);
    setPosition({ x: e.pageX, y: e.pageY });
  };

  const handleMove = (status) => {
    onMove(item.id, status);
    setShowContextMent(false);
  };

  return (
    <div
      className={`p-4 mb-2 rounded-lg shadow ${
        item.status === "New"
          ? "bg-blue-100"
          : item.status === "Ongoing"
          ? "bg-orange-100"
          : "bg-green-100"
      }`}
      onContextMenu={handleRightClick}
    >
      <h4 className="font-bold">{item.title}</h4>
      <p>{item.description}</p>

      {showContextMent && (
        <div style={{ left: position.x, top: position.y }} className="fixed">
          <ContextMenu onMove={handleMove} />{" "}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
