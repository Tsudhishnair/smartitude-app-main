// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import BarChart from "@material-ui/icons/BarChart";
import NotificationIcon from "@material-ui/icons/QuestionAnswer";
// core components/views
import DashboardPage from "../views/Student/Dashboard/StudentDashboard.jsx";
import NotificationsPage from "../views/Student/Notifications/Notifications.jsx";
import Results from "../views/Student/Results/Results.jsx";
import Test from "../views/QuizPanel/PreQuizInfo";

const dashboardRoutes = [
  {
    path: "/student/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Student Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/student/results",
    sidebarName: "Results",
    navbarName: "Results",
    icon: BarChart,
    component: Results
  },
  {
    path: "/student/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: NotificationIcon,
    component: NotificationsPage
  },
  {
    redirect: true,
    path: "/student/start_quiz",
    subRoute: true,
    component: Test
  },
  {
    redirect: true,
    path: "/student",
    to: "/student/dashboard"
  }
];

export default dashboardRoutes;
