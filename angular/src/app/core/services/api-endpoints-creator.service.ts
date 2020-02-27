import { Injectable } from '@angular/core';
import { Logger } from '@shared/classes';
import { QueryStringParameters } from '@shared/classes/query-string-parameters';
import { UrlBuilder } from '@shared/classes/url-builder';
import { Constants } from 'src/app/config/constants';

const log = new Logger('ApiEndpointCreator');

/**
 * - Create an API URL that uses the real or the mock API.
 * - Create an API URL with query strings.
 * - Create an API URL with path variables.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsCreatorService {

  constructor(
    // Application Constants
    private constants: Constants
  ) {}

  protected getApiEndpoint(): string {
    return this.constants.API_ENDPOINT;
  }

  protected getApiMockEndpoint(): string {
    return this.constants.API_MOCK_ENDPOINT;
  }

  /* #region URL CREATOR */

  // URL
  protected createUrl(action: string, isMockAPI: boolean = false): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this.getApiMockEndpoint() : this.getApiEndpoint(),
      action
    );
    const url = urlBuilder.toString();
    log.debug('createUrl: ', url);
    return url;
  }

  // URL WITH QUERY PARAMS
  protected createUrlWithQueryParameters(
    action: string,
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.getApiEndpoint(), action);
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    const url = urlBuilder.toString();
    log.debug('createUrlWithQueryParameters: ', url);
    return url;
  }

  // URL WITH PATH VARIABLES
  protected createUrlWithPathVariables(action: string, pathVariables: any[] = []): string {
    let encodedPathVariablesUrl = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(this.getApiEndpoint(), `${action}${encodedPathVariablesUrl}`);
    const url = urlBuilder.toString();
    log.debug('createUrlWithPathVariables: ', url);
    return url;
  }

  /* #endregion */

}
