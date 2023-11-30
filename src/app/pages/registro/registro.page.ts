import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
// Cambia el nombre de la clase
export class RegistroPage implements OnInit {

  // Cambia el nombre de la variable usuario a nuevoUsuario
  nuevoUsuario = new Usuario();
  repeticionPassword = '';

  constructor(private authService: AuthService, private bd: DataBaseService) { }

  ngOnInit() {
    // Mantén esta parte si es necesaria para la inicialización
  }

  validarCampo(nombreCampo: string, valor: string) {
    if (valor.trim() === '') {
      showAlertDUOC(`Debe ingresar un valor para el campo "${nombreCampo}".`);
      return false;
    }
    return true;
  }

  async registrarUsuario() {
    if (!this.validarCampo('nombre', this.nuevoUsuario.nombre)) return;
    if (!this.validarCampo('apellidos', this.nuevoUsuario.apellido)) return;
    if (!this.validarCampo('correo', this.nuevoUsuario.correo)) return;
    if (!this.validarCampo('pregunta secreta', this.nuevoUsuario.preguntaSecreta)) return;
    if (!this.validarCampo('respuesta secreta', this.nuevoUsuario.respuestaSecreta)) return;
    if (!this.validarCampo('contraseña', this.nuevoUsuario.password)) return;
    if (this.nuevoUsuario.password !== this.repeticionPassword) {
      showAlertDUOC(`Las contraseñas escritas deben ser iguales.`);
      return;
    }
  
    try {
      await this.bd.crearUsuario(this.nuevoUsuario);
      showToast('Registro exitoso. Inicia sesión con tus nuevos datos.');
    } catch (error) {
      // Verifica si el error es de tipo Error y contiene el mensaje de correo ya registrado
      if (error instanceof Error && error.message.includes('El correo ya está registrado.')) {
        showAlertDUOC('El correo ya está registrado. Por favor, elige otro correo.');
      } else {
        console.error('Error al registrar usuario:', error);
        showAlertDUOC('Ocurrió un error al intentar registrarse. Por favor, inténtelo nuevamente.');
      }
    }
    
    
    
  }
  
}