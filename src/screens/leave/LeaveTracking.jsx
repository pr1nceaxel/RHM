import React, { useState } from 'react';

const employees = [
  {
    id: 1,
    name: 'VIANNEY bro',
    leavePeriods: [{ start: new Date(2024, 8, 29), end: new Date(2024, 8, 31), status: 'Repos' }],
  },
  {
    id: 2,
    name: 'bernard',
    leavePeriods: [{ start: new Date(2024, 8, 1), end: new Date(2024, 8, 5), status: 'Repos' }],
  },
  {
    id: 3,
    name: 'ange',
    leavePeriods: [{ start: new Date(2024, 8, 7), end: new Date(2024, 8, 14), status: 'Repos' }],
  },
  {
    id: 4,
    name: 'koffi',
    leavePeriods: [{ start: new Date(2024, 0, 1), end: new Date(2024, 0, 2), status: 'Repos' }],
  },
];

export const LeaveTracking = () => {
  const [date, setDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // Gestion de la vue semaine/mois
  const [gotoDate, setGotoDate] = useState(''); // Stocke la date pour la fonction "Aller à"
  const [selectedLeave, setSelectedLeave] = useState(null); // État pour afficher ou cacher les détails du congé
  const [showForm, setShowForm] = useState(false); // État pour afficher ou cacher le formulaire

  // Fonction pour mettre à jour la date sélectionnée
  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Fonction pour avancer ou reculer d'une semaine ou d'un mois
  const changeDate = (direction) => {
    const newDate = new Date(date);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + direction * 7); // Avance/Recul d'une semaine
    } else {
      newDate.setMonth(newDate.getMonth() + direction); // Avance/Recul d'un mois
    }
    setDate(newDate);
  };

  // Fonction pour afficher les événements sur les jours
  const getEventsForDate = (employee, currentDate) => {
    return employee.leavePeriods.find((period) => currentDate >= period.start && currentDate <= period.end);
  };

  // Fonction pour aller à une date spécifique
  const goToSpecificDate = () => {
    if (gotoDate) {
      const newDate = new Date(gotoDate);
      setDate(newDate);
    }
  };

  // Fonction pour gérer la sélection d'un congé
  const handleLeaveClick = (employee, leavePeriod) => {
    setSelectedLeave({ employee, leavePeriod });
  };

  // Fonction pour cacher les détails
  const handleCloseDetails = () => {
    setSelectedLeave(null);
  };

  // Fonction pour ouvrir le formulaire
  const handleOpenForm = () => {
    setShowForm(true);
  };

  // Fonction pour fermer le formulaire
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Fonction pour soumettre le formulaire (cela peut être adapté pour ajouter réellement un congé)
  const handleSubmitForm = (event) => {
    event.preventDefault();
    // Logique pour ajouter un congé
    handleCloseForm(); // Ferme le formulaire après soumission
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Navbar */}
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-6">
        <button onClick={handleOpenForm} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Créer</button>

        {/* Option Aller à une date */}
        <div>
          <input
            type="date"
            value={gotoDate}
            onChange={(e) => setGotoDate(e.target.value)}
            className="border px-4 py-2 rounded-lg mx-3"
          />
          <button onClick={goToSpecificDate} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Aller à
          </button>
        </div>

        <input type="text" placeholder="Salariés" className="border px-4 py-2 rounded-lg" />
        <div className="flex space-x-4 items-center">
          <button onClick={() => setDate(new Date())} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Aujourd'hui
          </button>
          <button onClick={() => setViewMode('week')} className="text-gray-500">
            Semaine
          </button>
          <button onClick={() => setViewMode('month')} className="text-gray-500">
            Mois
          </button>
        </div>
      </div>

      {/* Contrôles de navigation du calendrier */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeDate(-1)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
          Précédent
        </button>
        <span className="text-xl font-semibold">
          {date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={() => changeDate(1)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
          Suivant
        </button>
      </div>

      {/* Affichage du calendrier par semaine ou mois */}
      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th className="p-2">Employé</th>
              {[...Array(viewMode === 'week' ? 7 : 30)].map((_, i) => {
                const currentDate = new Date(date);
                currentDate.setDate(date.getDate() + i);
                return (
                  <th key={i} className="p-2">
                    {currentDate.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{employee.name}</td>
                {[...Array(viewMode === 'week' ? 7 : 30)].map((_, i) => {
                  const currentDate = new Date(date);
                  currentDate.setDate(date.getDate() + i);
                  const event = getEventsForDate(employee, currentDate);
                  return (
                    <td
                      key={i}
                      className={`p-2 ${event ? 'bg-teal-500 text-white cursor-pointer' : 'bg-gray-100'}`}
                      onClick={() => event && handleLeaveClick(employee, event)}
                    >
                      {event ? <div className="rounded-lg p-2">{event.status}</div> : <span>-</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Détails du congé avec animation de panneau */}
      {selectedLeave && (
        <div
          className={`fixed top-0 right-0 z-50 w-1/3 h-full bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
            selectedLeave ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ marginTop: '64px' }} // Ajustement pour éviter que l'en-tête ne cache les détails
        >
          <button
            onClick={handleCloseDetails}
            className="bg-red-500 text-white px-4 py-2 rounded-lg absolute top-4 right-4"
          >
            Fermer
          </button>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Détails du congé</h3>
            <p>
              <strong>Employé:</strong> {selectedLeave.employee.name}
            </p>
            <p>
              <strong>Statut:</strong> {selectedLeave.leavePeriod.status}
            </p>
            <p>
              <strong>Début:</strong> {selectedLeave.leavePeriod.start.toLocaleDateString()}
            </p>
            <p>
              <strong>Fin:</strong> {selectedLeave.leavePeriod.end.toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* Formulaire d'ajout de congé avec animation */}
      {showForm && (
        <div
          className={`fixed top-0 right-0 z-50 w-1/3 h-full bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
            showForm ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ marginTop: '64px' }} // Ajustement pour éviter que l'en-tête ne cache le formulaire
        >
          <button
            onClick={handleCloseForm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg absolute top-4 right-4"
          >
            Fermer
          </button>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Ajouter un congé</h3>
            <form onSubmit={handleSubmitForm}>
              <div className="mb-4">
                <label className="block text-gray-700">Employé</label>
                <input type="text" className="border px-4 py-2 rounded-lg w-full" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Début</label>
                <input type="date" className="border px-4 py-2 rounded-lg w-full" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Fin</label>
                <input type="date" className="border px-4 py-2 rounded-lg w-full" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Statut</label>
                <select className="border px-4 py-2 rounded-lg w-full" required>
                  <option value="Repos">Repos</option>
                  <option value="Congé maladie">Congé maladie</option>
                  <option value="Vacances">Vacances</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
