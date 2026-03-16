"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-50 md:left-auto md:max-w-md"
        >
          <div className="glass-card !p-6 border border-brand-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-brand-500/20 text-brand-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2 underline decoration-brand-500/50">Datenschutzhinweis</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  Wir nutzen ausschließlich technisch notwendige Session-Cookies, um die Umfrage-Funktion zu gewährleisten. Alle Daten werden anonym und DSGVO-konform verarbeitet.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={acceptCookies}
                    className="flex-1 bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold py-2.5 rounded-xl transition-all active:scale-95"
                  >
                    Akzeptieren
                  </button>
                  <button
                    onClick={declineCookies}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white text-sm font-medium py-2.5 rounded-xl transition-all"
                  >
                    Ablehnen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
