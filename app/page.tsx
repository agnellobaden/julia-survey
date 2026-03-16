import Survey from "@/components/Survey";

export default function Home() {
  return (
    <main className="container mx-auto px-4 pt-20">
      <header className="max-w-3xl mx-auto text-center mb-20 space-y-6">
        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-4">
          Wissenschaftliche Studie
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Bindungs- und <span className="gradient-text">Beziehungserleben</span>
        </h1>
        <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
          Im Rahmen meiner Bachelorarbeit untersuche ich, welche Auswirkungen eine elterliche Trennung auf das Bindungs- und Beziehungserleben im Erwachsenenalter haben kann.
        </p>
        <div className="flex flex-wrap justify-center gap-6 pt-4">
          <div className="flex items-center gap-2 text-white/40">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Freiwillig & Anonym
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Wissenschaftliche Zwecke
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            DSGVO Konform
          </div>
        </div>
      </header>

      <Survey />
      
      <footer className="max-w-3xl mx-auto text-center py-20 border-t border-white/5 mt-20">
        <p className="text-white/30 text-sm">
          Erstellt für die Bachelorarbeit von Julia. <br />
          Alle Daten werden streng vertraulich und anonym behandelt.
        </p>
      </footer>
    </main>
  );
}
