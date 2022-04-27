import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private signupApi: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('email') !== null) {
      this.router.navigate(['/dashboard'])
    } 
  }

  public email:string = "";
  public name:string = "";
  public password:string = "";
  public error:string = "";

  public userDetails:any;

  signup() {
    this.error = ''
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)) {
      this.error = "invalid email!";
      return
    }
    this.signupApi.Signup(`/user/signup`, {
      name: this.name,
      email: this.email,
      password: this.password
    }, {
      headers:{'content-type': 'application/json'}
    }).subscribe(data => {
      this.userDetails = data.data
      localStorage.setItem("email", this.userDetails.email)
      localStorage.setItem("name", this.userDetails.name)
      this.router.navigate(["/dashboard"])
    }, 
    error => {
      this.error = error.error.message
    })
  }

  addValue(e:any, name: string) {
    if (name === "email"){
      this.email = e.target.value.trim().toLowerCase();
    }
    if (name === "name") {
      this.name = e.target.value.trim();
    }
    if (name === "password") {
      this.password = e.target.value;
    }
  }
}
