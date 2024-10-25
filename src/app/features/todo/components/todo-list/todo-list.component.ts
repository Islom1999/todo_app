import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../../shared';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { ITodo } from '../../../../../interfaces';
import { catchError, Observable, of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  providers: [DialogService]
})
export class TodoListComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  $tasks: Observable<ITodo[]> = this._todoService._data.pipe()
  draggingTask: ITodo | null = null;

  constructor(
    private _todoService: TodoService,
    private _dialogService: DialogService,
    private _messageService: MessageService,
  ){}

  ngOnInit(): void {}

  getTasksByStatus(status: number, tasks: ITodo[]) {
    console.log(tasks.filter( (task:ITodo) => task.completed === status ))
    return tasks.filter( (task:ITodo) => task.completed === status );
  }

  // Checkbox orqali statusni o'zgartirish
  toggleTaskStatus(task: ITodo) {
    task.completed = task.completed === 0 ? 1 : 0;
    this._todoService.updateTask(task.id!, {...task})
    .pipe(
      catchError((error) =>{
        this._messageService.add({ severity: 'error', summary: `Error ${error.code}`, detail: `Eror message: ${error.message}`})
        return error
      })
    )
    .subscribe(task => {
      this._messageService.add({ severity: 'success', summary: `O'zgartirildi`, detail: `Vazifa holati o'zgartirildi`})
    })
  }

  // Drag-and-Drop usuli
  dragStart(task: ITodo) {
    this.draggingTask = task;
  }

  dropTask(completed: number) {
    if (this.draggingTask) {
      this.draggingTask.completed = completed;
      this._todoService.updateTask(this.draggingTask.id!, {...this.draggingTask})
        .pipe(
          catchError((error) =>{
            this._messageService.add({ severity: 'error', summary: `Error ${error.code}`, detail: `Eror message: ${error.message}`})
            return of()
          })
        )
        .subscribe(task => {
          this.draggingTask = null; 
          this._messageService.add({ severity: 'success', summary: `O'zgartirildi`, detail: `Vazifa holati o'zgartirildi`})
        })
    }
  }

  showTaskDialog(id?:number) {
    this.ref = this._dialogService.open(TodoDetailComponent, {
      header: id ? "O'zgartirish" : "Qo'shish",
      width: '80vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{id}
    });
  }

  delete(id: number){
    this._todoService.deleteTask(id)
      .pipe(
        catchError((error) =>{
          this._messageService.add({ severity: 'error', summary: `Error ${error.code}`, detail: `Eror message: ${error.message}`})
          return of()
        })
      )
      .subscribe(task => {
        this._messageService.add({ severity: 'success', summary: `O'chirildi`, detail: `Vazifa o'chirildi`})
      })
  }
}
