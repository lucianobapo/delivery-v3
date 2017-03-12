import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {LogService} from "./log-service";
import {Facebook} from "ionic-native";
import {Platform} from "ionic-angular";
import {AnalyticsService} from "./analytics-service";
import {ConnectivityMonitorService} from "./connectivity-monitor-service";

/*
 Generated class for the FacebookService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class FacebookService {
    // protected FB_APP_ID: number = 1630647053816087;
    protected permissions: string[] = [
        "public_profile",
        "email",
        "user_birthday",
        "user_likes",
        "user_friends",
    ];

    constructor(protected log: LogService,
                protected platform: Platform,
                protected analyticsService: AnalyticsService,
                protected connectivityMonitorService: ConnectivityMonitorService) {
        log.l('Hello FacebookService Provider');
        // if (platform.is('cordova')){
        //     Facebook.browserInit(this.FB_APP_ID, "v2.8")
        //         .then(
        //             resp=>this.log.d('browserInit:', resp),
        //             (...err)=>this.log.e('error browserInit:', JSON.stringify(err))
        //         );
        // }
    }

    login(){
        if (this.connectivityMonitorService.isOffline()) {
            this.log.e('Network offline');
            return;
        }
        this.log.l('Clicked FacebookService Login button');
        this.analyticsService.sendLoginGa('facebook');

        if (this.platform.is('cordova')){
            this.loginWithCordova();
        } else {
            this.loginWithoutCordova();
        }
    }

    protected loginWithoutCordova() {
        FB.getLoginStatus(response => {
            if (response.status === 'connected') {
                this.log.d('Already Logged in.');
                FB.api('/me', {
                    fields: 'birthday,email,name,age_range,gender,locale,picture,verified,friends'
                }, response=>{
                    if (!response || response.error) {
                        this.log.e('Error occured: ', response);
                    } else {
                        this.parseResponse(response);
                    }
                });
            }
            else {
                this.log.d('Requesting login...');
                FB.login(response => {
                    FB.api('/me', {
                        fields: 'birthday,email,name,age_range,gender,locale,picture,verified,friends'
                    }, response=>{
                        if (!response || response.error) {
                            this.log.e('Error occured: ', response);
                        } else {
                            this.parseResponse(response);
                        }
                    });
                }, {scope: 'public_profile,email,user_birthday,user_likes,user_friends'});
            }
        });
    }

    protected loginWithCordova() {
        Facebook.getLoginStatus().then(response => {
            if (response.status === 'connected') {
                this.log.d('Already Logged in.');
                Facebook.api('/me?fields=birthday,email,name,age_range,gender,locale,picture,verified,friends', this.permissions)
                    .then(
                        response => this.parseResponse(response),
                        err => this.log.e('error api:', JSON.stringify(err))
                    );
            }
            else {
                this.log.d('Requesting login...');
                Facebook.login(this.permissions)
                    .then(
                        response => this.parseResponse(response),
                        err => this.log.e('error login:', JSON.stringify(err)));
            }
        }, err => this.log.e('error getLoginStatus:', JSON.stringify(err)));
    }

    protected parseResponse(response) {
        let deliveryUser = {
            id: response.id,
            nome: response.name,
            imagem: response.picture.data.url,
            email: response.email,
        };
        this.log.d('Data received: ', JSON.stringify(deliveryUser), deliveryUser);
    }

}
