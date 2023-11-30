import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent  implements OnInit {
  public listaUsuarios: { nombre: string, correo: string }[] = [];
  bd: DataBaseService;
  constructor(private dataBaseService: DataBaseService) {
    // Asigna el servicio a la propiedad bd
    this.bd = dataBaseService;
  }

  async cargarUsuarios() {
    try {
      const usuarios = await this.bd.listarUsuarios();
      this.listaUsuarios = usuarios;
      console.log('Usuarios cargados:', this.listaUsuarios);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  }
  
  ngOnInit() {
    this.cargarUsuarios();
  }
}