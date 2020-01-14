import { QueryStringParameters } from 'src/app/shared/classes/query-string-parameters';

/**
 * 1. Base URL: https://domain.com/api
 * 2. Action: get-users
 * 3. Query strings: id=3&type=customer
 * e.g., https://domain.com/api/get-user?id=3&type=customer.
 */
export class UrlBuilder {
  public url: string;
  public queryString: QueryStringParameters;

  constructor(
    private baseUrl: string,
    private action: string,
    queryString?: QueryStringParameters
  ) {
    this.url = [baseUrl, action].join('/');
    this.queryString = queryString || new QueryStringParameters();
  }

  public toString(): string {
    const qs: string = this.queryString ? this.queryString.toString() : '';
    return qs ? `${this.url}?${qs}` : this.url;
  }

}
