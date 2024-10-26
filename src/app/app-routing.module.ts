import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth').then(m => m.AuthModule)
  },
  { 
    path: '', 
    loadChildren: () => import('./features').then(m => m.TodoModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
