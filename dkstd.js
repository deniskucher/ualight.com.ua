(function(){
    var showCartNotification = false;
    var cartfixed = false;
    
    $(document).ready(function() {
        addbasketfixed();
        showfixedcart();
        updateFixedCart();
        $('body').on('click','a.to-shopping', function(){
            var close = $('#colorbox').find('#cboxClose').trigger('click');
        });
        
        $('body').on('click','#cart-total-fixed', function(){
            var href = $('#cart-total').attr('href');
            location.href = href;   
        });

        $('body').on('click','div.cart button, #main button.contrast', function(){
            // updateFixedCart();
            if (!showCartNotification) {
                formmodal();
                $message = $('#message');
                $message.modal('show');
                
                setTimeout(function() {
                    $message.modal('hide');
                },1500);
            };
        });
        
        $('body').on('click','.mini-cart-info td.remove>a', function(){
            updateFixedCart();
        });

        $(document).on('scroll', function(event) { showfixedcart('.shortcuts_wrapper')});

        
        $('body').on('click','ul.dropdown-menu a.footer-link-search', function(){
            var name = $(this).parent('li').attr('data-value');
            $('#search input[name=\'search\']').val(name);
            $('.button-search').trigger('click');
        });
        
    });

    function formmodal(){   
        if($('#message').length == 0)
        {   
            $("body").append(
                $('<div/>',{id:'message',class:'modal hide',role:'dialog'}).append(
                    $('<div/>',{class:'modal-dialog'}).append(
                        $('<div/>',{class:'modal-content'}).append(
                            $('<div/>',{class:'modal-body'}).append(
                                $('<b/>').text('Товар добавлен в корзину!')
                            )
                        )
                    )
                )
            );
        }
    }; 

    function updateFixedCart(){   
        var cartInfo = $('#cart .content');
        var cartInfohtml = cartInfo.wrap('<div></div>').parent().html();
        var cartfixed = $('.cart_fixed');
        cartfixed.find('.content').closest('.content').remove();
        cartfixed.append(cartInfohtml);
        cartfixed.find('.content').addClass('fixed'); 
    }; 

    function addbasketfixed(){
        $('body').append("\<div class = 'cart_fixed' title='Перейти в корзину'>\
            <a id='cart-total-fixed' class='shortcut_heading'>\
                <i class='fa fa-shopping-cart' ></i>\
                <span class='count'></span>\
            </a>\
        </div>\
        ");
    };

    function showfixedcart(node) 
    {
        var doc = $(window); 
        var docTop = doc.scrollTop(),
        anchorTop = $('#menu').offset().top;

        if(docTop > anchorTop+50){
            if(!cartfixed){
                $('.cart_fixed').fadeIn(500);        
                cartfixed = true;
            }
        }  
        else   {
            if(cartfixed){
                $('.cart_fixed').fadeOut(200);
                cartfixed = false;
            }
        }
        var count = $('#cart-total span.count').html();
        $('#cart-total-fixed span.count').html(count);   
    }; 

})();

