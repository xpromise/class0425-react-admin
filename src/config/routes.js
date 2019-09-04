import Home from '@components/home';
import Category from '@containers/category';
import User from '@containers/user';
import Product from '@containers/product';
import SaveUpdateProduct from '@containers/product/save-update-product';
import ProductDetail from '@containers/product/product-detail';
import Role from '@containers/role';
import Line from '@components/charts/line';
import Bar from '@components/charts/bar';
import Pie from '@components/charts/pie';

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
  {
    path: "/product",
    component: Product,
    exact: true
  },
  {
    path: "/product/saveupdate",
    component: SaveUpdateProduct,
    exact: true
  },
  {
    path: "/product/detail",
    component: ProductDetail,
    exact: true
  },
  {
    path: "/role",
    component: Role,
    exact: true
  },
  {
    path: "/charts/line",
    component: Line,
    exact: true
  },
  {
    path: "/charts/bar",
    component: Bar,
    exact: true
  },
  {
    path: "/charts/pie",
    component: Pie,
    exact: true
  }
];

export default routes;