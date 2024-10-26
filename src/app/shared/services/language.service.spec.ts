import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('xizmat yaratilishi kerak', () => {
    expect(service).toBeTruthy();
  });

  it('tilni localStorage\'ga o\'rnatishi kerak', () => {
    const langCode = 'en';
    service.setLang(langCode);
    expect(localStorage.getItem('lang')).toEqual(langCode);
  });

  it('barcha tillarni qaytarishi kerak', () => {
    const languages = service.getAllLang();
    expect(languages.length).toBe(3); 
    expect(languages).toEqual(service.languages);
  });

  it('hozirgi tilni qaytarishi kerak', () => {
    localStorage.setItem('lang', 'uz');
    const currentLang = service.getLang();
    expect(currentLang.code).toEqual('uz');
  });

  it('agar til o\'rnatilmasa, default tilni qaytarishi kerak', () => {
    localStorage.removeItem('lang');
    const defaultLang = service.getLang();
    expect(defaultLang.code).toEqual('uz');
  });
});
