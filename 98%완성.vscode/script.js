
//가로스크롤

const scrollSection = document.querySelector('.scroll__section');
const scrollContent = document.querySelector('.scroll__content');

const scrollHeight = scrollSection.clientHeight;
const contentWidth = scrollContent.clientWidth;

document.addEventListener('scroll', e => {
  const scrolled = window.pageYOffset;
  const sectionOffset = Math.abs(scrollSection.offsetTop - scrolled);
  const notReachedBottom = parseInt(Math.max(0, scrollSection.getBoundingClientRect().bottom - window.innerHeight));

  if (scrollSection.offsetTop <= scrolled && notReachedBottom) {

    gsap.to(scrollContent, {
      x: -sectionOffset });

  }
});
const testTween = background => {
  const e1 = gsap.timeline();

  e1.to(background, {
    height: '100%',
    ease: 'power3.easeOut' });
  return e1;
};

const controller = new ScrollMagic.Controller();
const testScene = new ScrollMagic.Scene({
  triggerElement: '.test',
  triggerHook: 0,
  duration: '40%' }).

setTween(testTween('.test__background')).
addIndicators({ name: "1" });



//메뉴판

class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.ContainH = 70;
		let self = this;
		$('.menu-tab').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.ContainH + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkP();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkP() {
		let offset = $('.menu-tabs').offset().top + $('.menu-tabs').height() - this.ContainH;
		if($(window).scrollTop() > offset) {
			$('.menu-tabs-container').addClass('menu-tabs-container--top');
		} 
		else {
			$('.menu-tabs-container').removeClass('menu-tabs-container--top');
		}
	}
	
	findCurrentTabSelector() {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.menu-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.ContainH;
			let offsetBottom = $(id).offset().top + $(id).height() - self.ContainH;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.menu-tab-slider').css('width', width);
		$('.menu-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();



//파티클 (맨 위 클릭시 공나옴)

let d = document,
$d = $(d),
w = window,
$w = $(w),
wWidth = $w.width(),
wHeight = $w.height(),
credit = $('.credit > a'),
particles = $('.particles'),
particleCount = 0,
sizes = [
  15, 20, 25, 35, 45
],
colors = [
  '#6F1E51', '#1B1464', '##D980FA', '#yellow', '##7ed6df',
  '#pink', '#black', '#white', '#brown', '#4CAF50',
  '#8c7ae6', '#CDDC39', '#FFEB3B', '#f78fb3', '#FF9800',
  '#f3a683', '#795548', '#9E9E9E', '#607D8B', '#dff9fb'
],

mouseX = $w.width() / 2,
mouseY = $w.height() / 2;

function ParticleEvent() {
$('.particle-count > .number').text(particleCount);
};

$w
.on('resize', function() {
  wWidth = $w.width();
  wHeight = $w.height();
});

$d
.on('mousemove touchmove', function(event) {
  event.preventDefault();
  event.stopPropagation();
  mouseX = event.clientX;
  mouseY = event.clientY;
  if (!!event.originalEvent.touches) {
	mouseX = event.originalEvent.touches[0].clientX;
	mouseY = event.originalEvent.touches[0].clientY;
  }
})
.on('mousedown touchstart', function(event) {
  if (event.target === credit.get(0)) {
	return;
  }
  mouseX = event.clientX;
  mouseY = event.clientY;
  if (!!event.originalEvent.touches) {
	mouseX = event.originalEvent.touches[0].clientX;
	mouseY = event.originalEvent.touches[0].clientY;
  }
 let timer = setInterval(function() {
	$d
	  .one('mouseup mouseleave touchend touchcancel touchleave', function() {
		clearInterval(timer);
	  })
	createParticle(event);
  }, 1000 / 60)

});

function createParticle(event) {
let particle = $('<div class="particle"></div>'),
  size = sizes[Math.floor(Math.random() * sizes.length)],
  color = colors[Math.floor(Math.random() * colors.length)],
  negative = size / 2,
  speedHorz = Math.random() * 10,
  speedUp = Math.random() * 25,
  spinVal = 360 * Math.random(),
  spinSpeed = ((36 * Math.random())) * (Math.random() <= .5 ? -1 : 1),
  otime,
  time = otime = (1 + (.5 * Math.random())) * 1000,
  top = (mouseY - negative),
  left = (mouseX - negative),
  direction = Math.random() <= .5 ? -1 : 1,
  life = 10;

particle
  .css({
	height: size + 'px',
	width: size + 'px',
	top: top + 'px',
	left: left + 'px',
	background: color,
	transform: 'rotate(' + spinVal + 'deg)',
	webkitTransform: 'rotate(' + spinVal + 'deg)'
  })
  .appendTo(particles);
particleCount++;
ParticleEvent();

let particleTimer = setInterval(function() {
  time = time - life;
  left = left - (speedHorz * direction);
  top = top - speedUp;
  speedUp = Math.min(size, speedUp - 1);
  spinVal = spinVal + spinSpeed;

  particle
	.css({
	  height: size + 'px',
	  width: size + 'px',
	  top: top + 'px',
	  left: left + 'px',
	  opacity: ((time / otime) / 2) + .25,
	  transform: 'rotate(' + spinVal + 'deg)',
	  webkitTransform: 'rotate(' + spinVal + 'deg)'
	});

  if (time <= 0 || left <= -size || left >= wWidth + size || top >= wHeight + size) {
	particle.remove();
	particleCount--;
	ParticleEvent();
	clearInterval(particleTimer);
  }
}, 1000 / 50);
}
