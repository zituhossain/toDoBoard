/* eslint-disable react/prop-types */
const ContextMenu = ({ onMove }) => {
  return (
    <div className="absolute bg-white shadow-lg rounded-lg p-2 z-50">
      <button
        onClick={() => onMove("New")}
        className="block text-left w-full px-4 py-2 text-sm"
      >
        Move to New
      </button>
      <button
        onClick={() => onMove("Ongoing")}
        className="block text-left w-full px-4 py-2 text-sm"
      >
        Move to Ongoing
      </button>
      <button
        onClick={() => onMove("Done")}
        className="block text-left w-full px-4 py-2 text-sm"
      >
        Move to Done
      </button>
    </div>
  );
};

export default ContextMenu;
