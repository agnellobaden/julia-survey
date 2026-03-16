"use client";

import React from 'react';

export default function ImpressumPage() {
  return (
    <main className="container mx-auto px-4 py-20 max-w-4xl leading-relaxed">
      <h1 className="text-4xl font-bold mb-8 gradient-text font-outfit">Impressum</h1>
      
      <section className="glass-card space-y-6 text-white/80">
        <h2 className="text-2xl font-semibold text-white">Angaben gemäß § 5 TMG</h2>
        <p>
          Julia [Nachname]<br />
          [Straße Hausnummer]<br />
          [PLZ Ort]
        </p>

        <h2 className="text-2xl font-semibold text-white">Kontakt</h2>
        <p>
          E-Mail: [Deine E-Mail Adresse]<br />
          Telefon: [Optional]
        </p>

        <h2 className="text-2xl font-semibold text-white">Verantwortlich für den Inhalt</h2>
        <p>
          Julia [Nachname]<br />
          Im Rahmen der Bachelorarbeit an der [Name der Hochschule/Universität].
        </p>

        <h2 className="text-2xl font-semibold text-white">Haftungsausschluss</h2>
        <p>
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. 
          Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
        </p>
      </section>

      <div className="mt-12 text-center">
        <a href="/" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">← Zurück zur Umfrage</a>
      </div>
    </main>
  );
}
