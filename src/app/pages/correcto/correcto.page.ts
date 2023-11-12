import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorrectoPage implements OnInit {
  public usuario: Usuario;
  constructor(private activerouter: ActivatedRoute,
    private router: Router) { 
    this.usuario = new Usuario('','','','','','','');

    this.activerouter.queryParamMap.subscribe(params => {
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

}
