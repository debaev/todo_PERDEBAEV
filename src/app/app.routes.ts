import { Routes } from '@angular/router';

import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';
import { AuthorizedGuard } from './core/guards/authorized.guard';
import { NotAuthorizedGuard } from './core/guards/not-authorized.guard';
import { TodoDetailComponent } from './views/main/features/todos/components/todo-detail/todo-detail.component';
import { TodosOverviewComponent } from './views/main/features/todos/components/todos-overview/todos-overview.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./views/auth/components/login/login.component').then((m) => m.LoginComponent),
    canActivate: [AuthorizedGuard],
    title: 'auth',
  },
  {
    path: 'main',
    loadComponent: () => import('./views/main/features/todos/todos.component').then((m) => m.TodosComponent),
    canActivate: [NotAuthorizedGuard],
    title: 'todo',
    children: [
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
      },
      {
        path: 'todos',
        component: TodosOverviewComponent,
      },
      {
        path: 'todos/:id',
        component: TodoDetailComponent,
      },
    ]
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    title: '404',
  }
];
