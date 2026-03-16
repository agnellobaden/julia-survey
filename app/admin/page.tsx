"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { questions } from '@/lib/questions';
import { Download, Lock, LogIn } from 'lucide-react';

export default function AdminPage() {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/survey')
        .then(res => res.json())
        .then(data => {
          setResponses(data);
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Falsches Passwort.');
    }
  };

  const exportCSV = () => {
    if (responses.length === 0) return;
    
    const headers = ['ID', 'Zeitpunkt', ...questions.map(q => q.label)];
    const csvRows = [
      headers.join(','),
      ...responses.map(r => {
        return [
          r.id,
          r.submittedAt,
          ...questions.map(q => {
            const val = r[q.id] || '';
            return `"${val.toString().replace(/"/g, '""')}"`;
          })
        ].join(',');
      })
    ];
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `umfrage_ergebnisse_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <main className="container mx-auto px-4 h-[80vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card w-full max-w-md text-center"
        >
          <div className="w-16 h-16 bg-brand-500/10 text-brand-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
          <p className="text-white/50 mb-8 text-sm">Bitte gib das Passwort ein, um die Ergebnisse zu sehen.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort"
              className="input-field w-full text-center tracking-widest"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs font-medium">{error}</p>}
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" />
              Einloggen
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-white/50">Übersicht aller eingegangenen Umfrage-Ergebnisse</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={exportCSV}
            className="btn-primary bg-white/10 hover:bg-white/20 text-white flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            CSV Export
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-500"></div>
        </div>
      ) : responses.length === 0 ? (
        <div className="glass-card text-center py-20">
          <p className="text-xl text-white/40">Noch keine Ergebnisse vorhanden.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <p className="text-white/40 text-sm mb-1 uppercase tracking-wider">Gesamtantworten</p>
              <p className="text-4xl font-bold">{responses.length}</p>
            </div>
          </div>

          <div className="glass overflow-hidden rounded-2xl border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-6 py-4 text-sm font-semibold text-white/70">ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white/70">Datum</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white/70">Alter</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white/70">Geschlecht</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white/70">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white/70">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {responses.map((r) => (
                    <tr key={r.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-brand-400">#{r.id.slice(-4)}</td>
                      <td className="px-6 py-4 text-sm text-white/60">
                        {new Date(r.submittedAt).toLocaleDateString('de-DE')}
                      </td>
                      <td className="px-6 py-4 text-sm">{r.q1 || '-'}</td>
                      <td className="px-6 py-4 text-sm">{r.q2 || '-'}</td>
                      <td className="px-6 py-4 text-sm">{r.q3 || '-'}</td>
                      <td className="px-6 py-4">
                        <button className="text-xs font-semibold bg-brand-500/10 text-brand-400 px-3 py-1 rounded-full border border-brand-500/20">
                          Einsehen
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
