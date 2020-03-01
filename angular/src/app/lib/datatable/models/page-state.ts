export interface PageState {
  eventType?: 'initial' | 'updateAll' | 'changedPage' | 'changedSize';
  currentPage: number;
  sizeOfPage: number;
  totalPages: number;
  totalElements: number;
}
