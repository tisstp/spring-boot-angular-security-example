import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { QueryStringParameters } from 'src/app/shared/classes/query-string-parameters';
import { UrlBuilder } from 'src/app/shared/classes/url-builder';

/**
 * - Create an API URL that uses the real or the mock API.
 * - Create an API URL with query strings.
 * - Create an API URL with path variables.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {

  constructor(
    // Application Constants
    private constants: Constants
  ) { }

  public getAuthEndpoint = (): string => this.createUrl('auth');

  public getExampleEndpoint = (): string => this.createUrl('example');

  /* #region EXAMPLES */
  public getDataByIdEndpoint = (id: string): string => this.createUrlWithPathVariables('data', [id]);

  public getDataByIdAndCodeEndpoint = (id: string, code: number): string => this.createUrlWithPathVariables('data', [id, code]);

  public getDataByIdCodeAndYearEndpoint(id: string, code: number, year: number): string {
    const queryString: QueryStringParameters = new QueryStringParameters();
    queryString.push('year', year);
    return `${this.createUrlWithPathVariables('data', [id, code])}?${queryString.toString()}`;
  }

  public getProductListByCountryCodeEndpoint(countryCode: string): string {
    return this.createUrlWithQueryParameters('productlist', (qs: QueryStringParameters) => qs.push('countryCode', countryCode));
  }

  public getProductListByCountryAndPostalCodeEndpoint(countryCode: string, postalCode: string): string {
    return this.createUrlWithQueryParameters('productlist', (qs: QueryStringParameters) => {
      qs.push('countryCode', countryCode);
      qs.push('postalCode', postalCode);
    });
  }

  public getNewsEndpoint = (): string => this.createUrl('41gRGwOaw', true);

  public invalidUrlEndpoint = (): string => this.createUrl('invalidurl', true);
  /* #endregion */


  /* #region URL CREATOR */
  // URL
  private createUrl(action: string, isMockAPI: boolean = false): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this.constants.API_MOCK_ENDPOINT : this.constants.API_ENDPOINT,
      action
    );
    return urlBuilder.toString();
  }

  // URL WITH QUERY PARAMS
  private createUrlWithQueryParameters(
    action: string,
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.API_ENDPOINT, action);
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH PATH VARIABLES
  private createUrlWithPathVariables(
    action: string,
    pathVariables: any[] = []
  ): string {
    let encodedPathVariablesUrl = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.API_ENDPOINT, `${action}${encodedPathVariablesUrl}`);
    return urlBuilder.toString();
  }

  /* #endregion */

}
