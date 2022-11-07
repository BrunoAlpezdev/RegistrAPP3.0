import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tempuser } from '../interfaces/tempuser';
import { FirebaseService } from '../services/firebase.service';
import { AuthProvider, getAuth } from 'firebase/auth'; 
import * as firebase from "firebase/auth"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mensaje : string
  usuario: Tempuser
  private usuarios = []
  constructor(private fire: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.obtenerUsuarios();
    this.verificarLogin();
  }

  
  async verificarLogin(){
    const auth = getAuth();
    firebase.onAuthStateChanged(auth,function(user) {
      if (user) {
        console.log('Esta logeado el usuario:',user.displayName)
      }else {
        console.log('No está logeado')
      }

    });
  }
  
  onGoogleLogin() {
    var provider = new firebase.GoogleAuthProvider();
    const auth = getAuth();
    firebase.signInWithPopup(auth,provider).then(
      (res) => {
        this.router.navigate(['/inicio-alumno'])
        this.fire.verificacion()
        console.log('User->', res.user)
      },
      (err) => {
        console.log('Error->', err)
      }
    )
  }
  
  async onGitHubLogin() {
    var provider = new firebase.GithubAuthProvider();
    const auth = getAuth();
    firebase.signInWithPopup(auth,provider).then(
      (res) => {
        this.router.navigate(['/inicio-alumno'])
        this.fire.verificacion()
        console.log('User->', res.user)
      },
      (err) => {
        console.log('Error->', err)
      }
    )
  }
  
  async login(txtUsuario,txtPass){
    this.usuario = this.obtenerCustomUsuario(txtUsuario.value,txtPass.value)
    console.log(this.usuario)
    if ( this.usuario.email === txtUsuario.value && this.usuario.pass === txtPass.value && this.usuario.docente === '1'){
      this.loginfire(this.usuario.email,this.usuario.pass)
      this.router.navigate(['/inicio-alumno'])
    } else if ( this.usuario.email === txtUsuario.value && this.usuario.pass === txtPass.value && this.usuario.docente === '2'){
      this.loginfire(this.usuario.email,this.usuario.pass)
      this.router.navigate(['/inicio-docente'])
    } else {
      this.fire.mensaje("Error en las credenciales")
    }
  }
  
  
  async loginfire(email, pass) {
    try{
      const user = this.fire.login(email,pass)
      if (user) {
        console.log('User->',user)
        this.router.navigate(['/inicio-alumno'])
      }
    } catch (error){
      console.log('Error->',error)
  }
    
  }
  
  private obtenerUsuarios() {
    this.fire.getCollection<Tempuser>('users').subscribe(
      (res) => {
        console.log(res)
        this.usuarios=(res)
      },
      (err) => {
        console.log(err)
      }
      )
    }
    
  private obtenerCustomUsuario(usuario: string, pass: string) {
    return {
      ...this.usuarios.find(aux => {
        return aux.email === usuario && aux.pass === pass
      })
    }
  }

}
  