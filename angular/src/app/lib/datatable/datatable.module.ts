import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DatatableServiceConfig } from 'src/app/lib/datatable/config/datatable-service-config';
import { DATATABLE_DEFAULT_SETTING } from 'src/app/lib/datatable/config/datatable-setting';
import { DatatableServiceModule } from 'src/app/lib/datatable/services/datatable-service.module';
import { DatatableFooterComponent } from './components/footer/datatable-footer.component';
import { DatatableHeaderComponent } from './components/header/datatable-header.component';
import { DatatableColumnComponent } from './containers/column/datatable-column.component';
import { DatatableTableComponent } from './containers/table/datatable-table.component';
import { TableTemplateDirective } from './containers/template/table-template.directive';
import { RecordNoPagingPipe } from './pipes/record-no-paging.pipe';
import { ShowingItemsPipe } from './pipes/showing-items.pipe';
import { ColumnSortingDirective } from './directive/column-sorting.directive';

// prettier-ignore
@NgModule({
  declarations: [
    DatatableTableComponent,
    DatatableColumnComponent,
    DatatableHeaderComponent,
    DatatableFooterComponent,
    TableTemplateDirective,
    RecordNoPagingPipe,
    ShowingItemsPipe,
    ColumnSortingDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatatableServiceModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports: [
    DatatableTableComponent,
    DatatableColumnComponent,
    TableTemplateDirective
  ]
})
export class DatatableModule {

  static forRoot(config?: DatatableServiceConfig): ModuleWithProviders {
    return {
      ngModule: DatatableModule,
      providers: [
        {
          provide: DatatableServiceConfig,
          useValue: {
            ...DATATABLE_DEFAULT_SETTING,
            ...config
          }
        }
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule?: DatatableModule) {
    if (parentModule) {
      throw new Error('DatatableModule is already loaded. Import it in the AppModule only');
    }
  }

}
