## Data Table

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

```angular2html
  <datatable [data]="userPage">
    <datatable-column headerName="No" field="recordNo" styleClass="text-center"></datatable-column>
    <datatable-column headerName="ID" field="id"></datatable-column>
    <datatable-column headerName="Name" field="name"></datatable-column>
    <datatable-column headerName="Passport Number" field="passportNumber"></datatable-column>
  </datatable>
```

![datatable-example-01-default](/angular/docs/images/datatable-example-01-default.png)

![datatable-example-00-no-content](/angular/docs/images/datatable-example-00-no-content.png)

### Example 2: Custom in column.

```angular2html
  <datatable [data]="userPage">
    <datatable-column headerName="No" field="recordNo" styleClass="text-center"></datatable-column>
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
