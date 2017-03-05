import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {LogService} from "./log-service";
import {ProductService} from './product-service';
import {DataService} from "./data-service";
import {FormBuilder, FormControl, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {AnalyticsService} from "./analytics-service";

/*
 Generated class for the CartService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class CartService {
    // protected cartContent = {
    //     items: []
    // };
    protected data;
    protected orderCreated;
    protected mandante = 'ilhanet';

    protected order: FormGroup;
    protected contacts: FormGroup;

    protected nome: FormControl;
    protected pagamento: FormControl;
    protected cep: FormControl;
    protected logradouro: FormControl;
    protected numero: FormControl;
    protected bairro: FormControl;
    protected items: FormControl;

    constructor(protected productService: ProductService,
                protected log: LogService,
                protected dataService: DataService,
                protected analyticsService: AnalyticsService,
                protected formBuilder: FormBuilder) {
        this.log.l('Hello CartService Provider');

        this.nome = new FormControl('', Validators.required);
        this.pagamento = new FormControl('vistad', Validators.required);
        this.cep = new FormControl('', Validators.required);
        this.logradouro = new FormControl('', Validators.required);
        this.numero = new FormControl('');
        this.bairro = new FormControl('', Validators.required);
        this.items = new FormControl(this.getCartItems(), CartService.itemsValidator);

        this.contacts = this.formBuilder.group({
            emailCheck: [false],
            email: [''],
            smsCheck: [false],
            sms: [''],
            whatsappCheck: [false],
            whatsapp: [''],
        }, {validator: CartService.contactsValidator});

        this.order = formBuilder.group({
            mandante: [this.mandante],
            posted_at: [''],
            pagamento: this.pagamento,
            nome: this.nome,
            cep: this.cep,
            logradouro: this.logradouro,
            bairro:  this.bairro,
            numero: this.numero,
            complemento: [''],
            troco: [''],
            observacao: [''],
            contacts: this.contacts,
            items: this.items
        });

        this.analyticsService.sendTransactionGa();
    }

    add(productId) {
        let updatedItems = this.items.value;
        let itemFields = {
            mandante: this.mandante,
            cost_id: this.productService.getCostId(productId),
            product_id: productId,
            quantidade: 1,
            valor_unitario: this.productService.getValorVenda(productId)
        };

        this.analyticsService.sendAddProductGa(itemFields);

        if (this.foundItem(productId))
            updatedItems[this.itemIndex(productId)].quantidade++;
        else
            {
                updatedItems.push(itemFields);
            }
        this.items.setValue(updatedItems);
    }

    remove(productId) {
        if (this.foundItem(productId)){
            let index = this.itemIndex(productId);

            let updatedItems = this.items.value;
            updatedItems[index].quantidade--;
            if(updatedItems[index].quantidade==0)
                updatedItems.splice(index, 1);
            this.items.setValue(updatedItems);

            // this.cartContent.items[index].quantidade--;
            // if(this.cartContent.items[index].quantidade==0)
            //     this.cartContent.items.splice(index, 1);
        }

    }

    removeItem(itemToRemove){
        if (this.foundItem(itemToRemove.product_id)){
            // this.cartContent.items.splice(this.itemIndex(itemToRemove.product_id), 1);
            let updatedItems = this.items.value;
            updatedItems.splice(this.itemIndex(itemToRemove.product_id), 1);
            this.items.setValue(updatedItems);
        }
    }

    private foundItem(productId):boolean{
        return (this.itemIndex(productId)!=-1);
    }

    private itemIndex(productId){
        return this.items.value.findIndex((item) => {
            return item.product_id == productId;
        });
        // return this.cartContent.items.findIndex((item) => {
        //     return item.product_id == productId;
        // });
    }

    hasInCart(productId):boolean {
        return this.foundItem(productId);
    }
    getCartQnty(productId) {
        if (this.foundItem(productId))
            return this.items.value[this.itemIndex(productId)].quantidade;
            // return this.cartContent.items[this.itemIndex(productId)].quantidade;
        return 0;
    }
    getCartItems() {
        if (this.items == undefined) return [];
        return this.items.value;

        // return this.cartContent.items;
    }

    hasCartValue():boolean {
        return this.getTotalCart()>0;
    }

    getTotalCart() {
        let soma = 0;
        if (this.items.value.constructor == Array && this.items.value.length>0)
            this.items.value.forEach(item => soma = soma + (item.quantidade * item.valor_unitario));
        // if (this.cartContent.items.length>0)
        //     this.cartContent.items.forEach(item => soma = soma + (item.quantidade * item.valor_unitario));
        return soma;
    }

    getNome(productId) {
        return this.productService.getNome(productId);
    }

    submitOrder() {
        this.analyticsService.sendOrderGa();
        this.order.controls['posted_at'].setValue(CartService.getFormattedDate());
        if (this.order.controls['troco'].value!=''){
            let newObservacao = 'Troco: '+this.order.controls['troco'].value;
            if (this.order.controls['observacao'].value!='') newObservacao = newObservacao +' - '+this.order.controls['observacao'].value;
            this.order.controls['observacao'].setValue(newObservacao);
        }

        this.log.l('enviando', this.order.value);
        return this.dataService.httpPost('delivery', this.order.value)
            .map(res => {
                this.data = res.json().data;
                return this.data;
            });
    }

    handleError(error) {
        this.dataService.handleError(error);
    }

    dismiss() {
        this.dataService.dismiss();
    }

    clearItems(orderCreated) {
       return this.dataService.httpGet('order/'+orderCreated.id)
            .map(res => res.json().data);
    }

    setOrderCreated(order){
        this.orderCreated = order;
    }
    getOrderCreated(){
        if(this.orderCreated) return this.orderCreated;
        return null;
    }

    protected static getFormattedDate(){
        let date = new Date();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        let dateFormatted = [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
        ].join('-');

        let hh = date.getHours();
        let ii = date.getMinutes();
        let ss = date.getSeconds();
        let timeFormatted = [
            (hh>9 ? '' : '0') + hh,
            (ii>9 ? '' : '0') + ii,
            (ss>9 ? '' : '0') + ss
        ].join(':');

        return [dateFormatted, timeFormatted].join(' ');
    }

    protected static contactsValidator(group: FormGroup):any {
        if (!group.controls['emailCheck'].value && !group.controls['smsCheck'].value && !group.controls['whatsappCheck'].value)
            return {contactsInvalid: true};

        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let passouEmailCheck = (group.controls['email'].value!='' && emailPattern.test(group.controls['email'].value));
        if (group.controls['emailCheck'].value && !passouEmailCheck) return {emailInvalid: true};

        let passouSmsCheck = (group.controls['sms'].value!='');
        if (group.controls['smsCheck'].value && !passouSmsCheck) return {smsInvalid: true};

        let passouWhatsappCheck = (group.controls['whatsapp'].value!='');
        if (group.controls['whatsappCheck'].value && !passouWhatsappCheck) return {whatsappInvalid: true};

        return null;

        // let passouSmsCheck = (group.controls['smsCheck'].value && group.controls['sms'].value!='');
        // let passouWhatsappCheck = (group.controls['whatsappCheck'].value && group.controls['whatsapp'].value!='');
        // if (passouEmailCheck || passouSmsCheck || passouWhatsappCheck)
        //     return null;
        // else{
        //     if (group.controls['emailCheck'].value && !passouEmailCheck) return { emailInvalid: true };
        //     if (group.controls['smsCheck'].value && !passouSmsCheck) return { smsInvalid: true };
        //     if (group.controls['whatsappCheck'].value && !passouWhatsappCheck) return { whatsappInvalid: true };
        //     return { contactsInvalid: true };
        // }
    }

    protected static itemsValidator(control: AbstractControl):any {
        if(control.value.constructor == Array && control.value.length>0){
            let soma = 0;
            control.value.map(item => {
                soma = soma + item.quantidade * item.valor_unitario;
            });
            if (soma<20) return { minimum_value: true };
            else return null;
        }
        else return { required: true };
    }

    formBuild(field): FormControl {
        return this[field];
    }

    setAddressValues(item: any) {
        let propertyNames = Object.getOwnPropertyNames(item);
        propertyNames.map(propertyName=>{
            if (propertyName!='complemento' && this.order.controls.hasOwnProperty(propertyName))
                this.order.controls[propertyName].setValue(item[propertyName]);
        });
    }

    orderIsDirty() {
        return this.order.dirty;
    }

    contactsChecked(field) {
        return this.contacts.controls[field].value;
    }

    fieldIsInvalid(field) {
        return !this[field].valid;
    }
    fieldErr(field, error = 'required') {
        return (this[field].errors!==null && this[field].errors.hasOwnProperty(error) && this[field].errors[error]);
    }
}
