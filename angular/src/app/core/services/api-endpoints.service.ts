import { Injectable } from '@angular/core';
import { QueryStringParameters } from '@shared/classes';
import { PageRequest } from 'src/app/lib/datatable';
import { ApiEndpointsCreatorService } from './api-endpoints-creator.service';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService extends ApiEndpointsCreatorService {
  public static setQueryParametersFromPageRequest(qs: QueryStringParameters, page: PageRequest) {
    qs.push('page', page.page);
    qs.push('size', page.size);
    if (page.sort) {
      for (const sort of page.sort) {
        qs.push('sort', `${sort.field},${sort.type}`);
      }
    }
  }

  public getAuthEndpoint = (): string => this.createUrl('auth');

  public getExampleEndpoint = (): string => this.createUrl('example');

  public getPageUserEndpoint = (page: PageRequest): string => {
    return this.createUrlWithQueryParameters('sql-native/test', (qs: QueryStringParameters) => {
      ApiEndpointsService.setQueryParametersFromPageRequest(qs, page);
    });
  };
}
