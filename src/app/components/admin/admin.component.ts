import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AlertController } from '@ionic/angular';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AdminComponent implements OnInit {
  public listaUsuarios: { nombre: string; correo: string }[] = [];
  bd: DataBaseService

  constructor(private dataBaseService: DataBaseService, private alertController: AlertController) {
    // Asigna el servicio a la propiedad bd
    this.bd = dataBaseService;
  }

  async cargarUsuarios() {
    try {
      this.listaUsuarios = await this.bd.listarUsuarios();
      console.log('Usuarios cargados:', this.listaUsuarios);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      // Puedes manejar el error aquí, mostrar un mensaje al usuario, etc.
    }
  }

  async eliminarUsuario(usuario: { nombre: string; correo: string }) {
    try {
      const usuarioAEliminar = await this.bd.leerUsuario(usuario.correo);
      if (usuarioAEliminar) {
        await this.bd.eliminarUsuario(usuarioAEliminar);
        console.log('Usuario eliminado:', usuario);
        // Actualizar la lista después de eliminar
        await this.cargarUsuarios();
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      // Puedes manejar el error aquí, mostrar un mensaje al usuario, etc.
    }
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await new AlertController().create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }
  



  async confirmarEliminacion(usuario: { nombre: string, correo: string }) {
    const alert = await new AlertController().create({
      header: 'Confirmar eliminación',
      message: `¿Seguro que quieres eliminar a ${usuario.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // El usuario canceló la eliminación
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            // El usuario aceptó la eliminación
            // Verificar que no sea la cuenta admin antes de eliminar
            if (usuario.correo === 'admin@duocuc.cl') {
              this.mostrarAlerta('No se puede eliminar la cuenta de administrador.');
            } else {
              this.eliminarUsuario(usuario);
            }
          }
        }
      ]
    });
  
    await alert.present();
  
  }
  

  ngOnInit() {
    this.cargarUsuarios();
  }
}
