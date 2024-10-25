import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent, TodoDetailComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared';

const routes: Routes = [
  { 
    path: '', 
    component: TodoListComponent 
  },
  { 
    path: ':id', 
    component: TodoDetailComponent 
  }
];

@NgModule({
  declarations: [
    TodoListComponent,
    TodoDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class TodoModule { }
