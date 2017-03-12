import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {LogService} from "./log-service";
import {Platform} from "ionic-angular";
import {GooglePlus} from "ionic-native";
import {AnalyticsService} from "./analytics-service";
import {ConnectivityMonitorService} from "./connectivity-monitor-service";

/*
 Generated class for the GoogleService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class GoogleService {

    constructor(protected log: LogService,
                protected platform: Platform,
                protected analyticsService: AnalyticsService,
                protected connectivityMonitorService: ConnectivityMonitorService) {
        log.l('Hello GoogleService Provider');
    }

    login(){
        if (this.connectivityMonitorService.isOffline()) {
            this.log.e('Network offline');
            return;
        }
        this.log.l('Clicked GoogleService Login button');
        this.analyticsService.sendLoginGa('google');

        if (this.platform.is('cordova')){
            this.loginWithCordova();
        } else {
            this.loginWithoutCordova();
        }
    }

    protected loginWithCordova() {
        GooglePlus.login({
            'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            'webClientId': '4910560041-g7fqeg0ibo10eid6q4c0qn1jqnk3airq.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            'offline': true
        })
            .then(
                response=>this.parseResponse(response),
                err=>this.log.e('error login:', JSON.stringify(err)));
    }

    protected loginWithoutCordova() {
        let auth2 = gapi.auth2.getAuthInstance();
        if(auth2.isSignedIn.get()){
            this.log.d('Already Logged in.');
            this.parseResponse(auth2.currentUser.get());
        }else{
            this.log.d('Requesting login...');
            auth2.signIn()
                .then(
                    response=>this.parseResponse(auth2.currentUser.get()),
                    err=>this.log.e('Login error:', err));
        }
    }

    protected parseResponse(response: any) {
        let deliveryUser = {
            id: response.userId || response.getBasicProfile().getId(),
            nome: response.displayName || response.getBasicProfile().getName(),
            imagem: response.imageUrl || response.getBasicProfile().getImageUrl(),
            email: response.email || response.getBasicProfile().getEmail(),

            // id: response.getBasicProfile().getId(),
            // nome: response.getBasicProfile().getName(),
            // imagem: response.getBasicProfile().getImageUrl(),
            // email: response.getBasicProfile().getEmail()
        };
        this.log.d('Received data:', JSON.stringify(deliveryUser), deliveryUser);
    }
}
