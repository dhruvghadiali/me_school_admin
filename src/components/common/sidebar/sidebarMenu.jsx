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

import { SIDEBAR_MENU_NAMES } from "@MEHelpers/enums";
import {
  DASHBOARD,
  SIGN_IN,
  ADMISSION,
  ACADEMIC_CLASS,
  FEES,
  ADMISSION_DOCUMENTS,
  FACILITIES,
  PROFILE,
  SETTINGS,
} from "@MEPageRoutes";

export const sidebarMenu = [
  {
    title: SIDEBAR_MENU_NAMES.DASHBOARD,
    url: DASHBOARD,
    icon: Gauge,
  },
  {
    title: SIDEBAR_MENU_NAMES.ADMISSION,
    url: ADMISSION,
    icon: Inbox,
  },
  {
    title: SIDEBAR_MENU_NAMES.ACADEMIC_CLASS,
    url: ACADEMIC_CLASS,
    icon: GraduationCap,
  },
  {
    title: SIDEBAR_MENU_NAMES.FEES,
    url: FEES,
    icon: IndianRupee,
  },
  {
    title: SIDEBAR_MENU_NAMES.ADMISSION_DOCUMENTS,
    url: ADMISSION_DOCUMENTS,
    icon: FilesIcon,
  },
  {
    title: SIDEBAR_MENU_NAMES.FACILITIES,
    url: FACILITIES,
    icon: LayoutDashboard,
  },
  {
    title: SIDEBAR_MENU_NAMES.PROFILE,
    url: PROFILE,
    icon: User,
  },
  {
    title: SIDEBAR_MENU_NAMES.SETTINGS,
    url: SETTINGS,
    icon: Settings,
  },
];

export const footerMenu = [
  {
    title: SIDEBAR_MENU_NAMES.LOGOUT,
    url: SIGN_IN,
    icon: LogOutIcon,
  },
];
