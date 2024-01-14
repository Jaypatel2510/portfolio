import { Component, OnInit, Renderer2 } from '@angular/core';
import * as $ from "jquery";
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'portfolio';

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {

    // Initialize AOS with your desired settings
    AOS.init({
      offset: 200, // Offset (in pixels) from the top of the page after which the animations should trigger
      duration: 600, // Duration of the animation (in milliseconds)
      easing: 'ease-in-out', // Easing options ('linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out')
      delay: 100, // Delay between each animation (in milliseconds)
    });

    // AOS.init();

    // Menu toggle
    const toggleCheckbox = document.querySelector('.toggler') as HTMLInputElement;
    const menu = document.querySelector('.menu');

    toggleCheckbox?.addEventListener('change', () => {
      if (toggleCheckbox.checked) {
        this.renderer.addClass(menu, 'active');
      } else {
        this.renderer.removeClass(menu, 'active');
      }
    });

    const menuLinks = document.querySelectorAll('.menu ul li a');

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleCheckbox.checked = false;
        this.renderer.removeClass(menu, 'active');
      });
    });

    // // Smooth Scrolling
    //   $(document).ready(function () {
    //     $('a[href^="#"]').on('click', function (e) {
    //       e.preventDefault();
    //       var target = (this as HTMLAnchorElement).hash;
    //       var $target = $(target);

    //       $('html, body').animate({
    //         scrollTop: $target.offset()!.top
    //       }, 900);
    //     });
    //   });

    // Smooth Scrolling
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');

        if (target) {
          const targetElement = document.querySelector(target);
          if (targetElement) {
            const targetOffsetTop = targetElement.getBoundingClientRect().top + window.scrollY;
            this.scrollTo(targetOffsetTop, 800);
          }
        }
      });
    });
  }

  private scrollTo(to: number, duration: number) {
    const start = window.scrollY;
    const change = to - start;
    let currentTime = 0;
    const increment = 15;

    const animateScroll = () => {
      currentTime += increment;
      const val = this.easeInOutQuad(currentTime, start, change, duration);
      window.scrollTo(0, val);
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    animateScroll();
  }

  private easeInOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) {
      return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}