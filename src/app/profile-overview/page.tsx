'use client';

import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { useCategoryStore } from '@/store/useCategoryStore';
import WeatherWidget from '@/components/dashboard/WeatherWidget';
import NewsWidget from '@/components/dashboard/NewsWidget';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfileOverviewPage() {
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
    <main className="min-h-screen bg-black text-white p-4 md:p-8 lg:p-10 flex flex-col justify-between select-none box-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 w-full max-w-[1400px] mx-auto flex-1 h-full items-stretch">
        <div className="lg:col-span-8 flex flex-col gap-4 md:gap-6 h-full min-h-[50vh] lg:min-h-0">
          <div className="bg-[#5746FA] rounded-3xl p-5 md:p-8 flex flex-col sm:flex-row gap-5 md:gap-6 items-center flex-1 justify-center lg:justify-start">
            <div className="w-24 h-36 md:w-28 md:h-40 rounded-2xl overflow-hidden flex-shrink-0 relative">
              <Image
                src="/images/avatar.png"
                alt="User Profile Avatar"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, 112px"
                priority
              />
            </div>
            <div className="flex flex-col justify-between overflow-hidden space-y-2 text-center sm:text-left w-full sm:w-auto">
              <h3 className="text-lg md:text-xl font-light tracking-wide">{user.name}</h3>
              <p className="text-base md:text-lg font-light opacity-90 truncate">{user.email}</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-wider pt-1">{user.username}</h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-3 max-h-[80px] md:max-h-[100px] overflow-y-auto">
                {selectedCategories.map((cat) => (
                  <span key={cat} className="bg-[#9F94FF] text-white text-xs md:text-sm px-4 md:px-5 py-1 md:py-1.5 rounded-full font-medium uppercase tracking-wider">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <WeatherWidget />
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col h-full min-h-[50vh] lg:min-h-0">
          <NewsWidget />
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto flex justify-end mt-4 md:mt-6 flex-shrink-0">
        <button 
          onClick={() => router.push('/dashboard')}
          className="w-full sm:w-auto text-center bg-[#148A08] hover:bg-[#1b9e0b] transition-colors text-white font-medium tracking-wide px-10 py-3 rounded-full text-base md:text-lg shadow-md"
        >
          Next Page
        </button>
      </div>
    </main>
  );
}