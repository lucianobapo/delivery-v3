import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {DataService} from "./data-service";
import {LogService} from "./log-service";

/*
 Generated class for the CategoriesService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class CategoriesService {
    private data;

    constructor(private dataService: DataService,
                private log: LogService) {
        log.l('Hello CategoriesService Provider');
    }

    findAll(){
        return this.dataService
            .httpGet('product_group')
            .map(res => {
                this.data = res.json().data;
                if( this.data !== null && (typeof  this.data) == 'object')
                    this.data.forEach((item) => {
                        //filtra o nome da categoria
                        if(item.hasOwnProperty('grupo')){
                            let start = item.grupo.indexOf("Categoria: ")+11;
                            item.grupo = item.grupo.substr(start, item.grupo.length);
                        } else this.log.e("Error: item.hasOwnProperty('grupo')");

                        //filtra o nome do icone
                        if(item.hasOwnProperty('icone')){
                            if(item.icone.indexOf('icon ion-')!==-1) item.icone = item.icone.substr(9, item.icone.length);
                            if(item.icone.indexOf('icon fa fa-')!==-1) item.icone = item.icone.substr(11, item.icone.length);
                        } else this.log.e("Error: item.hasOwnProperty('icone')");
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
}
