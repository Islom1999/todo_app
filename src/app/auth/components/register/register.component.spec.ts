import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService, SharedModule } from 'primeng/api';
import { AuthService } from '../../auth.service';
import { of } from 'rxjs';
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

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let messageService: MessageService;
  let router: Router;
  let translate: TranslateService;
  let titleService: Title;
  let langService: MockLanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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

    fixture = TestBed.createComponent(RegisterComponent);
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
