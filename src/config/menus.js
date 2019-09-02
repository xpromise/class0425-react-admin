const menuList = [
  {
    title: "route.dashboard", // 菜单标题名称
    key: '/', // 对应的path
    icon: 'home', // 图标名称
  },
  {
    title: "route.products",
    key: '/products',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: "route.category",
        key: '/category',
        icon: 'bars'
      },
      {
        title: "route.product",
        key: '/product',
        icon: 'tool'
      },
    ]
  },
  {
    title: "route.user",
    key: '/user',
    icon: 'user'
  },
  {
    title: "route.role",
    key: '/role',
    icon: 'safety',
  },
  {
    title: "route.charts",
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: "route.bar",
        key: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: "route.line",
        key: '/charts/line',
        icon: 'line-chart'
      },
      {
        title: "route.pie",
        key: '/charts/pie',
        icon: 'pie-chart'
      },
    ]
  },
];

export default menuList;