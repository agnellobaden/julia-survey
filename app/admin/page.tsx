"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { questions, categories } from '@/lib/questions';
import { Download, Lock, LogIn, Users, Eye, BarChart3, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

export default function AdminPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [responses, setResponses] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([
        fetch('/api/survey').then(res => res.json()),
        fetch('/api/analytics').then(res => res.json())
      ]).then(([surveyData, analyticsData]) => {
        setResponses(surveyData);
        setAnalytics(analyticsData);
        setLoading(false);
      }).catch(err => {
        console.error('Fetch error:', err);
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

  // Analytics Calculations
  const totalViews = analytics.filter(a => a.event_type === 'view').length;
  const totalSubmissions = responses.length;
  const conversionRate = totalViews > 0 ? Math.round((totalSubmissions / totalViews) * 100) : 0;
  
  const avgTime = responses.length > 0 
    ? Math.round(responses.reduce((acc, r) => acc + (r.metadata?.timeSpent || 0), 0) / responses.length)
    : 0;

  // Drop-off Calculation
  const dropOffData = categories.map((cat, index) => {
    const reached = analytics.filter(a => a.event_type === 'step_reached' && a.step_reached >= index).length + totalSubmissions;
    return {
      name: cat.split(' ').slice(0, 2).join(' ') + '...', // Shorten name
      count: reached
    };
  });

  const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'];

  const exportCSV = () => {
    if (responses.length === 0) return;
    const headers = ['ID', 'Zeitpunkt', 'Dauer (Sek)', ...questions.map(q => q.label)];
    const csvRows = [
      headers.join(','),
      ...responses.map(r => [
        r.id,
        r.submittedAt,
        r.metadata?.timeSpent || '',
        ...questions.map(q => `"${(r[q.id] || '').toString().replace(/"/g, '""')}"`)
      ].join(','))
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `umfrage_ergebnisse_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <main className="container mx-auto px-4 h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card w-full max-w-md text-center">
          <div className="w-16 h-16 bg-brand-500/10 text-brand-400 rounded-2xl flex items-center justify-center mx-auto mb-6"><Lock className="w-8 h-8" /></div>
          <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passwort" className="input-field w-full text-center tracking-widest" autoFocus />
            {error && <p className="text-red-400 text-xs font-medium">{error}</p>}
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2"><LogIn className="w-4 h-4" /> Einloggen</button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Bachelor Analytics</h1>
          <p className="text-white/50">Detaillierte Analyse des Nutzerverhaltens für Julia's Studie</p>
        </div>
        <button onClick={exportCSV} className="btn-primary bg-white/10 hover:bg-white/20 text-white flex items-center gap-2">
          <Download className="w-4 h-4" /> CSV Export
        </button>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-500"></div></div>
      ) : (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MetricCard icon={<Eye className="text-blue-400" />} label="Seitenaufrufe" value={totalViews} />
            <MetricCard icon={<CheckCircle className="text-green-400" />} label="Abgeschlossen" value={totalSubmissions} />
            <MetricCard icon={<Clock className="text-orange-400" />} label="Ø Dauer" value={`${Math.floor(avgTime / 60)}m ${avgTime % 60}s`} />
            <MetricCard icon={<BarChart3 className="text-purple-400" />} label="Conversion" value={`${conversionRate}%`} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Step Drop-off Chart */}
            <div className="glass-card">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Users className="w-5 h-5 text-brand-400" /> Trichter (Drop-off)</h3>
              <div className="h-[300px] w-full">
                {isClient ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dropOffData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={11} />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full animate-pulse bg-white/5 rounded-xl" />
                )}
              </div>
              <p className="text-white/40 text-xs mt-4 italic text-center">Zeigt an, wie viele Nutzer jeden Schritt der Umfrage erreicht haben.</p>
            </div>

            {/* Participation Growth (Dummy data placeholder for real logic) */}
            <div className="glass-card">
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-brand-400" /> Teilnahme über Zeit</h3>
               <div className="h-[300px] w-full flex items-center justify-center text-white/20 border border-dashed border-white/10 rounded-xl">
                 <div className="text-center">
                   <p>Diagramm erscheint nach mehr Teilnahmen</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Table of Responses */}
          <div className="glass-card overflow-hidden !p-0 border border-white/10">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-bold">Rohdaten der Antworten</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-6 py-4 text-sm font-semibold text-white/70">Dauer</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white/70">Datum</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white/70">Alter</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white/70">Geschlecht</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white/70">Fortschritt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {responses.map((r) => (
                    <tr key={r.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm text-brand-400 font-mono">{r.metadata?.timeSpent}s</td>
                      <td className="px-6 py-4 text-sm text-white/60">{new Date(r.submittedAt).toLocaleString('de-DE')}</td>
                      <td className="px-6 py-4 text-sm">{r.q1 || '-'}</td>
                      <td className="px-6 py-4 text-sm">{r.q2 || '-'}</td>
                      <td className="px-6 py-4 text-sm text-right">
                         <span className="text-xs bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full">100%</span>
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

function MetricCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="glass-card p-6 flex items-center gap-4">
      <div className="p-3 bg-white/5 rounded-xl">{icon}</div>
      <div>
        <p className="text-white/40 text-xs uppercase tracking-wider font-semibold">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
