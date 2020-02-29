import { Directive, Input, TemplateRef } from '@angular/core';
import { TableTemplateType } from 'src/app/lib/datatable/models/datatable-types';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[tableTemplate]'
})
export class TableTemplateDirective {
  private _type: TableTemplateType;

  @Input()
  set tableTemplate(value: TableTemplateType) {
    this._type = value;
  }

  get getType(): TableTemplateType {
    return this._type;
  }

  constructor(public template: TemplateRef<any>) {}
}
