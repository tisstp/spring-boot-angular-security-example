import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatatableTableComponent } from 'src/app/lib/datatable/containers/table/datatable-table.component';
import { SortEnum } from 'src/app/lib/datatable/models/datatable-enum';
import { SortColumn } from 'src/app/lib/datatable/models/datatable-model';
import { SortType } from 'src/app/lib/datatable/models/datatable-types';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[sortableColumn]'
})
export class SortableColumnDirective implements OnInit, OnDestroy {
  @Input('sortableColumn') field: string;
  @Input() sortableColumnDisabled: boolean;
  @Input() sortable: boolean;

  private sortTypeCurrent: SortType = 'none';
  private subscription: Subscription;

  // prettier-ignore
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public dt: DatatableTableComponent
  ) {
  }

  ngOnInit(): void {
    if (this.isEnabled()) {
      this.setSortingToNone();
      this.subscribeSortSource();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  subscribeSortSource() {
    this.subscription = this.dt.datatableService.sortSource$.subscribe((sortMeta: SortColumn) => {
      if (sortMeta.field !== this.field) {
        this.setSortingToNone();
      }
    });
  }

  @HostListener('click', ['$event'])
  onClickSortColumn(event: MouseEvent) {
    if (this.isEnabled()) {
      if (this.sortTypeCurrent === SortEnum.NONE) {
        this.setSortingToAsc();
      } else if (this.sortTypeCurrent === SortEnum.ASC) {
        this.setSortingToDesc();
      } else if (this.sortTypeCurrent === SortEnum.DESC) {
        this.setSortingToNone();
      }
      this.dt.sort({
        originalEvent: event,
        sortColumn: { field: this.field, type: this.sortTypeCurrent }
      });
    }
  }

  isEnabled(): boolean {
    return this.sortableColumnDisabled !== true && this.sortable;
  }

  setSortingToNone() {
    if (this.isEnabled()) {
      this.sortTypeCurrent = SortEnum.NONE;
      this.renderer.addClass(this.el.nativeElement, 'sorting-none');
      this.renderer.removeClass(this.el.nativeElement, 'sorting-asc');
      this.renderer.removeClass(this.el.nativeElement, 'sorting-desc');
    }
  }

  setSortingToAsc() {
    if (this.isEnabled()) {
      this.sortTypeCurrent = SortEnum.ASC;
      this.renderer.addClass(this.el.nativeElement, 'sorting-asc');
      this.renderer.removeClass(this.el.nativeElement, 'sorting-none');
      this.renderer.removeClass(this.el.nativeElement, 'sorting-desc');
    }
  }

  setSortingToDesc() {
    if (this.isEnabled()) {
      this.sortTypeCurrent = SortEnum.DESC;
      this.renderer.addClass(this.el.nativeElement, 'sorting-desc');
      this.renderer.removeClass(this.el.nativeElement, 'sorting-none');
      this.renderer.removeClass(this.el.nativeElement, 'sorting-asc');
    }
  }
}
