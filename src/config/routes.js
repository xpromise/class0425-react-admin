import Home from '../components/home';
import Category from '../containers/category';
import User from '../containers/user';

const routes = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/category",
    component: Category,
    exact: true
  },
  {
    path: "/user",
    component: User,
    exact: true
  },
];

export default routes;