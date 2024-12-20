import { Gauge, Inbox, User, Settings, LogOutIcon } from "lucide-react";
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
