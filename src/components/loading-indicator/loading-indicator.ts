import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoadingService} from "../../providers/loading-service";

/*
 Generated class for the LoadingIndicator component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
    selector: 'loading-indicator',
    templateUrl: 'loading-indicator.html'
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {
    private isLoading = false;
    private subscription: any;

    constructor(public loadingService: LoadingService) {
        console.log('Hello LoadingIndicator Component');
    }

    ngOnInit() {
        this.subscription = this.loadingService.loading$.subscribe(loading => this.showOrHideLoadingIndicator(loading));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    showOrHideLoadingIndicator(loading) {
        this.isLoading = loading;
        if (this.isLoading) this.playLoadingAnimation();
        //else cancel the animation?
    }

    playLoadingAnimation() {
        //this will be your implementation to start the loading animation
    }

}
