import LogedOutNavbar from "./LogedOutNavbar";
import LogedInNavbar from "./LogedInNavbar";

export const NavSidebar = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return <LogedInNavbar/>;
  } else {
    return <LogedOutNavbar/>;
  }
};
