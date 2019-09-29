
import { ProductCardComponent } from './card/product/product-card.component';
import { ProductTileContainerComponent } from './tile-container/product/product-tile-container.component';
import { AnchorDirective } from './anchor/anchor.directive';
import { CategoryCardComponent } from './card/category/category-card.component';
import { CategoryTileContainerComponent } from './tile-container/category/category-tile-container.component';


export const tileComponents = [ProductCardComponent, ProductTileContainerComponent, CategoryCardComponent, CategoryTileContainerComponent];
export const tileDirectives = [AnchorDirective];