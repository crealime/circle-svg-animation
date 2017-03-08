$(document).ready(function(){

let circleLength = 628.318,
myCircleBox = $('.circle-box'),
nullPercent = 0;

// SVG element
myCircleBox.html('<svg viewBox="0 0 220 220"><circle class="circle__a" cx="110" cy="110" r="100"/><circle class="circle__b" cx="110" cy="110" r="110"/></svg><div class="percent"></div>');

$('.percent').text(nullPercent + '%');

$('.circle__a').css({'stroke-dasharray' : circleLength, 'stroke-dashoffset' : circleLength});

$('.circle-box').each(function(index) {
	let that = $(this);
			myPercent = $(this).attr('data-percent'),
			toPercent = circleLength - circleLength / 100 * myPercent;
	that.find('.percent').animate({num: myPercent}, {
		duration: 1500,
		step: function (num){
			$(this).text((num).toFixed(0) + '%');
		}
	});
	that.find('.circle__a').animate({'stroke-dashoffset' : toPercent}, 1500);
});

});



