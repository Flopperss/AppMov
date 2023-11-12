import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario;
  public respuestaUsuario: string = '';
  
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router
  ) {
    this.usuario = new Usuario('','','','','','','');

    this.activatedrouter.queryParamMap.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          if (this.usuario.respuestaSecreta !== undefined) {
            this.usuario.respuestaSecreta = this.usuario.respuestaSecreta;
          }
        }
      }
    });
  }

  ngOnInit() {
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
}