import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          to="/admin/theatres"
          className="px-4 py-2 text-center text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Manage Theatres
        </Link>
        <Link
          to="/admin/halls"
          className="px-4 py-2 text-center text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Manage Halls
        </Link>
        <Link
          to="/admin/movies"
          className="px-4 py-2 text-center text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Manage Movies
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
