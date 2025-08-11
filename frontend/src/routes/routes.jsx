import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddSkillForm from "../components/AddSkill";
import AllSkills from "../pages/AllSkills";
import SkillDetail from "../components/SkillDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        path: "/addSkill",
        Component: AddSkillForm,
      },
      {
        index: true,
        path: "/Skills",
        Component: AllSkills,
      },
      {
        path: "/skilldetail/:id", // ⬅ New dynamic route
        Component: SkillDetail,
      },
    ],
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },
]);

export default router;
