import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";

import { sidebarMenuName } from "@MEUtils/enums";
import { changeActiveMenu } from "@MERedux/sidebar/sidebarSlice";
import { signOut } from "@/slice/authentication/authenticationSlice";
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
  useSidebar,
} from "@MEShadcnComponents/sidebar";
import { sidebarMenuLabel, sidebar } from "@MELocalization/en";

import { LogOut } from "lucide-react";
import PropTypes from "prop-types";
import MEActionAlertDialog from "@MECommonComponents/alertDialog/actionAlertDialog";

import logo from "@MEAssets/logo.png";

const MainContent = ({ children }) => {
  const { open, isMobile } = useSidebar();

  return (
    <main
      className={`flex-1 overflow-auto transition-all duration-200 pr-6 ${!isMobile ? (open ? "pl-6 ml-48" : "pl-6 ml-14") : ""}`}
    >
      {children}
    </main>
  );
};

const SidebarContent_Internal = ({ children, onMenuClick }) => {
  const { isMobile, setOpenMobile, open, state } = useSidebar();

  const handleMenuClick = (item) => {
    onMenuClick(item);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  // Log sidebar state for debugging
  // console.log('Sidebar state:', { open, state, isMobile });

  return children(handleMenuClick);
};

const MESidebar = ({ children }) => {
  const { activeMenu } = useSelector((state) => state.sidebar);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (item) => {
    if (item.title === sidebarMenuName.LOGOUT) {
      return;
    }
    dispatch(changeActiveMenu(item.title));
    navigate(item.url, { replace: false });
  };

  const onLogoutConfirm = () => {
    dispatch(signOut());
    navigate(
      footerMenu.find((m) => m.title === sidebarMenuName.LOGOUT)?.url || "/",
      { replace: false },
    );
  };

  return (
    <SidebarProvider defaultOpen={true}>
      {/* Mobile/Tablet sidebar widths via CSS variable + width override */}
      <style>{`
        /* Mobile/Tablet sidebar widths */
        [data-slot="sheet-content"][data-mobile="true"][data-sidebar="sidebar"] {
          --sidebar-width: 90vw;
          width: var(--sidebar-width) !important;
          max-width: none !important;
        }
        @media (min-width: 768px) {
          [data-slot="sheet-content"][data-mobile="true"][data-sidebar="sidebar"] {
            --sidebar-width: 75vw;
            width: var(--sidebar-width) !important;
          }
        }
      `}</style>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="h-14 border-b bg-primary">
          <div className="flex h-full items-center justify-start">
            <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
            <h2 className="text-white font-bold text-sm truncate group-data-[collapsible=icon]:hidden">
              {_.upperCase(
                t("titleStatic", { defaultValue: sidebar.titleStatic }),
              )}
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarContent_Internal onMenuClick={onClick}>
            {(handleMenuClick) => (
              <SidebarGroup>
                <SidebarGroupLabel className="px-2 text-xs uppercase text-sidebar-foreground/70">
                  Menu
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sidebarMenu.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          onClick={() => handleMenuClick(item)}
                          tooltip={_.startCase(
                            t(item.title, {
                              defaultValue: sidebarMenuLabel[item.title],
                            }),
                          )}
                          className={`cursor-pointer ${
                            item.title === activeMenu
                              ? "bg-dark text-secondary hover:bg-dark/90 hover:text-secondary"
                              : ""
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>
                            {_.startCase(
                              t(item.title, {
                                defaultValue: sidebarMenuLabel[item.title],
                              }),
                            )}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent_Internal>
        </SidebarContent>
        <SidebarFooter className="mt-auto border-t">
          <SidebarContent_Internal onMenuClick={onClick}>
            {(handleMenuClick) => (
              <SidebarMenu>
                {footerMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.title === sidebarMenuName.LOGOUT ? (
                      <MEActionAlertDialog
                        icon={<LogOut className="text-dark" size={16} />}
                        title={_.upperFirst(
                          t("logoutAlertTitle", {
                            defaultValue: sidebar.logoutAlertTitle,
                          }),
                        )}
                        description={_.upperFirst(
                          t("logoutAlertDescription", {
                            defaultValue: sidebar.logoutAlertDescription,
                          }),
                        )}
                        actions={[
                          {
                            label: "Cancel",
                            className:
                              "bg-secondary text-dark hover:bg-secondary/90",
                            onClick: () => {},
                          },
                          {
                            label: "Logout",
                            className:
                              "bg-danger text-white hover:bg-danger/90",
                            onClick: onLogoutConfirm,
                          },
                        ]}
                      >
                        <SidebarMenuButton
                          tooltip={_.upperFirst(
                            t(item.title, {
                              defaultValue: sidebarMenuLabel[item.title],
                            }),
                          )}
                          className="cursor-pointer"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>
                            {_.upperFirst(
                              t(item.title, {
                                defaultValue: sidebarMenuLabel[item.title],
                              }),
                            )}
                          </span>
                        </SidebarMenuButton>
                      </MEActionAlertDialog>
                    ) : (
                      <SidebarMenuButton
                        onClick={() => handleMenuClick(item)}
                        tooltip={_.upperFirst(
                          t(item.title, {
                            defaultValue: sidebarMenuLabel[item.title],
                          }),
                        )}
                        className="cursor-pointer"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>
                          {_.upperFirst(
                            t(item.title, {
                              defaultValue: sidebarMenuLabel[item.title],
                            }),
                          )}
                        </span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarContent_Internal>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <MainContent
          activeMenu={activeMenu}
          t={t}
          sidebarMenuLabel={sidebarMenuLabel}
        >
          <SidebarTrigger />
          <div className="pl-2">{children}</div>
        </MainContent>
      </SidebarInset>
    </SidebarProvider>
  );
};

MESidebar.propTypes = {
  children: PropTypes.any,
};

export default MESidebar;
