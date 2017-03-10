$(document).ready(function(){

let circleLength = 628.318,
myCircleBox = $('.circle-box'),
nullPercent = 0,
mySVG = '<svg viewBox="0 0 220 220"><circle class="circle__a" cx="110" cy="110" r="100"/><circle class="circle__b" cx="110" cy="110" r="110"/></svg>',
myDivPercent = '<div class="percent"></div>';

myCircleBox.html(mySVG + myDivPercent);

$('.percent').text(nullPercent + '%');

$('.circle__a').css({'stroke-dasharray' : circleLength, 'stroke-dashoffset' : circleLength});

myCircleBox.each(function(index) {
	let that = $(this);
		myPercent = +that.attr('data-percent'),
		myTime = +that.attr('data-time'),
		toPercent = circleLength - circleLength / 100 * myPercent;
		that.find('.percent').animate({num: myPercent}, {
			duration: myTime,
			step: function (num){
				$(this).text((num).toFixed(0) + '%');
			}
		});
	that.find('.circle__a').animate({'stroke-dashoffset' : toPercent}, myTime);
});

});



