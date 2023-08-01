import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';


const Navbar = () => {
   return (
    <>
   <nav className="sticky-navbar">
  <div className="container-fluid">
    <a  className="task-manager" ><b>Task Manager System</b></a>
  </div>
</nav>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse-navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to= "/"className="nav-link">
            Add Task
          </Link>
        </li>
        <li className="nav-item">
          <Link to= "/list" className="nav-link">
            List
            </Link>
        </li>
        <li className="nav-item">
          <Link to = "/update" className="nav-link">Update</Link>
        </li>
      
      </ul>
    </div>
  </div>
</nav>
</>
  )
}

export default Navbar
