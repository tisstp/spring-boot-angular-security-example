import { Pipe, PipeTransform } from '@angular/core';
import { PageResponse } from 'src/app/lib/datatable/models/datatable-model';
import { DatatableService } from 'src/app/lib/datatable/services/datatable.service';

@Pipe({
  name: 'recordNoPaging'
})
export class RecordNoPagingPipe implements PipeTransform {
  constructor(private datatableService: DatatableService) {}

  transform(index: number, data: PageResponse<any>): string {
    const pageStartAtZero = this.datatableService.pageStartAtZero;
    return String((data.pageNumber - pageStartAtZero) * data.pageSize + (index + 1));
  }
}
