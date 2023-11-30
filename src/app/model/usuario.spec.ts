import { Usuario } from './usuario';  // Ajusta la ruta según la ubicación real de tu clase Usuario

describe('Usuario', () => {
  let usuario: Usuario;

  beforeEach(() => {
    usuario = new Usuario();
  });

  it('Debería poder setear un usuario correctamente', () => {
    usuario.setUsuario('correo@test.com', 'password123', 'Nombre', 'Apellido', 'Pregunta', 'Respuesta');
    expect(usuario.correo).toEqual('correo@test.com');
    expect(usuario.password).toEqual('password123');
    expect(usuario.nombre).toEqual('Nombre');
    expect(usuario.apellido).toEqual('Apellido');
    expect(usuario.preguntaSecreta).toEqual('Pregunta');
    expect(usuario.respuestaSecreta).toEqual('Respuesta');
  });
  
  it('Debería validar correctamente el campo requerido', () => {
    const mensajeError = usuario.validarCampoRequerido('Campo', '');
    expect(mensajeError).toEqual('El campo "Campo" debe tener un valor.');
  });

  it('Debería validar correctamente un correo requerido', () => {
    const mensajeError = usuario.validarCorreo('');
    expect(mensajeError).toEqual('El campo "correo" debe tener un valor.');
  });

  it('Debería validar correctamente una contraseña requerida', () => {
    const mensajeError = usuario.validarPassword('');
    expect(mensajeError).toEqual('El campo "contraseña" debe tener un valor.');
  });

  it('Debería validar correctamente un nombre requerido', () => {
    const mensajeError = usuario.validarNombre('');
    expect(mensajeError).toEqual('El campo "nombre" debe tener un valor.');
  });

  it('Debería validar correctamente un apellido requerido', () => {
    const mensajeError = usuario.validarApellido('');
    expect(mensajeError).toEqual('El campo "apellido" debe tener un valor.');
  });

  it('Debería validar correctamente una pregunta secreta requerida', () => {
    const mensajeError = usuario.validarPreguntaSecreta('');
    expect(mensajeError).toEqual('El campo "pregunta secreta" debe tener un valor.');
  });

  it('Debería validar correctamente una respuesta secreta requerida', () => {
    const mensajeError = usuario.validarRespuestaSecreta('');
    expect(mensajeError).toEqual('El campo "respuesta secreta" debe tener un valor.');
  });
});
