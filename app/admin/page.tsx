'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import { getData } from '@/lib/db';

interface DashboardStats {
  formations: number;
  events: number;
  articles: number;
  visitors: number;
}

interface RecentActivity {
  id: string;
  type: 'formation' | 'event' | 'article';
  title: string;
  action: string;
  date: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    formations: 0,
    events: 0,
    articles: 0,
    visitors: 0,
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    Promise.all([
      getData<{ items: unknown[] }>('formations', { items: [] }),
      getData<{ items: unknown[] }>('calendar', { items: [] }),
      getData<{ items: unknown[] }>('articles', { items: [] }),
    ]).then(([formations, events, articles]) => {
      setStats({
        formations: formations.items?.length || 2,
        events: events.items?.length || 5,
        articles: articles.items?.length || 3,
        visitors: 1250,
      });
    });

    // Activité récente simulée
    setRecentActivity([
      { id: '1', type: 'formation', title: 'Français A1 - Débutant', action: 'Modifiée', date: 'Il y a 2 heures' },
      { id: '2', type: 'event', title: 'Session Bureautique', action: 'Ajoutée', date: 'Il y a 5 heures' },
      { id: '3', type: 'article', title: 'Conseils pour apprendre le français', action: 'Publiée', date: 'Hier' },
    ]);
  }, []);

  const statCards = [
    {
      label: 'Formations',
      value: stats.formations,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'bg-[#25318D]',
      href: '/admin/formations',
    },
    {
      label: 'Événements',
      value: stats.events,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-green-500',
      href: '/admin/calendrier',
    },
    {
      label: 'Actualités',
      value: stats.articles,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      color: 'bg-purple-500',
      href: '/admin/articles',
    },
    {
      label: 'Visiteurs (mois)',
      value: stats.visitors,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'bg-orange-500',
      href: '#',
    },
  ];

  const quickActions = [
    { label: 'Nouvelle formation', href: '/admin/formations?action=new', icon: '📚' },
    { label: 'Nouvel événement', href: '/admin/calendrier?action=new', icon: '📅' },
    { label: 'Nouvelle actualité', href: '/admin/articles?action=new', icon: '📝' },
    { label: 'Voir le site', href: '/', icon: '🌐' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'formation':
        return '📚';
      case 'event':
        return '📅';
      case 'article':
        return '📝';
      default:
        return '📌';
    }
  };

  return (
    <AdminPageWrapper title="Dashboard" subtitle="Bienvenue sur votre espace d'administration">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Actions rapides */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Actions rapides</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="font-medium text-gray-700">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Activité récente */}
        <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Activité récente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
                <span className="text-sm text-gray-400">{activity.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guide de démarrage */}
      <div className="mt-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Guide de démarrage rapide</h2>
        <p className="text-primary-100 mb-4">
          Bienvenue dans votre espace d'administration KIC-FORMATIONS. Voici comment commencer :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="font-bold mb-1">1. Gérez vos formations</div>
            <p className="text-sm text-primary-100">Ajoutez, modifiez ou supprimez vos formations depuis la section Formations.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="font-bold mb-1">2. Planifiez vos sessions</div>
            <p className="text-sm text-primary-100">Créez des événements dans le calendrier pour annoncer vos prochaines sessions.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="font-bold mb-1">3. Publiez des actualités</div>
            <p className="text-sm text-primary-100">Partagez des conseils et actualités avec vos visiteurs via le blog.</p>
          </div>
        </div>
      </div>
    </AdminPageWrapper>
  );
}
