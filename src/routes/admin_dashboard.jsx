// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import LogOutIcon from "@material-ui/icons/ExitToApp";
import BarChart from "@material-ui/icons/BarChart"
import NotificationIcon from "@material-ui/icons/QuestionAnswer"
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Person from "@material-ui/icons/Person";
import School from "@material-ui/icons/School";

// core components/views
import DashboardPage from "../views/Admin/AdminDashboard/AdminDashboard.jsx";
import LogOut from "views/Login/Login.jsx";
import StudentManage from "../views/Admin/StudentManage/StudentManage.jsx";
import QuestionManage from "../views/Admin/QuestionManage/QuestionManage.jsx";
import FacultyManage from "../views/Admin/FacultyManage/FacultyManage.jsx";



const dashboardRoutes = [
  {
    path: "/admin_dashboard",
    sidebarName: "Dashboard",
    navbarName: "Admin Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/student_management",
    sidebarName: "Student Management",
    navbarName: "Student Management",
    icon: School,
    component: StudentManage
  },
  {
    path: "/question_management",
    sidebarName: "Question Management",
    navbarName: "Question Management",
    icon: NotificationIcon,
    component: QuestionManage
  },

  {
    path: "/category_management",
    sidebarName: "Category Management",
    navbarName: "Category Management",
    icon: BubbleChart,
    component: QuestionManage
  },
  {
    path: "/faculty_management",
    sidebarName: "Faculty Management",
    navbarName: "Faculty Management",
    icon: Person,
    component: FacultyManage
  },
  {
    path: "/notification_management",
    sidebarName: "Notification",
    navbarName: "Notitfication",
    icon: NotificationIcon,
    component: QuestionManage
  },
  // {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  {
    path: "/upgrade-to-pro",
    sidebarName: "Log Out",
    navbarName: "Log Out",
    icon: LogOutIcon,
    component: LogOut
  },
  { redirect: true, path: "/", to: "/admin_dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;