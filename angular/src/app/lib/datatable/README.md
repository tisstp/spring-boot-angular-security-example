### Data Table

```angular2html
<app-datatable [headerTitle]="'quotations.insystem_list' | translate"
               [data]="pageRes" (pageChange)="onPageChange($event)">

  <ng-template appTemplate="header" let-columns>
    <tr>
      <th *ngFor="let col of columns">({{ col.header }})</th>
    </tr>
  </ng-template>

  <app-column field="numId" [header]="'quotations.table.record_number' | translate"></app-column>

  <app-column field="qtNo" [header]="'quotations.table.qt_no' | translate">
    <ng-template appTemplate="header" let-col>
      <th>{{ col.header }} !!!</th> <!-- col.header, col.field -->
    </ng-template>
    <ng-template appTemplate="body" let-col let-item="item">
      <td>{{ col.field }} - {{ item[col.field] }}</td>
    </ng-template>
  </app-column>

  <app-column field="customer" [header]="'quotations.table.customer' | translate"></app-column>
  <app-column field="plan" [header]="'quotations.table.plan' | translate"></app-column>
</app-datatable>
```
