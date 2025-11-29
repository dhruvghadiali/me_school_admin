import {useState} from "react";
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
  useSidebar,
} from "@MEShadcnComponents/sidebar";
import { Separator } from "@MEShadcnComponents/separator";
import { sidebarMenuLabel, sidebar } from "@MELocalization/en";
import PropTypes from "prop-types";
import _ from "lodash";

const MainContent = ({ children }) => {
  const { open, isMobile } = useSidebar();
  
  return (
    <main className={`flex-1 overflow-auto transition-all duration-200 pr-6 ${!isMobile ? open ? 'pl-6 ml-48' : 'pl-6 ml-14' : ''}`}>
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
      dispatch(signOut());
    } else {
      dispatch(changeActiveMenu(item.title));
    }
    navigate(item.url, { replace: false });
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="h-14 border-b bg-danger">
          <div className="flex h-full items-center justify-center px-2">
            <h2 className="text-white font-bold text-sm truncate group-data-[collapsible=icon]:hidden">
              {t('titleStatic', { defaultValue: sidebar.titleStatic })}
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
                            })
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
                              })
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
                    <SidebarMenuButton
                      onClick={() => handleMenuClick(item)}
                      tooltip={_.upperFirst(
                        t(item.title, {
                          defaultValue: sidebarMenuLabel[item.title],
                        })
                      )}
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
            )}
          </SidebarContent_Internal>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <MainContent activeMenu={activeMenu} t={t} sidebarMenuLabel={sidebarMenuLabel}>
          <SidebarTrigger/>
          <div className="pl-2">
            {children}
          </div>
        </MainContent>
      </SidebarInset>
    </SidebarProvider>
  );
};

MESidebar.propTypes = {
  children: PropTypes.any,
};

export default MESidebar;
