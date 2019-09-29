import {
  Component
} from '@angular/core';

@Component({
  selector: 'balloon-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  public model: any;

  constructor() { }
}
