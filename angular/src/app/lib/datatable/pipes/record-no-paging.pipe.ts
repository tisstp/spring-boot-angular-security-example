import { Pipe, PipeTransform } from '@angular/core';
import { PageResponse } from 'src/app/lib/datatable/models/datatable-model';

@Pipe({
  name: 'recordNoPaging'
})
export class RecordNoPagingPipe implements PipeTransform {
  transform(index: number, data: PageResponse<any>): string {
    return String(data.pageNumber * data.pageSize + (index + 1));
  }
}
