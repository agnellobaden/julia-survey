"use client";

import React from 'react';

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-20 max-w-4xl leading-relaxed">
      <h1 className="text-4xl font-bold mb-8 gradient-text font-outfit">Datenschutzerklärung</h1>
      
      <section className="glass-card space-y-6 text-white/80">
        <h2 className="text-2xl font-semibold text-white">1. Datenschutz auf einen Blick</h2>
        <p>
          Diese Umfrage erfolgt im Rahmen einer studentischen Bachelorarbeit. Die Teilnahme ist vollständig freiwillig und anonym. 
          Es werden keine personenbezogenen Daten (wie IP-Adressen, Namen oder E-Mail-Adressen) erhoben, die einen Rückschluss auf Ihre Person zulassen.
        </p>

        <h2 className="text-2xl font-semibold text-white">2. Datenerfassung in dieser Umfrage</h2>
        <p>
          Die von Ihnen eingegebenen Daten werden ausschließlich zu wissenschaftlichen Zwecken ausgewertet. 
          Wir erfassen:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Ihre Antworten auf die Fragen des Fragebogens.</li>
          <li>Technische Metadaten (Zeitpunkt der Teilnahme, Dauer der Bearbeitung).</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white">3. Cookies</h2>
        <p>
          Diese Webseite verwendet ausschließlich technisch notwendige Session-Cookies, um den Fortschritt der Umfrage zwischenzuspeichern (Auto-Save Funktion). 
          Diese Daten verbleiben lokal in Ihrem Browser und werden nach Absenden der Umfrage gelöscht.
        </p>

        <h2 className="text-2xl font-semibold text-white">4. Speicherung und Sicherheit</h2>
        <p>
          Die Daten werden verschlüsselt an eine Datenbank (Supabase) übertragen und dort sicher gespeichert. 
          Nur die Autorin der Bachelorarbeit hat Zugriff auf die aggregierten Rohdaten.
        </p>

        <h2 className="text-2xl font-semibold text-white">5. Ihre Rechte</h2>
        <p>
          Da die Daten vollständig anonymisiert erhoben werden, ist eine nachträgliche Zuordnung zu Ihrer Person – und damit eine Löschung oder Auskunftserteilung zu individuellen Datensätzen – technisch nicht möglich.
        </p>
      </section>
      
      <div className="mt-12 text-center">
        <a href="/" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">← Zurück zur Umfrage</a>
      </div>
    </main>
  );
}
