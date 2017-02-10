/*
 Generated class for the Product page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
export class BasePage {

    //Cart functions
    protected cartService;

    addToCart(productId) {
        this.cartService.add(productId);
    }
    removeToCart(productId) {
        this.cartService.remove(productId);
    }
    hasInCart(productId) {
        return this.cartService.hasInCart(productId);
    }
    getCartQnty(productId) {
        return this.cartService.getCartQnty(productId);
    }
    hasCartValue() {
        return this.cartService.hasCartValue();
    }
    getTotalCart() {
        return this.cartService.getTotalCart();
    }

    //Search functions
    protected searchInput;
    protected searching;

    onCancel(...args){
        // this.log.d('onCancel', args);
        this.searching=false;
    }

    onBlur(...args){
        // this.log.d('onBlur', args);
        this.searching=false;
    }

    onInput(...args){
        // this.log.d('onInput', args);
    }

    onClear(...args){
        // this.log.d('onClear', args);
    }

    isSearching(){
        return this.searching;
    }

    isNotSearching(){
        return !this.searching;
    }

    startSearch(...args){
        // this.log.d(args);
        this.searching=true;
        setTimeout(() => {
            this.searchInput.setFocus();
        },150);
    }

}
