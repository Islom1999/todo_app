import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../../shared';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent implements OnInit {
  id!:number
  form: FormGroup = new FormGroup({});

  constructor(
    private _todoService: TodoService,
    private _messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ){}

  ngOnInit(): void {
    this.id = this.config.data.id;

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this._todoService.getTaskById(this.id).subscribe((data) => {
      this.form.patchValue(data);
    });
  }

  submit() {
    if (this.form.valid) {
      if (this.id) {
        this.update(this.id!);
      } else {
        this.create();
      }
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  create(obj?:Object) {
    const data = obj ? obj : {...this.form.value}
    this._todoService
      .createTask({...data})
      .pipe(
        catchError(({ error }) => {
          this._messageService.add({ severity: 'error', summary: `Xato ${error.code}`, detail: `Xato xabari: ${error.message}` })
          return of();
        })
      )
      .subscribe(() => {
        this._messageService.add({ severity: 'success', summary: 'Bajarildi', detail: `Vazifa qo'shildi` })
        this.ref.close()
      });
  }

  update(id: number, obj?:Object) {
    const data = obj ? obj : {...this.form.value}
    this._todoService
      .updateTask(id, {...data})
      .pipe(
        catchError(({ error }) => {
          this._messageService.add({ severity: 'error', summary: `Xato ${error.code}`, detail: `Xato xabari: ${error.message}` })
          return of();
        })
      )
      .subscribe(() => {
        this._messageService.add({ severity: 'success', summary: 'Bajarildi', detail: `Vazifa o'zgartirildi` })
        this.ref.close()
      });
  }

  back(){
    this.ref.close()
  }
}
