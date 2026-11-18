# Cafecito con Criterio — Vercel + Apps Script + Google Sheets

## Estructura del proyecto
- `index.html`: landing y formulario emergente (modal).
- `gracias/index.html`: página de pago e instrucciones tras la inscripción.
- `assets/luz-ayda-foto-original.jpg`: foto extraída del afiche original.
- `Code.gs`: endpoint de Apps Script que guarda los registros.

La página principal tiene un único formulario emergente. Los botones «Reserva tu lugar», «Quiero reservar mi lugar» y «Quiero inscribirme» abren el mismo popup. Se eliminó el bloque de consulta por WhatsApp de la landing: los visitantes deberán completar el formulario. La página de gracias conserva el botón para enviar el comprobante después de la transferencia.

## A. Configurar la hoja de Google Sheets
1. Creá una hoja de cálculo nueva en Google Sheets.
2. Copiá el ID de la hoja: es el texto entre `/d/` y `/edit` en la URL. Ejemplo: `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`.
3. En la hoja, abrí **Extensiones → Apps Script**. También se puede usar un proyecto independiente desde script.google.com porque el código utiliza `openById`.
4. En `Código.gs` pegá todo el contenido del archivo `Code.gs` de este ZIP.
5. En la primera línea de configuración, reemplazá `PEGA_AQUI_EL_ID_DE_TU_HOJA_DE_CALCULO` por el ID real de tu hoja. No pegues la URL completa; solo el ID.
6. Guardá.

## B. Implementar Apps Script como aplicación web
1. Clic en **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Ejecutar como: **Yo**.
4. Quién tiene acceso: **Cualquier persona**.
5. Clic en **Implementar** y autorizá los permisos.
6. Copiá la URL de aplicación web, que debe comenzar con `https://script.google.com/macros/s/` y terminar en `/exec`.

Si ya había una implementación, hacé **Implementar → Administrar implementaciones → Editar → Nueva versión → Implementar** después de cambiar el código. En general la URL `/exec` de esa implementación permanece igual.

## C. Conectar el HTML con Apps Script
La URL de tu implementación ya está pegada en el archivo `index.html` de la raíz del proyecto:

`https://script.google.com/macros/s/AKfycbzQYHmVDh3vl2VvTLKMVz3lwYIjWydvR_ibj-oZVd3d2K5-60kZOPc-3JtU-TCW5_j8/exec`

No hace falta volver a pegarla si mantenés esta versión del `index.html`. Si volvés a reemplazar el archivo por una versión anterior, buscá `const GOOGLE_APPS_SCRIPT_URL =` y comprobá que aparezca la URL anterior.

La carpeta `gracias/` no interfiere con esta conexión. Vercel debe publicar el `index.html` de la raíz y servir `gracias/index.html` en la ruta `/gracias/`.

## D. Comprobar la conexión
- Abrir la URL `/exec` en el navegador muestra un texto «Endpoint ... activo». Esto solo prueba `doGet`; no demuestra que `doPost` esté guardando.
- Hacé una inscripción de prueba en la landing.
- Verificá en Google Sheets que aparezca la nueva fila en la pestaña `Inscripciones`.
- Confirmá que después de enviar el formulario se abre `/gracias/`.

## Si aparece «Falta conectar el formulario»
La URL no se pegó en el `index.html` que Vercel está publicando, se dejó el texto de ejemplo o se editó el HTML equivocado. No lo provoca la carpeta `gracias`.

## Si aparece la página de gracias pero no aparece la fila en Sheets
1. Verificá que `SPREADSHEET_ID` en Apps Script tenga el ID real de la hoja.
2. Verificá que la hoja pertenece a la cuenta que autorizó la aplicación o que esa cuenta tiene permiso de edición.
3. Confirmá que la implementación ejecuta como **Yo** y permite acceso a **Cualquier persona**.
4. Después de editar `Code.gs`, publicá una nueva versión de la implementación.
5. Revisá **Apps Script → Ejecuciones** para ver si hubo errores en `doPost`.

## Nota técnica
El navegador envía el POST a Apps Script usando `mode: 'no-cors'` y `text/plain` para evitar preflight CORS. El navegador no puede leer el cuerpo de respuesta. Por ello la página redirige tras completar el intento de envío y el control de recepción se hace comprobando la fila en Sheets. Antes de difundir la campaña, completá una prueba real y verificá la fila.

## Datos del evento
- Jueves 3 de diciembre de 2026, 19:00 (Argentina).
- Club Country Banfield, Banfield.
- Inversión: $10.000 ARS, incluye merienda.
- Alias Mercado Pago: `Luz.ayda`.
- WhatsApp para comprobantes: configurado en `gracias/index.html`.
