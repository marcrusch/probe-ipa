## Dependencies installieren

```bash
npm install
```

## Datenbank aufsetzen

Die Datenbank aufzusetzen ist ziemlich einfach: Einfach in Fauna eine neue Datenbank erstellen (Name ist egal), unter dem Tab GraphQL => import die schema.gql-Datei importieren, das setzt dann automatisch die Datenstruktur korrekt auf. Danach kann unter Security ein neuer Key mit Adminrechten erstellt werden, welcher im .env.local hinterlegt werden kann.

## API-Key hinterlegen

Damit die Applikation Zugriff auf die Datenbank erhält, muss der Admin-API-Key von Fauna in der .env.local Datei hinterlegt werden. Zugriffsberechtigte Personen sollten in Fauna einen neuen Key anlegen, welcher die benötigten Berechtigungen vergibt. Der Key sollte in .env.local mit dem Namen FAUNA_ADMIN_KEY hinterlegt werden, sodass die Applikation den Schlüssel korrekt einliest.

Im Root-Verzeichnis ist eine .env.local.example-Datei vorhanden, diese kann einfach kopiert und zu .env.local unbenannt werden. Dann kann die Value des FAUNA_ADMIN_KEY geändert werden.

## Dev Build starten

```bash
npm run dev
```

## Aufbau

Alle Komponenten befinden sich unter /src/components/. Alle Files zur API befinden sich unter /pages/api/, welche auf die Fauna-Funktionen unter /lib/fauna.js zugreifen.
Das GraphQL-Schema ist unter /schema.gql zu finden.

Die globale CSS-Datei ist styles/globals.css.

Diverse Configs sind unter /src/config zu finden.
