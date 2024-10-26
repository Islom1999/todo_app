import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../../shared';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { ILanguage, ITodo } from '../../../../../interfaces';
import { catchError, Observable, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../auth';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../shared/services/language.service';
import { Title } from '@angular/platform-browser';

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
  selectedLanguage!: ILanguage;

  languages!: ILanguage[];

  constructor(
    private _todoService: TodoService,
    private _authService: AuthService,
    private _dialogService: DialogService,
    private _messageService: MessageService,
    private _titleService: Title,
    private _langService: LanguageService,
    private translate: TranslateService,
  ){}

  ngOnInit(): void {
    this._titleService.setTitle("Vazifalar ro'yhati");

    this.selectedLanguage = this._langService.getLang()
    this.translate.setDefaultLang(this.selectedLanguage.code)
    this.languages = this._langService.getAllLang()
  }

  changeLanguage() {
    this._langService.setLang(this.selectedLanguage.code)
    this.translate.use(this._langService.getLang().code);
  }

  getTasksByStatus(status: number, tasks: ITodo[]) {
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

  showTaskDialog(id?: number) {
    const translationKey = id ? 'MODAL_TITLE_UPDATE' : 'MODAL_TITLE_CREATE';

    this.translate.get(translationKey).subscribe((headerTitle: string) => {
        this.ref = this._dialogService.open(TodoDetailComponent, {
            header: headerTitle,
            width: '80vw',
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            data: { id }
        });
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

  logout(){
    this._authService.logout()
  }
}
