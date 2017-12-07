import { Routes } from '@angular/router';
import { TodoRoutes } from './todo/todo.routes';
import { TodoItemComponent } from './todo/item/item.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'todo/list',
        pathMatch: 'full',
    },
  ...TodoRoutes
];
