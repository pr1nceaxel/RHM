import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layouts/homelayout';
// Importation des composants pour chaque route
import { Dashboard } from '../screens/Dashboard';
import { EmployeeList } from '../screens/EmployeeList';
import { EmployeeTeam } from '../screens/EmployeeTeam';
import { EmployeeCounter } from '../screens/EmployeeCounter';
import { EmployeeArchive } from '../screens/EmployeeArchive';
import { EmployeeTools } from '../screens/EmployeeTools';
import { LeaveRequest } from '../screens/LeaveRequest';
import { AbsenceCalendar } from '../screens/AbsenceCalendar';
import { LeaveCalendar } from '../screens/LeaveCalendar';
import { LeaveTracking } from '../screens/LeaveTracking';
import { TimeTracking } from '../screens/TimeTracking';
import { Overtime } from '../screens/Overtime';
import { Schedule } from '../screens/Schedule';
import { Payroll } from '../screens/Payroll';
import { Benefits } from '../screens/Benefits';
import { PayrollHistory } from '../screens/PayrollHistory';
import { Posts } from '../screens/Posts';
import { Departments } from '../screens/Departments';
import CreateEmployees from '../screens/CreateEmployees';
import CreateTeams from '../screens/CreateTeams';
import ViewInformationEmploye from '../screens/ViewInformationEmploye';



export const router = createBrowserRouter([
    {
        path: '/',
        element: <h1 className="text-3xl font-bold underline">Hello world!</h1>
    },
    {
        path: '/auth',
        element: <h1 className="text-3xl font-bold underline">Auth</h1>
    },
    {
        path: '/home',
        element: <HomeLayout />,
        children: [
            {
                path: '',
                element: <Dashboard />,
            },
            {
                path: 'employees/list',
                element: <EmployeeList />,
            },
            {
                path: 'employees/create',
                element: <CreateEmployees />,
            },
            {
                path: 'employees/:id',
                element: <ViewInformationEmploye />,
            },
            {
                path: 'employees/team',
                element: <EmployeeTeam />,
            },
            {
                path: 'employees/team/create',
                element: <CreateTeams />,
            },
            {
                path: 'employees/counter',
                element: <EmployeeCounter />,
            },
            {
                path: 'employees/archive',
                element: <EmployeeArchive />,
            },
            {
                path: 'employees/tools',
                element: <EmployeeTools />,
            },
            {
                path: 'absences/leave-request',
                element: <LeaveRequest />,
            },
            {
                path: 'absences/absence-calendar',
                element: <AbsenceCalendar />,
            },
            {
                path: 'absences/leave-calendar',
                element: <LeaveCalendar />,
            },
            {
                path: 'absences/leave-tracking',
                element: <LeaveTracking />,
            },
            {
                path: 'time-management/time-tracking',
                element: <TimeTracking />,
            },
            {
                path: 'time-management/overtime',
                element: <Overtime />,
            },
            {
                path: 'time-management/schedule',
                element: <Schedule />,
            },
            {
                path: 'payroll/statement',
                element: <Payroll />,
            },
            {
                path: 'payroll/benefits',
                element: <Benefits />,
            },
            {
                path: 'payroll/history',
                element: <PayrollHistory />,
            },
            {
                path: 'company/posts',
                element: <Posts />,
            },
            {
                path: 'company/departments',
                element: <Departments />,
            },
        ],
    }
]);
