import { Home, Inbox, User, Settings, LogOutIcon } from "lucide-react";
import { sidebarMenuName } from "../../../utils/enums";
import { routeName } from "../../../utils/routeName";

export const sidebarMenu = [
  {
    title: sidebarMenuName.HOME,
    url: routeName.home,
    icon: Home,
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
