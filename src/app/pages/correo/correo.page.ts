import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {
  correo = 'atorres@duocuc.cl';
  usuario: Usuario; // Declara una variable para la instancia de Usuario
  
  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  ingresar() {
    this.authService.recuperar(this.correo);
  }
  iniciarSesion() {
    // Utiliza el servicio de enrutamiento para redirigir a otra página
    this.router.navigate(['/ingreso']);
  }
}

