import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginApi: ApiService) { }

  ngOnInit(): void {
    if (localStorage.getItem('email') !== null) {
      this.router.navigate(['/dashboard'])
    } 
  }

  public email:string = '';
  public password: string = '';
  public error: string = '';

  addValue(e:any, name: string) {
    if (name === "email"){
      this.email = e.target.value.trim().toLowerCase();
    }
    if (name === "password") {
      this.password = e.target.value;
    }
    console.log(e.target.value)
  }


  login() {
    this.error = ''
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)) {
      console.log(this.email);
      this.error = "invalid email!";
      return
    }

    this.loginApi.Login(`/user/login`, {
      email: this.email,
      password: this.password
    }, {
      headers: {"content-type": "application/json"}
    }
    ).subscribe(data => {
      console.log(data)
      localStorage.setItem('name', data.data.name)
      localStorage.setItem('email', data.data.email)
      this.router.navigate(['/dashboard']);
    },
    error => {
      this.error = error.error.message;
    })
    
  }
}
