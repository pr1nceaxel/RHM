
import React from 'react';
import { MdPaid } from "react-icons/md";
import { FaCalendarAlt, FaTasks, FaUmbrellaBeach } from "react-icons/fa";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {

  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-700">Bienvenue dans l'espace Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 uppercase">

        <div className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-lg p-6 text-center text-white hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate("/home/employees/list")}>
          <h3 className="text-xl font-semibold mb-2">Nombre d'Employés</h3>
          <p className="text-4xl font-bold">10</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-500 shadow-lg rounded-lg p-6 text-center text-white hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate("/home/employees/counter")}>
          <h3 className="text-xl font-semibold mb-2">Présent Aujourd'hui</h3>
          <p className="text-4xl font-bold">9</p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-red-500 shadow-lg rounded-lg p-6 text-center text-white hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate("/home/payroll/statement")}>
          <h3 className="text-xl font-semibold mb-2">Bulletin de Paie</h3>
          <p className="text-5xl"><MdPaid /></p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg rounded-lg p-6 text-center text-white hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate("/home/absences/absence-calendar")}>
          <h3 className="text-xl font-semibold mb-2">Calendrier</h3>
          <p className="text-5xl"><FaCalendarAlt /></p>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 shadow-lg rounded-lg p-6 text-center text-white hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate("/home/payroll/statement")}>
          <h3 className="text-xl font-semibold mb-2">Tâches</h3>
          <p className="text-5xl"><FaTasks /></p>
        </div>

        {/* <div className="bg-gradient-to-r from-gray-700 to-gray-900 shadow-lg rounded-lg p-6 text-center text-white hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Nouvelles Recrues</h3>
          <p className="text-5xl"><AiOutlineUserAdd /></p>
        </div> */}

        <div className="bg-gradient-to-r from-teal-500 to-green-700 shadow-lg rounded-lg p-6 text-center text-white hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate("/home/company/posts")}>
          <h3 className="text-xl font-semibold mb-2">Groupes d'Équipe</h3>
          <p className="text-5xl"><AiOutlineUsergroupAdd /></p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-green-500 shadow-lg rounded-lg p-6 text-center text-white hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate("/home/absences/leave-request")}>
          <h3 className="text-xl font-semibold mb-2">Congés</h3>
          <p className="text-5xl"><FaUmbrellaBeach /></p>
        </div>
        
      </div>
    </div>
  );
};

