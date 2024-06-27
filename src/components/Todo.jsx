import { useEffect, useState } from "react";
import Column from "./Column";

const Todo = () => {
  // Initialize state for todo items. If there are items in localStorage, use those; otherwise, start with an empty array.
  const [items, setItems] = useState(
    localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : []
  );

  // Initialize state for the unique identifier for new items.
  const [id, setId] = useState(1);

  // Function to handle adding a new item to the list.
  const handleAdd = (item) => {
    setItems([...items, { ...item, id: id, status: "New", dueDate: null }]);
    setId(id + 1);
  };

  // Function to handle moving an item to a different status column.
  const handleMove = (itemId, status) => {
    setItems(
      items.map((item) => (item.id === itemId ? { ...item, status } : item))
    );
  };

  // Function to handle setting the due date for an item.
  const handleDueDate = (itemId, dueDate) => {
    setItems(
      items.map((item) => (item.id === itemId ? { ...item, dueDate } : item))
    );
  };

  // Function to handle deleting an item from the list.
  const handleDelete = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  // Helper function to filter items by their status.
  const filterItemsByStatus = (status) => {
    return items.filter((item) => item.status === status);
  };

  // Use useEffect to save items to localStorage whenever the items state changes.
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="min-h-screen min-w[400px] bg-blue-950 p-4">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Todo List Application
      </h1>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* New column where new tasks can be added */}
        <Column
          title="New"
          items={filterItemsByStatus("New")}
          onAdd={handleAdd}
          onMove={handleMove}
          handleDelete={handleDelete}
        />
        {/* Ongoing column where tasks can be moved to and due dates set */}
        <Column
          title="Ongoing"
          items={filterItemsByStatus("Ongoing")}
          onAdd={() => {}}
          onMove={handleMove}
          onSetDueDate={handleDueDate}
        />
        {/* Done column where completed tasks can be moved */}
        <Column
          title="Done"
          items={filterItemsByStatus("Done")}
          onAdd={() => {}}
          onMove={handleMove}
        />
      </div>
    </div>
  );
};

export default Todo;
