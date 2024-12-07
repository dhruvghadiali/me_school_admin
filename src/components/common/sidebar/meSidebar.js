import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import _ from "lodash";

import MEButton from "../button/meButton";
import { sidebarMenu, footerMenu } from "./sidebarMenu";
import { changeActiveMenu } from "../../../slice/sidebar/sidebarSlice";
import { resetState } from "../../../slice/login/loginSlice";
import { sidebarMenuName } from "../../../utils/enums";
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
} from "../../ui/sidebar";

const MESidebar = ({ children }) => {
  const { activeMenu } = useSelector((state) => state.sidebar);
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
            <SidebarGroupLabel>Hello!! "username"</SidebarGroupLabel>
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
                        <span>{_.upperFirst(item.title)}</span>
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
                      <span>{_.upperFirst(item.title)}</span>
                    </MEButton>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
      <main>
        <SidebarTrigger />
        <div className="ml-5">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default MESidebar;
