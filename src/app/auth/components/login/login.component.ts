import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { tap, catchError, of } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
    this.translate.setDefaultLang(this._langService.getLang().code)
    this._titleService.setTitle('Kirish sahifasi')

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit(): void {
    if (this.form.valid) {
      const data = {
        email: this.form.value.email!,
        password: this.form.value.password!,
      };
      this._authService
        .login(data)
        .pipe(
          tap(() => this.router.navigate(['/'])),
          catchError(({ error }) => {
            console.log(error)
            this._messageService.add({ severity: 'error', summary: `Xato ${error.message}`, detail: `Xato xabari: ${JSON.stringify(error.errors)}` })
            this.form.reset();
            return of();
          })
        )
        .subscribe((data: any) => {
          this._messageService.add({ severity: 'success', summary: `Siz tizimga kirdingiz`, detail: `Kirish o'tish amalga oshirildi` })
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
