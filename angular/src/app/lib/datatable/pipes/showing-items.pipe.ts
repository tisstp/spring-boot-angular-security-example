import { Optional, Pipe, PipeTransform } from '@angular/core';
import { DatatableServiceConfig } from 'src/app/lib/datatable/config/datatable-service-config';
import { PageState } from 'src/app/lib/datatable/models/page-state';

@Pipe({
  name: 'showingItems'
})
export class ShowingItemsPipe implements PipeTransform {
  private readonly FORMAT_EN = 'Showing {start} to {end} of {total} items';
  private readonly FORMAT_TH = 'แสดงรายการ {start} ถึง {end} จากทั้งหมด {total} รายการ';

  constructor(@Optional() private config?: DatatableServiceConfig) {}

  transform(page: PageState, lang: 'th' | 'en' = 'en'): string {
    let val: string = lang === 'th' ? this.FORMAT_TH : this.FORMAT_EN;
    const pageStartAtZero = this.config.isStartPageAtZero ? 0 : 1;
    const pageStart: number = (page.currentPage - pageStartAtZero) * page.sizeOfPage;
    val = val.replace('{start}', String(pageStart + 1));
    val = val.replace('{end}', String(pageStart + page.sizeOfPage));
    val = val.replace('{total}', String(page.totalElements));
    return val;
  }
}
