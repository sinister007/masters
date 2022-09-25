import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'cf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'signinpage';
  constructor(public auth:AuthService){}
  logOut(){
    this.auth.logOut()
  }
}
