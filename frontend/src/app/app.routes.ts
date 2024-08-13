import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'team-detail/:id',
    loadComponent: () =>
      import('@components/players-list/players-list.component').then(
        (m) => m.PlayersListComponent
      ),
  },
];
