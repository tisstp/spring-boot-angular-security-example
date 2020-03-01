import { Optional, Pipe, PipeTransform } from '@angular/core';
import { DatatableServiceConfig } from 'src/app/lib/datatable/config/datatable-service-config';
import { PageResponse } from 'src/app/lib/datatable/models/datatable-model';

@Pipe({
  name: 'recordNoPaging'
})
export class RecordNoPagingPipe implements PipeTransform {
  constructor(@Optional() private config?: DatatableServiceConfig) {}

  transform(index: number, data: PageResponse<any>): string {
    const pageStartAtZero = this.config.isStartPageAtZero ? 0 : 1;
    return String((data.pageNumber - pageStartAtZero) * data.pageSize + (index + 1));
  }
}
