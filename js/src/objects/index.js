Index = {
	Menu : {
        config: {
            senseSpeed    : 5,
            previusScroll : 0,
            imediate      : 10,
            openMenu      : false,
        },
		init: function(){
			Index.Menu.setDebounce();
			Index.Menu.setHamburguer();
			Index.Menu.setStart();
			Index.Menu.setLinks();
		},
		setDebounce: function(){
			$(document).scroll(Index.Menu.debounce(function(){ Index.Menu.go() }, Index.Menu.config.imediate));
		},
		setStart: function(){
			var scroller  = $(document).scrollTop();
			var offsetImg = $(".bg-img").height() - ($(window).height() - 200);
		},
		setHamburguer: function(){
			$(".hamburguer").on("click", function(e){
				e.preventDefault();
				$(this).toggleClass("active");
				$(".menu-mobile").toggleClass("active");
				setTimeout(function(){
					$(".menu-mobile").toggleClass("end");
				}, 500);
				if($(".menu-translate").hasClass('active')){
					$(".menu-translate").toggleClass("active");
				}
			});
		},
		debounce: function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		},
		go: function(){
			var scroller  = $(document).scrollTop();
			var offset    = $(window).height() * 1/6;
			var offsetImg = $("#seja-um-franqueado").height() - ($(window).height() - 200);
            if (scroller - Index.Menu.config.senseSpeed >  Index.Menu.config.previousScroll && scroller > offset){
            	$('#header-menu').addClass('off');
            	$('#header-menu').removeClass('on');
				if($(".menu-mobile").hasClass('active')){
					$(".hamburguer").toggleClass("active");
					$(".menu-mobile").toggleClass("active");
					setTimeout(function(){
						$(".menu-mobile").toggleClass("end");
					}, 500);
				}
            }
            else if (scroller + Index.Menu.config.senseSpeed < Index.Menu.config.previousScroll && scroller > offset){
            	$('#header-menu').addClass('on');
            	$('#header-menu').removeClass('off');
            }
            Index.Menu.config.previousScroll = scroller;
		},
		setLinks: function() {
            $(".go-menu").on("click", function(e) {
                e.preventDefault();
				if($(".menu-mobile").hasClass('active')){
					$(".hamburguer").toggleClass("active");
					$(".menu-mobile").toggleClass("active");
					setTimeout(function(){
						$(".menu-mobile").toggleClass("end");
					}, 500);
				}
                var o = $(this);
                var plus = 30;
                if(o.attr("href") === '#trabalhe-conosco'|| Mobile.isMobile){
                	plus = 0;
                }
                $("html, body").stop().animate({
                    scrollTop: $(o.attr("href")).offset().top - plus
                }, 1e3, "easeOutQuart", function(){
					if (o.attr("href") !== '#seja-um-franqueado'){
						$('#header-menu').addClass('off');
						$('#header-menu').removeClass('on');
					}
                });
            })
        }
	},
	Stellar : {
		init: function(){
			if(!Mobile.isMobile){
				$(window).stellar({
					horizontalScrolling: false,
				});
			}
		}
	},
	Carousels: {
		configs: {
			'default': {
				loop               : true,
				nav                : false,
				pagination         : true,
				items              : 1,
				dots               : true,
				autoplay           : true,
				autoplayTimeout    : 3000,
				autoplayHoverPause : true,
				singleItem         : true
			}
		},
		init: function () {
			$('.carousel-default').owlCarousel(Index.Carousels.configs['default']);
			$('.carousel-default').on('mouseout', function () {
				$('.carousel-default').trigger('stop.owl.autoplay');
				$('.carousel-default').trigger('play.owl.autoplay', [3000]);
			});
			$('#carousel-seguradoras-associadas').owlCarousel({
				loop: true,
				nav: true,
				pagination: true,
				items: 1,
				dots: true,
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				singleItem: true,
				navText: ["<i class='arrow-prev'></i>","<i class='arrow-next'></i>"]
			});
			$('#carousel-seguradoras-associadas').on('mouseout', function () {
				$('#carousel-seguradoras-associadas').trigger('stop.owl.autoplay');
				$('#carousel-seguradoras-associadas').trigger('play.owl.autoplay', [3000]);
			});

		}
	},
	ScrollReveal: {
		configs: {
			animationSet1: {
				duration : 800,
				origin   : 'left',
				reset    : true,
				delay    : 100,
				scale    : 0
			},
			animationSet2: {
				duration : 800,
				origin   : 'top',
				reset    : true,
				delay    : 100,
				scale    : 0
			},
			animationSet3: {
				duration : 800,
				origin   : 'bottom',
				reset    : true,
				delay    : 800,
				scale    : 0
			}
		},
		init: function(){
			window.sr = ScrollReveal();
			sr.reveal('.animation-1', Index.ScrollReveal.configs.animationSet1);
			sr.reveal('.animation-2', Index.ScrollReveal.configs.animationSet2, 100);
			sr.reveal('.animation-3', Index.ScrollReveal.configs.animationSet3);
		}
	},
	InputMask: {
		init: function(){
			$(".mask").inputmask();
		}
	},
	Select2: {
		init: function(){
			$("#state").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			})
			$("#city").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			})
		}
	},
    init: function(){
    	Index.Menu.init();
		Index.Stellar.init();
		Index.Carousels.init();
		Index.ScrollReveal.init();
		Index.InputMask.init();
		Index.Select2.init();
    }
}

$(document).ready(function() {
    Index.init();
});