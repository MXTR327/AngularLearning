import { ViewTransitionComponent } from './dashboard/pages/view-transition/view-transition.component';
import { DeferOptionsComponent } from './dashboard/pages/defer-options/defer-options.component';
import { Routes } from '@angular/router';
import { ChangeDetectionComponent } from './dashboard/pages/change-detection/change-detection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ControlFlowComponent } from './dashboard/pages/control-flow/control-flow.component';
import { DeferViewsComponent } from './dashboard/pages/defer-views/defer-views.component';
import { UserComponent } from './dashboard/pages/user/user.component';
import { UsersComponent } from './dashboard/pages/users/users.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'change-detection',
        component: ChangeDetectionComponent,
      },
      {
        path: 'control-flow',
        component: ControlFlowComponent,
      },
      {
        path: 'defer-options',
        component: DeferOptionsComponent,
      },
      {
        path: 'defer-views',
        component: DeferViewsComponent,
      },
      {
        path: 'user/:id',
        component: UserComponent,
      },
      {
        path: 'user-list',
        component: UsersComponent,
      },
      {
        path: 'view-transition',
        component: ViewTransitionComponent,
      },
      {
        path: '**',
        redirectTo: 'control-flow',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
