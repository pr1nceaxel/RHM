import {
    DashboardOutlined,
    UsergroupAddOutlined,
    TeamOutlined,
    ToolOutlined,
    CalendarOutlined,
    FileSearchOutlined,
    FieldTimeOutlined,
    DollarOutlined,
    HistoryOutlined,
    ApartmentOutlined,
    AuditOutlined,
    CarryOutOutlined,
    BankOutlined,
  } from "@ant-design/icons";
  import { FaNetworkWired } from "react-icons/fa";
  import { FcDepartment } from "react-icons/fc";

  import { Link } from 'react-router-dom';
  
  function getItem(label, key, icon, path, children) {
    return {
      key,
      icon,
      label: path ? <Link to={path}>{label}</Link> : label,
      children,
    };
  }
  
  export const items = [
    getItem("Dashboard", "1", <DashboardOutlined />, "/home"),
    getItem("Employés", "sub1", <UsergroupAddOutlined />, null, [
      getItem("Liste", "2", <TeamOutlined />, "/home/employees/list"),
      getItem("Équipe", "3", <TeamOutlined />, "/home/employees/team"),
      getItem("Compteur", "4", <AuditOutlined />, "/home/employees/counter"),
      getItem("Archive", "5", <FileSearchOutlined />, "/home/employees/archive"),
      getItem("Boîte à outils", "6", <ToolOutlined />, "/home/employees/tools"),
    ]),
    getItem("Absences", "sub2", <CalendarOutlined />, null, [
      getItem("Demande de congés", "7", <CarryOutOutlined />, "/home/absences/leave-request"),
      getItem("Calendrier des absences", "8", <CalendarOutlined />, "/home/absences/absence-calendar"),
      getItem("Calendrier des congés", "9", <CalendarOutlined />, "/home/absences/leave-calendar"),
      getItem("Suivi des congés", "10", <FileSearchOutlined />, "/home/absences/leave-tracking"),
    ]),
    getItem("Gestion des temps", "sub3", <FieldTimeOutlined />, null, [
      getItem("Pointages", "11", <FieldTimeOutlined />, "/home/time-management/time-tracking"),
      getItem("Heures supplémentaires", "12", <FieldTimeOutlined />, "/home/time-management/overtime"),
      getItem("Horaire", "13", <FieldTimeOutlined />, "/home/time-management/schedule"),
    ]),
    getItem("Paie & avantages", "sub4", <DollarOutlined />, null, [
      getItem("Fiche de paie", "14", <DollarOutlined />, "/home/payroll/statement"),
      getItem("Avantages", "15", <BankOutlined />, "/home/payroll/benefits"),
      getItem("Historique", "16", <HistoryOutlined />, "/home/payroll/history"),
    ]),
    getItem("Entreprise", "sub5", <ApartmentOutlined />, null, [
      getItem("Postes", "17", <BankOutlined />, "/home/company/posts"),
      getItem("Département", "18", <FcDepartment />, "/home/company/departments"),
      getItem("Partenaire", "19", <FaNetworkWired />   , "/home/company/partner"),
    ]),
  ];
  