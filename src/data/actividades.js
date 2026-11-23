// Actividades de la Semana 8 (SD2). Se juegan en la sesión que crea el profesor (#/profesor): un solo QR
// (#/vivo?s=<sesión>) y cada actividad aparece sola en los celulares al llegar a su diapositiva.
// "codigo" es el respaldo para un celular que no logra conectarse: abre la actividad sin la sesión.
// Tipos: quiz · tf · classify (tarjetas a categorías) · order (ordenar) · scale (termómetro, sin respuesta correcta).
// En "order", "o" ya viene desordenado y "a" es el orden correcto (índices de "o").

const TERMO = ['Demostración del producto', 'Versionado (SemVer y tags)', 'Gestión del proyecto', 'Entregables finales'];

export const ACTIVIDADES = [
  { id: 'a1', codigo: 'DEMO', n: 1, nombre: '¿Qué hace una buena demo?', momento: 'inicio', min: 8, color: '#FF8A3D', preguntas: [
    { id: 'a1q1', type: 'quiz', t: 25, q: '¿Para qué sirve la demo final del capstone?',
      o: ['Mostrar al Product Owner el software funcionando y el valor que entrega', 'Explicar el código línea por línea', 'Presentar las diapositivas del curso', 'Mostrar cuántas horas trabajó cada integrante'],
      a: 0, e: 'Una demo muestra el producto funcionando, con los flujos que pidió el negocio. El código y el proceso se defienden en las preguntas, no se leen en pantalla.' },
    { id: 'a1q2', type: 'order', t: 40, q: 'Ordena el flujo de punta a punta del Delivery System', o: ['El repartidor toma el pedido y lo entrega con el código', 'El cliente arma su carrito con productos del catálogo', 'El comercio marca el pedido como listo para entrega', 'El cliente paga y el pedido queda confirmado'],
      a: [1, 3, 2, 0], e: 'Catálogo → Pedidos → Pagos → Pedidos (listo) → Entregas. Cada paso cruza un contrato de core: CatalogService, PaymentService y OrderService.' },
    { id: 'a1q3', type: 'tf', t: 15, q: 'Si algo falla en vivo, lo mejor es seguir sin decir nada.', o: ['Verdadero', 'Falso'],
      a: 1, e: 'Falso. Se dice qué pasó, se pasa al plan B (otro dato de prueba o la grabación del ensayo) y se sigue. Esconder el error resta credibilidad.' },
    { id: 'a1q4', type: 'scale', t: 40, q: 'Termómetro: ¿qué tan seguro te sientes con cada tema de hoy?', o: TERMO, lo: 'nada', hi: 'podría explicarlo' },
  ] },
  { id: 'a2', codigo: 'TAGS', n: 2, nombre: 'Ponle número a la versión', momento: 'antes del receso', min: 12, color: '#C6F33A', preguntas: [
    { id: 'a2q1', type: 'quiz', t: 25, q: 'La versión es 1.0.0. Corriges un bug sin cambiar ningún contrato. ¿Qué versión sigue?',
      o: ['1.0.1', '1.1.0', '2.0.0', '1.0.0 otra vez'], a: 0, e: 'Un arreglo compatible sube el PATCH: 1.0.0 → 1.0.1.' },
    { id: 'a2q2', type: 'quiz', t: 25, q: 'Agregas a CatalogService un método nuevo con implementación por defecto (como findAvailableProducts). ¿Qué parte sube?',
      o: ['MINOR: funcionalidad nueva y compatible', 'PATCH', 'MAJOR', 'Ninguna'], a: 0, e: 'Algo nuevo que no rompe a nadie sube el MINOR y el PATCH vuelve a 0: 1.0.1 → 1.1.0.' },
    { id: 'a2q3', type: 'quiz', t: 25, q: 'Cambias la firma de UserService.isActiveWithRole y los otros módulos dejan de compilar. ¿Qué parte sube?',
      o: ['MAJOR: cambio incompatible', 'MINOR', 'PATCH', 'Ninguna, es interno'], a: 0, e: 'Romper un contrato público sube el MAJOR: 1.1.0 → 2.0.0. Por eso en core los cambios se hacen con métodos default.' },
    { id: 'a2q4', type: 'tf', t: 15, q: 'Si un tag quedó en el commit equivocado, se mueve con git tag -f y listo.', o: ['Verdadero', 'Falso'],
      a: 1, e: 'Falso. Un tag publicado no se mueve: otros ya lo descargaron. Se crea una versión nueva (por ejemplo, 1.0.1) en el commit correcto.' },
  ] },
  { id: 'a3', codigo: 'PLAN', n: 3, nombre: 'Gestión con datos', momento: 'después del tema 3', min: 5, color: '#6EA8FF', preguntas: [
    { id: 'a3q1', type: 'quiz', t: 30, q: 'Un equipo cerró 13, 21 y 17 puntos en tres sprints. ¿Cuántos puntos debería comprometer en el siguiente?',
      o: ['Cerca de 17: su velocidad promedio', '40, para ponerse al día', '0, hasta terminar lo pendiente', '100'], a: 0, e: 'La velocidad es lo que el equipo cierra, no lo que promete. Se planifica con el promedio reciente: (13 + 21 + 17) / 3 = 17.' },
    { id: 'a3q2', type: 'quiz', t: 30, q: 'El burndown del sprint queda plano tres días y baja todo el último día. ¿Qué indica?',
      o: ['Historias grandes o que se cierran al final: el avance no se ve hasta el último momento', 'Que el equipo va adelantado', 'Que el burndown está roto', 'Nada, es lo normal'], a: 0, e: 'Un burndown en escalón muestra trabajo que no se integra a diario. Historias más pequeñas y MR frecuentes lo suavizan.' },
  ] },
  { id: 'a4', codigo: 'ENTR', n: 4, nombre: '¿Dónde va cada entregable?', momento: 'antes de terminar', min: 5, color: '#B78CFF', preguntas: [
    { id: 'a4q1', type: 'classify', t: 60, q: '¿Dónde queda cada entregable del capstone?', bins: ['Repositorio (código y tags)', 'Wiki del módulo', 'GitLab Release'],
      o: ['El tag v1.0.0', 'Las actas y el Seguimiento de cada sprint', 'Las notas de la versión (qué cambió)', 'El código fusionado en main', 'Pipeline-CI y Revision-de-codigo', 'El jar de delivery-system descargable'],
      a: [0, 1, 2, 0, 1, 2], e: 'El código y los tags viven en el repositorio; la documentación del proceso, en la wiki; la versión publicada con sus notas y su jar, en un Release de GitLab.' },
    { id: 'a4q2', type: 'scale', t: 40, q: 'Termómetro final: ¿y ahora qué tan seguro te sientes?', o: TERMO, lo: 'nada', hi: 'podría explicarlo', compare: 'a1q4' },
  ] },
];
export const ACTIVIDAD = Object.fromEntries(ACTIVIDADES.map((a) => [a.id, a]));
export const LETRAS = ['A', 'B', 'C', 'D', 'E'];
export const EQUIPOS = [
  { id: 'A', nombre: 'Equipo A', modulo: 'delivery-module', color: '#FF8A3D' },
  { id: 'B', nombre: 'Equipo B', modulo: 'order-module', color: '#6EA8FF' },
  { id: 'C', nombre: 'Equipo C', modulo: 'catalog-module', color: '#C6F33A' },
  { id: 'D', nombre: 'Equipo D', modulo: 'payment-module', color: '#B78CFF' },
];
export const TIPO = { quiz: 'Quiz', tf: 'Verdadero o falso', classify: 'Clasifica', order: 'Ordena', scale: 'Termómetro' };

/** Puntaje 0..100 de una respuesta (null en el termómetro). */
export function puntaje(q, r) {
  if (q.type === 'scale') return null;
  if (r == null) return 0;
  if (q.type === 'classify') return Math.round((100 * q.a.reduce((s, b, i) => s + (r[i] === b ? 1 : 0), 0)) / q.a.length);
  if (q.type === 'order') return Array.isArray(r) && r.every((v, i) => v === q.a[i]) ? 100 : 0;
  return r === q.a ? 100 : 0;
}
