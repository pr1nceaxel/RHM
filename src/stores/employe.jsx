import { create } from 'zustand';
import { getEmployees } from '../api/employe';


const useEmployeeStore = create((set) => ({
  employees: [],

  loadEmployees: async () => {
    try {
      const response = await getEmployees();
      if (response && response.data) {
        const employees = response.data.map(emp => ({
          ...emp,
          department: emp.department ? emp.department.name : "N/A", // Extraire le nom du département
        }));
        set({ employees });
      }
    } catch (error) {
      console.error("Failed to load employees:", error);
    }
  },

  removeEmployee: (id) => {
    set((state) => ({
      employees: state.employees.filter(employee => employee.id !== id),
    }));
  },

  addEmployee: (employee) => {
    set((state) => ({
      employees: [...state.employees, employee],
    }));
  },

  updateEmployee: (updatedEmployee) => {
    set((state) => ({
      employees: state.employees.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      ),
    }));
  },
}));

export default useEmployeeStore;
