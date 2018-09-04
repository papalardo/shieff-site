<template lang="html">
    <div>
    <div class="cd-form is-visible" v-show="step == 1">
		<div class="cd-more-info">
			Login
		</div>
        <form action="">
			<fieldset>
				<legend>Faça o Login para continuar</legend>
                <login-social provider="facebook" @loginCallback="loginOauth">Facebook</login-social>

			</fieldset>
		</form>
	</div>
    <div class="cd-form is-visible" v-show="step == 2">
		<div class="cd-more-info">
			<h3>Meu lanche</h3>
            <ul v-for="(item, key) in cart.items">
                <!-- {{ item }} -->
                <li class="product">
                    <div class="product-image">
                        <!-- -<a href="#0">
                         <img src="../assets/product-preview.png" alt="placeholder"></a> -->
                    </div>
                    <div class="product-details">
                        <!-- <div class="actions">
                            <a href="#0" class="delete-item" @click="removeProduct(key, $event.target)">Delete</a>
                        </div> -->
                        <h3><a>{{ item.name }}</a></h3>
                        <span class="price"> {{ item.qtd }}x R${{ item.price }}</span>
                            <p v-for="feedstock in item.feedstock_except">
                                - {{ feedstock.name }}
                            </p>
                            <p v-for="side_dish in item.side_dish">
                                + {{ side_dish.name }} {{ side_dish.price }}
                            </p>
                        <div class="subtotal">
                            Subtotal R${{ item.subtotal }}
                        </div>
                    </div>
                </li>
            </ul>
		</div>
		<form action="">
			<fieldset>
				<legend>Informações do pedido</legend>

				<div class="half-width">
					<label for="userName">Informações adicionais</label>
					<input type="text" v-model="order.info">
				</div>
			</fieldset>
			<fieldset>
				<legend>Método de pagamento</legend>

				<div class="half-width">
					<label for="userEmail">Dinheiro</label>
					<input type="radio" v-model="order.pagament" value="Dinheiro">
				</div>
				<div class="half-width">
					<label for="userEmail">Cartão</label>
					<input type="radio" v-model="order.pagament" value="Cartao">
				</div>

			</fieldset>
			<fieldset>
				<div>
					<input type="submit" value="Finalizar" @click.prevent="closeOrder()">
				</div>
			</fieldset>
		</form>
	</div>
    </div>
</template>

<script>
import LoginSocial from './BtnLoginSocial'

export default {
    components: {
        LoginSocial
    },
    data () {
        return {
            step: 1,
            cache_id: '7d8sad789sa4d5as6',
            cart: {
                items: [],
                total: 0,
                count: 0
            },
            order: {
                cart_id: '7d8sad789sa4d5as6',
                info: '',
                pagament: ''
            }
        }
    },
    mounted () {
        this.asyncData();
        if(this.$auth.check()) this.step = 2;
    },
    methods: {
        async asyncData () {
            let cart = await this.axios.get('cart/'+ this.cache_id);
            this.cart.items = cart.data.items;
            this.cart.total = cart.data.total;
            this.cart.count = cart.data.count;
        },
        async closeOrder () {
            let res = await this.axios.post('order', this.order);
            console.log(res)
        },
        loginOauth(token) {
            let self = this;
            this.$auth.token(null, token);
            this.$auth.fetch({
                success() {
                    self.step = 2;
                }
            });
        }
    }
}
</script>

<style lang="css">
.cd-form .cd-more-info {
    padding: 2em;
}

.cd-form {
    margin: 0 auto;
    position: relative;
    width: 80%;
}
</style>
