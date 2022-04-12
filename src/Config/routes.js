import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import SellerPage from "../pages/SellerPage";
import SellerQuotePage from "../pages/SellerQuotePage";
import Customers from "../pages/Customers/Customers";
import UserPage from "../pages/Users/UserPage";
import AdministratorPage from "../pages/Administrator/AdministratorPage";
import Records from "../pages/Records/Records";
import DirectorCharts from "../pages/Director/DirectorCharts";
const routes = [
  {
    path: "/home",
    component: HomePage,
    isPrivate: true,
  },
  {
    path: "/administrator",
    component: AdministratorPage,
    isPrivate: true,
  },
  {
    path: "/clients",
    component: Customers,
    isPrivate: true,
  }, {
    path: "/clients",
    component: Customers,
    isPrivate: true,
  },
  {
    path: "/sellers/:id",
    component: SellerQuotePage,
    isPrivate: true,
  },
  {
    path: "/sellers",
    component: SellerPage,
    isPrivate: true,
  },

  {
    path: "/clients",
    component: Customers,
    isPrivate: true,
  },
  {
    path: "/users",
    component: UserPage,
    isPrivate: true,
  },
  {
    path: "/sellers-quote",
    component: SellerQuotePage,
    isPrivate: false,
  },
  {
    path:"/invoices-history",
    component:Records,
    isPrivate: true,
  }
  ,
  {
    path:"/director-charts",
    component:DirectorCharts,
    isPrivate: true,
  }
  ,
  {
    path: "/",
    component: LoginPage,
    isPrivate: false,
  },

  {
    path: "/*",
    component: NotFoundPage,
  },
];

export default routes;
