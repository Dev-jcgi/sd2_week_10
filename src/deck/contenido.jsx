import { T, Portada, Code, Cards, Card, YCapstone, QR } from './piezas.jsx';
import { Receso, Agenda } from './extras.jsx';
import { DemoFlujo, DemoTiempo, SemverAnatomia, TagLinea, Triangulo, BarrasSprint, MatrizRiesgo, Entregables } from './diagramas10.jsx';
import { ACTIVIDADES } from '../data/actividades.js';
import Pregunta from '../components/Pregunta.jsx';
import Marcador from '../components/Marcador.jsx';
import { useSesion, respondieron } from '../lib/sesion.js';
import Podio from '../components/Podio.jsx';

/* Presentación de la Semana 10 · Desarrollo de Software 2.
   Cada columna (→) es un tema o una actividad; sus diapositivas (↓) profundizan.
   Caso real: el capstone Delivery System (tags v0.1.0–v0.4.0, sprints, wiki por módulo y la demo del 30/11). */

const WIKI = 'https://gitlab.com/jala-university1/cohort-7/ES.CO.CSSD-125.GA.T2.26.M2/SE/capstone/-/wikis';
const Lista = ({ items, frag }) => <ul className="d-list">{items.map((x, i) => <li key={i} className={frag ? 'fragment' : ''}>{x}</li>)}</ul>;
const Tabla = ({ head, rows, small }) => (
  <table className={`d-tabla ${small ? 'sm' : ''}`}><thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table>
);
const Dos = ({ children, r = '1fr 1fr' }) => <div className="d-dos" style={{ gridTemplateColumns: r }}>{children}</div>;
const Analogia = ({ titulo, children }) => <div className="d-analogia"><span className="mono">Analogía</span><h3>{titulo}</h3>{children}</div>;
const Cita = ({ children, fuente }) => <blockquote className="d-cita"><p>{children}</p><cite className="mono">{fuente}</cite></blockquote>;
const M = ({ children }) => <span className="mono">{children}</span>;

/** Código de respaldo: abre la actividad en un celular que no logra conectarse a la sesión. */
const Codigo = ({ c, color, texto }) => <div className="d-codigo" style={{ '--c': color }}><span className="mono">{texto}</span><b>{c}</b></div>;

/** QR de la sesión: con la sesión creada (#/profesor) lleva su id; sin sesión, a #/vivo. */
function SesionQR({ size }) {
  const s = useSesion();
  return <QR ruta={s.id ? `#/vivo?s=${s.id}` : '#/vivo'} size={size} />;
}
/** Estado en vivo de la sesión (solo con la sesión creada). */
function EnVivo({ act }) {
  const s = useSesion();
  if (!s.id) return null;
  if (!s.abierta) return <p className="d-vivo mono off"><i /> Sesión cerrada</p>;
  const n = Object.keys(s.alumnos).length;
  return <p className="d-vivo mono"><i /> {act ? `${respondieron(s.alumnos, act)} de ${n} ya respondieron` : `${s.conectados} celulares conectados · ${n} en la sesión`}</p>;
}
/** Podio: el de la sesión (por nombre y equipo) o, sin sesión, el marcador manual de equipos. */
function PodioFinal() {
  const s = useSesion();
  return s.id ? <Podio alumnos={s.alumnos} /> : <Marcador />;
}

/* ── Actividades: portada con su código + una diapositiva por pregunta (modo pantalla, el profesor revela) ── */
function actividad(a) {
  return {
    id: a.id, titulo: `Actividad ${a.n}`, kind: 'act', act: a.id,
    slides: [
      <div className="d-act" style={{ '--c': a.color }} key="i">
        <p className="d-eti"><span className="pill">ACTIVIDAD {a.n} DE 4</span> {a.momento} · {a.min} min</p>
        <h1>{a.nombre}</h1>
        <Dos r="1.3fr 1fr">
          <div className="d-act-modos">
            <div><span className="mono">En tu celular</span><p>La actividad ya apareció en tu página de la sesión. Respondes y ves al momento si acertaste.</p></div>
            <div><span className="mono">En la pantalla</span><p>Cada equipo discute y responde en voz alta. El equipo que acierta suma puntos en el marcador.</p></div>
            <div className="d-act-items">{a.preguntas.map((q, i) => <div key={q.id}><span className="mono">{i + 1}</span><p>{q.q}</p></div>)}</div>
          </div>
          <div className="d-act-qr"><SesionQR size={190} /><p className="mono">¿Recién llegas? Escanea y entra</p><EnVivo act={a.id} /><Codigo c={a.codigo} color={a.color} texto="Si no conecta: código" /></div>
        </Dos>
      </div>,
      ...a.preguntas.map((q) => (
        <div className="d-pant" key={q.id}>
          <Pregunta q={q} modo="pantalla" />
          <Marcador compact />
        </div>
      )),
    ],
  };
}
const ACT = Object.fromEntries(ACTIVIDADES.map((a) => [a.id, actividad(a)]));

export const COLS = [
  /* ───────────── INICIO ───────────── */
  { id: 'inicio', titulo: 'Inicio', slides: [
    <div className="d-hero" key="p">
      <p className="d-eti">Desarrollo de Software 2 · Sección E · Semana 10</p>
      <h1>De la demo a la <em>versión 1.0</em></h1>
      <p className="d-preg">Cómo se demuestra un producto, cómo se le pone número a cada versión, qué nos enseñó la gestión del capstone y qué se entrega al final.</p>
      <div className="d-hero-tags mono"><span>Demo</span><span>SemVer</span><span>Tags</span><span>Gestión</span><span>Entregables</span></div>
      <p className="d-nav mono">→ avanzar · ↓ profundizar · P marcador · ESC vista general</p>
    </div>,
    <>
      <T eti="Agenda">Dos horas para cerrar el proyecto</T>
      <Agenda />
      <p className="d-sub">Receso de 10 minutos a la mitad. Las actividades suman puntos por equipo: A, B, C y D.</p>
    </>,
    <>
      <T eti="Entra a la sesión">Un solo código QR para toda la clase</T>
      <Dos r="1fr 1fr">
        <div className="d-act-qr"><SesionQR size={300} /><p className="mono">un solo código para toda la clase</p><EnVivo /></div>
        <Cards cols={1}>
          <Card t="1 · Escanea y entra" c="#FF8A3D">Escribe tu nombre y elige tu equipo. No hay que instalar nada.</Card>
          <Card t="2 · No cierres la página" c="#6EA8FF">Cuando lleguemos a una actividad, aparece sola en tu celular.</Card>
          <Card t="3 · Al final, tu resumen" c="#C6F33A">Cuando el profesor cierra la sesión, ves tus puntos por actividad.</Card>
        </Cards>
      </Dos>
    </>,
    <>
      <T eti="El hilo de hoy">El capstone, de v0.1.0 a v1.0.0</T>
      <TagLinea />
      <p className="d-sub fragment">Cuatro sprints, cuatro equipos y un producto que se demuestra el <b>30/11</b> como su primera versión estable.</p>
    </>,
  ] },

  ACT.a1,

  /* ───────────── TEMA 1 · DEMOSTRACIÓN DEL PRODUCTO ───────────── */
  { id: 't1', tema: 't1', titulo: 'Demo', slides: [
    <Portada key="p" tema="t1" pregunta="Si el Product Owner solo pudiera ver 15 minutos de su trabajo, ¿qué le mostrarían?" />,
    <>
      <T tema="t1" eti="Definición">¿Qué es una demo del producto?</T>
      <Dos r="1.2fr 1fr">
        <div className="d-def">
          <Cita fuente="The Scrum Guide (2020) · Sprint Review">El propósito de la Sprint Review es inspeccionar el resultado del sprint y determinar adaptaciones futuras. El equipo presenta los resultados de su trabajo a los interesados clave.</Cita>
          <p>La <b>demo final</b> es la Sprint Review del proyecto: se muestra el <b>software funcionando</b>, no diapositivas del código.</p>
        </div>
        <Cards cols={1}>
          <Card t="Para el PO" c="#FF8A3D">¿Hace lo que pedían los requerimientos (FUN e INT)?</Card>
          <Card t="Para el equipo" c="#6EA8FF" frag>Demostrar que entiende y puede defender lo que construyó.</Card>
        </Cards>
      </Dos>
    </>,
    <>
      <T tema="t1" eti="Analogía">La prueba de manejo</T>
      <Dos>
        <Analogia titulo="Nadie compra un auto por su folleto">
          <p>En una concesionaria no te leen la ficha técnica: te dan las llaves y das una vuelta. Lo que convence es manejarlo.</p>
          <p className="fragment">La demo es esa vuelta: el PO ve el flujo real, con datos reales, de principio a fin.</p>
        </Analogia>
        <Cards cols={1}>
          <Card t="El folleto = las diapositivas" c="#9298AA" frag>Sirven para el contexto: un minuto, no más.</Card>
          <Card t="La vuelta = el flujo en vivo" c="#C6F33A" frag>Es lo que se evalúa.</Card>
        </Cards>
      </Dos>
    </>,
    <>
      <T tema="t1" eti="Diagrama">El flujo de punta a punta del Delivery System</T>
      <DemoFlujo />
      <p className="d-sub">Cada paso cruza un contrato de <M>core</M>. Si un contrato no está, la demo usa su <i>fallback</i>: se dice en voz alta, no se esconde.</p>
    </>,
    <>
      <T tema="t1" eti="Diagrama">El guion de una demo de 15 minutos</T>
      <DemoTiempo />
    </>,
    <>
      <T tema="t1" eti="Preparación">Lo que se prepara antes</T>
      <Cards cols={3}>
        <Card t="El build de la demo" c="#C6F33A">El jar de <M>delivery-system</M> del tag de la demo, no la rama de alguien.</Card>
        <Card t="Datos de prueba" c="#6EA8FF" frag>Usuarios de prueba por rol (CUSTOMER, MERCHANT, COURIER, ADMIN), productos con stock y un método de pago.</Card>
        <Card t="Perfil" c="#FF8A3D" frag><M>-Pmemory</M> para no depender de la red; <M>-Pjpa</M> solo si ya se probó con MySQL.</Card>
        <Card t="Ensayo cronometrado" c="#B78CFF" frag>Al menos una vez de punta a punta, con el tiempo medido.</Card>
        <Card t="Plan B" c="#FF6B8B" frag>La grabación del ensayo y un segundo juego de datos por si uno falla.</Card>
        <Card t="Roles" c="#FFD166" frag>Quién conduce, quién muestra cada módulo y quién responde qué. Todos hablan.</Card>
      </Cards>
    </>,
    <>
      <T tema="t1" eti="Errores frecuentes">Lo que arruina una demo</T>
      <Tabla head={['Error', 'Qué hacer en cambio']} rows={[
        ['Mostrar el IDE y leer código', 'Mostrar la app; el código se abre solo si lo preguntan'],
        ['Datos que se crean en vivo durante 5 minutos', 'Datos preparados con un script o los datos de prueba al arrancar'],
        ['«Esto funcionaba ayer»', 'Probar el build de la demo el mismo día'],
        ['Una persona hace toda la demo', 'Cada integrante muestra su parte y responde por ella'],
        ['Esconder lo que falta', 'Decir qué falta y qué se usó en su lugar (fallback)'],
      ]} />
    </>,
    <YCapstone key="y" tema="t1" items={[
      ['…el contrato de otro equipo no llega a main antes del 30/11?', 'La demo corre con el fallback de core y se explica qué falta y por qué.'],
      ['…la demo falla en vivo?', 'Decirlo, pasar al plan B (grabación o datos alternos) y seguir con el guion.'],
      ['…el PO pregunta por una decisión de diseño?', 'Responde quien la tomó: el patrón, el contrato o la regla, con su porqué.'],
    ]} tarea="guion de la demo en la wiki del módulo, datos de prueba listos, un ensayo cronometrado y la grabación del ensayo como plan B." />,
  ] },

  /* ───────────── TEMA 2 · VERSIONADO DE SOFTWARE ───────────── */
  { id: 't2', tema: 't2', titulo: 'Versiones', slides: [
    <Portada key="p" tema="t2" pregunta="El PO dice «en la demo no funcionaba». ¿Qué versión estaba corriendo?" />,
    <>
      <T tema="t2" eti="El problema">Sin número de versión, nadie sabe qué está corriendo</T>
      <Cards cols={3}>
        <Card t="¿Qué se probó?" c="#FF6B8B">«La de la rama de Juan del martes» no se puede reproducir.</Card>
        <Card t="¿Qué cambió?" c="#FFD166" frag>Entre dos entregas sin número, nadie sabe qué se agregó o qué se rompió.</Card>
        <Card t="¿Se puede actualizar?" c="#6EA8FF" frag>Un módulo que depende de otro necesita saber si la versión nueva es compatible.</Card>
      </Cards>
    </>,
    <>
      <T tema="t2" eti="Definición">Semantic Versioning (SemVer 2.0.0)</T>
      <SemverAnatomia />
      <p className="d-sub fragment"><b>0.y.z</b> es desarrollo inicial: todo puede cambiar. <b>1.0.0</b> define la primera versión pública y estable: desde ahí, romper un contrato sube el MAJOR.</p>
    </>,
    <>
      <T tema="t2" eti="Reglas">Cómo sube cada número</T>
      <Tabla head={['Cambio', 'Ejemplo en el capstone', 'De 1.4.2 pasa a']} rows={[
        ['Se corrige un error sin cambiar contratos', 'La barra de la lista de usuarios se cortaba (#102)', '1.4.3'],
        ['Se agrega algo compatible', 'CatalogService.findAvailableProducts() con default (#115)', '1.5.0'],
        ['Se rompe un contrato', 'Cambiar la firma de UserService.isActiveWithRole', '2.0.0'],
        ['Versión candidata antes de publicar', 'Lo que se ensaya antes de la demo', '2.0.0-rc.1'],
      ]} />
      <p className="d-sub fragment">Al subir un número, los de la derecha vuelven a 0: 1.4.2 → 1.5.0, nunca 1.5.2.</p>
    </>,
    <>
      <T tema="t2" eti="Diagrama">Los tags del capstone</T>
      <TagLinea />
      <p className="d-sub fragment">Un tag por cierre de sprint, en el último commit de <M>main</M> antes de las 23:59 (UTC-4). Lo crea el practitioner; <b>v1.0.0</b> marca la demo.</p>
    </>,
    <>
      <T tema="t2" eti="Código · Git">Tags anotados</T>
      <Dos r="1.3fr 1fr">
        <Code small lang="bash" titulo="terminal">{`
# Crear un tag anotado (con autor, fecha y mensaje) en un commit
git tag -a v0.4.0 8a84c0b -m "Sprint 3 (9 - 15 Nov 2026): last main commit"

# Publicarlo (los tags no se suben con un push normal)
git push origin v0.4.0

# Ver los tags y en qué versión estás
git tag -n1
git describe --tags        # p. ej. v0.4.0-12-g<commit>

# Construir exactamente lo que se demostró
git switch --detach v1.0.0`}</Code>
        <Lista frag items={[
          <><b>Anotado</b> (<M>-a</M>): guarda quién, cuándo y por qué. Es el que se usa para versiones.</>,
          <><M>git describe</M>: «12 commits después de v0.4.0».</>,
          <>Un tag publicado <b>no se mueve</b>: si está mal, se crea la versión siguiente.</>,
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t2" eti="Maven">La versión dentro del pom.xml</T>
      <Dos>
        <Code small lang="xml" titulo="pom.xml de cada módulo">{`
<artifactId>user-module</artifactId>
<!-- en desarrollo: todavía cambia -->
<version>0.0.1-SNAPSHOT</version>

<!-- al publicar la versión de la demo -->
<version>1.0.0</version>`}</Code>
        <div className="d-def">
          <p><b>SNAPSHOT</b> significa «en desarrollo»: Maven la puede reemplazar en cada build.</p>
          <p className="fragment">Una versión <b>sin SNAPSHOT</b> es fija: el mismo número siempre es el mismo jar.</p>
          <p className="fragment">En el capstone todos los módulos siguen en <M>0.0.1-SNAPSHOT</M>; la versión del producto la marcan los <b>tags</b> de Git.</p>
        </div>
      </Dos>
    </>,
    <>
      <T tema="t2" eti="Releases">Tag + notas + archivos = un Release</T>
      <Dos r="1.1fr 1fr">
        <Code small lang="bash" titulo="CHANGELOG.md (formato Keep a Changelog)">{`
## [1.0.0] - 2026-11-30
### Added
- Pipeline por módulo con linter, cobertura y artefactos (#124)
- CatalogService.findAvailableProducts (#115, #116)
### Fixed
- Asignación exclusiva de pedidos (#112)

## [0.4.0] - 2026-11-15
### Added
- Persistencia JPA en order-module (#119)`}</Code>
        <Cards cols={1}>
          <Card t="GitLab Release" c="#C6F33A">Deploy → Releases: se crea desde un tag, con las notas y el jar como archivo descargable.</Card>
          <Card t="Notas para personas" c="#6EA8FF" frag>Qué cambió, agrupado (Added, Changed, Fixed), con el número de cada historia.</Card>
        </Cards>
      </Dos>
    </>,
    <YCapstone key="y" tema="t2" items={[
      ['…tu equipo agrega un método nuevo a un contrato de core?', 'Con implementación por defecto, como #115: es MINOR y nadie se rompe.'],
      ['…se descubre un error en la demo después de crear v1.0.0?', 'Se corrige en una historia y se publica v1.0.1. El tag v1.0.0 no se toca.'],
      ['…quieres probar exactamente lo que se mostró el 30/11?', 'git switch --detach v1.0.0 y construir desde ahí.'],
    ]} tarea="revisen qué historias de su módulo entraron en cada tag (v0.2.0 a v0.4.0): lo usarán en las notas de la versión de la demo." />,
  ] },

  { ...ACT.a2, slides: [...ACT.a2.slides, <Receso key="r" />] },

  /* ───────────── TEMA 3 · GESTIÓN DE PROYECTOS ───────────── */
  { id: 't3', tema: 't3', titulo: 'Gestión', slides: [
    <Portada key="p" tema="t3" pregunta="¿Qué dicen los datos del capstone sobre cómo trabajamos?" />,
    <>
      <T tema="t3" eti="Definición">¿Qué es gestionar un proyecto de software?</T>
      <Dos r="1.2fr 1fr">
        <div className="d-def">
          <Cita fuente="PMI · PMBOK Guide, 7.ª ed. (2021)">Un proyecto es un esfuerzo temporal que se lleva a cabo para crear un producto, servicio o resultado único.</Cita>
          <p><b>Gestionarlo</b> es decidir qué se hace, en qué orden, con qué riesgos y cómo se sabe si va bien. En ágil, esas decisiones se revisan cada sprint.</p>
        </div>
        <Cards cols={1}>
          <Card t="Predictivo" c="#9298AA">Todo el plan al inicio; los cambios cuestan caro.</Card>
          <Card t="Ágil (Scrum)" c="#6EA8FF" frag>Plan por sprint; se adapta con lo que se aprende en cada Review y Retro.</Card>
        </Cards>
      </Dos>
    </>,
    <>
      <T tema="t3" eti="Diagrama">La triple restricción</T>
      <Triangulo />
    </>,
    <>
      <T tema="t3" eti="Cómo nos organizamos">Scrum con LeSS en el capstone</T>
      <Tabla head={['Pieza', 'En el capstone']} rows={[
        ['Un producto, varios equipos', 'Delivery System con 4 equipos (Entregas, Pedidos, Catálogo, Pagos) y user-module del PO'],
        ['Product Owner', 'El practitioner: acepta historias y decide el alcance'],
        ['Scrum Master', 'Uno por equipo, rotativo cada sprint'],
        ['Coordinación entre equipos', 'Contratos en core-module y la reunión de Scrum Masters'],
        ['Cadencia', 'Sprint 1 de 2 semanas; Sprints 2 a 4 de 1 semana; una semana de integración'],
      ]} />
    </>,
    <>
      <T tema="t3" eti="Métricas">MR fusionados en main por sprint</T>
      <Dos r="1.1fr 1fr">
        <BarrasSprint />
        <div className="d-def">
          <p>Contado con <M>git rev-list --merges</M> entre los tags.</p>
          <p className="fragment"><b>Sprint 2</b> concentró el trabajo: se cerraron los contratos y muchas historias que venían del Sprint 1.</p>
          <p className="fragment"><b>Velocidad</b> = lo que el equipo cierra, no lo que promete. Se planifica con el promedio reciente.</p>
        </div>
      </Dos>
    </>,
    <>
      <T tema="t3" eti="Diagrama">Riesgos reales del capstone</T>
      <Dos r="1.25fr 1fr">
        <MatrizRiesgo />
        <Lista frag items={[
          <><b>Evitar</b>: contratos con <i>fallback</i> en core, para que nadie quede bloqueado.</>,
          <><b>Reducir</b>: <M>git pull --rebase</M> seguido y MR pequeños.</>,
          <><b>Repartir</b>: cada integrante responde por una página de la wiki.</>,
          <><b>Vigilar</b>: el pipeline y el DoD antes de cerrar una historia.</>,
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t3" eti="Lecciones">Lo que nos enseñó el capstone</T>
      <Cards cols={2}>
        <Card t="Lo que funcionó" c="#C6F33A">Contratos en core con fallback, el pipeline en cada MR, TDD con commits separados, la revisión de código entre compañeros.</Card>
        <Card t="Lo que costó" c="#FF6B8B" frag>Historias cerradas sin MR fusionado, hitos desordenados, actas sin grabación, objetivos SMART sin publicar, la reunión de SM.</Card>
        <Card t="Lo que cambia el resultado" c="#6EA8FF" frag>Historias pequeñas, integrar todos los días y que cada uno documente lo suyo el mismo día.</Card>
        <Card t="La regla de oro" c="#FFD166" frag>Si no está en GitLab o en la wiki, para el proyecto no pasó.</Card>
      </Cards>
    </>,
    <>
      <T tema="t3" eti="Cierre del proyecto">La retrospectiva final</T>
      <Tabla head={['Pregunta', 'Para qué']} rows={[
        ['¿Qué empezaríamos a hacer?', 'Prácticas que faltaron (por ejemplo, el objetivo SMART desde el día 1)'],
        ['¿Qué dejaríamos de hacer?', 'Lo que costó tiempo sin aportar (cerrar sin MR, documentar al final)'],
        ['¿Qué seguiríamos haciendo?', 'Lo que funcionó y se lleva al próximo proyecto'],
        ['¿Qué métrica lo demuestra?', 'MR, historias cerradas, cobertura, carry over'],
      ]} />
    </>,
    <YCapstone key="y" tema="t3" items={[
      ['…en el Sprint 4 no alcanza el tiempo para todo?', 'Se ajusta el alcance con el PO: qué historias quedan fuera, nunca la DoD.'],
      ['…un riesgo se convierte en problema (un contrato no llega)?', 'Se activa el plan: fallback, aviso en la reunión de SM y una historia para cerrarlo.'],
      ['…el equipo quiere medir su avance?', 'Burndown del hito, MR fusionados y carry over, no horas trabajadas.'],
    ]} tarea="retrospectiva final del proyecto en la wiki del módulo, con al menos una métrica por respuesta." />,
  ] },

  ACT.a3,

  /* ───────────── TEMA 4 · ENTREGABLES ───────────── */
  { id: 't4', tema: 't4', titulo: 'Entregables', slides: [
    <Portada key="p" tema="t4" pregunta="Si alguien hereda su módulo mañana, ¿qué necesita encontrar?" />,
    <>
      <T tema="t4" eti="Diagrama">Qué se entrega y dónde</T>
      <Entregables />
    </>,
    <>
      <T tema="t4" eti="DoD del proyecto">El proyecto está terminado cuando…</T>
      <Lista frag items={[
        <>Los <b>requerimientos FUN e INT</b> del módulo tienen historia cerrada con su MR fusionado, o se explica por qué quedaron fuera.</>,
        <>El <b>pipeline de main está en verde</b>: linter con 0 infracciones, pruebas y cobertura ≥ 80 % en dominio y aplicación.</>,
        <><M>delivery-system</M> <b>arranca</b> con todos los módulos y el flujo de punta a punta funciona.</>,
        <>La <b>wiki del módulo</b> está completa: 4P’s, casos de uso, plan de acción, actas y Seguimiento de cada sprint, Patrones, Pruebas-unitarias, Pipeline-CI y Revision-de-codigo.</>,
        <>Existe el <b>tag v1.0.0</b> y su <b>Release</b> con las notas de la versión.</>,
      ]} />
    </>,
    <>
      <T tema="t4" eti="Fechas">El cierre, paso a paso</T>
      <Tabla head={['Fecha', 'Qué', 'Quién']} rows={[
        ['Dom 22/11, 23:59', 'Cierre del Sprint 4 y entrega del Lab 8', 'Equipos'],
        ['Lun 23/11', 'El linter bloquea el pipeline; tag v0.5.0', 'Practitioner'],
        ['23 al 29/11', 'Integración y pruebas: solo se fusiona lo necesario para integrar', 'Equipos y SM'],
        ['Lun 30/11', 'Demo y tag v1.0.0', 'Equipos y practitioner'],
        ['Semana 10', 'Cierre de notas: las actividades evaluadas en clase ajustan la nota de cada equipo', 'Practitioner'],
      ]} />
    </>,
    <>
      <T tema="t4" eti="Calidad de la entrega">Lo que se revisa al final</T>
      <Cards cols={3}>
        <Card t="Evidencia" c="#C6F33A">Cada afirmación tiene un enlace: historia, MR, acta o grabación.</Card>
        <Card t="Coherencia" c="#6EA8FF" frag>Lo que dice la wiki coincide con lo que hay en main y con lo que se muestra en la demo.</Card>
        <Card t="Autoría" c="#B78CFF" frag>Cada integrante puede explicar su código y sus decisiones.</Card>
      </Cards>
      <p className="d-sub fragment">Lo que no se entregó a tiempo queda registrado como no entregado, igual que en los laboratorios.</p>
    </>,
    <YCapstone key="y" tema="t4" items={[
      ['…a su wiki le falta el Seguimiento de un sprint?', 'Completarlo antes del 30/11 con lo que dicen GitLab y las actas; queda registrado como tarde.'],
      ['…una historia queda abierta al 29/11?', 'Se pasa al backlog con el motivo y se dice en la demo. No se cierra sin MR.'],
      ['…el pipeline de main está en rojo el 30/11?', 'No hay v1.0.0 hasta que esté en verde: arreglarlo es la prioridad de todos.'],
    ]} tarea="revisen la DoD del proyecto contra su módulo y conviertan cada faltante en una historia del Sprint 4 o de la semana de integración." />,
  ] },

  ACT.a4,

  /* ───────────── CIERRE ───────────── */
  { id: 'cierre', titulo: 'Cierre', slides: [
    <>
      <T eti="Cierre">Cuatro ideas para llevarse</T>
      <div className="d-ocho cinco">
        {[
          ['01', 'La demo muestra software funcionando, con un guion y un plan B.', '#FF8A3D'],
          ['02', 'MAJOR.MINOR.PATCH: el número dice si la versión es compatible.', '#C6F33A'],
          ['03', 'En Scrum el tiempo es fijo y el alcance se ajusta; la calidad no se negocia.', '#6EA8FF'],
          ['04', 'Si no está en GitLab o en la wiki, para el proyecto no pasó.', '#B78CFF'],
        ].map(([n, t, c]) => <div key={n} className="fragment" style={{ borderColor: c }}><span className="mono" style={{ color: c }}>{n}</span><p>{t}</p></div>)}
      </div>
    </>,
    <>
      <T eti="Referencias">Para seguir leyendo</T>
      <Dos>
        <Lista items={[
          <>Wiki del capstone: <a href={`${WIKI}/home`} target="_blank" rel="noreferrer">portada y feedback por equipo</a>.</>,
          <>Tags del capstone: <M>v0.1.0</M> a <M>v0.4.0</M>; <M>v1.0.0</M> en la demo.</>,
          <>Demo: <b>lunes 30/11</b>.</>,
        ]} />
        <ul className="d-refs">
          <li>Schwaber, K. y Sutherland, J. (2020). The Scrum Guide.</li>
          <li>Preston-Werner, T. Semantic Versioning 2.0.0. semver.org</li>
          <li>Keep a Changelog 1.1.0. keepachangelog.com</li>
          <li>Larman, C. y Vodde, B. (2016). Large-Scale Scrum (LeSS).</li>
          <li>PMI (2021). PMBOK Guide, 7.ª edición.</li>
          <li>GitLab Docs · Tags and Releases.</li>
        </ul>
      </Dos>
    </>,
    <div className="d-final" key="f">
      <p className="d-eti">Fin de la clase</p>
      <h1>¡Gracias! Este es el <em>podio</em></h1>
      <PodioFinal />
    </div>,
  ] },
];

export const TEMA_COL = Object.fromEntries(COLS.map((c, i) => [c.tema, i]).filter(([k]) => k));
export const ACT_COL = Object.fromEntries(COLS.map((c, i) => [c.act, i]).filter(([k]) => k));
