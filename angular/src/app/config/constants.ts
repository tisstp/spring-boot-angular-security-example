import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class Constants {
  public readonly API_ENDPOINT: string = environment.apiUrl;
  public readonly API_MOCK_ENDPOINT: string = 'mocks/api';
}
