# Milo 🐶
App per Android per la cura di Milo (passeggiate, scadenze, pappe, carta d'identità).
I dati sono condivisi tra i telefoni tramite un Foglio Google.

## 1. Foglio Google (una volta sola)
1. Crea un Foglio Google nuovo → Estensioni → Apps Script.
2. Incolla `apps-script/Code.gs` e salva.
3. Distribuisci → Nuova distribuzione → App web → esegui come "Me", accesso "Chiunque".
4. Copia l'URL che finisce con `/exec`.

## 2. APK
1. Carica questa cartella su un repository GitHub (ramo `main`).
2. Vai nella scheda **Actions** → "Build APK" (parte da sola ad ogni push, oppure "Run workflow").
3. A fine lavoro (circa 5 minuti) apri l'esecuzione e scarica l'artefatto **milo-apk**: dentro c'è `app-debug.apk`.
4. Invia l'APK ai telefoni e installalo (consenti "installa da origini sconosciute").

## 3. Primo avvio
Su ogni telefono incolla lo stesso URL `/exec` quando l'app lo chiede (si cambia dall'ingranaggio ⚙️).

## Modificare l'app
Tutto il codice è in `www/index.html`. Ogni modifica caricata su `main` genera un nuovo APK.
