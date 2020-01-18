import { Injectable } from '@angular/core';
import { ApiEndpointsCreatorService } from './api-endpoints-creator.service';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService extends ApiEndpointsCreatorService {

  public getAuthEndpoint = (): string => this.createUrl('auth');

  public getExampleEndpoint = (): string => this.createUrl('example');

}
