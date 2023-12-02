// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Import the updated CSS file

const Sidebar = () => {
  return (
    <div className="col-12 col-md-3">
      <ul className="list-group">
      <Link to="/dashboard/" className="list-group-item">
          Dashboard
        </Link>
        <Link to="/dashboard/student/" className="list-group-item">
          Student List
        </Link>
        <Link to="/dashboard/courses" className="list-group-item">
          Courses
        </Link>
        <Link to="/dashboard/enrolled-list/" className="list-group-item">
          Enrolled Students
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
