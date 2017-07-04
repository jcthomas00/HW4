var character = function(name, hp, baseAp, counter, imgurl){
	this.isHero = false;
	this.curEnemy = false;
	this.name = name;
	this.hp = hp;
	this.baseAp = baseAp;
	this.counter = counter
	this.ap = 0;
	this.img = imgurl;
	this.damage = function(){
		this.hp -= curHero.ap;
	}
	this.powerUp = function(){
		this.ap += baseAp;
	}
}

var curHero, curEnemy;
//create hero objects and put them in an array
var heroes = {
	lea : new character("Princess Lea", 120, 12, 30, "assets/img/lea.png"),
	spiderman : new character("Spiderman", 120, 13, 30, "assets/img/spiderman.png"),
	lorde : new character("Lorde", 120, 14, 30, "assets/img/lorde.png"),
	pocahontas : new character("Pocahontas", 120, 17, 30, "assets/img/pocahontas.png"),
};

$(document).ready(function(){
	//load images of heroes for user to select
	showThumbnails($(".hero-selection"), true);
	

	//do stuff when hero is selected
	$(".hero-selection .hero-selected").on("click", function(){
		curHero = heroes[$(this).data("hero-name")];
		curHero.isHero = true;
		showLargeImage($("#hero-space"), curHero, true);
		$(".hero-selected").slideToggle();
		showThumbnails($("#enemy-select-space"), false);
	});

	//do stuff when enemy is selected
	$("#enemy-select-space").on("click", ".hero-selected", function(){
		curEnemy = heroes[$(this).data("hero-name")];
		$("#enemy-select-space").addClass("disabled");
		$(this).addClass('invisibleFighter');
		showLargeImage($('#enemy-space'), curEnemy, false);
		$("#attack").removeClass("disabled");
	});

	var attackBtn = $('<button>', {
		text: 'Attack',
		class: 'btn btn-danger disabled btn-lg',
		id: 'attack',
		click: function(){
			curHero.powerUp();
			curEnemy.damage();
			refreshHealth();
			console.log('damage: '+curHero.ap);
			console.log(curEnemy.hp);	
		} 
	});

	function refreshHealth(){
			$("#hero-space").find(".hero-health").html('HP: ' + curHero.hp);	
			$("#enemy-space").find(".hero-health").html('HP: ' + curEnemy.hp);	
	}

	//function to show the large version of a given hero's image
	function showLargeImage(location, theHero, attack){
		var toReturn = '<button class="hero-health">HP: ' + theHero.hp + '</button>' +
			'<p class="text-center"><img class="hero-img" src="' + theHero.img + 
			'" /><p>';
		if (attack === true) {
			location.html(toReturn).append(attackBtn).hide().slideToggle("slow");
		} else {
			location.html(toReturn).hide().slideToggle("slow");
		}

	}


	//function that returns thumbnails of heroes in a dom object
	function showThumbnails(location, horizontal){
		var images = $("<div>");
		$.each(heroes, function(index, value){
			if (value.isHero === false && value.curEnemy === false) {
				var thumbs = $("<div>");
				thumbs.data("hero-name", index);
				if (horizontal === true)
					thumbs.addClass("hero-selected col-sm-3");
				else
					thumbs.addClass("hero-selected col-sm-12");					
				thumbs.html(    			
					'<div class="thumbnail">' +
							'<a href="#">' +
			  				'<img class="small-img" src="' + value.img + '" />' +
			    			'<div class="caption"><strong>' +
			      				value.name + ' HP: ' + value.hp +
			    			'</strong></div>' +
							'</a>' +
					'</div>');
				images.append(thumbs);
			}
		});
		location.html(images);
	}

});