import { SortType } from './datatable-types';

export interface SortColumn {
  field: string;
  type: SortType;
}

/**
 * properties request from spring boot(Pagination)
 */
export interface PageRequest {
  page: number;
  size: number;
  sort?: SortColumn[];
}

/**
 * properties response from spring boot(Pagination)
 */
export interface PageResponse<T> {
  content: T[];
  numberOfElements: number;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface DatatableRequest {
  page: PageRequest;
  search?: string;
}
