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