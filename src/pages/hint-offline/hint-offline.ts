import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';

/*
 Generated class for the HintOffline page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-hint-offline',
    templateUrl: 'hint-offline.html'
})
export class HintOfflinePage {

    constructor(protected viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad HintOfflinePage');
    }

    close() {
        this.viewCtrl.dismiss();
    }

}
