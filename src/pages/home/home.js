var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoriesService } from '../../providers/categories-service';
import { ProductService } from '../../providers/product-service';
import { LogService } from "../../providers/log-service";
import { ProductPage } from "../product/product";
import { BasePage } from "../base-page";
import { CartService } from "../../providers/cart-service";
import { CartPage } from "../cart/cart";
var HomePage = (function (_super) {
    __extends(HomePage, _super);
    function HomePage(navCtrl, log, categoriesService, productService, cartService) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.log = log;
        _this.categoriesService = categoriesService;
        _this.productService = productService;
        _this.cartService = cartService;
        return _this;
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.categoriesService.findAll().subscribe(function (data) { return _this.categories = data; }, function (err) { return _this.categoriesService.handleError(err); }, function () { return _this.categoriesService.dismiss(); });
    };
    HomePage.prototype.goToProductPage = function (categoryId) {
        this.navCtrl.push(ProductPage, { categoryId: categoryId });
    };
    HomePage.prototype.goToCartPage = function () {
        this.navCtrl.push(CartPage);
    };
    return HomePage;
}(BasePage));
__decorate([
    ViewChild('search'),
    __metadata("design:type", Object)
], HomePage.prototype, "searchInput", void 0);
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        entryComponents: [ProductPage, CartPage]
    }),
    __metadata("design:paramtypes", [NavController,
        LogService,
        CategoriesService,
        ProductService,
        CartService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map