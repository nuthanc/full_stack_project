import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/admin/theatres">Manage Theatres</Link>
        </li>
        <li>
          <Link to="/admin/halls">Manage Halls</Link>
        </li>
        <li>
          <Link to="/admin/movies">Manage Movies</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
