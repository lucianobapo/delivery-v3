import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import 'rxjs/add/operator/share';

/*
 Generated class for the LoadingService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class LoadingService {
    loading$: Observable<String>;
    private _observer: Observer<String>;

    constructor() {
        console.log('Hello LoadingService Provider');

        this.loading$ = new Observable(
            observer => this._observer = observer).share();
    }

    toggleLoadingIndicator(name) {
        if (this._observer) {
            this._observer.next(name);
        }
    }
}
