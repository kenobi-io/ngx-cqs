import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTileContainerComponent } from './product-tile-container.component';

describe('TilePageComponent', () => {
  let component: ProductTileContainerComponent;
  let fixture: ComponentFixture<ProductTileContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTileContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
