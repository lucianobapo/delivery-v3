import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ProductPage} from "../pages/product/product";
import {CartPage} from "../pages/cart/cart";
import {HintPopoverPage} from "../pages/hint-popover/hint-popover";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ProductPage,
        CartPage,
        HintPopoverPage
    ],
    imports: [
        IonicModule.forRoot(MyApp, {
            // tabsPlacement: 'top',
            backButtonText: ''
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ProductPage,
        CartPage,
        HintPopoverPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
