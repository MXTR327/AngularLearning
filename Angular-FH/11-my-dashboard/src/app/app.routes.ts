/* eslint-disable perfectionist/sort-objects */
import { Routes } from '@angular/router';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { ChangeDetectionComponent } from '@dashboard/pages/change-detection/change-detection.component';
import { ControlFlowComponent } from '@dashboard/pages/control-flow/control-flow.component';
import { DeferOptionsComponent } from '@dashboard/pages/defer-options/defer-options.component';
import { DeferViewsComponent } from '@dashboard/pages/defer-views/defer-views.component';
import { UserComponent } from '@dashboard/pages/user/user.component';
import { UsersComponent } from '@dashboard/pages/users/users.component';
import { ViewTransitionComponent1 } from '@dashboard/pages/view-transition/view-transition1.component';
import { ViewTransitionComponent2 } from '@dashboard/pages/view-transition/view-transition2.component';

export const routes: Routes = [
  {
    component: DashboardComponent,
    path: 'dashboard',
    children: [
      {
        path: 'change-detection',
        title: 'Change Detection',
        component: ChangeDetectionComponent,
      },
      {
        path: 'control-flow',
        title: 'Control Flow',
        component: ControlFlowComponent,
      },
      {
        path: 'defer-options',
        title: 'Defer Options',
        component: DeferOptionsComponent,
      },
      {
        path: 'defer-views',
        title: 'Defer Views',
        component: DeferViewsComponent,
      },
      {
        path: 'user/:id',
        title: 'User',
        component: UserComponent,
      },
      {
        path: 'user-list',
        title: 'Users',
        component: UsersComponent,
      },
      {
        path: 'view-transition-1',
        title: 'View Transition 1',
        component: ViewTransitionComponent1,
      },
      {
        path: 'view-transition-2',
        title: 'View Transition 2',
        component: ViewTransitionComponent2,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'control-flow',
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
];
