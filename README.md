# Julia's Bachelor Umfrage App

Eine moderne, premium Umfrage-Plattform für wissenschaftliche Zwecke.

## Features
- **Premium Design**: Dark Mode, Glassmorphism, flüssige Animationen mit Framer Motion.
- **Multi-Step Form**: Die Umfrage ist in logische Kategorien unterteilt.
- **Quantitative & Qualitative Daten**: Sowohl Textfelder als auch 1-10 Bewertungsskalen.
- **Admin Dashboard**: Ergebnisse einsehen und als CSV exportieren (`/admin`).
- **Anonymität**: Keine Speicherung von IP-Adressen oder persönlichen Identifikatoren (DSGVO-konform).

## Installation & Start

1. **Abhängigkeiten installieren**:
   ```bash
   npm install
   ```

2. **Entwicklungsserver starten**:
   ```bash
   npm run dev
   ```

3. **Umfrage aufrufen**:
   Öffne [http://localhost:3000](http://localhost:3000)

4. **Ergebnisse ansehen**:
   Öffne [http://localhost:3000/admin](http://localhost:3000/admin)

## Deployment Empfehlung

Für die echte Umfrage empfehle ich ein Deployment auf **Vercel** oder **Netlify**. 
Da das aktuelle Backend auf lokalen JSON-Dateien basiert, sollten diese für den produktiven Einsatz durch eine Datenbank (z.B. **Supabase**) ersetzt werden, damit die Daten persistent und sicher gespeichert werden.

### DSGVO Hinweise
- Die Umfrage speichert keine personenbezogenen Daten außer denen, die explizit eingegeben werden.
- Es wird empfohlen, einen kurzen Datenschutzhinweis (Impressum/Datenschutz) zu verlinken, falls die Umfrage öffentlich zugänglich gemacht wird.
