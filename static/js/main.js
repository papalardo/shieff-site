jQuery(document).ready(function($){
	if( $('.cd-form').length > 0 ) {
		//set some form parameters
		var device = checkWindowWidth(),
			tableFinalWidth = ( device == 'mobile') ? $(window).width()*0.9 : 210,
			tableFinalHeight = ( device == 'mobile' ) ? 93 : 255;
			formMaxWidth = 900,
			formMaxHeight = 650,
			animating =  false;

		//set animation duration/delay
		var	animationDuration = 800,
			delay = 200,
			backAnimationDuration = animationDuration - delay;

		//store DOM elements
		var formPopup = $('.cd-pricing'),
			coverLayer = $('.cd-overlay');

		//select a plan and open the signup form
		formPopup.on('click', 'a', function(event){
			event.preventDefault();
			triggerAnimation( $(this).parents('.cd-pricing-footer').parent('li'), coverLayer, true);
		});

		//close the signup form clicking the 'X' icon, the keyboard 'esc' or the cover layer
		$('.cd-form').on('click', '.cd-close', function(event){
			event.preventDefault();
			triggerAnimation( formPopup.find('.selected-table'), coverLayer, false);
		});
		$(document).keyup(function(event){
			if( event.which=='27' ) {
				triggerAnimation( formPopup.find('.selected-table'), coverLayer, false);
			}
		});
		coverLayer.on('click', function(event){
			event.preventDefault();
			triggerAnimation( formPopup.find('.selected-table'), coverLayer, false);
		});

		//on resize - update form position/size
		$(window).on('resize', function(){
			requestAnimationFrame(updateForm);
		});

		//show/hide credit card fields if user selected credit card as gateway
		$('.cd-payment-gateways').on('change', function(){
			($('#card').is(':checked'))
				? $('.cd-credit-card').velocity("slideDown", { duration: 300 })
				: $('.cd-credit-card').velocity("slideUp", { duration: 300 });
		});

	}

	function triggerAnimation(table, layer, bool) {
		if( !animating ) {
			layer.toggleClass('is-visible', bool);
			animateForm(table, bool);
			table.toggleClass('selected-table', bool);
		}
	}

	function animateForm(table, animationType) {
		animating = true;

		var tableWidth = table.width(),
			tableHeight = table.height(),
			tableTop = table.offset().top - $(window).scrollTop(),
			tableLeft = table.offset().left,
			form = $('.cd-form'),
			formPlan = form.find('.cd-plan-info'),
			formFinalWidth = formWidth(),
			formFinalHeight = formHeight(),
			formTopValue = formTop(formFinalHeight),
			formLeftValue = formLeft(formFinalWidth),
			formTranslateY = tableTop - formTopValue,
			formTranslateX = tableLeft - formLeftValue,
			windowWidth = $(window).width(),
			windowHeight = $(window).height();

		if( animationType ) {//open the form
			//set the proper content for the .cd-plan-info inside the form
			formPlan.html(table.html());

			//animate plan info inside the form - set initial width and hight - then animate them to their final values
			formPlan.velocity(
			{
				'width': tableWidth+'px',
				'height': tableHeight+'px',
			}, 50, function(){
				formPlan.velocity(
				{
					'width': tableFinalWidth+'px',
					'height': tableFinalHeight+'px',
				}, animationDuration, [ 220, 20 ]);
			});

			//animate popout form - set initial width, hight and position - then animate them to their final values
			form.velocity(
			{
				'width': tableWidth+'px',
				'height': tableHeight+'px',
				'top': formTopValue,
				'left': formLeftValue,
				'translateX': formTranslateX+'px',
				'translateY': formTranslateY+'px',
				'opacity': 1,
			}, 50, function(){
				table.addClass('empty-box');

				form.velocity(
				{
					'width': formFinalWidth+'px',
					'height': formFinalHeight+'px',
					'translateX': 0,
					'translateY': 0,
				}, animationDuration, [ 220, 20 ], function(){
					animating = false;
					setTimeout(function(){
						form.children('form').addClass('is-scrollable');
					}, 300);
				}).addClass('is-visible');

			});
		} else {//close the form
			form.children('form').removeClass('is-scrollable');

			//animate plan info inside the form to its final dimension
			formPlan.velocity(
			{
				'width': tableWidth+'px',
			}, {
				duration: backAnimationDuration,
				easing: "easeOutCubic",
				delay: delay
			});

			//animate form to its final dimention/position
			form.velocity(
			{
				'width': tableWidth+'px',
				'height': tableHeight+'px',
				'translateX': formTranslateX+'px',
				'translateY': formTranslateY+'px',
			}, {
				duration: backAnimationDuration,
				easing: "easeOutCubic",
				delay: delay,
				complete: function(){
					table.removeClass('empty-box');
					form.velocity({
						'translateX': 0,
						'translateY': 0,
						'opacity' : 0,
					}, 0).find('form').scrollTop(0);
					animating = false;
				}
			}).removeClass('is-visible');

			//target browsers not supporting transitions
			if($('.no-csstransitions').length > 0 ) table.removeClass('empty-box');
		}
	}

	function checkWindowWidth() {
		var mq = window.getComputedStyle(document.querySelector('.cd-form'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, '');
		return mq;
	}

	function updateForm() {
		var device = checkWindowWidth(),
			form = $('.cd-form');
		tableFinalWidth = ( device == 'mobile') ? $(window).width()*0.9 : 210;
		tableFinalHeight = ( device == 'mobile' ) ? 93 : 255;

		if(form.hasClass('is-visible')) {
			var formFinalWidth = formWidth(),
				formFinalHeight = formHeight(),
				formTopValue = formTop(formFinalHeight),
				formLeftValue = formLeft(formFinalWidth);

			form.velocity(
			{
				'width': formFinalWidth,
				'height': formFinalHeight,
				'top': formTopValue,
				'left': formLeftValue,
			}, 0).find('.cd-plan-info').velocity(
			{
				'width': tableFinalWidth+'px',
				'height': tableFinalHeight+'px',
			}, 0);
		}
	}

	//evaluate form dimention/position
	function formWidth() {
		return ( formMaxWidth <= $(window).width()*0.9) ? formMaxWidth : $(window).width()*0.9;
	}
	function formHeight() {
		return ( formMaxHeight <= $(window).height()*0.9) ? formMaxHeight : $(window).height()*0.9;
	}
	function formTop(formHeight) {
		return ($(window).height() - formHeight)/2;
	}
	function formLeft(formWidth) {
		return ($(window).width() - formWidth)/2;
	}

		var cartWrapper = $('.cd-cart-container');
		//product id - you don't need a counter in your real project but you can use your real product id
		var productId = 0;

		if( cartWrapper.length > 0 ) {
			//store jQuery objects
			var cartBody = cartWrapper.find('.body')
			var cartList = cartBody.find('ul').eq(0);
			var cartTotal = cartWrapper.find('.checkout').find('span');
			var cartTrigger = cartWrapper.children('.cd-cart-trigger');
			var cartCount = cartTrigger.children('.count')
			var addToCartBtn = $('.cd-add-to-cart');
			var undo = cartWrapper.find('.undo');
			var undoTimeoutId;

			//add product to cart
			addToCartBtn.on('click', function(event){
				event.preventDefault();
				addToCart($(this));
			});

			//open/close cart
			cartTrigger.on('click', function(event){
				event.preventDefault();
				toggleCart();
			});

			//close cart when clicking on the .cd-cart-container::before (bg layer)
			cartWrapper.on('click', function(event){
				if( $(event.target).is($(this)) ) toggleCart(true);
			});

			//delete an item from the cart
			cartList.on('click', '.delete-item', function(event){
				event.preventDefault();
				removeProduct($(event.target).parents('.product'));
			});

			//update item quantity
			cartList.on('change', 'select', function(event){
				quickUpdateCart();
			});

			//reinsert item deleted from the cart
			undo.on('click', 'a', function(event){
				clearInterval(undoTimeoutId);
				event.preventDefault();
				cartList.find('.deleted').addClass('undo-deleted').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
					$(this).off('webkitAnimationEnd oanimationend msAnimationEnd animationend').removeClass('deleted undo-deleted').removeAttr('style');
					quickUpdateCart();
				});
				undo.removeClass('visible');
			});
		}

		function toggleCart(bool) {
			var cartIsOpen = ( typeof bool === 'undefined' ) ? cartWrapper.hasClass('cart-open') : bool;

			if( cartIsOpen ) {
				cartWrapper.removeClass('cart-open');
				//reset undo
				clearInterval(undoTimeoutId);
				undo.removeClass('visible');
				cartList.find('.deleted').remove();

				setTimeout(function(){
					cartBody.scrollTop(0);
					//check if cart empty to hide it
					if( Number(cartCount.find('li').eq(0).text()) == 0) cartWrapper.addClass('empty');
				}, 500);
			} else {
				cartWrapper.addClass('cart-open');
			}
		}

		function addToCart(trigger) {
			var cartIsEmpty = cartWrapper.hasClass('empty');
			//update cart product list
			addProduct();
			//update number of items
			updateCartCount(cartIsEmpty);
			//update total price
			// updateCartTotal(trigger.data('price'), true);
			//show cart
			cartWrapper.removeClass('empty');
		}

		function addProduct() {
			//this is just a product placeholder
			//you should insert an item with the selected product info
			//replace productId, productName, price and url with your real product info
			productId = productId + 1;
			// var productAdded = $('<li class="product"><div class="product-image"><a href="#0"><img src="img/product-preview.png" alt="placeholder"></a></div><div class="product-details"><h3><a href="#0">Product Name</a></h3><span class="price">$25.99</span><div class="actions"><a href="#0" class="delete-item">Delete</a><div class="quantity"><label for="cd-product-'+ productId +'">Qty</label><span class="select"><select id="cd-product-'+ productId +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></span></div></div></div></li>');
			// cartList.prepend(productAdded);
		}

		function removeProduct(product) {
			clearInterval(undoTimeoutId);
			cartList.find('.deleted').remove();

			var topPosition = product.offset().top - cartBody.children('ul').offset().top ,
				productQuantity = Number(product.find('.quantity').find('select').val()),
				productTotPrice = Number(product.find('.price').text().replace('$', '')) * productQuantity;

			product.css('top', topPosition+'px').addClass('deleted');

			//update items count + total price
			updateCartTotal(productTotPrice, false);
			updateCartCount(true, -productQuantity);
			undo.addClass('visible');

			//wait 8sec before completely remove the item
			undoTimeoutId = setTimeout(function(){
				undo.removeClass('visible');
				cartList.find('.deleted').remove();
			}, 8000);
		}

		function quickUpdateCart() {
			var quantity = 0;
			var price = 0;

			cartList.children('li:not(.deleted)').each(function(){
				var singleQuantity = Number($(this).find('select').val());
				quantity = quantity + singleQuantity;
				price = price + singleQuantity*Number($(this).find('.price').text().replace('$', ''));
			});

			cartTotal.text(price.toFixed(2));
			cartCount.find('li').eq(0).text(quantity);
			cartCount.find('li').eq(1).text(quantity+1);
		}

		function updateCartCount(emptyCart, quantity) {
			if( typeof quantity === 'undefined' ) {
				var actual = Number(cartCount.find('li').eq(0).text()) + 1;
				var next = actual + 1;

				if( emptyCart ) {
					cartCount.find('li').eq(0).text(actual);
					cartCount.find('li').eq(1).text(next);
				} else {
					cartCount.addClass('update-count');

					setTimeout(function() {
						cartCount.find('li').eq(0).text(actual);
					}, 150);

					setTimeout(function() {
						cartCount.removeClass('update-count');
					}, 200);

					setTimeout(function() {
						cartCount.find('li').eq(1).text(next);
					}, 230);
				}
			} else {
				var actual = Number(cartCount.find('li').eq(0).text()) + quantity;
				var next = actual + 1;

				cartCount.find('li').eq(0).text(actual);
				cartCount.find('li').eq(1).text(next);
			}
		}

		function updateCartTotal(price, bool) {
			bool ? cartTotal.text( (Number(cartTotal.text()) + Number(price)).toFixed(2) )  : cartTotal.text( (Number(cartTotal.text()) - Number(price)).toFixed(2) );
		}
});
