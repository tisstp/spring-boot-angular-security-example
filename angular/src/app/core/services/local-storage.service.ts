import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { decrypt, encrypt } from '@shared/functions/security';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  setSavedState(state: any, localStorageKey: string) {
    let jsonStr = JSON.stringify(state);
    jsonStr = environment.production ? encrypt(jsonStr) : jsonStr;
    localStorage.setItem(localStorageKey, jsonStr);
  }

  getSavedState(localStorageKey: string): any {
    let jsonStr = localStorage.getItem(localStorageKey);
    jsonStr = environment.production ? decrypt(jsonStr) : jsonStr;
    return JSON.parse(jsonStr);
  }
}
