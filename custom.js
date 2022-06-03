     /* Storing user's device details in a variable*/

  const hero = document.getElementById("project-hero");
  if(hero){
    hero.addEventListener('click', () => {
      hero.dataset.cursorText === "Close Summary"
      ? hero.dataset.cursorText = "View Summary"
      : hero.dataset.cursorText ="Close Summary"
      }
    )
  }
  
  
  const Util = {
    round: function round(number, r) {
      var r = r ? Math.pow(10, r) : 1e3;
      return Math.round(number * r) / r;
    }
  }
  
  class CustomCursor {
    constructor(){
      this.details = navigator.userAgent;
  
  /* Creating a regular expression 
  containing some mobile devices keywords 
  to search it in details string*/
      this.regexp = /android|iphone|kindle|ipad/i;

  /* Using test() method to search regexp in details
  it returns boolean value*/
      this.isMobileDevice = this.regexp.test(this.details);
      this.$el = document.getElementById('custom-cursor');
      this.$bg = document.getElementById('custom-cursor-bg');
      this.$text = document.getElementById('custom-cursor-text');
      this.allHoverItems = document.querySelectorAll('[data-cursor-pointer], .play-button, .button-line, .button-border, .social-link, input, .btnLegal, #footer-left, #nav, .modalClose, .legalClose, .nav__link, .footer-link, .contact-link, .social-link, .link, .logo');
  
      this.text = 'Unmute';
      this.arrowState = 'left';
      this.mediaState = 'play';
      this.show = true;
      this.showText = false;
      this.showArrow = false;
      this.showMedia = false;
      this.showPointer = false;
      this.bg = 'magenta';
      this.last = {
        bg: 'none',
        show: false,
        showText: true,
        showArrow: true,
        showMedia: true,
        showPointer: true
      };
      this.position = { c: [0, 0], t: [-100, -100] };
      this.render = this.render.bind(this);
      this.resize = this.resize.bind(this);
      this.mouseHandler = this.mouseHandler.bind(this);
  
      this.mounted();
    }
    mounted() {
      if (!this.isMobileDevice) {
        window.addEventListener('resize', this.resize);
        this.resize();
        document.addEventListener('mousemove', this.mouseHandler);
        document.addEventListener('click', this.mouseHandler);
        document.addEventListener('wheel', this.mouseHandler);
        this.render();
        setTimeout(() => {
          this.$el.classList.add('enable-transitions');
        }, 400);
      }
    }
    mouseHandler(e) {
      this.position.t[0] = e.clientX
      this.position.t[1] = e.clientY
      this.$cursorElementText = e.target.closest('[data-cursor-text]')
      this.$cursorElementArrow = e.target.closest('[data-cursor-arrow]')
      this.$cursorElementMedia = e.target.closest('[data-cursor-media]')
      this.$cursorElementPointer = this.closestPointer(e.target)
      this.$cursorElementBG = e.target.closest('[data-cursor-bg]')
      this.$cursorElementHide = e.target.closest('[data-cursor-hide]')
      this.update()
    }
    closestPointer($el) {
      return $el.closest('[data-cursor-pointer], .play-button, .button-line, .button-border, .social-link, input, .btnLegal, #footer-left, #nav, .modalClose, .legalClose, .nav__link, .footer-link, .contact-link, .social-link, .link, .logo')
    }
    update() {
      if (this.$cursorElementHide) {
        this.show = false
        this.showText = false
        this.showMedia = false
        this.showPointer = false
        this.showArrow = false
        this.bg = 'magenta'
      }else if (this.$cursorElementPointer) {
        const bg =
          this.$cursorElementPointer.closest('[data-cursor-bg]') &&
          this.$cursorElementPointer
            .closest('[data-cursor-bg]')
            .getAttribute('data-cursor-bg')
        this.show = true
        this.showMedia = false
        this.showPointer = true
        this.showText = false
        this.showArrow = false
        if (bg) this.bg = bg
        else this.bg = 'magenta'
      } else if (this.$cursorElementText) {
        this.text = this.$cursorElementText.getAttribute('data-cursor-text')
        this.show = true
        this.showText = true
        this.showPointer = false
        this.showMedia = false
        this.showArrow = false
        this.bg = 'magenta'
      } else if (this.$cursorElementArrow) {
        this.arrowState = this.$cursorElementArrow.getAttribute(
          'data-cursor-arrow'
        )
        this.show = true
        this.showArrow = true
        this.showText = false
        this.showPointer = false
        this.showMedia = false
        this.bg = 'magenta'
      } else if (this.$cursorElementMedia) {
        this.mediaState = this.$cursorElementMedia.getAttribute(
          'data-cursor-media'
        )
        this.show = true
        this.showMedia = true
        this.showText = false
        this.showPointer = false
        this.showArrow = false
        this.bg = 'white'
      } else if (this.$cursorElementBG) {
        const bg = this.$cursorElementBG.getAttribute('data-cursor-bg')
        this.show = true
        this.showPointer = false
        this.bg = bg
      } else {
        this.show = true
        this.showText = false
        this.showMedia = false
        this.showPointer = false
        this.showArrow = false
        this.bg = 'magenta'
      }
      this.updateClasses();
    }
    render() {
      this.position.c[0] += (this.position.t[0] - this.position.c[0]) * 0.19
      this.position.c[1] += (this.position.t[1] - this.position.c[1]) * 0.19
      let final = [
        Util.round(this.position.c[0]),
        Util.round(this.position.c[1]),
      ]
      if (final[0] !== this.position.t[0] || final[1] !== this.position.t[1]) {
        this.move(final)
      }
      requestAnimationFrame(this.render)
    }
    resize() {
      this.width = this.$el.clientWidth
      this.height = this.$el.clientHeight
      this.updateClasses();
    }
    move(pos) {
      let x = pos[0] - this.width * 0.5
      let y = pos[1] - this.height * 0.5
  
      this.$el.style.transform = `translateX(${x}px) translateY(${y}px)`
    }
    hide() {
      this.show = false
      this.showText = false
      this.showArrow = false
      this.showMedia = false
  
      this.updateClasses();
    }
    updateClasses() {
      if(this.show) this.$el.classList.add('show');
      else this.$el.classList.remove('show');
  
      if(this.showText) this.$el.classList.add('show-text');
      else this.$el.classList.remove('show-text');
  
      if(this.showMedia) this.$el.classList.add('show-media');
      else this.$el.classList.remove('show-media');
  
      if(this.showArrow) this.$el.classList.add('show-arrow');
      else this.$el.classList.remove('show-arrow');
      if(this.showPointer) this.$el.classList.add('show-pointer');
      else this.$el.classList.remove('show-pointer');
  
      if(this.arrowState === 'left') {
        this.$el.classList.remove('right');
        this.$el.classList.add('left');
      }
      else {
        this.$el.classList.add('right');
        this.$el.classList.remove('left');
      }
  
      if(this.mediaState === 'play') {
        this.$el.classList.remove('pause');
        this.$el.classList.add('play');
      }
      else {
        this.$el.classList.add('pause');
        this.$el.classList.remove('play');
      }
  
      this.$bg.style.fill = this.bg;
      this.$text.innerHTML = this.text;
    }
  }
  
  const cursor = new CustomCursor();
