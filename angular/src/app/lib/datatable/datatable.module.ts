import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { DatatableServiceConfig } from 'src/app/lib/datatable/config/datatable-service-config';
import { DatatableServiceModule } from 'src/app/lib/datatable/services/datatable-service.module';
import { DatatableFooterComponent } from './components/footer/datatable-footer.component';
import { DatatableHeaderComponent } from './components/header/datatable-header.component';
import { DatatableColumnComponent } from './containers/column/datatable-column.component';
import { DatatableTableComponent } from './containers/table/datatable-table.component';
import { TableTemplateDirective } from './containers/template/table-template.directive';
import { RecordNoPagingPipe } from './pipes/record-no-paging.pipe';

// prettier-ignore
@NgModule({
  declarations: [
    DatatableTableComponent,
    DatatableColumnComponent,
    DatatableHeaderComponent,
    DatatableFooterComponent,
    TableTemplateDirective,
    RecordNoPagingPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DatatableServiceModule,
    BsDropdownModule.forRoot(),
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
        { provide: DatatableServiceConfig, useValue: config }
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule?: DatatableModule) {
    if (parentModule) {
      throw new Error('DatatableModule is already loaded. Import it in the AppModule only');
    }
  }

}
