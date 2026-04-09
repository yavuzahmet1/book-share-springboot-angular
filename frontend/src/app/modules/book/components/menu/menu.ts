import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.nav-link');

    linkColor.forEach(l => {
      if (window.location.href.endsWith(l.getAttribute('href') || '')) {
        l.classList.add('active');
      }
      l.addEventListener('click', () => {
        linkColor.forEach(n => n.classList.remove('active'));
        l.classList.add('active');
      });
    });
  }

  logout() {
    throw new Error('Method not implemented.');
  }
}
