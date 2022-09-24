import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signInData } from '../model/signin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'cf-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  isFormValid=false
  isInvalid=false
  public signinForm!: FormGroup;

  constructor(private auth:AuthService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
    })
  }
  
  create(){
    if(this.signinForm.valueChanges){
      this.isFormValid=false
      this.isInvalid=false
    }
    if(this.signinForm.get('email').status=="INVALID"){
      this.isFormValid=true
      this.isInvalid=false
      return;
    }
    
    if(this.signinForm.get('password').status=="INVALID"){
      this.isFormValid=false
      this.isInvalid=true
      return;
    }
    
    this.http.post<any>("https://hiring-stackroots-server.herokuapp.com/auth/signin/user",this.signinForm.value)
    .pipe(
 
     )
     .subscribe((objResponse) => {
       console.log(objResponse);
       if(objResponse.message==="User Login Successful"){
         this.auth.authenticate(objResponse)
        this.router.navigate(['/home'])
        window.alert("login successfull")
  

       }
       
     })
    
  }
}
