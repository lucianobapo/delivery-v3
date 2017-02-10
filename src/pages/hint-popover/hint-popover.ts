import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';

/*
 Generated class for the HintPopover page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-hint-popover',
    templateUrl: 'hint-popover.html'
})
export class HintPopoverPage {

    constructor(protected viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        // this.log.l('ionViewDidLoad HintPopoverPage');
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
