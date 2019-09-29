import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTileContainerComponent } from './category-tile-container.component';

describe('CategoryTileContainerComponent', () => {
  let component: CategoryTileContainerComponent;
  let fixture: ComponentFixture<CategoryTileContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTileContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
