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
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Content, NavParams, NavController, PopoverController } from 'ionic-angular';
import { BasePage } from "../base-page";
import { LogService } from "../../providers/log-service";
import { CartService } from "../../providers/cart-service";
import { ProductService } from "../../providers/product-service";
import { CategoriesService } from "../../providers/categories-service";
import { CartPage } from "../cart/cart";
import { HintPopoverPage } from "../hint-popover/hint-popover";
/*
 Generated class for the Product page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var ProductPage = (function (_super) {
    __extends(ProductPage, _super);
    function ProductPage(navCtrl, navParams, log, changeDetectorRef, cartService, productService, categoriesService, popoverCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.log = log;
        _this.changeDetectorRef = changeDetectorRef;
        _this.cartService = cartService;
        _this.productService = productService;
        _this.categoriesService = categoriesService;
        _this.popoverCtrl = popoverCtrl;
        _this.showToTop = false;
        _this.scrollTop = 0;
        return _this;
    }
    ProductPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.content.ionScrollEnd.subscribe(function (data) {
            _this.scrollTop = data.scrollTop;
            _this.showToTop = data.scrollTop > window.innerHeight;
            _this.changeDetectorRef.detectChanges();
        });
    };
    ProductPage.prototype.ngOnInit = function () {
        var _this = this;
        var categoryId = this.navParams.get("categoryId");
        this.categoriesService.findAll().subscribe(function (data) {
            _this.categories = data;
            if (categoryId == undefined) {
                _this.categoryTitle = 'Todas';
                _this.categoryIcon = 'globe';
            }
            else
                _this.categories.forEach(function (item) {
                    if (categoryId == item.id) {
                        _this.categoryTitle = item.grupo;
                        _this.categoryIcon = item.icone;
                    }
                });
        }, function (err) { return _this.categoriesService.handleError(err); }, function () { return _this.categoriesService.dismiss(); });
        if (categoryId == undefined)
            this.productService.findAll().subscribe(function (data) { return _this.products = data; }, function (err) { return _this.productService.handleError(err); }, function () { return _this.productService.dismiss(); });
        else
            this.productService.findByCategory(categoryId).subscribe(function (data) { return _this.products = data; }, function (err) { return _this.productService.handleError(err); }, function () { return _this.productService.dismiss(); });
    };
    ProductPage.prototype.ionViewDidLoad = function () {
        this.log.l('ionViewDidLoad ProductPage');
        // console.log(this.cartButton.nativeElement.getBoundingClientRect());
        this.showHint = true;
    };
    // Scroll to top functions
    ProductPage.prototype.scrollToTop = function () {
        this.content.scrollToTop();
    };
    ProductPage.prototype.scrollUp = function (y) {
        // this.log.d(this.content.contentTop);
        this.content.scrollTo(0, (this.scrollTop - y));
    };
    ProductPage.prototype.scrollDown = function (y) {
        this.content.scrollTo(0, (this.scrollTop + y));
    };
    ProductPage.prototype.goToCartPage = function () {
        this.navCtrl.push(CartPage);
    };
    ProductPage.prototype.presentPopover = function (myEvent) {
        // console.log(myEvent.target.getBoundingClientRect());
        if (this.showHint) {
            this.showHint = false;
            var popover = this.popoverCtrl.create(HintPopoverPage);
            var ev = {
                target: {
                    getBoundingClientRect: function () {
                        return {
                            bottom: 38,
                            height: 32,
                            left: 222.9375,
                            right: 248.40625,
                            top: 6,
                            width: 25.46875
                        };
                        // return {
                        //     bottom: 44,
                        //     height: 32,
                        //     left: 195.171875,
                        //     right: 223.171875,
                        //     top: 12,
                        //     width: 28
                        // };
                    }
                }
            };
            popover.present({
                ev: ev
            });
        }
    };
    return ProductPage;
}(BasePage));
__decorate([
    ViewChild('search'),
    __metadata("design:type", Object)
], ProductPage.prototype, "searchInput", void 0);
__decorate([
    ViewChild('cart'),
    __metadata("design:type", Object)
], ProductPage.prototype, "cartButton", void 0);
__decorate([
    ViewChild(Content),
    __metadata("design:type", Object)
], ProductPage.prototype, "content", void 0);
ProductPage = __decorate([
    Component({
        selector: 'page-product',
        templateUrl: 'product.html',
        entryComponents: [CartPage, HintPopoverPage]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        LogService,
        ChangeDetectorRef,
        CartService,
        ProductService,
        CategoriesService,
        PopoverController])
], ProductPage);
export { ProductPage };
//# sourceMappingURL=product.js.map