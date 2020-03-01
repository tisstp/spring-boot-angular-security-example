import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { SortColumn } from 'src/app/lib/datatable/models/datatable-model';
import { SortEnum } from 'src/app/lib/datatable/models/datatable-enum';
import { SortType } from 'src/app/lib/datatable/models/datatable-types';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[columnSorting]'
})
export class ColumnSortingDirective implements OnInit {
  @Input() sortable: boolean;
  @Input() field: string;
  @Output() sort: EventEmitter<SortColumn> = new EventEmitter<SortColumn>();

  private sortTypeCurrent: SortType = 'none';

  // prettier-ignore
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  @HostListener('click')
  onClickSortColumn() {
    if (this.sortable) {
      console.log('Click Column: ' + this.field);
      if (this.sortTypeCurrent === SortEnum.NONE) {
        this.setSortingToAsc();
      } else if (this.sortTypeCurrent === SortEnum.ASC) {
        this.setSortingToDesc();
      } else if (this.sortTypeCurrent === SortEnum.DESC) {
        this.setSortingToNone();
      }
      this.sort.emit({ field: this.field, type: this.sortTypeCurrent });
    }
  }

  ngOnInit(): void {
    this.setSortingToNone();
  }

  public setSortingToNone() {
    if (this.sortable) {
      this.sortTypeCurrent = SortEnum.NONE;
      this.renderer.addClass(this.el.nativeElement, 'sorting-none');
      this.renderer.removeClass(this.el.nativeElement, 'sorting-asc');
      this.renderer.removeClass(this.el.nativeElement, 'sorting-desc');
    }
  }

  public setSortingToAsc() {
    if (this.sortable) {
      this.sortTypeCurrent = SortEnum.ASC;
      this.renderer.addClass(this.el.nativeElement, 'sorting-asc');
      this.renderer.removeClass(this.el.nativeElement, 'sorting-none');
      this.renderer.removeClass(this.el.nativeElement, 'sorting-desc');
    }
  }

  public setSortingToDesc() {
    if (this.sortable) {
      this.sortTypeCurrent = SortEnum.DESC;
      this.renderer.addClass(this.el.nativeElement, 'sorting-desc');
      this.renderer.removeClass(this.el.nativeElement, 'sorting-none');
      this.renderer.removeClass(this.el.nativeElement, 'sorting-asc');
    }
  }
}
