import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import { sidebarMenuName } from "@MEUtils/enums";
import { signOut } from "@/slice/authentication/authenticationSlice";
import { changeActiveMenu } from "@MERedux/sidebar/sidebarSlice";
import {
  sidebarMenu,
  footerMenu,
} from "@MECommonComponents/sidebar/sidebarMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarInset,
} from "@MEShadcnComponents/sidebar";
import { Separator } from "@MEShadcnComponents/separator";
import { sidebarMenuLabel, sidebar } from "@MELocalization/en";
import PropTypes from "prop-types";
import _ from "lodash";

const MESidebar = ({ children }) => {
  const { activeMenu } = useSelector((state) => state.sidebar);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (item) => {
    if (item.title === sidebarMenuName.LOGOUT) {
      dispatch(signOut());
    } else {
      dispatch(changeActiveMenu(item.title));
    }
    navigate(item.url, { replace: false });
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="offcanvas" className="border-r">
        <SidebarHeader className="border-b bg-danger">
          <div className="flex h-full items-center px-4">
            <h2 className="text-white font-bold text-lg">
              {t('titleStatic', { defaultValue: sidebar.titleStatic })}
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 text-xs uppercase text-sidebar-foreground/70">
              Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => onClick(item)}
                      isActive={item.title === activeMenu}
                      className={`cursor-pointer ${
                        item.title === activeMenu
                          ? "bg-dark text-secondary"
                          : ""
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>
                        {_.startCase(
                          t(item.title, {
                            defaultValue: sidebarMenuLabel[item.title],
                          })
                        )}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="mt-auto border-t">
          <SidebarMenu>
            {footerMenu.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  onClick={() => onClick(item)}
                  className="cursor-pointer"
                >
                  <item.icon className="h-4 w-4" />
                  <span>
                    {_.upperFirst(
                      t(item.title, {
                        defaultValue: sidebarMenuLabel[item.title],
                      })
                    )}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <h1 className="text-base font-semibold">
            {_.upperFirst(
              t(activeMenu, {
                defaultValue: sidebarMenuLabel[activeMenu],
              })
            )}
          </h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

MESidebar.propTypes = {
  children: PropTypes.any,
};

export default MESidebar;
