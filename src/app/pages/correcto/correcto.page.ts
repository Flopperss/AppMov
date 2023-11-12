import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorrectoPage implements OnInit {
  
  usuario = new Usuario();
  plataforma = 'web';
  constructor(private activerouter: ActivatedRoute,
    private authService: AuthService,
    private sqliteService: SqliteService,
    private router: Router) { 
    
    // this.activerouter.queryParamMap.subscribe(params => {
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

}
