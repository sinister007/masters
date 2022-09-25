import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'cf-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isFormValid=false
  isInvalid=false
  isFormNameInvalid=false
  public signUpForm!: FormGroup;

  constructor(private auth:AuthService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }


  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullname:['',Validators.required],
      email: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
    })
  }
  create(){
    if(this.signUpForm.status=="INVALID"){
      this.isFormValid=true
      this.isFormNameInvalid=true
      this.isInvalid=true
    }
 
    if(this.signUpForm.get('email').status=="INVALID"){
      this.isFormValid=true
      this.isFormNameInvalid=false

      this.isInvalid=false
      return;
    }
    if(this.signUpForm.get('fullname').status=="INVALID"){
      this.isFormValid=false
      this.isFormNameInvalid=true
      this.isInvalid=false
      return;
    }
    
    if(this.signUpForm.get('password').status=="INVALID"){
      this.isFormValid=false
      this.isInvalid=true
      this.isFormNameInvalid=false

      return;
    }
    
    this.http.post<any>("https://hiring-stackroots-server.herokuapp.com/auth/signup/user",this.signUpForm.value)
    .pipe(
     )
     .subscribe((objResponse) => {
       console.log(objResponse);
       if(objResponse.message==="User successfully registered"){
        window.alert("User successfully registered.Please login to continue")
         this.auth.authenticate(objResponse)
        this.router.navigate([''])
   

       }
       if(objResponse.message==="Account alredy exists"){
        window.alert("Account already exists")
        this.signUpForm.reset()

       }
       
     })
    
  }

}
