"use client";

import React, { useState, useEffect } from "react";

// Define the structure of a task
interface Task {
  id: number; // Unique identifier for each task
  text: string; // Task description
  completed: boolean; // Whether the task is completed
}

export default function ToDo() {
  const [inputValue, setInputValue] = useState(""); // Input value state
  const [tasks, setTasks] = useState<Task[]>([]); // Task list state

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks)); // Convert JSON string to JavaScript object
    }
  }, []); // Run only once when the component loads

  // Save tasks to localStorage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Convert JavaScript object to JSON string
  }, [tasks]); // Run only when `tasks` changes

  // Add a new task to the list
  const addTask = () => {
    if (inputValue !== "") {
      const NewTask = {
        id: Date.now(), // Generate a unique ID based on the current time
        text: inputValue, // Use the input value as the task text
        completed: false, // New tasks are not completed by default
      };

      setTasks([...tasks, NewTask]); // Add the new task to the tasks array
      setInputValue(""); // Clear the input field
    }
  };

  // Remove a task from the list by its ID
  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id); // Keep only tasks that don't match the ID
    setTasks(updatedTasks); // Update the state with the filtered list
  };

  // Toggle the completion status of a task
  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }; // Flip the `completed` status
      }
      return task; // Leave other tasks unchanged
    });
    setTasks(updatedTasks); // Save the updated list
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4 text-center">My Todo App</h1>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload
            addTask();
          }}
          className="flex gap-2 mb-4"
        >
          <input
            type="text"
            placeholder="Enter your tasks"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white font-medium"
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-gray-700 rounded-md"
            >
              {/* Checkbox and Task Text */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="w-5 h-5 accent-blue-500"
                />
                <span
                  className={`text-lg ${
                    task.completed ? "line-through text-gray-400" : "text-white"
                  }`}
                >
                  {task.text}
                </span>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeTask(task.id)}
                className="p-2 bg-red-500 rounded-md hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
