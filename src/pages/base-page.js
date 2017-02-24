/*
 Generated class for the Product page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var BasePage = (function () {
    function BasePage() {
    }
    BasePage.prototype.addToCart = function (productId) {
        this.cartService.add(productId);
    };
    BasePage.prototype.removeToCart = function (productId) {
        this.cartService.remove(productId);
    };
    BasePage.prototype.hasInCart = function (productId) {
        return this.cartService.hasInCart(productId);
    };
    BasePage.prototype.getCartQnty = function (productId) {
        return this.cartService.getCartQnty(productId);
    };
    BasePage.prototype.hasCartValue = function () {
        return this.cartService.hasCartValue();
    };
    BasePage.prototype.getTotalCart = function () {
        return this.cartService.getTotalCart();
    };
    BasePage.prototype.onCancel = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // this.log.d('onCancel', args);
        this.searching = false;
    };
    BasePage.prototype.onBlur = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // this.log.d('onBlur', args);
        this.searching = false;
    };
    BasePage.prototype.onInput = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // this.log.d('onInput', args);
    };
    BasePage.prototype.onClear = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // this.log.d('onClear', args);
    };
    BasePage.prototype.isSearching = function () {
        return this.searching;
    };
    BasePage.prototype.isNotSearching = function () {
        return !this.searching;
    };
    BasePage.prototype.startSearch = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // this.log.d(args);
        this.searching = true;
        setTimeout(function () {
            _this.searchInput.setFocus();
        }, 150);
    };
    return BasePage;
}());
export { BasePage };
//# sourceMappingURL=base-page.js.map