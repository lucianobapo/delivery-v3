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
import { LoadingService } from "../../providers/loading-service";
/*
 Generated class for the LoadingIndicator component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
var LoadingIndicatorComponent = (function () {
    function LoadingIndicatorComponent(loadingService) {
        this.loadingService = loadingService;
        this.isLoading = false;
        console.log('Hello LoadingIndicator Component');
    }
    LoadingIndicatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.loadingService.loading$.subscribe(function (loading) { return _this.showOrHideLoadingIndicator(loading); });
    };
    LoadingIndicatorComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    LoadingIndicatorComponent.prototype.showOrHideLoadingIndicator = function (loading) {
        this.isLoading = loading;
        if (this.isLoading)
            this.playLoadingAnimation();
        //else cancel the animation?
    };
    LoadingIndicatorComponent.prototype.playLoadingAnimation = function () {
        //this will be your implementation to start the loading animation
    };
    return LoadingIndicatorComponent;
}());
LoadingIndicatorComponent = __decorate([
    Component({
        selector: 'loading-indicator',
        templateUrl: 'loading-indicator.html'
    }),
    __metadata("design:paramtypes", [LoadingService])
], LoadingIndicatorComponent);
export { LoadingIndicatorComponent };
//# sourceMappingURL=loading-indicator.js.map