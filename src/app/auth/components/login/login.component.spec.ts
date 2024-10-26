import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../auth.service';
import { MessageService, SharedModule } from 'primeng/api';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { LanguageService } from '../../../shared/services/language.service';

class MockAuthService {
  login(data: any) {
    return of(data); // Mock login function
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockMessageService {
  add = jasmine.createSpy('add');
}

class MockLanguageService {
  getLang() {
    return { code: 'uz' };
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let translate: TranslateService;
  let messageService: MessageService;
  let router: Router;
  let titleService: Title;
  let langService: MockLanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
        SharedModule  // Bu yerda qo'shing
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
        { provide: MessageService, useClass: MockMessageService },
        { provide: Title, useValue: { setTitle: jasmine.createSpy('setTitle') } },
        { provide: LanguageService, useClass: MockLanguageService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    messageService = TestBed.inject(MessageService);
    router = TestBed.inject(Router);
    titleService = TestBed.inject(Title);
    langService = TestBed.inject(LanguageService);
  });

  beforeEach(() => {
    fixture.detectChanges();
  });
});
