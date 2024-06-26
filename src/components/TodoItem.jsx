/* eslint-disable react/prop-types */
import { useState } from "react";
import ContextMenu from "./ContextMenu";

const TodoItem = ({ item, onMove }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleRightClick = (e) => {
    e.preventDefault();
    setPosition({ x: e.pageX, y: e.pageY });
    setShowContextMenu(true);
  };

  const handleMove = (status) => {
    setShowContextMenu(false);
    onMove(item.id, status);
  };

  const handleCloseContextMenu = () => {
    setShowContextMenu(false);
  };

  const getStatusLabelColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-500";
      case "Ongoing":
        return "bg-orange-500";
      case "Done":
        return "bg-green-500";
      default:
        return "";
    }
  };

  return (
    <div
      className={`relative p-4 mb-2 rounded-lg shadow ${
        item.status === "New"
          ? "bg-blue-100"
          : item.status === "Ongoing"
          ? "bg-orange-100"
          : "bg-green-100"
      }`}
      onContextMenu={handleRightClick}
    >
      <div
        className={`absolute top-2 right-2 px-1 py-1 rounded text-white text-sm ${getStatusLabelColor(
          item.status
        )}`}
      >
        {item.status}
      </div>
      <h4 className="font-bold">{item.title}</h4>
      <p>{item.description}</p>
      {showContextMenu && (
        <div style={{ top: position.y, left: position.x }} className="">
          <ContextMenu
            currentStatus={item.status}
            onMove={handleMove}
            onClose={handleCloseContextMenu}
          />
        </div>
      )}
    </div>
  );
};

export default TodoItem;
