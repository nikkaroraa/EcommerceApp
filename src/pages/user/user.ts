import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus, NativeStorage } from 'ionic-native';
import { GoogleLoginPage } from '../google-login/google-login';
import { UserModel } from './user.model';
/*
  Generated class for the User page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})


 export class UserPage {
  user: UserModel = new UserModel();
  
  constructor(public navCtrl: NavController) {}

  ionViewCanEnter(){
    let env = this;
    NativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        name: data.name,
        email: data.email,
        picture: data.picture
      };
    }, function(error){
      console.log(error);
    });
  }

  doGoogleLogout(){
    let nav = this.navCtrl;
    GooglePlus.logout()
    .then(function (response) {
      NativeStorage.remove('user');
      nav.push(GoogleLoginPage);
    },function (error) {
      console.log(error);
    })
  }

}