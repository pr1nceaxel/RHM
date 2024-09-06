import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BiExport } from "react-icons/bi";
import { TbFileDownload } from "react-icons/tb";
import dayjs from 'dayjs';


const employees = [
  {  name: 'Prudence Gnamién AMANI',     tto: '136:00h', HS: '2:00h', contract: 'CDI',  CTR: '7:00h' , total: '7:00h',Coût: '0.00' },
  {  name: '  AMANI',                    tto: '102:00h', HS: '2:00h', contract: 'CDD',  CTR: '7:00h' , total: '7:00h',Coût: '0.00' },
  {  name: 'PRINCE',                     tto: '95:00h', HS: '1:00h', contract: 'stage',  CTR: '7:00h' , total: '7:00h',Coût: '0.00' },
  {  name: 'AXEL',                       tto: '95:00h', HS: '00:00h', contract: 'CDI',  CTR: '7:00h' , total: '7:00h',Coût: '0.00' },
];



export default  function CounterHours ()  {
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employees) =>
    employees.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


 const [currentDate, setCurrentDate] = useState(dayjs()); // Date actuelle
  const currentMonth = dayjs(); // Mois courant

  // Naviguer vers le mois précédent
  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  // Ramener au mois courant
  const handleCurrentMonth = () => {
    setCurrentDate(currentMonth);
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  return (
    <div className="w-full  bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">

        <div className="flex items-center ">
          {/* Bouton Mois Précédent */}
          <button
            className="text-gray-500 hover:text-blue-500 border border-slate-300 hover:border-indigo-300 p-1"
            onClick={handlePreviousMonth}
          >
            &lt; 
          </button>


          {/* Bouton Mois Suivant (désactivé si on est au mois courant) */}
          <button
            className="text-gray-500 hover:text-blue-500  border border-slate-300 hover:border-indigo-300 p-1"
            onClick={handleCurrentMonth}
            disabled={currentDate.isSame(currentMonth, 'month')}
          >
            Mois courant
          </button>

          <button
            className="text-gray-500 hover:text-blue-500 border border-slate-300 hover:border-indigo-300 p-1"
            onClick={handleNextMonth}
            disabled={currentDate.isSame(currentMonth, 'month')} // Désactiver si on est déjà au mois courant
          >
            &gt; 
          </button>
          {/* Affichage du mois sélectionné */}
          <span className="font-bold">{currentDate.format('MMMM YYYY')}</span>

        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />

          <svg
            className="absolute left-3 top-2.5 text-gray-400"
            width="16"
            height="16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.44 1.103a5.5 5.5 0 1 1 7.778-7.778 5.5 5.5 0 0 1-7.778 7.778z" />
          </svg>
        </div>

      {/* Bouton de téléchargement */}
      <button className="bg-green-500 text-white flex items-center space-x-2 px-4 py-2 rounded hover:bg-green-600">
        <span>Tout Exporter</span>
        <BiExport />
        </button>
      </div>

      <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Employé</th>
                        <th className="px-4 py-2  text-center">Tps Total Observé</th>
                        <th className="px-4 py-2  text-center">Heure Sup.</th>
                        <th className="px-4 py-2  text-center">Contrat</th>

                        {/* <th className="px-4 py-2 text-left">CTR</th>
                        <th className="px-4 py-2 text-left">Bulletin</th> */}
                        <th className="px-4 py-2 text-left">Coût</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee, index) => (
                        <tr key={index} className="border-t">
                            <td className="px-4 py-2 ">{employee.name}</td>
                            <td className="px-4 py-2 text-center">{employee.tto}</td>
                            <td className="px-4 py-2  text-center">{employee.HS}</td>
                            <td className="px-4 py-2  text-center">{employee.contract}</td>
                            {/* <td className="px-4 py-2">{employee.salary}</td>
                            <td className="px-4 py-2 text-blue-500">
                                <a href={`path/to/${employee.bulletin}`} download>{employee.bulletin}</a>
                            </td> */}
                            <td className="px-4 py-2">
                                <button className="text-blue-500"><TbFileDownload /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

    </div>
  );
};
