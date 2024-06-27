/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Datetime from "react-datetime";
import ContextMenu from "./ContextMenu";
import "react-datetime/css/react-datetime.css";
import deleteIcon from "../assets/delete.png";
import ReactDOM from "react-dom";

const TodoItem = ({ item, onMove, onSetDueDate, handleDelete }) => {
  // State to manage visibility and position of the context menu.
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // State to manage the due date and overdue status of the item.
  const [dueDate, setDueDate] = useState(item.dueDate || null);
  const [isOverdue, setIsOverdue] = useState(false);

  // Function to handle right-click event, showing the context menu at the click position.
  const handleRightClick = (e) => {
    e.preventDefault();
    setPosition({ x: e.pageX, y: e.pageY });
    setShowContextMenu(true);
  };

  // Function to handle moving the item to a different status.
  const handleMove = (status) => {
    setShowContextMenu(false);
    onMove(item.id, status);
  };

  // Function to close the context menu.
  const handleCloseContextMenu = () => {
    setShowContextMenu(false);
  };

  // Function to handle the change of due date.
  const handleDateChange = (date) => {
    setDueDate(date);
    onSetDueDate(item.id, date);
  };

  // Effect to check if the item is overdue, runs every second.
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

    // Check every second
    const interval = setInterval(() => {
      checkOverdue();
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [dueDate, item]);

  // Function to get the color for the status label.
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
      {/* Status label in the top right corner */}
      <div
        className={`absolute top-2 right-2 px-1 py-1 rounded text-white text-sm ${getStatusLabelColor(
          item.status
        )}`}
      >
        {item.status}
      </div>

      {/* Overdue label in the top left corner if the task is overdue */}
      {isOverdue && (
        <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white rounded text-sm">
          Overdue
        </div>
      )}

      {/* Task title and description */}
      <h4 className="font-bold text-center mt-4">{item.title}</h4>
      <p className="overflow-hidden text-ellipsis break-words max-h-24">
        {item.description}
      </p>

      {/* Delete button for tasks in the New column */}
      {item.status === "New" && (
        <img
          onClick={() => handleDelete(item.id)}
          src={deleteIcon}
          alt=""
          className="w-4 h-4 cursor-pointer m-auto mt-2"
          title="Delete"
        />
      )}

      {/* Date picker for tasks in the Ongoing column */}
      {item.status === "Ongoing" && (
        <div className="flex mt-2">
          <p className="font-semibold flex justify-start mr-2">Due Date:</p>
          <Datetime value={dueDate} onChange={handleDateChange} />
        </div>
      )}

      {/* Context menu for moving the task */}
      {showContextMenu &&
        ReactDOM.createPortal(
          <div
            style={{ top: position.y, left: position.x }}
            className="absolute"
          >
            <ContextMenu
              currentStatus={item.status}
              onMove={handleMove}
              onClose={handleCloseContextMenu}
            />
          </div>,
          document.body
        )}
    </div>
  );
};

export default TodoItem;
