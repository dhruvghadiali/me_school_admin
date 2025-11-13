import {
  User,
  Gauge,
  Inbox,
  Settings,
  FilesIcon,
  LogOutIcon,
  IndianRupee,
  GraduationCap,
  LayoutDashboard, 
} from "lucide-react";
import { sidebarMenuName } from "@MEUtils/enums";
import { routeName } from "@MEUtils/routeName";

export const sidebarMenu = [
  {
    title: sidebarMenuName.DASHBOARD,
    url: routeName.dashboard,
    icon: Gauge,
  },
  {
    title: sidebarMenuName.ADMISSION,
    url: routeName.admission,
    icon: Inbox,
  },
  {
    title: sidebarMenuName.ACADEMIC_CLASS,
    url: routeName.academicClass,
    icon: GraduationCap,
  },
  {
    title: sidebarMenuName.FEES,
    url: routeName.fees,
    icon: IndianRupee,
  },
  {
    title: sidebarMenuName.ADMISSION_DOCUMENTS,
    url: routeName.admissionDocuments,
    icon: FilesIcon,
  },
  {
    title: sidebarMenuName.FACILITIES,
    url: routeName.facilities,
    icon: LayoutDashboard ,
  },
  {
    title: sidebarMenuName.PROFILE,
    url: routeName.schoolProfile,
    icon: User,
  },
  {
    title: sidebarMenuName.SETTINGS,
    url: routeName.settings,
    icon: Settings,
  },
];

export const footerMenu = [
  {
    title: sidebarMenuName.LOGOUT,
    url: routeName.root,
    icon: LogOutIcon,
  },
];
