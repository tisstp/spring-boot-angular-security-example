import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { PageResponse } from 'src/app/lib/datatable/models/datatable-model';
import { DatatableService } from 'src/app/lib/datatable/services/datatable.service';

@Pipe({
  name: 'showingItems'
})
export class ShowingItemsPipe implements PipeTransform {
  private readonly FORMAT_EN = 'Showing {start} to {end} of {total} items';
  private readonly FORMAT_TH = 'แสดงรายการ {start} ถึง {end} จากทั้งหมด {total} รายการ';

  // prettier-ignore
  constructor(
    private datatableService: DatatableService,
    private decimalPipe: DecimalPipe
  ) {}

  transform(page: PageResponse<any>, lang: 'th' | 'en' = 'en'): string {
    if (!page || (page && page.totalElements === 0)) {
      return this.replaceText(lang, 0, 0, 0);
    }

    const pageStartAtZero = this.datatableService.pageStartAtZero;
    const pageStart: number = (page.pageNumber - pageStartAtZero) * page.pageSize;
    let pageEnd = pageStart + page.pageSize;
    pageEnd = pageEnd > page.totalElements ? page.totalElements : pageEnd;
    return this.replaceText(lang, pageStart + 1, pageEnd, page.totalElements);
  }

  private replaceText(lang: 'th' | 'en', pageStart: number, pageEnd: number, totalElements: number) {
    let val: string = lang === 'th' ? this.FORMAT_TH : this.FORMAT_EN;
    val = val.replace('{start}', this.formatNumber(pageStart));
    val = val.replace('{end}', this.formatNumber(pageEnd));
    val = val.replace('{total}', this.formatNumber(totalElements));
    return val;
  }

  private formatNumber(val: number): string {
    return this.decimalPipe.transform(val, '1.0-0');
  }
}
