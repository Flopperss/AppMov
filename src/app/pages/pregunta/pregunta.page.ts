import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { SqliteService } from 'src/app/services/sqlite.service';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  public respuestaUsuario: string = '';
  usuario = new Usuario();
  plataforma = 'web';

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private sqliteService: SqliteService,
  ) {
    // this.activatedrouter.queryParamMap.subscribe(params => {
    //   const nav = this.router.getCurrentNavigation();
    //   if (nav) {
    //     if (nav.extras.state) {
    //       this.usuario = nav.extras.state['usuario'];
    //       if (this.usuario.respuestaSecreta !== undefined) {
    //         this.usuario.respuestaSecreta = this.usuario.respuestaSecreta;
    //       }
    //     }
    //   }
    // });
  }

  ngOnInit() {
    this.plataforma = this.sqliteService.platform;
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      this.usuario = usuario? usuario : new Usuario();
    });
  }
  
  redirigir() {
    if (this.usuario.respuestaSecreta === this.respuestaUsuario) {
      // NavigationExtras para enviar datos a la página correcto
      const navigationExtrasCorrecto: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      
      // Navegamos hacia la página correcto y enviamos la información extra
      this.router.navigate(['/correcto'], navigationExtrasCorrecto);
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  volver() {
    this.authService.volver();
  }
}