import { Injectable } from '@angular/core';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setSavedState(state: any, localStorageKey: string) {
    let jsonStr = JSON.stringify(state);
    jsonStr = environment.production ? this.encrypt(jsonStr) : jsonStr;
    localStorage.setItem(localStorageKey, jsonStr);
  }

  getSavedState(localStorageKey: string): any {
    let jsonStr = localStorage.getItem(localStorageKey);
    jsonStr = environment.production ? this.decrypt(jsonStr) : jsonStr;
    return JSON.parse(jsonStr);
  }

  encrypt(str: string): string {
    return btoa(str);
  }

  decrypt(str: string): string {
    return atob(str);
  }
}
