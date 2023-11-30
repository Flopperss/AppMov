import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../model/usuario';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  userUpgrades = [
    {
      toVersion: 1,
      statements: [`
        CREATE TABLE IF NOT EXISTS USUARIO (
          correo TEXT PRIMARY KEY NOT NULL,
          password TEXT NOT NULL,
          nombre TEXT NOT NULL,
          apellido TEXT NOT NULL,
          preguntaSecreta TEXT NOT NULL,
          respuestaSecreta TEXT NOT NULL
        );
      `]
    }
  ]

  nombreBD = 'asistencia1';
  db!: SQLiteDBConnection;
  listaUsuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  datosQR: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private sqliteService: SqliteService) { }

  async inicializarBaseDeDatos() {
    await this.sqliteService.crearBaseDeDatos({database: this.nombreBD, upgrade: this.userUpgrades});
    this.db = await this.sqliteService.abrirBaseDeDatos(this.nombreBD, false, 'no-encryption', 1, false);
  }

  async crearUsuariosDePrueba() {
    await this.leerUsuario('atorres@duocuc.cl').then(async usuario => {
      if (!usuario) await this.guardarUsuario(Usuario.getUsuario('atorres@duocuc.cl', '1234', 'Ana', 'Torres', 'Nombre de mi mascota', 'gato'));
      this.leerUsuario('avalenzuela@duocuc.cl').then(async usuario => {
        if (!usuario) await this.guardarUsuario(Usuario.getUsuario('avalenzuela@duocuc.cl', 'qwer', 'Alberto', 'Valenzuela', 'Mi mejor amigo', 'juanito'));
        this.leerUsuario('cfuentes@duocuc.cl').then(async usuario => {
          if (!usuario) await this.guardarUsuario(Usuario.getUsuario('cfuentes@duocuc.cl', 'asdf', 'Carla', 'Fuentes', 'Dónde nació mamá', 'valparaiso'));
          
        });
      });
    });
  
    // Agrega un usuario administrador si no existe
    await this.leerUsuario('admin@duocuc.cl').then(async usuario => {
      if (!usuario) { await this.guardarUsuario(Usuario.getUsuario('admin@duocuc.cl', 'admin', 'Admin', 'Usuario', 'Pregunta secreta', 'Respuesta secreta'));
      }
    });
  }
  
  // async crearUsuario(usuario: Usuario) {
  //   const sql = 'INSERT INTO USUARIO (correo, password, nombre, apellido, preguntaSecreta, respuestaSecreta VALUES (?,?,?,?,?,?);';
  // await this.db.run(sql, [usuario.correo, usuario.password, usuario.nombre, usuario.apellido, 
  //   usuario.preguntaSecreta, usuario.respuestaSecreta]);  
  //   await this.leerUsuarios();
  // }

  async crearUsuario(usuario: Usuario) {
    // Verificar si el correo ya existe
    const usuarioExistente = await this.leerUsuario(usuario.correo);
    if (usuarioExistente) {
      // El correo ya existe, muestra un mensaje de error o toma la acción adecuada
      console.error('El correo ya está registrado.');
      // Puedes manejar el error aquí, retornar o lanzar una excepción, según tus necesidades
      return;
    }
  
    // El correo no existe, procede con la creación del usuario
    const sql = 'INSERT INTO USUARIO (correo, password, nombre, apellido, preguntaSecreta, respuestaSecreta) VALUES (?,?,?,?,?,?);';
    await this.db.run(sql, [
      usuario.correo,
      usuario.password,
      usuario.nombre,
      usuario.apellido,
      usuario.preguntaSecreta,
      usuario.respuestaSecreta
    ]);
  
    // Actualiza la lista de usuarios
    await this.leerUsuarios();
  }
  

  
  async guardarUsuario(usuario: Usuario) {
    const sql = 'INSERT OR REPLACE INTO USUARIO (correo, password, nombre, apellido, ' +
    'preguntaSecreta, respuestaSecreta) VALUES (?,?,?,?,?,?);';
  await this.db.run(sql, [usuario.correo, usuario.password, usuario.nombre, usuario.apellido, 
    usuario.preguntaSecreta, usuario.respuestaSecreta]);  
    await this.leerUsuarios();
  }

  async leerUsuarios() {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO;')).values as Usuario[];
    this.listaUsuarios.next(usuarios);
  }

  async leerUsuario(correo: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO WHERE correo=?;', [correo])).values as Usuario[];

    return usuarios[0];
  }
  
  async eliminarUsuarioUsandoCorreo(correo: string) {
    await this.db.run('DELETE FROM USUARIO WHERE correo=?', [correo]);
    await this.leerUsuarios();
  }

  async validarUsuario(correo: string, password: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO WHERE correo=? AND password=?;',
      [correo, password])).values as Usuario[];
    return usuarios[0];
  }

// En tu servicio o componente donde necesitas listar usuarios
async listarUsuarios(): Promise<Usuario[]> {
  try {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO;')).values as Usuario[];
    return usuarios;
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    throw error; // Puedes manejar el error aquí o lanzarlo para manejarlo en el componente
  }
}

async eliminarUsuario(usuario: Usuario) {
  await this.db.run('DELETE FROM USUARIO WHERE correo=?', [usuario.correo]);
  await this.leerUsuarios();
}

}
