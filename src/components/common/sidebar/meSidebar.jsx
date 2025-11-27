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
import { sidebarMenuLabel, sidebar } from "@MELocalization/en";

import MEButton from "@MECommonComponents/form/button/meButton";
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
    <SidebarProvider>
      <Sidebar className="shadow-xl shadow-dark">
        <SidebarContent>
          <SidebarHeader className="h-20 bg-danger p-2 justify-center items-center" />
          <SidebarGroup className="h-screen">
            <SidebarGroupLabel className="mr-5 truncate ...">
              {t('titleStatic', { defaultValue: sidebar.titleStatic })}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <MEButton
                        variant={"ghost"}
                        className={`justify-start cursor-pointer hover:cursor-pointer ${
                          item.title === activeMenu
                            ? "text-secondary bg-dark hover:text-danger"
                            : "text-dark"
                        } `}
                        onClick={() => onClick(item)}
                      >
                        <item.icon />
                        <span>
                          {_.startCase(
                            t(item.title, {
                              defaultValue: sidebarMenuLabel[item.title],
                            })
                          )}
                        </span>
                      </MEButton>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarFooter>
            <SidebarMenu>
              {footerMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <MEButton
                      variant={"ghost"}
                      className="justify-start text-dark cursor-pointer hover:cursor-pointer"
                      onClick={() => onClick(item)}
                    >
                      <item.icon />
                      <span>
                        {_.upperFirst(
                          t(item.title, {
                            defaultValue: sidebarMenuLabel[item.title],
                          })
                        )}
                      </span>
                    </MEButton>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
      <main className="w-full ">
        <SidebarTrigger />
        <div className="flex ml-5">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

MESidebar.propTypes = {
  children: PropTypes.any,
};

export default MESidebar;
