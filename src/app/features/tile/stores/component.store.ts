import { ProductCardComponent } from "../components/card/product/product-card.component";
import { CategoryCardComponent } from "../components/card/category/category-card.component";

export class ComponentStoreProvider {
    public getComponentStore() {
        return componentStore;
    }
}

export const componentStore = {
    productCardComponent: ProductCardComponent,
    categoryCardComponent: CategoryCardComponent
};



