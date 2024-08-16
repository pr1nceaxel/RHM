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
    getItem("Dashboard", "1", <DashboardOutlined />, ""),
    getItem("Employés", "sub1", <UsergroupAddOutlined />, null, [
      getItem("Liste", "2", <TeamOutlined />, "/employees/list"),
      getItem("Équipe", "3", <TeamOutlined />, "/employees/team"),
      getItem("Compteur", "4", <AuditOutlined />, "/employees/counter"),
      getItem("Archive", "5", <FileSearchOutlined />, "/employees/archive"),
      getItem("Boîte à outils", "6", <ToolOutlined />, "/employees/tools"),
    ]),
    getItem("Absences", "sub2", <CalendarOutlined />, null, [
      getItem("Demande de congés", "7", <CarryOutOutlined />, "/absences/leave-request"),
      getItem("Calendrier des absences", "8", <CalendarOutlined />, "/absences/absence-calendar"),
      getItem("Calendrier des congés", "9", <CalendarOutlined />, "/absences/leave-calendar"),
      getItem("Suivi des congés", "10", <FileSearchOutlined />, "/absences/leave-tracking"),
    ]),
    getItem("Gestion des temps", "sub3", <FieldTimeOutlined />, null, [
      getItem("Pointages", "11", <FieldTimeOutlined />, "/time-management/time-tracking"),
      getItem("Heures supplémentaires", "12", <FieldTimeOutlined />, "/time-management/overtime"),
      getItem("Horaire", "13", <FieldTimeOutlined />, "/time-management/schedule"),
    ]),
    getItem("Paie & avantages", "sub4", <DollarOutlined />, null, [
      getItem("Fiche de paie", "14", <DollarOutlined />, "/payroll/statement"),
      getItem("Avantages", "15", <BankOutlined />, "/payroll/benefits"),
      getItem("Historique", "16", <HistoryOutlined />, "/payroll/history"),
    ]),
    getItem("Entreprise", "sub5", <ApartmentOutlined />, null, [
      getItem("Postes", "17", <BankOutlined />, "/company/posts"),
      getItem("Département", "18", <FcDepartment />, "/company/departments"),
      getItem("Partenaire", "19", <FaNetworkWired />   , "/company/partner"),
    ]),
  ];
  