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
import { DASHBOARD, SIGN_IN } from "@MEPageRoutes";

export const sidebarMenu = [
  {
    title: sidebarMenuName.DASHBOARD,
    url: DASHBOARD,
    icon: Gauge,
  },
  {
    title: sidebarMenuName.ADMISSION,
    url: DASHBOARD,
    icon: Inbox,
  },
  {
    title: sidebarMenuName.ACADEMIC_CLASS,
    url: DASHBOARD,
    icon: GraduationCap,
  },
  {
    title: sidebarMenuName.FEES,
    url: DASHBOARD,
    icon: IndianRupee,
  },
  {
    title: sidebarMenuName.ADMISSION_DOCUMENTS,
    url: DASHBOARD,
    icon: FilesIcon,
  },
  {
    title: sidebarMenuName.FACILITIES,
    url: DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: sidebarMenuName.PROFILE,
    url: DASHBOARD,
    icon: User,
  },
  {
    title: sidebarMenuName.SETTINGS,
    url: DASHBOARD,
    icon: Settings,
  },
];

export const footerMenu = [
  {
    title: sidebarMenuName.LOGOUT,
    url: SIGN_IN,
    icon: LogOutIcon,
  },
];
