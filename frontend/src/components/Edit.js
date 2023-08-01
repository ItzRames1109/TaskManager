import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../Navbar.css';


const Edit = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("pending");

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    
  ];

  const [error, setError] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const getSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`);

      const result = await response.json();
      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("");
        console.log("Updated data: ", result);
        setTask(result.task);
        setDescription(result.description);
        setDeadline(result.deadline);
        setStatus(result.status);
        
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  //Send updated data to backened
  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedUser = { task, description, deadline , status};
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      navigate("/list");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className="text-center">Edit the data</h2>
      <form onSubmit={handleEdit}>
        <div className="mb-3">
          <label className="form-label">Task</label>
          <input
            type="text"
            className="form-control"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Deadline</label>
          <input
            type="date"
            className="form-control"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};


export default Edit;
