/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const ContextMenu = ({ currentStatus, onMove, onClose }) => {
  const ref = useRef();

  // Define the available move options based on the current status
  const moveOptions = {
    New: ["Ongoing", "Done"],
    Ongoing: ["New", "Done"],
    Done: ["New", "Ongoing"],
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the context menu if the click is outside of the ref element
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener for mousedown
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={ref} className="absolute bg-white shadow-lg rounded-lg p-2 z-50">
      {/* Render move options based on the current status */}
      {moveOptions[currentStatus].map((status) => (
        <button
          key={status}
          onClick={() => onMove(status)}
          className="block w-full text-left px-4 py-2 text-sm"
        >
          Move to {status}
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;
