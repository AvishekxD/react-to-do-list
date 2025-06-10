import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log("Todos saved to local storage:", todos);
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') {
      console.log("Cannot add empty todo.");
      return;
    }

    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, todo]);
    setNewTodo('');
    console.log("Todo added successfully!");
  };

  const toggleTodoComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    console.log("Todo completion toggled!");
  };

  const handleDeleteClick = (todo) => {
    setTodoToDelete(todo);
    setShowConfirmModal(true);
  };

  const confirmDeleteTodo = () => {
    setTodos(todos.filter((todo) => todo.id !== todoToDelete.id));
    console.log("Todo deleted successfully!");
    setShowConfirmModal(false);
    setTodoToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setTodoToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans antialiased">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">My To-Do List</h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 text-gray-900 placeholder-gray-400"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTodo();
              }
            }}
          />
          <button
            onClick={addTodo}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg sm:rounded-r-lg sm:rounded-l-none shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tasks yet! Add one above.</p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 transition duration-200 hover:shadow-md"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodoComplete(todo.id)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span
                  className={`ml-4 flex-grow text-gray-800 text-lg ${
                    todo.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDeleteClick(todo)}
                  className="ml-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m14 0H5m0 0V5a2 2 0 012-2h4a2 2 0 012 2v2m-3 0h-2"></path>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "
              <span className="font-semibold text-blue-600">
                {todoToDelete?.text}
              </span>"?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md font-semibold transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteTodo}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
