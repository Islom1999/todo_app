import { Injectable } from '@angular/core';
import { ILanguage } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  languages: ILanguage[] = [
    { name: 'Uzbek', code: 'uz', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/1280px-Flag_of_Uzbekistan.svg.png' },
    { name: 'English', code: 'en', flag: 'https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg' },
    { name: 'Russian', code: 'ru', flag: 'https://img.goodfon.com/wallpaper/big/6/5f/russian-flag-russian-flag-russia-flag-of-russia.webp' },
  ];

  setLang(code: string) {
    localStorage.setItem('lang', code);
  }

  getAllLang(){
    return this.languages
  }

  getLang(): ILanguage{
    const code = localStorage.getItem('lang');
    return this.languages.find(language => language.code == code) || this.languages[0];
  }
}
