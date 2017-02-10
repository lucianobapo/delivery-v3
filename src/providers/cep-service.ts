import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {DataService} from "./data-service";
import {LogService} from "./log-service";

/*
 Generated class for the CepService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class CepService {
    private data;

    constructor(private dataService: DataService,
                private log: LogService) {
        log.l('Hello CepService Provider');
    }

    findByAddress(query) {
        return this.dataService
            .cepGet('RJ/Rio das Ostras/'+query)

            .map(response => {
                this.data = CepService.mapDataToArray(response.json());
                this.data.map(address => {
                    address.cep = address.cep.replace('-','');
                });
                this.data.filter(address => {
                    let searchIn = CepService.removeAcentos(address.logradouro);
                    let queryToSearch = CepService.removeAcentos(query);
                    if (searchIn.indexOf(queryToSearch) !== -1) return true;
                });

                return this.data;
            });
    }

    findByCep(query) {
        return this.dataService
            .cepGet(query)

            .map(response => {
                this.data = CepService.mapDataToArray(response.json());
                this.data.map(address => {
                    address.cep = address.cep.replace('-','');
                });

                return this.data;
            });
    }

    handleError(error) {
        this.dataService.handleError(error);
    }

    dismiss() {
        this.dataService.dismiss();
    }
    showLoading() {
        this.dataService.showLoading();
    }

    private static removeAcentos(str: any) {
        str = str.toLowerCase();
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç";
        var to   = "aaaaaeeeeeiiiiooooouuuunc";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        return str;
    }

    private static mapDataToArray(dataObject){
        let dataArray = [];
        if (dataObject.constructor===Object && dataObject.hasOwnProperty('cep'))
            dataArray.push(dataObject);
        if(dataObject.constructor===Array && dataObject.length>0)
            dataArray = dataObject;
        return dataArray;
    }
}
