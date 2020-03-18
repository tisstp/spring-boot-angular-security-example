## Data Table

## Requirement

> bootstrap version: `4.1.1`

> ngx-bootstrap version: `^5.3.2`

## Data for test

```typescript
let userPage = {
  content: [
    {
      id: 10001,
      name: 'Ranga',
      passportNumber: 'E1234567'
    }
    // ...
  ],
  numberOfElements: 10,
  pageNumber: 0,
  pageSize: 55,
  totalElements: 10,
  totalPages: 1
};
```

### Example 1: Default

```html
<datatable [data]="userPage">
  <datatable-column
    headerName="No"
    field="recordNo"
    styleClass="text-center"
  ></datatable-column>
  <datatable-column headerName="ID" field="id"></datatable-column>
  <datatable-column headerName="Name" field="name"></datatable-column>
  <datatable-column
    headerName="Passport Number"
    field="passportNumber"
  ></datatable-column>
</datatable>
```

![datatable-example-01-default](/angular/docs/images/datatable-example-01-default.png)

![datatable-example-00-no-content](/angular/docs/images/datatable-example-00-no-content.png)

### Example 2: Custom in column.

```html
<datatable [data]="userPage">
  <datatable-column
    headerName="No"
    field="recordNo"
    styleClass="text-center"
  ></datatable-column>
  <datatable-column headerName="ID" field="id"></datatable-column>
  <datatable-column headerName="Name" field="name"></datatable-column>
  <datatable-column headerName="Passport Number" field="passportNumber">
    <ng-template tableTemplate="header" let-col>
      <th>{{ '<<< ' + col.headerName + ' >>>' }}</th>
    </ng-template>
    <ng-template tableTemplate="body" let-col let-item="item">
      <td>
        <a href="#">{{ item[col.field] }}</a>
      </td>
    </ng-template>
  </datatable-column>
</datatable>
```

![datatable-example-02-custom-in-column](/angular/docs/images/datatable-example-02-custom-in-column.png)

### Example 3: Custom in datable.

```html
<datatable [data]="userPage">
  <datatable-column
    headerName="No"
    field="recordNo"
    styleClass="text-center"
  ></datatable-column>
  <datatable-column headerName="ID" field="id"></datatable-column>
  <datatable-column headerName="Name" field="name"></datatable-column>
  <datatable-column
    headerName="Passport Number"
    field="passportNumber"
  ></datatable-column>

  <ng-template tableTemplate="header" let-columns>
    <tr>
      <ng-container *ngFor="let col of columns">
        <th scope="col" class="text-center">{{ col.headerName }}</th>
      </ng-container>
    </tr>
  </ng-template>

  <ng-template tableTemplate="body" let-columns let-data="data">
    <tr *ngFor="let item of data; index as id">
      <ng-container *ngFor="let col of columns">
        <td class="text-center">{{ item[col.field] }}</td>
      </ng-container>
    </tr>
  </ng-template>
</datatable>
```

![datatable-example-03-custom-in-datatable](/angular/docs/images/datatable-example-03-custom-in-datatable.png)

### Example 4: Custom Header with Column Sorting

```html
<ng-template tableTemplate="header" let-columns>
  <tr>
    <ng-container *ngFor="let col of columns">
      <th
        scope="col"
        [sortableColumn]="col.field"
        [ngStyle]="col.headerStyle || col.style"
        [ngClass]="col.headerStyleClass || col.styleClass"
        [sortable]="col.sortable"
      >
        {{ col.headerName }}
      </th>
    </ng-container>
  </tr>
</ng-template>
```
