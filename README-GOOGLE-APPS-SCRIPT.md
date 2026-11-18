# Cafecito con Criterio — Vercel + Google Apps Script + página de pago

## Flujo de inscripción
1. La persona completa únicamente Nombre, Celular y Correo electrónico.
2. La landing envía los datos a Google Apps Script.
3. Después del envío, se redirige a `/gracias/`.
4. En `/gracias/` se muestran el importe de $10.000 ARS, el alias de Mercado Pago `Luz.ayda` y el botón para enviar el comprobante por WhatsApp al +54 9 11 4447-492.
5. El acceso al grupo privado de WhatsApp se entrega solo después de verificar el pago.

## Archivos
- `index.html`: landing principal.
- `gracias/index.html`: página de instrucciones de pago.
- `Code.gs`: backend que guarda las inscripciones en Google Sheets.
- `assets/luz-ayda-foto-original.jpg`: fotografía de Luz Ayda extraída del afiche suministrado, sin retoques.

## Configurar Google Apps Script
1. Crea una hoja de cálculo en Google Sheets.
2. Abre **Extensiones → Apps Script**.
3. Pega el contenido de `Code.gs` y guarda.
4. Ve a **Implementar → Nueva implementación → Aplicación web**.
5. Configura **Ejecutar como: Yo** y **Quién tiene acceso: Cualquier persona**.
6. Implementa, autoriza los permisos y copia la URL que termina en `/exec`.

## Conectar la landing
En `index.html`, busca:
`const GOOGLE_APPS_SCRIPT_URL = 'PEGA_AQUI_TU_URL_DE_APPS_SCRIPT';`
Reemplaza el texto por la URL real `/exec`, guarda y sube todo el contenido del ZIP al repositorio de GitHub (incluidas las carpetas `assets` y `gracias`). Vercel servirá automáticamente la página en `/gracias/`.

## Prueba obligatoria antes de difundir
1. Envía una inscripción de prueba desde la landing publicada.
2. Comprueba que el registro aparece en la pestaña `Inscripciones` de Google Sheets.
3. Comprueba que la persona llega a `/gracias/`.
4. Pulsa **Copiar alias** y confirma que copia `Luz.ayda`.
5. Pulsa el botón de WhatsApp y revisa que abre el chat correcto con el mensaje preparado.

La landing usa `fetch` con `mode: 'no-cors'` y `text/plain` para evitar el preflight CORS al enviar a Apps Script. El navegador no puede leer la respuesta en ese modo; por eso la llegada del registro debe verificarse directamente en Sheets durante la prueba inicial.

## Datos que aparecen en la página de pago
- Importe: $10.000 ARS (incluye merienda).
- Alias de Mercado Pago: `Luz.ayda`.
- WhatsApp para comprobantes: `+54 9 11 4447-492` (enlace internacional `549114447492`).
- Evento: jueves 3 de diciembre de 2026, 19:00 h, Club Country Banfield, Banfield.

## Privacidad
El endpoint de Apps Script queda accesible públicamente para recibir inscripciones. Mantén la hoja privada y compártela solo con quienes deban administrar los registros. Incluye una política de privacidad adecuada antes de publicar.
