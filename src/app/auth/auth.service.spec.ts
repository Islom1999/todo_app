
import { AuthService } from './auth.service';

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginType, Tokens } from '../../types';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      navigate: jasmine.createSpy('navigate') 
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock }
      ]
    });

    service = TestBed.inject(AuthService); 
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
    localStorage.clear();
  });

  it('xizmat yaratilishi kerak', () => {
    expect(service).toBeTruthy(); 
  });

  it('tizimga kirishi va tokenlarni o\'rnatishi kerak', () => {
    const mockTokens: Tokens = { access_token: 'mock_access_token' };
    const loginData: LoginType = { email: 'test@example.com', password: 'password' };

    service.login(loginData).subscribe((tokens) => {
      expect(tokens).toEqual(mockTokens);
      expect(localStorage.getItem('access_token')).toEqual(mockTokens.access_token);
    });

    const req = httpMock.expectOne(`${service.url}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockTokens);
  });

  it('tizimdan chiqishda va login sahifaga o\'tish kerak', () => {
    service.logout();
    expect(localStorage.getItem('access_token')).toBeNull();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('agar foydalanuvchi autentifikatsiya qilingan bo\'lsa, true qiymatini qaytarishi kerak', () => {
    localStorage.setItem('access_token', 'mock_access_token');
    const isAuthenticated = service.isAuthenticated();
    expect(isAuthenticated).toBeTrue();
  });

  it('kirish tokeni bo\'lmasa, false qiymatini qaytarishi kerak', () => {
    localStorage.removeItem('access_token'); 
    const isAuthenticated = service.isAuthenticated();
    expect(isAuthenticated).toBeFalse();
  });
});