import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import { sidebarMenuName } from "@MEUtils/enums";
import { resetState } from "@MERedux/login/loginSlice";
import { changeActiveMenu } from "@MERedux/sidebar/sidebarSlice";
import { sidebarMenu, footerMenu } from "@MECommonComponents/sidebar/sidebarMenu";
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
} from "@MEShadcnComponents/sidebar";
import {
  sidebarMenuLabel,
  sidebar,
} from "@MELocalizationEn/sidebar/sidebarTranslationEn";

import MEButton from "@MECommonComponents/button/meButton";
import PropTypes from "prop-types";
import _ from "lodash";

const MESidebar = ({ children }) => {
  const { activeMenu } = useSelector((state) => state.sidebar);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (item) => {
    if (item.title === sidebarMenuName.LOGOUT) {
      dispatch(resetState());
    } else {
      dispatch(changeActiveMenu(item.title));
    }
    navigate(item.url, { replace: true });
  };

  return (
    <SidebarProvider>
      <Sidebar className="shadow-xl shadow-dark">
        <SidebarContent>
          <SidebarHeader className="h-20 bg-danger p-2 justify-center items-center" />
          <SidebarGroup className="h-screen">
            <SidebarGroupLabel className="mr-5 truncate ...">
              {i18n.exists("titleDynamic")
                ? t("titleDynamic", { username: "ghadidh" })
                : sidebar.titleStatic}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <MEButton
                        variant={"ghost"}
                        className={`justify-start ${
                          item.title === activeMenu
                            ? "text-primary hover:text-primary"
                            : "text-dark"
                        } `}
                        onClick={() => onClick(item)}
                      >
                        <item.icon />
                        <span>
                          {_.upperFirst(
                            i18n.exists(item.title)
                              ? t(item.title)
                              : sidebarMenuLabel[item.title]
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
                      className="justify-start text-dark"
                      onClick={() => onClick(item)}
                    >
                      <item.icon />
                      <span>
                        {_.upperFirst(
                          i18n.exists(item.title)
                            ? t(item.title)
                            : sidebarMenuLabel[item.title]
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
        <div className="ml-5">{children}</div>
      </main>
    </SidebarProvider>
  );
};

MESidebar.propTypes = {
  children: PropTypes.any,
};

export default MESidebar;
