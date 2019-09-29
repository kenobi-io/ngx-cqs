import { ConditionResult } from "../services/condition/condition-result";
import { componentStore } from "./component.store";
import { modelStore } from "./model.store";

export class ConditionStoreProvider {
    public getComponentStore() {
        return conditionStore;
    }
}


const conditionStore = {
    allCardCodition,
    categoryCardCodition,
    getCategoryCardCodition
};

function allCardCodition(params): ConditionResult[] {
    const conditionResults: ConditionResult[] = [];
    params.data.forEach((tile) => conditionResults.push(new ConditionResult({
        data: tile,
        model: new modelStore.productCardModel(),
        component: componentStore.productCardComponent
    })));
    return conditionResults;
}

function categoryCardCodition(params): ConditionResult[] {

    const conditionResults: ConditionResult[] = [];
    params.data.forEach((tile) => conditionResults.push(new ConditionResult({
        data: tile,
        model: new modelStore.categoryCardModel(),
        component: componentStore.categoryCardComponent
    })));
    return conditionResults;
}

function getCategoryCardCodition(param): ConditionResult[] {

    const conditionResults: ConditionResult[] = [];
    param.data.forEach((tile, index) => {

        if (param.option > index) {
            conditionResults.push(new ConditionResult({
                data: tile,
                model: new modelStore.categoryCardModel(),
                component: componentStore.categoryCardComponent
            }));
        }
    });
    return conditionResults;
}