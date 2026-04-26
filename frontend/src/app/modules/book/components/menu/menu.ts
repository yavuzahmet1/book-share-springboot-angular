import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { TokenService } from '../../../../services/token/token';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

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
    this.tokenService.clear();
    this.router.navigate(['login']);
  }
}
