/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Datetime from "react-datetime";
import ContextMenu from "./ContextMenu";
import "react-datetime/css/react-datetime.css";
import deleteIcon from "../assets/delete.png";

const TodoItem = ({ item, onMove, onSetDueDate, handleDelete }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dueDate, setDueDate] = useState(item.dueDate || null);
  const [isOverdue, setIsOverdue] = useState(false);

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

  const handleDateChange = (date) => {
    setDueDate(date);
    onSetDueDate(item.id, date);
  };

  useEffect(() => {
    const checkOverdue = () => {
      if (
        item.status === "Ongoing" &&
        dueDate &&
        new Date() > new Date(dueDate)
      ) {
        setIsOverdue(true);
      } else {
        setIsOverdue(false);
      }
    };

    checkOverdue();

    const interval = setInterval(() => {
      checkOverdue();
    }, 1000);
    return () => clearInterval(interval);
  }, [dueDate, item]);

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

      {isOverdue && (
        <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white rounded text-sm">
          Overdue
        </div>
      )}

      <h4 className="font-bold text-center mt-4">{item.title}</h4>
      <p className="overflow-hidden text-ellipsis break-words max-h-24">
        {item.description}
      </p>

      {item.status === "New" && (
        <img
          onClick={() => handleDelete(item.id)}
          src={deleteIcon}
          alt=""
          className="w-4 h-4 cursor-pointer m-auto mt-2"
        />
      )}

      {item.status === "Ongoing" && (
        <div className="flex mt-2">
          <p className="font-semibold flex justify-start mr-2">Due Date:</p>
          <Datetime value={dueDate} onChange={handleDateChange} />
        </div>
      )}

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
