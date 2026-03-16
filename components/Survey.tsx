"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, questions } from '@/lib/questions';
import { ChevronRight, ChevronLeft, Send, CheckCircle2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Survey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentCategory = categories[step];
  const currentQuestions = questions.filter(q => q.category === currentCategory);

  const handleInputChange = (id: string, value: any) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const nextStep = () => {
    if (step < categories.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Ein Fehler ist beim Absenden aufgetreten. Bitte versuche es erneut.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Netzwerkfehler. Bitte überprüfe deine Verbindung.');
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-2xl mx-auto text-center py-16"
      >
        <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Vielen Dank!</h2>
        <p className="text-white/70 text-lg mb-8"> Deine Teilnahme hilft mir sehr bei meiner Bachelorarbeit. Alle Daten wurden anonym gespeichert.</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Zurück zum Start
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-20">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between text-xs text-white/40 mb-2 uppercase tracking-widest font-medium">
          <span>Schritt {step + 1} von {categories.length}</span>
          <span>{Math.round(((step + 1) / categories.length) * 100)}% abgeschlossen</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / categories.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-brand-500 to-purple-500"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="glass-card"
        >
          <h2 className="text-2xl font-bold mb-8 gradient-text">{currentCategory}</h2>
          
          <div className="space-y-10">
            {currentQuestions.map((q) => (
              <div key={q.id} className="space-y-4">
                <label className="block text-lg font-medium text-white/90">
                  {q.label}
                </label>
                
                {q.type === 'number' && (
                  <input
                    type="number"
                    value={answers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className="input-field w-full max-w-xs"
                  />
                )}

                {q.type === 'select' && (
                  <select
                    value={answers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    className="input-field w-full max-w-md appearance-none"
                  >
                    <option value="" disabled>Bitte wählen...</option>
                    {q.options?.map(opt => (
                      <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                    ))}
                  </select>
                )}

                {q.type === 'textarea' && (
                  <textarea
                    rows={4}
                    value={answers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    placeholder="Deine Antwort..."
                    className="input-field w-full resize-none"
                  />
                )}

                {q.type === 'rating' && (
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleInputChange(q.id, num)}
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all border",
                          answers[q.id] === num 
                            ? "bg-brand-500 border-brand-400 text-white shadow-lg shadow-brand-500/40 scale-110" 
                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                        )}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-between gap-4">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-0"
            >
              <ChevronLeft className="w-5 h-5" />
              Zurück
            </button>
            
            {step < categories.length - 1 ? (
              <button
                onClick={nextStep}
                className="btn-primary flex items-center gap-2"
              >
                Weiter
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-primary bg-green-600 hover:bg-green-500 flex items-center gap-2"
              >
                Umfrage absenden
                <Send className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
