import { Injectable } from '@angular/core';
import { Logger } from '@shared/classes';
import { Observable, Subject } from 'rxjs';
import { DatatableServiceModule } from 'src/app/lib/datatable/services/datatable-service.module';

const log = new Logger('DatatableSearchService');

@Injectable({
  providedIn: DatatableServiceModule
})
export class DatatableSearchService {
  get search$(): Observable<string> {
    return this.searchSubject$.asObservable();
  }

  private searchSubject$ = new Subject<string>();

  constructor() {}

  onSearch(search: string) {
    this.searchSubject$.next(search);
  }
}
