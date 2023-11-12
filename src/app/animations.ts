import { trigger, style, animate, transition } from '@angular/animations';


export const fadeInAnimation = trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }), // Estado inicial: completamente transparente
      animate('5000ms ease-in', style({ opacity: 1 })), // Estado final: completamente visible
    ]),
  ]);

  export const scaleTitle = trigger('scaleTitle', [
    transition(':enter', [
      style({ transform: 'scale(10)' }),
      animate('1000ms ease-out', style({ transform: 'scale(1)' })),
    ]),
  ]);