<template>
 <div>
    <div class="container">
        <div class="row mx-auto" v-for="products in chunkedProducts">
        <div class="card m-4 col" v-for="product in products">
          <img class="card-img-top" :src="product.image" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text"><span v-for="feedstock in product.feedstock">{{ feedstock.name + ', ' }}</span></p>
            <a href="#" @click="selectProduct(product)" class="btn btn-primary">Selecionar</a>
          </div>
        </div>
    </div>

<div class="float-right" @click="showCart">Cart</div>
</div>

<div class="modal fade" id="productDetail" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Detalhes do produto</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="resetProduct(product)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <fieldset class="form-group" v-if="productSelected.price.length > 1">
                <legend> Tipo: </legend>
                <select v-model="product.price">
                    <option v-for="(price, key) in productSelected.price" :value="price"
                    :selected="key === 0">{{ price.description }}</option>
                </select>
            </fieldset>
            <fieldset class="form-group" v-else>
                R${{ productSelected.price.price }}
            </fieldset>
            <fieldset class="form-group">
                <legend>Ingredientes</legend>

                <div class="form-check" v-for="feedstock in productSelected.feedstock">
                  <input class="form-check-input" type="checkbox" v-model="product.feedstock" :id="feedstock.id" :value="feedstock">
                  <label class="form-check-label" :for="feedstock.id">
                    {{ feedstock.name }}
                  </label>
                </div>
            </fieldset>

            <fieldset class="form-group">
                <legend>Adicionais</legend>

                <div class="half-width" v-for="side_dish in productSelected.side_dish">
                    <label :for="side_dish.id">{{ side_dish.name }}</label>
                    <input type="checkbox" v-model="product.side_dish" :id="side_dish.id" :value="side_dish">
                </div>

            </fieldset>
            <fieldset class="form-group">
                <div>
                    <!-- <a href="#0" class="cd-add-to-cart" data-price="25.99">Add To Cart</a> -->
                    <input type="submit" value="Adicionar" @click.prevent="addProduct(product)">
                </div>
            </fieldset>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
         <div class="container-fluid">
            <div class="row cart" v-for="(item, key) in cart">
                <div class="col-12 col-sm-12 col-md-4 text-center">
                    <img class="img-responsive" :src="product.image" alt="prewiew" width="120" height="80">
                </div>
                <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-4">
                    <h4 class="product-name"><strong>{{ item.name }}</strong></h4>
                    <h4><strong>{{ item.price.description }}</strong></h4>
                    <h4 v-show="item.feedstockExcept.length">
                        <div class="alert alert-danger" role="alert">
                          <small v-for="feedstock in item.feedstockExcept"> - {{ feedstock.name }}</small>
                        </div>
                    </h4>
                    <h4 v-show="item.sideDish.length">
                        <div class="alert alert-success" role="alert">
                          <small v-for="sideDish in item.sideDish"> + {{ sideDish.name }}</small>
                        </div>
                    </h4>
                </div>
                <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                    <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
                        <h6><strong>R${{ item.price.price }} <span class="text-muted">x</span></strong></h6>
                        <h6><strong>R${{ item.subtotal }} <span class="text-muted">x</span></strong></h6>
                    </div>
                    <div class="col-4 col-sm-4 col-md-4">
                        <div class="quantity">
                            <input type="button" value="+" class="plus">
                            <input type="number" :step="item.qty" max="99" min="1" :value="item.qty" title="Qty" class="qty"
                                   size="4">
                            <input type="button" value="-" class="minus">
                        </div>
                    </div>
                    <div class="col-2 col-sm-2 col-md-2 text-right">
                        <button type="button" class="btn btn-outline-danger btn-xs" @click="removeProduct(key)">
                          <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

 </div>
</template>

<script>
import products from '../mock/products.js'
export default {
    data () {
        return {
            product: {
                id: '',
                name: '',
                qty: 1,
                price: {},
                image: '',
                side_dish: [],
                feedstock: [],
                subtotal: 0,
            },
            productSelected: {
                price: []
            },
            modal: {
                show: false
            }
        }
    },
    computed: {
        chunkedProducts() {
            return _.chunk(this.products, 4);
        },
        products() {
            return products.getList();
            // return this.$store.getters['products/all']
        },
        cart() {
            return this.$store.getters['cart/all'];
        }
    },
    mounted() {
        // this.$store.dispatch('products/getProducts')
    },
    methods: {
        showCart() {
            $('#cart').modal('show')
        },
        selectProduct (product) {
            product = Object.assign({}, product)
            this.productSelected = product

            this.product.name = product.name
            this.product.image = product.image
            this.product.feedstock = product.feedstock
            this.product.id = product.id
            this.product.price = product.price[0]
            if(product.price.length <= 1) this.productSelected.price = product.price[0]

            $('#productDetail').modal('show')
        },
        resetProduct (object) {
            for(let key in object) {
                if(Array.isArray(object[key])) {
                    object[key] = []
                } else {
                    switch(typeof object[key]) {
                        case 'object':
                            object[key] = {}
                            break;
                        case 'number':
                            object[key] = 0
                            break;
                        case 'string':
                            object[key] = ''
                            break;
                    }
                }
            }
            return object

        },
        _productTransform() {
            let product = Object.assign({}, this.product)

            product.feedstockExcept = _.difference(this.productSelected.feedstock, product.feedstock)
            product.sideDish = product.side_dish
            product.subtotal = this._productSubtotal(product)

            delete product.feedstock
            delete product.side_dish

            return product
        },
        _productSubtotal(product, qty) {
            if(qty) product.qty = parseInt(qty)

            let subtotal = parseFloat(product.price.price) * parseInt(product.qty)
            if(product.sideDish.length > 0) {
                let sideDishTotalCust = 0
                product.sideDish.map(e =>  sideDishTotalCust = sideDishTotalCust + parseFloat(e.price))
                subtotal = subtotal + (sideDishTotalCust * product.qty)
            }
            return parseFloat(subtotal).toFixed(2)
        },
        async addProduct () {

            let product = this._productTransform()

            let cart = this.$store.getters['cart/all']
            let found = false
            let findExcept = ['qty', 'subtotal']
            cart.map((e, index) => {
                if(found === false) {
                    for(let key in e) {
                        if(!findExcept.includes(key)) {
                            if(_.difference(e[key], product[key]).length === 0 && _.difference(product[key], e[key]).length === 0 ) {
                                found = index
                            } else {
                                found = false
                                break
                            }
                        }
                    }
                }
            })
            if(found === false) {
                this.$store.commit('cart/add', product)
            } else {
                let productFound = Object.assign({},this.$store.getters['cart/all'][found])
                let increment = productFound.qty + 1
                let subtotal = this._productSubtotal(productFound, increment)
                this.$store.commit('cart/update', [found, { qty: increment, subtotal: subtotal }])
            }
        },

        removeProduct(key) {
            this.$store.commit('cart/delete', key);
            console.log('all', this.$store.getters['cart/all'])
        },
        getCart(cart) {
            this.cart.items = cart.items;
            this.cart.total = cart.total;
            this.cart.count = cart.count;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h4 small {
    display: block;
}

.row.cart {
    border-bottom: 1px solid #F6F6F6;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
}

.row.cart:last-child {
    border-bottom: 0px;
}

.quantity {
    float: left;
    margin-right: 15px;
    background-color: #eee;
    position: relative;
    width: 80px;
    overflow: hidden
}

.quantity input {
    margin: 0;
    text-align: center;
    width: 15px;
    height: 15px;
    padding: 0;
    float: right;
    color: #000;
    font-size: 20px;
    border: 0;
    outline: 0;
    background-color: #F6F6F6
}

.quantity input.qty {
    position: relative;
    border: 0;
    width: 100%;
    height: 40px;
    padding: 10px 25px 10px 10px;
    text-align: center;
    font-weight: 400;
    font-size: 15px;
    border-radius: 0;
    background-clip: padding-box
}

.quantity .minus, .quantity .plus {
    line-height: 0;
    background-clip: padding-box;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    -webkit-background-size: 6px 30px;
    -moz-background-size: 6px 30px;
    color: #bbb;
    font-size: 20px;
    position: absolute;
    height: 50%;
    border: 0;
    right: 0;
    padding: 0;
    width: 25px;
    z-index: 3
}

.quantity .minus:hover, .quantity .plus:hover {
    background-color: #dad8da
}

.quantity .minus {
    bottom: 0
}
</style>
