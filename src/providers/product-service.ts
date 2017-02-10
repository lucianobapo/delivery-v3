import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import {DataService} from "./data-service";
import {LogService} from "./log-service";

/*
 Generated class for the ProductService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ProductService {
    private data;

    constructor(private dataService: DataService,
                private log: LogService) {
        log.l('Hello ProductService Provider');
    }

    findAll(){
        return this.dataService
            .httpGet('product?with=productProductGroups&orderBy=nome&search=4')
            .map(res => {
                this.data = res.json().data;
                if( this.data !== null && (typeof  this.data) == 'object')
                    this.data = this.data.filter((item) => {
                        if(item.hasOwnProperty('imagem')){
                            return (item.imagem !== null);
                        } else this.log.e("Error: item.hasOwnProperty('imagem')", item);
                        return true;
                    });
                return this.data;
            });
    }

    findByCategory(categoryId){
        return this.dataService
            .httpGet('product?with=productProductGroups&orderBy=nome&search='+categoryId)
            .map(res => {
                this.data = res.json().data;
                if( this.data !== null && (typeof  this.data) == 'object')
                    this.data = this.data.filter((item) => {
                        if(item.hasOwnProperty('imagem')){
                            return (item.imagem !== null);
                        } else this.log.e("Error: item.hasOwnProperty('imagem')", item);
                        return true;
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

    getValorVenda(productId) {
        let valorUnitVenda = 0;
        this.data.forEach(item => {
            if (item.id==productId) valorUnitVenda = item.valorUnitVenda;
        });
        return valorUnitVenda;
    }
    getNome(productId) {
        let nome = '';
        this.data.forEach(item => {
            if (item.id==productId) nome = item.nome;
        });
        return nome;
    }
    getCostId(productId) {
        let costId = null;
        this.data.forEach(item => {
            if (item.id==productId) costId = item.cost_id;
        });
        return costId;
    }
}
