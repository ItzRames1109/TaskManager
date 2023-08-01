

import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Navbar.css';


const Addtask = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("pending");
  

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
  ];
    
  const [error, setError] = useState("");

  const navigate = useNavigate();
  console.log(task, description, deadline, status);

  const handleSubmit = async (e)=> {
      e.preventDefault();
      const addUser = {task, description, deadline, status}
      const response = await fetch(`http://localhost:5000/`, {
        method : "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addUser),

      });
      const result = await response.json();

      if(!response.ok) {
        console.log(result.error);
        setError(result.error);
      }
      if(response.ok) {
        console.log(result);
        setError("");
        setTask("");
        setDescription("");
        setDeadline("");
        setStatus("");
        navigate("/list");
      }
    };




    
  return (
    <div className='container'>
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className='text-center'>Enter the data</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label">Task</label>
    <input type="text" className="form-control" value={task} onChange={(e) => setTask(e.target.value)} />
  </div>
  <div className="mb-3">
    <label className="form-label">Description</label>
    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Deadline</label>
    <input type="date" className="form-control" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
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
          <td></td>
    <button type="submit" className="btn-btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Addtask;
