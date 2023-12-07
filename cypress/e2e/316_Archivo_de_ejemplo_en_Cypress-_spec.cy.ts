describe('Verificar mi aplicación', () => {

  const numero = Math.floor(Math.random() * 1000000) + 1;

  it('Verificar inicio de sesión con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Asistencia DUOC - Ingreso');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('correo-inexistente@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.contains('Asistencia DUOC - Ingreso');
      });
    });
  })

  it('Verificar inicio de sesión con credenciales correctas', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Asistencia DUOC - Ingreso');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('¡Bienvenido!');
        cy.contains('Cerrar sesión').click();
      });
    });
  })

    it('Probar actualizacion correcta de perfil', () => {
    cy.visit('http://localhost:8100/ingreso').then(()  => {
      cy.contains('Asistencia DUOC - Ingreso');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('¡Bienvenido!');
        cy.get('[ng-reflect-value="misdatos"]').click();

        cy.get('#Nombre').type(`Anita`);

        cy.get('#Apellido').invoke('val', '');
        cy.get('#Apellido').type(`Torres A`);

        cy.get('#Pregunta').invoke('val', '');
        cy.get('#Pregunta').type(`Nombre de mi mama`);

        cy.get('#Respuesta').invoke('val', '');
        cy.get('#Respuesta').type(`Juana`);

        cy.get('#Contraseña').invoke('val', '');
        cy.get('#Contraseña').type(`1234`);

        cy.get('#RContraseña').invoke('val', '');
        cy.get('#RContraseña').type(`1234`);
        cy.contains('Actualizar mis datos').click();

        cy.wait(3000);
        cy.contains('Cerrar sesión').click();
      });
    });
  })

  it('Probar todas las validaciones de campo', () => {
    cy.visit('http://localhost:8100/ingreso').then(()  => {
      cy.contains('Asistencia DUOC - Ingreso');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('¡Bienvenido!');
        cy.get('[ng-reflect-value="misdatos"]').click();

        cy.get('#Nombre').invoke('val', '');
        cy.wait(1000);
        cy.get('#Nombre').type(`Ana`);

        cy.get('#Apellido').clear();
        cy.contains('Actualizar mis datos').click();
        cy.wait(1000);
        cy.contains('Aceptar').click();
        cy.get('#Apellido').type(`Torres`);

        cy.get('#Pregunta').clear();
        cy.contains('Actualizar mis datos').click();
        cy.wait(1000);
        cy.contains('Aceptar').click();
        cy.get('#Pregunta').type(`Nombre de mi mascota`);

        cy.get('#Respuesta').clear();
        cy.contains('Actualizar mis datos').click();
        cy.wait(1000);
        cy.contains('Aceptar').click();
        cy.get('#Respuesta').type(`gato`);

        cy.get('#Contraseña').clear();
        cy.contains('Actualizar mis datos').click();
        cy.wait(1000);
        cy.contains('Aceptar').click();
        cy.get('#Contraseña').type(`1234`);

        cy.get('#RContraseña').clear();
        cy.contains('Actualizar mis datos').click();
        cy.wait(1000);
        cy.contains('Aceptar').click();
        cy.get('#RContraseña').type(`1234`);
        cy.contains('Actualizar mis datos').click();

        cy.wait(3000);
        cy.contains('Cerrar sesión').click();
      });
    });
  })



   it('Verificar publicación en foro', () => {
     cy.visit('http://localhost:8100/ingreso').then(() => {
       cy.contains('Asistencia DUOC - Ingreso');
       cy.get('#correo').invoke('val', '');
       cy.get('#correo').type('atorres@duocuc.cl');
       cy.get('#password').invoke('val', '');
       cy.get('#password').type('1234');
       cy.contains('Ingresar').click();
       cy.intercept('/inicio').as('route').then(() => {
         cy.get('#saludo').contains('¡Bienvenido!');
         cy.get('[ng-reflect-value="foro"]').click();
         cy.get('#titulo').type(`Título de prueba ${numero}`);
         cy.get('#contenido').type(`Contenido de prueba ${numero}`);
         cy.contains('Guardar').click();
         cy.wait(1000);
         cy.contains('Aceptar').click();
         cy.wait(3000);
         cy.contains('Cerrar sesión').click();
       });
     });
   })

     it(`Verificar eliminación en foro de la última publicación con el título que contiene ${numero}`, () => {
     cy.visit('http://localhost:8100/ingreso').then(() => {
       cy.contains('Asistencia DUOC - Ingreso');
       cy.get('#correo').invoke('val', '');
       cy.get('#correo').type('atorres@duocuc.cl');
       cy.get('#password').invoke('val', '');
       cy.get('#password').type('1234');
       cy.contains('Ingresar').click();
       cy.intercept('/inicio').as('route').then(() => {
         cy.get('#saludo').contains('¡Bienvenido!');
         cy.get('[ng-reflect-value="foro"]').click();
         cy.contains('Eliminar').click();
         cy.wait(1000);
         cy.contains('Aceptar').click();
         cy.wait(3000);
         cy.contains('Cerrar sesión').click();
       });
     });
   })
  
});
