
# 🌍 Discover Destinations

**Discover Destinations** ist eine interaktive Web-App, die es Nutzern ermöglicht, spannende Reiseziele zu entdecken, zu bewerten und ihre eigenen Vorschläge hinzuzufügen. Die App bietet eine nahtlose Benutzeroberfläche, um Reiseziele zu filtern, Stimmen abzugeben und mehr über beliebte Orte in Deutschland und Tunesien zu erfahren.

![App Screenshot](./public/logo.png)

---

## 📂 Projektstruktur

Die Projektstruktur ist klar und übersichtlich organisiert, um eine einfache Navigation und Entwicklung zu ermöglichen:

```
DestinaShare/
├── build/                # Produktionsbereit erstellte Dateien
├── node_modules/         # Abhängigkeiten des Projekts
├── public/
│   ├── index.html        # HTML-Template der App
│   ├── logo.png          # App-Logo
├── src/
│   ├── App.js            # Hauptkomponente der App
│   ├── index.js          # Einstiegspunkt für React
│   ├── style.css         # Hauptstylesheet
│   ├── supabase.js       # Konfiguration der Supabase-Integration
├── .gitignore            # Ignorierte Dateien für Git
├── package.json          # Projektabhängigkeiten und Skripte
├── package-lock.json     # Genaue Abhängigkeitsversionen
├── README.md             # Dokumentation des Projekts
```

---

## 🌟 Hauptfunktionen

- **Kategorienfilter:** Entdecke Reiseziele in Kategorien wie `City`, `Beach`, `Adventure`, `Culture`, `Relaxation` und mehr.
- **Bewertungssystem:** Nutzer können Reiseziele als "Empfohlen", "Muss besucht werden" oder "Nicht lohnenswert" bewerten.
- **Eigene Vorschläge hinzufügen:** Nutzer können Reiseziele einreichen, inklusive einer kurzen Beschreibung und Quelle.
- **Datenbankintegration:** Alle Daten werden in einer [Supabase](https://supabase.com/)-Datenbank gespeichert und live geladen.

---

## 🚀 Schnellstart

### Voraussetzungen

- Node.js (mindestens v14)
- npm (Node Package Manager)

### Installation

1. Klone das Repository:
   ```bash
   git clone https://github.com/deinbenutzername/discover-destinations.git
   ```
2. Wechsle ins Projektverzeichnis:
   ```bash
   cd DestinaShare
   ```
3. Installiere die Abhängigkeiten:
   ```bash
   npm DestinaShare
   ```

### Entwicklung starten

Starte die App im Entwicklungsmodus:
```bash
npm start
```

Öffne [http://localhost:3000](http://localhost:3000), um die App in deinem Browser zu sehen.

---

## 🛠 Technologien

- **Frontend:** React, HTML, CSS
- **Backend:** Supabase für Datenbank und API
- **Styling:** Anpassbares CSS


---

## 🤝 Beitrag leisten

1. Forke das Repository.
2. Erstelle einen neuen Branch (`git checkout -b feature/dein-feature`).
3. Führe deine Änderungen durch und committe sie (`git commit -m 'Füge neues Feature hinzu'`).
4. Push deinen Branch (`git push origin feature/dein-feature`).
5. Erstelle eine Pull-Request.

