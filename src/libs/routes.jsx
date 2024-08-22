import { createBrowserRouter } from "react-router-dom";

// Layouts
import HomeLayout from "../layouts/homelayout";
import EmployeLayout from "../layouts/EmployeLayout";
import RequireAuth from "../layouts/RequireAuth";
import NotRequireAuth from "../layouts/NotRequireAuth";

// Screens
import { Dashboard } from "../screens/Dashboard";
import { EmployeList } from "../screens/employe/Employe_list";
import EmployeCard from "../screens/employe/Employe_card";
import CreateEmploye from "../screens/employe/Employe_create";
import { EmployeCounter } from "../screens/employe/Employe_counter";
import ViewInformationEmploye from "../screens/employe/ViewInformationEmploye";
import { EmployeTeam } from "../screens/employe/Employe_team";
import CreateTeams from "../screens/entreprise/CreateTeams";
import EmployeArchive  from "../screens/employe/Employe_archive";
import { EmployeTools } from "../screens/employe/Employe_tools";
import { LeaveRequest } from "../screens/leave/LeaveRequest";
import { AbsenceCalendar } from "../screens/leave/AbsenceCalendar";
import { LeaveCalendar } from "../screens/leave/LeaveCalendar";
import { LeaveTracking } from "../screens/leave/LeaveTracking";
import { TimeTracking } from "../screens/time/TimeTracking";
import { Overtime } from "../screens/time/Overtime";
import { Schedule } from "../screens/time/Schedule";
import { Posts } from "../screens/entreprise/Posts";
import CreatePosts from "../screens/entreprise/CreatePosts";
import { Departments } from "../screens/departement/Departments";
import LoginPage from "../screens/auth/LoginPage";
import LoginCompany from "../screens/auth/LoginCompany";

export const router = createBrowserRouter([
  {
    element: <NotRequireAuth />,
    children: [
      {
        path: "/auth",
        element: <LoginPage />,
      },
      {
        path: "/auth/company",
        element: <LoginCompany />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "employees/",
            element: <EmployeLayout />,
            children: [
              {
                path: "",
                element: <EmployeCard />,
              },
              {
                path: "list",
                element: <EmployeList />,
              },
            ],
          },
          {
            path: "employees/create",
            element: <CreateEmploye />,
          },
          {
            path: "employees/:id",
            element: <ViewInformationEmploye />,
          },
          {
            path: "employees/team",
            element: <EmployeTeam />,
          },
          {
            path: "employees/team/create",
            element: <CreateTeams />,
          },
          {
            path: "employees/counter",
            element: <EmployeCounter />,
            children: [
              {
                path: "",
                element: <p>presence</p>,
              },
              {
                path: "pointage",
                element: <p>pointage</p>,
              },
              {
                path: "compteur-heure",
                element: <p>compteur-heure</p>,
              },
            ],
          },
          {
            path: "employees/archive",
            element: <EmployeArchive />,
          },
          {
            path: "employees/tools",
            element: <EmployeTools />,
          },
          {
            path: "absences/leave-request",
            element: <LeaveRequest />,
          },
          {
            path: "absences/absence-calendar",
            element: <AbsenceCalendar />,
          },
          {
            path: "absences/leave-calendar",
            element: <LeaveCalendar />,
          },
          {
            path: "absences/leave-tracking",
            element: <LeaveTracking />,
          },
          {
            path: "time-management/time-tracking",
            element: <TimeTracking />,
          },
          {
            path: "time-management/overtime",
            element: <Overtime />,
          },
          {
            path: "time-management/schedule",
            element: <Schedule />,
          },
          {
            path: "payroll/statement",
            element: <p>payrole/statement</p>,
          },
          {
            path: "payroll/benefits",
            element: <p>payrole/benefice</p>,
          },
          {
            path: "payroll/history",
            element: <p>payrole/history</p>,
          },
          {
            path: "company/posts",
            element: <Posts />,
          },
          {
            path: "company/posts/create",
            element: <CreatePosts />,
          },
          {
            path: "company/departments",
            element: <Departments />,
          },
          {
            path: "company/partner",
            element: <p>company/partner</p>,
          },
          {
            path: "company/partner/create",
            element: <p>company/partner/create</p>,
          },
        ],
      },
    ],
  },
]);
