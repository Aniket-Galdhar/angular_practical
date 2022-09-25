import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private _service: InteractionService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [['']]
    })
  }

  login() {
    let name: string;
    let emailid: string;
    let pass: string;
    this.http.get<any>("http://localhost:3000/signupusers")
      .subscribe(res => {
        const user = res.find((a: any) => {
          name = a.fullname;
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if (user) {
          alert("login success");
          this.loginForm.reset();
          this._service.mydata = name;
          this.router.navigate(['dashboard'])
        } else {
          alert("User not found")
        }
      }, err => {
        alert("something went wrong")
      })

      // .subscribe({
      //   next: (res) => {const user = res.find((a:any)=>{name=a.fullname;return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password})},
      //   error: (err) => alert("something went wrong"),
      // })
  }

}
