import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{

  ngOnInit(): void {
        // about title animation
        var options = {
          strings: ['','Full-Stack Developer', 'Web Developer','Mobile Application Developer'],
          typeSpeed: 120,
          backSpeed: 100,
          loop: true,
        };
        
        var typed = new Typed('.typed', options);
        typed.reset(true);
  }
}
