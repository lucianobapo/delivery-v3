var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { DataService } from '../providers/data-service';
import { LogService } from '../providers/log-service';
import { CartService } from '../providers/cart-service';
import { ProductService } from "../providers/product-service";
import { CategoriesService } from "../providers/categories-service";
import { CepService } from "../providers/cep-service";
var MyApp = (function () {
    function MyApp(platform, dataService, log) {
        this.dataService = dataService;
        this.rootPage = HomePage;
        dataService.simpleGet('build/main.css').map(function (res) { return res.text(); }).subscribe(function (data) {
            var firstElement = document.getElementsByTagName('script')[0];
            var elToInsert = document.createElement('style');
            elToInsert.innerHTML = data;
            firstElement.parentNode.insertBefore(elToInsert, firstElement);
        }, function (err) { return log.d(err); });
        platform.ready()
            .then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (platform.is('cordova')) {
                StatusBar.styleDefault();
                Splashscreen.hide();
            }
        })
            .catch(function (error) {
            log.e('Promise error:', error);
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Component({
        templateUrl: 'app.html',
        providers: [DataService, LogService, CepService, CartService, CategoriesService, ProductService]
    }),
    __metadata("design:paramtypes", [Platform,
        DataService,
        LogService])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map