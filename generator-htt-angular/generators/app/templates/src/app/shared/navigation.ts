import {MenuItem} from "primeng-lts/api";

export const navigationItems: MenuItem[] = [

  <% if(entities) {%>
    <% for(entity of entities) { const fileName = entity.name.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s_]+/g, '-').toLowerCase(); %>

    {
      label: '<%=fileName%>.title',
      icon: 'fas fa-chart-bar',
      routerLink: '/<%=fileName%>/list',
      routerLinkActiveOptions: {exact:true}
    },
  <%}}%>

  // {
  //   label: 'dummy.title',
  //   icon: 'fas fa-chart-bar',
  //   routerLink: '/dummy/list',
  //   routerLinkActiveOptions: {exact:true}
  // },
  // {
  //   label: 'user.title',
  //   icon: 'fas fa-user-friends',
  //   routerLink: '/users/list',
  //   routerLinkActiveOptions: {exact:true}
  // },
  // {
  //   label: 'dashboard.title',
  //   icon: 'fas fa-chart-pie',
  //   routerLink: '/dashboard',
  //   routerLinkActiveOptions: {exact:true}
  // }
]

// export const getUserMenu = (user: User) => {
//   if(user.role == RoleEnum.ADMIN){
//     return navigationItems;
//   }
//   return navigationItems.map(item => {
//     if(item.routerLink && item.routerLink?.includes(user.direction.module)){
//       return item;
//     }
//     item.items = item.items?.filter(sub => sub.routerLink && sub.routerLink?.includes(user.direction.module));
//     if(item.items?.length)
//       return item;
//     return null;
//   }).filter(item => item != null);
// }
