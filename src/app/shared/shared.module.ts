import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from 'primeng/dragdrop';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    InputTextModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    CheckboxModule,
    AvatarModule,
    FormsModule,
    DragDropModule,
    InputTextareaModule,
    PasswordModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    CheckboxModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    InputTextareaModule,
    PasswordModule
  ]
})
export class SharedModule { }
