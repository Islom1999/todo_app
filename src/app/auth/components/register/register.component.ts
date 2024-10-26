import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MessageService } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({});

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _titleService: Title,
    private router: Router,
    private _langService: LanguageService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this._titleService.setTitle('Ro\'yhatdan o\'tish sahifasi')
    this.translate.setDefaultLang(this._langService.getLang().code)

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
    });
  }

  submit(): void {
    if (this.form.valid) {
      const data = {
        email: this.form.value.email!,
        name: this.form.value.name!,
        password: this.form.value.password!,
        password_confirmation: this.form.value.password_confirmation!,
      };
      this._authService
        .register(data)
        .pipe(
          tap(() => this.router.navigate(['/auth/login'])),
          catchError(({ error }) => {
            console.log(error)
            this._messageService.add({ severity: 'error', summary: `Xato ${error.message}`, detail: `Xato xabari: ${JSON.stringify(error.errors)}` })
            this.form.reset();
            return of();
          })
        )
        .subscribe((data: any) => {
          this._messageService.add({ severity: 'success', summary: `Ro'yhatdan o'tish amalga oshirildi`, detail: `${data.message}` })
        });
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
