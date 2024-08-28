import {
  PieChartOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileSearchOutlined,
  FieldTimeOutlined,
  DollarOutlined,
  HistoryOutlined,
  FolderOpenOutlined,
  CarryOutOutlined,
  BankOutlined,
} from "@ant-design/icons";

import { FaNetworkWired } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import { IoMdBusiness } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { BsFolder } from "react-icons/bs";

import { Link } from "react-router-dom";

function getItem(label, key, icon, path, children) {
  return {
    key,
    icon,
    label: path ? <Link to={path}>{label}</Link> : label,
    children,
  };
}
export const items = [
  getItem("Dashboard", "1", <PieChartOutlined />, "/"),
  getItem("Planning", "2", <IoCalendarOutline />),
  getItem("Employés", "sub1", <UsergroupAddOutlined />, null, [
    getItem("Employés", "3", <UserOutlined />, "/employees/list"),
    getItem("Équipe", "4", <TeamOutlined />, "/employees/team"),
    getItem("Compteur", "5", <FieldTimeOutlined />, "/employees/counter"),
    getItem("Archive", "6", <FolderOpenOutlined />, "/employees/archive"),
    getItem("Documents", "7", <BsFolder />),
  ]),
  getItem("Demande", "sub2", <MdOutlineLibraryAddCheck />, null, [
    getItem("Demande de congés", "8", <CarryOutOutlined />, "/absences/leave-request"),
    getItem("Calendrier des absences", "9", <CalendarOutlined />, "/absences/absence-calendar"),
    getItem("Calendrier des congés", "10", <CalendarOutlined />, "/absences/leave-calendar"),
    getItem("Suivi des congés", "11", <FileSearchOutlined />, "/absences/leave-tracking"),
  ]),
  getItem("Gestion des temps", "sub3", <FieldTimeOutlined />, null, [
    getItem("Pointages", "12", <FieldTimeOutlined />, "/time-management/time-tracking"),
    getItem("Heures supplémentaires", "13", <FieldTimeOutlined />, "/time-management/overtime"),
    getItem("Horaire", "14", <FieldTimeOutlined />, "/time-management/schedule"),
  ]),
  getItem("Paie & avantages", "sub4", <DollarOutlined />, null, [
    getItem("Fiche de paie", "15", <DollarOutlined />, "/payroll/statement"),
    getItem("Avantages", "16", <BankOutlined />, "/payroll/benefits"),
    getItem("Historique", "17", <HistoryOutlined />, "/payroll/history"),
  ]),
  getItem("Entreprise", "sub5", <IoMdBusiness />, null, [
    getItem("Postes", "18", <BankOutlined />, "/home/company/posts"),
    getItem("Département", "19", <FcDepartment />, "/home/company/departments"),
    getItem("Partenaire", "20", <FaNetworkWired />, "/home/company/partner"),
  ]),
];
