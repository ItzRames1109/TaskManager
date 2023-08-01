import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../Navbar.css';


const Update = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000");
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("Data removed successfully");

        setTimeout(() => {
          setError("");
          getData();
        }, 1000);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      setError("Failed to delete data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Show all data</h2>
      <div className="row">
        {data && data.length > 0 ? (
          <div className="column">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((ele, index) => {
                  const deadlineDate = new Date(ele.deadline);
                  const formattedDeadline = deadlineDate
                    .toISOString()
                    .split("T")[0];

                  return (
                    <tr key={ele._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{ele.task}</td>
                      <td>{ele.description}</td>
                      <td>{formattedDeadline}</td>
                      <td>{ele.status}</td>
                      <td>
                        <a className="card-link" onClick={() => handleDelete(ele._id)}>
                          Delete
                        </a>
                        <Link to={`/${ele._id}`} className="card-link">Edit</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default Update;
