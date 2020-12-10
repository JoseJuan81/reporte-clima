# reporte-clima

## Tabla de contenido


  - [Tecnologías usadas](#tecnologías-usadas)
  - [Instalación de dependencias](#instalación-de-dependencias)
  - [Compilar proyecto en ambiente de desarrollo](#compilar-proyecto-en-ambiente-de-desarrollo)
  - [Compilar proyecto en ambiente producción](#compilar-proyecto-en-ambiente-producción)
  - [Argumentos](#argumentos)
  - [Conclusiones](#conclusiones)
  - [Recomendaciones y/o Mejoras](#recomendaciones)

## Tecnologías usadas
**Vue-cli**: Programa para levantar una estructura básica del tipo SPA para un proyecto basado en Vue.js
> Usado porque permite crear y configurar un proyecto con varias librería instaladas como **vur-router**, **vuex**, y **eslint**. y otras inclusive configuradas como **webpack**

**Vue.js**: Librería para manipulación del DOM con javascript.
> Usada por tener un sistema de reactividad eficiente a través de la generación de un **Virtual DOM**. Brinda funciones, que al saber usar, permiten optimizar el código (`computed`). Tiene la particularidad de permitir crear archivos `.vue` en el que se trabaja: `html`, `css` y `js`, todo en uno. Adicionalmente permite el `lazy loading` de archivos al cliente gracias a la integración y configuración con **Webpack**

**Vue-router**: Librería para administrar las diferentes rutas y páginas de la aplicación
> Usada por ser la recomendada por Vuejs. Es un poco compleja al principio pero luego se vuelve poderosa por las capacidades que brinda.

**Axios**: Librería usada para realizar peticiones HTTP desde el cliente.
> Usado por lo sencillo que es usarlo. Permite configurarse de forma fácil y brinda funciones muy prácticas como los `interceptores` que permiten modificar los `requests` o `responses` al momento de ejecución.

**d3**: Librería de manipulación del DOM para generar gráficos.
> Usado porque es muy completa y vesátil. No tiene configuración por defecto así que las gráficas se personalizan a medida. Adicionalmente tiene funciones para transformación de data y un sistema poderoso de animaciones y transiciones.

**Tailwind**: Librería para los estilos del proyecto.
> Usada porque permite configurarse fácil y versátilmente. En `production` genera un archivo compilado sólo con los estilos usados en el proyecto. Permite disminuir considerablemente la duplicidad de los estilos y reduce la asignación de nombres a los estilos.

**Date-fns**: Librería para manipular fechas.
> Usada por su versatidad y sencillez. Tiene muchas funciones para realizar diferentes cálculos con fechas y tiempo (e.j.: sumar o restar días, semanas, meses, años. Primer día de la semana o mes, etc), formateo de fechas a diferentes sistemas internacionles.

**Es-lint**: Librería para estandarizar, reglamentar y corregir el código. Permite ajustarse a una determinada configuración de cómo debe ser el código, qué cosas son permitidas y que no.
> Usado porque permite detectar incosistencias del código en fase de desarrollo al momento de guardar los cambios realizados. También es usado debido a que viene por defecto en **vue-cli**

**Functionallibrary**: Librería `js` para prorgramación funcional.
> Usada ya que permite hacer un código más explícito y adicionalmente porque las funciones de la librería te dan la garantía de que funcionan correctamente ya que han sido sometidas a prueba.

## Instalación de dependencias
Abrir terminal y dentro de la carpeta del proyecto ejecutar:
```
npm install
```

### Compilar proyecto en ambiente de desarrollo
Crear un archivo `.env` con las variables de entorno:
- VUE_APP_WEATHER_API=https://api.weatherbit.io/v2.0/history/
- VUE_APP_WEATHER_API_KEY=tu_api_key
Una vez que se instalaron las dependencias ejecutar en la terminal
```
npm run dev
```
esto levantará un servidor local cuyo puerto por defecto será `8080`
(`http://localhost:8080`)

### Compilar proyecto en ambiente producción
```
npm run build
```
## Referencias externas usadas
- [weatherbit](https://api.weatherbit.io/v2.0/history/): Api para clima. 
## Argumentos
- Se consideró un archivo `.env` para "guardar" información sensible (API KEY) y otra como `variable de entorno`. Es conveniente tener esta `variable de entorno` aquí ya que nos brinda la flexibilidad de poder cambiarla al momento de "desplegar a producción" la aplicación. Se trata de la `url base` de la API del clima. De esta manera se puede desplegar la aplicación múltiples veces con direntes APIS del clima.
- El consumo de la API fue considerada en el hook `mounted` de `vue.js` con la intención de mostrar de primero la información estática. Esto permite una mejor experiencia de usuario ya que el renderizado de esta información es muy rápido. Otro motivo importante es que la gráfica se inyecta dentro de un tag del tipo `div` (`ref="weather-chart"`) que debe existir en el DOM y Virtual DOM, y esto ocurre a partir de este hook (no así con el `created`).
- Se consideró el uso de dos funciones independientes para traer la información del día de `hoy` y el `hoy hace un año`. De esta manera se puede modificar una sin correr el riesgo de alterar la otra (cada una trata su propia información). Para evitar prolongar el tiempo de solicitud de información, ambas funciones son llamadas al mismo tiempo en un `Promise.all`.
- Se consideró una función para generar la `url` con los `queries` seleccionados por el usuario.
- Se consideró una función que captura el nombre de la nueva ciudad seleccionada por el usuario, busca dicha ciudad dentro del arreglo de ciudades, actualiza la `ciudad seleccionada` y por último llama a la función que consume la API para obtener la información correspondiente.
- Se consideró un componente exclusivo para la gráfica (`<WeatherChart>`). Esto con la intención de hacer un código más fácil de leer e interpretar y también para mantener asuntos diferentes separados. El archivo principal se encarga de obtener y manipular la información mientras que este componente solo se encarga de mostrar la información que se le pasa.
- Se consideró el uso de la librería `d3` para la generación de gráficas ya que es muy flexible al momento de manipulación. Permite cambiar la apariencia del la gráfica y decidir cuáles variables mostrar así como también animaciones y transiciones. Es posible cambiar el tipo de gráfica y, si el proyecto se maneja con esto en mente, es posible crear una pequeña estructura que permita intercambiar en tipos de gráficas fácilmente o combinarlas. Para este proyecto combiné la gráfica de `línea` con los `puntos`. El costo de usarla es más tiempo de implementación.
## Conclusiones
- La aplicación muestra las temperaturas por hora del día de `hoy` y de `hoy hace un año` de manera tal de poder comprarlas.
- Por defecto se muestra la ciudad de `Budapest`
- Se indica la fecha del día de `hoy` y `hoy hace un año`
- Cada gráfica tiene un color diferente por lo que es fácil indentificarlas.
- El gráfico cambia de acuerdo a la ciudad seleccionada.
- Se indica la unidad de medida de la temperatura, en este caso grados Celsius (C).
- La aplicación se adapta a pantallas móviles aunque es necesario mejorar la gráfica para que se aprecie mejor la información (es necesario recargar la pantalla para esto).
## Recomendaciones
- Considerar un `Loading` mientras se carga la información de la API.
- Considerar las ciudades de todo el mundo para hacer a la aplicación universal
- Considerar una API para las ciudades del mundo filtradas por continente
- Considerar un selector de continente en la interfase para que el usuario primero seleccione el continente y luego la ciudad. De esta manera las ciudades mostradas solo serán las del continente seleccionado. Todo esto por APIS.
- Las APIS de continente y ciudades deben retornar la información ordenada alfabéticamente.
- El selector de ciudades y continente debería ser del tipo autocompletar para facilitar la búsqueda.
- Considerar un selector o radio-botón para que el usuario seleccione la unidad de la temperatura de su preferencia.
- Se puede solicitar permisos al cliente para obtener su localización y de esa manera mostrar por defecto la ciudad del cliente.
- Si el enfoque de la app es el clima, entonces debe considerarse otros parámetros como: lluviosidad y humedad relativa
- Sería muy interesante contar con un TOP de ciudades más calurosas, más frias, con más lluvias y humedad. Se pudiera mostrar un gráfico de barras con las 10 (o más) ciudades más y menos calurosas del mundo (de igual forma con la lluvia y humedad).
- Considerar que la aplicación se adate correctamente a pantallas de dispositivos móviles.
