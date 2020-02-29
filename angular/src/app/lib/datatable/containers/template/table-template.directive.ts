import { Directive, Input, TemplateRef } from '@angular/core';
import { TableTemplate } from 'src/app/lib/datatable/models/datatable-types';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[tableTemplate]'
})
export class TableTemplateDirective {
  private _type: TableTemplate;

  @Input()
  set tableTemplate(value: TableTemplate) {
    this._type = value;
  }

  get getType(): TableTemplate {
    return this._type;
  }

  constructor(public template: TemplateRef<any>) {}
}
