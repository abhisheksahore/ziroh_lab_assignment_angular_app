import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  name!:string|null

  ngOnInit(): void {
    this.name = localStorage.getItem('name')
  }


  logout() {
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    this.router.navigate(['/login'])
  }

}
