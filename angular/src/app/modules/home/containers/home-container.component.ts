import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-container',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class HomeContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
