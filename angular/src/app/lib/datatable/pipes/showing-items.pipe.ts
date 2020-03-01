import { Pipe, PipeTransform } from '@angular/core';
import { PageResponse } from 'src/app/lib/datatable/models/datatable-model';
import { DatatableService } from 'src/app/lib/datatable/services/datatable.service';

@Pipe({
  name: 'showingItems'
})
export class ShowingItemsPipe implements PipeTransform {
  private readonly FORMAT_EN = 'Showing {start} to {end} of {total} items';
  private readonly FORMAT_TH = 'แสดงรายการ {start} ถึง {end} จากทั้งหมด {total} รายการ';

  constructor(private datatableService: DatatableService) {}

  transform(page: PageResponse<any>, lang: 'th' | 'en' = 'en'): string {
    if (!page) {
      return 'loading...';
    }
    let val: string = lang === 'th' ? this.FORMAT_TH : this.FORMAT_EN;
    const pageStartAtZero = this.datatableService.pageStartAtZero;
    const pageStart: number = (page.pageNumber - pageStartAtZero) * page.pageSize;
    let pageEnd = pageStart + page.pageSize;
    pageEnd = pageEnd > page.totalElements ? page.totalElements : pageEnd;
    val = val.replace('{start}', String(pageStart + 1));
    val = val.replace('{end}', String(pageEnd));
    val = val.replace('{total}', String(page.totalElements));
    return val;
  }
}
