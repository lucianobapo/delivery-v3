import {Component, ViewChild, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';

import {CategoriesService} from '../../providers/categories-service';
import {ProductService} from '../../providers/product-service';
import {LogService} from "../../providers/log-service";

import {ProductPage} from "../product/product";
import {BasePage} from "../base-page";
import {CartService} from "../../providers/cart-service";
import {CartPage} from "../cart/cart";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    entryComponents:[ ProductPage, CartPage ]
})
export class HomePage extends BasePage implements OnInit {
    @ViewChild('search') searchInput;
    protected categories;

    constructor(protected navCtrl: NavController,
                protected log: LogService,
                protected categoriesService: CategoriesService,
                protected productService: ProductService,
                protected cartService: CartService) {
        super();
    }

    ngOnInit() {
        this.categoriesService.findAll().subscribe(
            data => this.categories = data,
            err => this.categoriesService.handleError(err),
            () => this.categoriesService.dismiss());
    }

    goToProductPage(categoryId){
        this.navCtrl.push(ProductPage, {categoryId: categoryId});
    }

    goToCartPage(){
        this.navCtrl.push(CartPage);
    }
}
