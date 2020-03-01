import { DatatableServiceConfig } from 'src/app/lib/datatable/config/datatable-service-config';

export const DATATABLE_DEFAULT_SETTING: DatatableServiceConfig = {
  sizeOfPage: 5,
  itemPerPageList: [5, 10, 20, 50],
  maxSizePage: 5,
  isStartPageAtZero: true,
  debounceTime: 300
};
