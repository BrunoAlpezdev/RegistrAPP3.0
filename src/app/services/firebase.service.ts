import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { Usuario } from '../login/usuario';
import { switchMap } from "rxjs/operators";
import { AuthProvider, getAuth } from 'firebase/auth'; 
import * as firebase from "firebase/auth"

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public user$: Observable<User>;
  

  constructor(private authfa: AngularFireAuth , private database: AngularFirestore, private loading: LoadingController, private toastController: ToastController) {
    this.user$ = this.authfa.authState.pipe(
      switchMap((user) =>{
        if (user) {
          return this.database.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    )
  }

  //data= objeto, path= coleccion, id= id

 
  createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc<tipo>(path: string, id: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  
  deleteDoc(path: string, id: string) {
    const collection = this.database.collection(path)
    return collection.doc(id).delete()
  }

  getId() {
    return this.database.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }

  async mensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      //position: 'top' | 'middle' | 'bottom'
      position: 'bottom',
    });

    await toast.present();
  }

  loadingAux: any;

  async cargarLoading(mensaje: string) {
    this.loadingAux = await this.loading.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      //duration: 2000
    })

    await this.loadingAux.present();
  }

  async cerrarLoading() {
    await this.loadingAux.dismiss();
  }

  async logout() {
    await this.authfa.signOut();
  }

  async login(correo: string, pass: string): Promise<User> {
    try {
      const { user } = await this.authfa.signInWithEmailAndPassword(correo, pass)
      return user;
    } catch (error) {
      console.log('Error->',error)
    }
  }
  
  //
  //async loginGoogle(): Promise<User>{
  //  try{
  //    const { user } = await this.authfa.signInWithPopup(new auth.)
  //  } catch (error) {
  //    console.log('Error->',error)
  //  }
  //}

  
  
  async registrar(correo: string, pass: string): Promise<User> {
    try {
      const { user } = await this.authfa.createUserWithEmailAndPassword(correo, pass)
      await this.verificacion();
      return user;
    } catch (error) {
      console.log('Error-=->',error)
    }
  }

  

  async verificacion() {
    return (await this.authfa.currentUser).sendEmailVerification();
  }

  async isVerified(user: User){
    return user.emailVerified === true ? true : false;
  }


  async recuperar(correo: string) {
    return this.authfa.sendPasswordResetEmail(correo);
  }

  async obtenerEmail() {
    return (await this.authfa.currentUser).email
  }

  async obtenerUsuario() {
    const aux: Usuario = await this.authfa.currentUser;
    return aux
  }

  async obtenerus() {
    
  }

  private updateUserData(user: User){
    const userRef: AngularFirestoreDocument<User> = this.database.doc(`users/${user.uid}`);

    const data:User = {
      uid:user.uid,
      email:user.email,
      emailVerified:user.emailVerified,
      displayName:user.displayName,
    };

    return userRef.update(data);
  }


  


}
