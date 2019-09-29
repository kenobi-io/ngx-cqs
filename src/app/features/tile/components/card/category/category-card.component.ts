import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'balloon-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {

  public model: any;

  constructor(public readonly router: Router) { }
}
