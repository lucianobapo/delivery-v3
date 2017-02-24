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
import { ViewController } from 'ionic-angular';
/*
 Generated class for the HintPopover page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var HintPopoverPage = (function () {
    function HintPopoverPage(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    HintPopoverPage.prototype.ionViewDidLoad = function () {
        // this.log.l('ionViewDidLoad HintPopoverPage');
    };
    HintPopoverPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    return HintPopoverPage;
}());
HintPopoverPage = __decorate([
    Component({
        selector: 'page-hint-popover',
        templateUrl: 'hint-popover.html'
    }),
    __metadata("design:paramtypes", [ViewController])
], HintPopoverPage);
export { HintPopoverPage };
//# sourceMappingURL=hint-popover.js.map