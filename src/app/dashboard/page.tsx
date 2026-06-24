'use client';

import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { useCategoryStore } from '@/store/useCategoryStore';
import WeatherWidget from '@/components/dashboard/WeatherWidget';
import NotesWidget from '@/components/dashboard/NotesWidget';
import TimerWidget from '@/components/dashboard/TimerWidget';
import NewsWidget from '@/components/dashboard/NewsWidget';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DashboardPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const selectedCategories = useCategoryStore((state) => state.selectedCategories);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push('/');
    }
  }, [mounted, user, router]);

  if (!mounted || !user) return <div className="bg-black h-screen w-screen" />;

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10 flex flex-col justify-between">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-[1400px] mx-auto">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-1">
            <div 
              onClick={() => router.push('/profile-overview')}
              className="bg-indigo-600 rounded-3xl p-6 flex gap-4 items-center h-[200px] cursor-pointer hover:opacity-95 transition-opacity"
            >
              <div className="w-20 h-28 rounded-2xl overflow-hidden flex-shrink-0 relative">
                <Image
                  src="/images/avatar.png"
                  alt="User Profile Avatar"
                  fill
                  className="object-cover"
                  sizes="80px"
                  priority
                />
              </div>
              <div className="flex flex-col justify-between overflow-hidden">
                <h3 className="text-xl font-medium">{user.name}</h3>
                <p className="text-sm opacity-90 truncate">{user.email}</p>
                <h2 className="text-2xl font-bold tracking-wide mt-1">{user.username}</h2>
                <div className="flex flex-wrap gap-1 mt-2 max-h-[60px] overflow-y-auto">
                  {selectedCategories.map((cat) => (
                    <span key={cat} className="bg-purple-900/60 border border-purple-400 text-xs px-3 py-1 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <WeatherWidget />
          </div>

          <div className="md:col-span-2 lg:col-span-1 h-full">
            <NotesWidget />
          </div>

          <div className="md:col-span-2">
            <TimerWidget />
          </div>
        </div>

        <div className="lg:col-span-4 h-full min-h-[500px]">
          <NewsWidget />
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto flex justify-end mt-6">
        <button 
          onClick={() => router.push('/movies')}
          className="bg-green-500 hover:bg-green-400 transition-colors text-black font-semibold tracking-wide px-8 py-2 rounded-full"
        >
          Browse
        </button>
      </div>
    </main>
  );
}