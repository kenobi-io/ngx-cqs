import { CategoryCardModel } from "../models/cards/category-card.model";
import { ProductCardModel } from "../models/models";

export class ModelStoreProvider {
    public getComponentStore() {
        return modelStore;
    }
}

export const modelStore = {
    productCardModel: ProductCardModel,
    categoryCardModel: CategoryCardModel
};