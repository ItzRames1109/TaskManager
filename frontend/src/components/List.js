import React, { useEffect, useState } from "react";
import '../Navbar.css';


const List = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");


  const updateStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        // When update is successful, updating the status in the local data state
        setData((prevData) =>
          prevData.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update status");
    }
  };

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

export default List;
