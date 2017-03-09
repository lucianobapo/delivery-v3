import {Component, ViewChild, ChangeDetectorRef, OnInit} from '@angular/core';
import {Content, NavParams, NavController, PopoverController} from 'ionic-angular';
import {BasePage} from "../base-page";
import {LogService} from "../../providers/log-service";
import {CartService} from "../../providers/cart-service";
import {ProductService} from "../../providers/product-service";
import {CartPage} from "../cart/cart";
import {HintPopoverPage} from "../hint-popover/hint-popover";
import {AnalyticsService} from "../../providers/analytics-service";
import {ConnectivityMonitorService} from "../../providers/connectivity-monitor-service";
import {ServiceWorker} from "../../providers/service-worker";

/*
 Generated class for the Product page.
window
 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-product',
    templateUrl: 'product.html',
    entryComponents:[ CartPage, HintPopoverPage ]
})
export class ProductPage extends BasePage implements OnInit {
    @ViewChild('search') searchInput;
    @ViewChild('cart') cartButton;
    @ViewChild(Content) content;

    protected categories;
    protected products;
    protected categoryTitle;
    protected categoryIcon;

    protected showToTop = false;
    protected scrollTop = 0;declare

    protected showHint;

    constructor(protected navCtrl: NavController,
                protected navParams: NavParams,
                protected log: LogService,
                protected changeDetectorRef: ChangeDetectorRef,
                protected cartService: CartService,
                protected productService: ProductService,
                protected analyticsService: AnalyticsService,
                protected popoverCtrl: PopoverController,
                protected serviceWorker: ServiceWorker,
                protected connectivityMonitorService: ConnectivityMonitorService) {
        super();
    }

    ngAfterViewInit() {
        this.content.ionScrollEnd.subscribe((data)=>{
            this.scrollTop = data.scrollTop;
            this.showToTop = data.scrollTop > window.innerHeight;
            this.changeDetectorRef.detectChanges();
        });
    }

    ngOnInit() {
        this.analyticsService.sendPageviewGa('/product');
        let categoryId = this.navParams.get("categoryId");
        this.categoryTitle = this.navParams.get("categoryName");
        this.categoryIcon = this.navParams.get("categoryIcon");

        this.productService.findAll().subscribe(
            data => {
                this.products = data;
                if (categoryId!=null){
                    this.products = data.filter(product=>{
                        let includeItem = false;
                        if (product.hasOwnProperty('product_product_groups'))
                            product.product_product_groups.map(group=>{
                                if(!includeItem) includeItem = (group.id == categoryId);
                            });
                        return includeItem;
                    });
                }
            },
            err => {
                if(this.serviceWorker.disabled()) this.navCtrl.pop();
                this.productService.handleError(err)
            },
            () => this.productService.dismiss());

    }

    ionViewDidLoad() {
        this.log.l('ionViewDidLoad ProductPage');
        this.showHint = true;

    }

    // Scroll to top functions
    scrollToTop() {
        this.content.scrollToTop();
    }
    scrollUp(y) {
        // this.log.d(this.content.contentTop);
        this.content.scrollTo(0,(this.scrollTop-y));
    }
    scrollDown(y) {
        this.content.scrollTo(0,(this.scrollTop+y));
    }

    goToCartPage(){
        this.navCtrl.push(CartPage);
    }

    presentPopover(myEvent) {
        // console.log(myEvent.target.getBoundingClientRect());

        if (this.showHint){
            this.showHint = false;
            let popover = this.popoverCtrl.create(HintPopoverPage);

            let ev = {
                target : {
                    getBoundingClientRect : () => {
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

    }
}
