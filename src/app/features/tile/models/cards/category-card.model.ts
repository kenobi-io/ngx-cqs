import { Router } from "@angular/router";

export class CategoryCardModel {
    
    public data;

    constructor() { }

    public navigate(router: Router, url: string) {
        router.navigate([`/category/${url}`]);
    }
}