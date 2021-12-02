## Dependencies installieren

```bash
npm install
```

## API-Key hinterlegen

Damit die Applikation Zugriff auf die Datenbank erhält, muss der Admin-API-Key von Fauna in der .env.local Datei hinterlegt werden. Zugriffsberechtigte Personen sollten in Fauna einen neuen Key anlegen, welcher die benötigten Berechtigungen vergibt. Der Key sollte in .env.local mit dem Namen FAUNA_ADMIN_KEY hinterlegt werden, sodass die Applikation den Schlüssel korrekt einliest.

## Dev Build starten

```bash
npm run dev
```

## Aufbau

Alle Komponenten befinden sich unter /src/components/. Alle Files zur API befinden sich unter /pages/api/, welche auf die Fauna-Funktionen unter /lib/fauna.js zugreifen.
Das GraphQL-Schema ist unter /schema.gql zu finden.

Die globale CSS-Datei ist styles/globals.css.

Diverse Configs sind unter /src/config zu finden.
