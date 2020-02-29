import { AfterContentInit, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { TableTemplateDirective } from 'src/app/lib/datatable/containers/template/table-template.directive';

export class TableTemplate implements AfterContentInit {
  /* get template in datatable-column tag */
  @ContentChildren(TableTemplateDirective) templates: QueryList<TableTemplateDirective>;
  headerTemplate: TemplateRef<any>;
  bodyTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;

  ngAfterContentInit(): void {
    this.templates.forEach(item => {
      if (item.getType === 'header') {
        this.headerTemplate = item.template;
      } else if (item.getType === 'footer') {
        this.footerTemplate = item.template;
      } else {
        this.bodyTemplate = item.template;
      }
    });
  }
}
