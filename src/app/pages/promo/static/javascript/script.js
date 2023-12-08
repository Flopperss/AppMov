function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

html = '<h1 style="border: 4px solid blue; width: 100%;">Estás usando un TIPO</h1>';
if (isMobileDevice()) {
  document.getElementById('tipo-navegador').innerHTML = html.replace('TIPO', 'navegador de dispositivo móvil');
} else {
  document.getElementById('tipo-navegador').innerHTML = html.replace('TIPO', 'navegador de escritorio');
}