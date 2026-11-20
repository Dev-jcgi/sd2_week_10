// Temas de la Semana 10 de Desarrollo de Software 2: demo, versionado, gestión y entregables del capstone.
export const TEMAS = [
  { id: 't1', n: 1, titulo: 'Demostración del producto: mostrar valor que funciona', corto: 'Demo', color: '#FF8A3D', min: 20 },
  { id: 't2', n: 2, titulo: 'Versionado de software: SemVer, tags y releases', corto: 'Versiones', color: '#C6F33A', min: 20 },
  { id: 't3', n: 3, titulo: 'Gestión de proyectos de software: lo que aprendimos con el capstone', corto: 'Gestión', color: '#6EA8FF', min: 20 },
  { id: 't4', n: 4, titulo: 'Entregables del proyecto: qué se entrega y dónde', corto: 'Entregables', color: '#B78CFF', min: 18 },
];
export const TEMA = Object.fromEntries(TEMAS.map((t) => [t.id, t]));
