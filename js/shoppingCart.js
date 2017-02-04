function shoppingCart(cartName) {
    this.cartName = cartName;
    this.items = [];

    this.loadItems();

    var self = this;
    $(window).unload(function () {
        self.saveItems();
    });
}

//load items
shoppingCart.prototype.loadItems = function () {
    var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
    if (items != null && JSON != null) {
        var items = JSON.parse(items);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.id != null && item.name != null && item.price != null && item.quantity != null) {
                item = new cartItem(item.id, item.name, item.price, item.quantity);
                this.items.push(item);
            }
        }
    }
}

// save items to local storage
shoppingCart.prototype.saveItems = function () {
    if (localStorage != null && JSON != null) {
        localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
    }
}

// adds item to the cart
shoppingCart.prototype.addItem = function (id, name, price, quantity) {
    quantity = this.toNumber(quantity);
    if (quantity != 0) {

        var found = false;
        for (var i = 0; i < this.items.length && !found; i++) {
            var item = this.items[i];
            if (item.id == id) {
                found = true;
                item.quantity = this.toNumber(item.quantity + quantity);
                if (item.quantity <= 0) {
                    this.items.splice(i, 1);
                }
            }
        }

        if (!found) {
            var item = new cartItem(id, name, price, quantity);
            this.items.push(item);
        }

        this.saveItems();
    }
}

// get the total price for all items currently in the cart
shoppingCart.prototype.getTotalPrice = function () {
    var total = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        total += this.toNumber(item.quantity * item.price);
    }
    return total;
}

// get the total count for all items currently in the cart
shoppingCart.prototype.getTotalCount = function () {
    var count = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        count += this.toNumber(item.quantity);
    }
    return count;
}

shoppingCart.prototype.toNumber = function (value) {
    value = value * 1;
    return isNaN(value) ? 0 : value;
}

function cartItem(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price * 1;
    this.quantity = quantity * 1;
}

