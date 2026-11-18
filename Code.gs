/**
 * CAFECITO CON CRITERIO — Registro de asistentes
 * Crear una Google Sheet, abrir Extensiones > Apps Script y pegar este código.
 * Publicar como Aplicación web: Ejecutar como Yo; acceso Cualquier persona.
 * Pegar la URL /exec en index.html.
 */
const SHEET_NAME = 'Inscripciones';

function doGet() {
  return ContentService.createTextOutput('Formulario de Cafecito con Criterio activo.');
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const data = JSON.parse(raw);

    if (data._gotcha) return respond_({ ok: true });

    const nombre = clean_(data.nombre);
    const celular = clean_(data.celular);
    const correo = clean_(data.correo);

    if (!nombre || !celular || !correo) {
      return respond_({ ok: false, error: 'Completa nombre, celular y correo.' });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Fecha de registro', 'Nombre', 'Celular', 'Correo electrónico',
        'Evento', 'Fecha del evento', 'Hora', 'Lugar', 'Inversión'
      ]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date(), nombre, celular, correo,
      'Un cafecito con criterio', '03/12/2026',
      '19:00 (Argentina)', 'Club Country Banfield, Banfield, Argentina',
      '10.000 ARS'
    ]);

    return respond_({ ok: true });
  } catch (error) {
    console.error(error);
    return respond_({ ok: false, error: 'No se pudo guardar la inscripción.' });
  }
}

function clean_(value) {
  return String(value || '').trim().slice(0, 1000);
}

function respond_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
