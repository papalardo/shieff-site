<template>
 <div>
     <!-- <header class="cd-main-header">
 		<h1>Escolher produtos</h1>
 	</header> -->

 	<ul class="cd-pricing">
 		<li v-for="product in products">
 			<header class="cd-pricing-header">
                <!-- <img src="https://cdn5.bobsfa.com.br/assets/cardapio/produtos/picanha-barbecue-100g.g.png" alt=""> -->
 				<h2>{{ product.name }}</h2>

 				<div class="cd-price">
 					<span>R${{ product.price[0].price }}</span>
 				</div>
 			</header> <!-- .cd-pricing-header -->

 			<div class="cd-pricing-features">
                <span v-for="feedstock in product.feedstock">{{ feedstock.name + ', ' }}</span>
 			</div> <!-- .cd-pricing-features -->

 			<footer class="cd-pricing-footer">
 				<a @click="selectProduct(product)">Select</a>
 			</footer> <!-- .cd-pricing-footer -->
 		</li>

 	</ul> <!-- .cd-pricing -->

 	<div class="cd-form">

 		<div class="cd-plan-info">
 			<!-- content will be loaded using jQuery - according to the selected plan -->
 		</div>

 		<div class="cd-more-info">
 			<h3>Need help?</h3>
 			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
 		</div>

 		<form action="">
 			<fieldset>
 				<legend>Ingredientes</legend>

 				<div class="half-width" v-for="feedstock in productSelected.feedstock">
 					<label :for="feedstock.id">{{ feedstock.name }}</label>
 					<input type="checkbox" v-model="product.feedstock" :id="feedstock.id" :value="feedstock.id">
 				</div>

 			</fieldset>

 			<fieldset>
 				<legend>Adicionais</legend>

 				<div class="half-width" v-for="side_dish in productSelected.side_dish">
 					<label :for="side_dish.id">{{ side_dish.name }}</label>
 					<input type="checkbox" v-model="product.sideDish" :id="side_dish.id" :value="side_dish.id">
 				</div>

 			</fieldset>
 			<fieldset>
 				<div>
                    <!-- <a href="#0" class="cd-add-to-cart" data-price="25.99">Add To Cart</a> -->
 					<input type="submit"  class="cd-add-to-cart" value="Adicionar" @click.prevent="addProduct(productSelected)">
 				</div>
 			</fieldset>
 		</form>

 		<a class="cd-close" @click.prevent="resetProduct"></a>
 	</div> <!-- .cd-form -->

 	<div class="cd-overlay"></div> <!-- shadow layer -->

    <div :class="['cd-cart-container', { 'empty' : cart.count == 0 }]" @click.prevent="toggleCart()">
    	<a href="#0" class="cd-cart-trigger">
    		Carrinho de compras
    		<ul class="count"> <!-- cart items count -->
    			<li>{{ cart.count }}</li>
    			<li>{{ cart.count + 1 }}</li>
    		</ul> <!-- .count -->
    	</a>

    	<div class="cd-cart">
    		<div class="wrapper">
    			<header>
    				<h2>Carrinho de compras</h2>
    				<!-- <span class="undo">Item removed. <a href="#0">Undo</a></span> -->
    			</header>

    			<div class="body">
    				<ul v-for="(item, key) in cart.items">
                        <!-- {{ item }} -->
                        <li class="product">
                            <div class="product-image"><a href="#0">
                            <img src="../assets/product-preview.png" alt="placeholder"></a></div>
                            <div class="product-details">
                                <div class="actions">
                                    <a href="#0" class="delete-item" @click="removeProduct(key, $event.target)">Delete</a>
                                </div>
                                <h3><a href="#0">{{ item.name }}</a></h3>
                                <span class="price"> {{ item.qtd }}x R${{ item.price }}</span>
                                <div class="feedstocks">
                                    <span v-for="feedstock in item.feedstock_except">
                                        - {{ feedstock.name }}
                                    </span>
                                </div>
                                <div class="side_dishs">
                                    <span v-for="side_dish in item.side_dish">
                                        + {{ side_dish.name }} {{ side_dish.price }}
                                    </span>
                                </div>
                                <div class="subtotal">
                                    Subtotal R${{ item.subtotal }}
                                </div>
                            </div>
                        </li>
    					<!-- products added to the cart will be inserted here using JavaScript -->
    				</ul>
    			</div>

    			<footer>
    				<router-link to="checkout"  class="checkout btn"><em>Fechar pedido - R$<span>{{ cart.total }}</span></em></router-link>
    			</footer>
    		</div>
    	</div> <!-- .cd-cart -->
    </div> <!-- cd-cart-container -->


 </div>
</template>

<script>
export default {
    data () {
        return {
            products: [],
            product: {
                cache_id: '7d8sad789sa4d5as6',
                id: '',
                sideDish: [],
                feedstock: []
            },
            cart: {
                items: [],
                total: 0,
                count: 0
            },
            productSelected: {}
        }
    },
    mounted() {
        this.asyncData();
    },
    methods: {
        resetProduct () {
            this.product.id = '';
            this.product.sideDish = [];
            this.product.feedstock = [];
        },
        toggleCart () {
            // $('.cd-cart-container').toggleClass('cart-open');
        },
        async asyncData () {
            let res = await this.axios.get('products');
            let cart = await this.axios.get('cart/'+ this.product.cache_id);
            this.products = res.data;
            this.cart.items = cart.data.items;
            this.cart.total = cart.data.total;
            this.cart.count = cart.data.count;
        },
        async addProduct (product) {
            this.product.id = product.id;
            let cart = await this.axios.post('cart', this.product);
            this.cart.items = cart.data.items;
            this.cart.total = cart.data.total;
            this.cart.count = cart.data.count;
        },
        selectProduct (product) {
            this.productSelected = product;
            this.product.id = product.id;
        },
        async removeProduct(key, event) {
            // $(event).parents('.product').addClass('deleted');

            let form = new FormData();
            form.append('cart', this.product.cache_id)
            form.append('_method', 'DELETE')
            let res = await this.axios.post('cart/' + key, form)
            this.getCart(res.data)
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

.cd-form .cd-more-info {
    padding: 2rem;
}

.cd-cart .body ul {
    padding-bottom: 20px;
}

.cd-cart .body ul:last-child {
    padding-bottom: 80px;
}

.cd-cart .product-details {
    padding: 0 0 1em 1em;
}

.cd-cart .product-details .feedstocks {
    width: 50%;
    float: left;
    text-align: left;
    display: inline-block;
}
.cd-cart .product-details .feedstocks span, .cd-cart .product-details .side_dishs span {
    display: block;
}

.cd-cart .product-details .side_dishs {
    width: 50%;
    float: right;
    text-align: right;
}

.cd-cart .product-details .subtotal {
    display: block;
    text-align: right;
}

.cd-cart h3, .cd-cart .price {
    text-align: left;
}

img {
    max-width: 100%;
}
</style>
