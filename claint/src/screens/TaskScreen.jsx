// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getTasks, createTask, updateTask } from "../api";

// const TaskScreen = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     dueDate: "",
//     priority: "low",
//     status: "pending",
//   });

//   useEffect(() => {
//     if (id) {
//       const fetchTask = async () => {
//         const token = localStorage.getItem("token");
//         const tasks = await getTasks(token);
//         const task = tasks.find((t) => t._id === id);

//         if (task) {
//           setFormData({
//             title: task.title,
//             description: task.description,
//             dueDate: task.due_date, // Map correctly to frontend
//             priority: task.priority,
//             status: task.status,
//           });
//         }
//       };
//       fetchTask();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     // Transform the form data before sending it to the backend
//     const payload = {
//       ...formData,
//       due_date: formData.dueDate, // Rename dueDate to due_date for backend compatibility
//     };

//     delete payload.dueDate; // Remove camelCase property if needed

//     if (id) {
//       await updateTask(id, payload, token);
//     } else {
//       await createTask(payload, token);
//     }
//     navigate("/");
//   };

//   const handleCancel = () => navigate("/");

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
//           {id ? "Edit Task" : "Create Task"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-600">
//               Task Title
//             </label>
//             <input
//               id="title"
//               name="title"
//               type="text"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter task title"
//             />
//           </div>
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-600">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter task description"
//             />
//           </div>
//           <div>
//             <label htmlFor="dueDate" className="block text-sm font-medium text-gray-600">
//               Due Date
//             </label>
//             <input
//               id="dueDate"
//               name="dueDate"
//               type="date"
//               value={formData.dueDate}
//               onChange={handleChange}
//               required
//               className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="priority" className="block text-sm font-medium text-gray-600">
//               Priority
//             </label>
//             <select
//               id="priority"
//               name="priority"
//               value={formData.priority}
//               onChange={handleChange}
//               className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </div>
//           <div>
//             <label htmlFor="status" className="block text-sm font-medium text-gray-600">
//               Status
//             </label>
//             <select
//               id="status"
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="pending">Pending</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//           <div className="flex justify-between space-x-4">
//             <button
//               type="submit"
//               className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
//             >
//               Save Task
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="w-full py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-400"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TaskScreen;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTasks, createTask, updateTask } from "../api";

const TaskScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    status: "pending",
  });

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const token = localStorage.getItem("token");
        const tasks = await getTasks(token);
        const task = tasks.find((t) => t._id === id);

        if (task) {
          setFormData({
            title: task.title,
            description: task.description,
            dueDate: task.due_date,
            priority: task.priority,
            status: task.status,
          });
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = { ...formData, due_date: formData.dueDate };
    delete payload.dueDate;

    if (id) {
      await updateTask(id, payload, token);
    } else {
      await createTask(payload, token);
    }
    navigate("/");
  };

  const handleCancel = () => navigate("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          {id ? "Edit Task" : "Create Task"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
              placeholder="Task Title"
            />
          </div>
          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
              placeholder="Task Description"
            />
          </div>
          <div>
            <input
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full p-3 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="p-3 border border-white/30 rounded-lg bg-transparent text-white focus:ring-2 focus:ring-white"
            >
              <option className="text-black" value="low">Low</option>
              <option className="text-black" value="medium">Medium</option>
              <option className="text-black" value="high">High</option>
            </select>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-3 border border-white/30 rounded-lg bg-transparent text-white focus:ring-2 focus:ring-white"
            >
              <option className="text-black" value="pending">Pending</option>
              <option className="text-black" value="completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-between space-x-4 mt-4">
            <button
              type="submit"
              className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition"
            >
              Save Task
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskScreen;