'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useUserStore } from '@/store/useUserStore';
import Image from 'next/image';

const AVAILABLE_CATEGORIES = [
  { id: 'action', name: 'Action', color: 'bg-[#FF5209]', bgImage: '/images/action.png' },
  { id: 'drama', name: 'Drama', color: 'bg-[#D7A4FF]', bgImage: '/images/drama.png' },
  { id: 'romance', name: 'Romance', color: 'bg-[#148A08]', bgImage: '/images/romance.png' },
  { id: 'thriller', name: 'Thriller', color: 'bg-[#84C2FF]', bgImage: '/images/thriller.png' },
  { id: 'western', name: 'Western', color: 'bg-[#A13E10]', bgImage: '/images/western.png' },
  { id: 'horror', name: 'Horror', color: 'bg-[#7358FF]', bgImage: '/images/horror.png' },
  { id: 'fantasy', name: 'Fantasy', color: 'bg-[#FF4ADE]', bgImage: '/images/fantasy.png' },
  { id: 'music', name: 'Music', color: 'bg-[#E61E32]', bgImage: '/images/music.png' },
  { id: 'fiction', name: 'Fiction', color: 'bg-[#6CD061]', bgImage: '/images/fiction.png' },
];

export default function CategoryPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { selectedCategories, toggleCategory } = useCategoryStore();
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push('/');
    }
  }, [mounted, user, router]);

  const handleNextPage = () => {
    if (selectedCategories.length < 3) {
      setError('Minimum 3 category required');
      return;
    }
    setError(null);
    router.push('/dashboard');
  };

  if (!mounted || !user) return <div className="bg-black h-screen w-screen" />;

  return (
    <div className="min-h-screen md:h-screen w-screen bg-black text-white font-sans p-6 md:p-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 max-w-7xl mx-auto overflow-y-auto md:overflow-hidden select-none">
      <div className="w-full md:w-2/5 flex flex-col justify-between h-auto md:h-full md:max-h-[640px] py-2 gap-6 md:gap-0">
        <div>
          <h1 className="text-[48px] sm:text-[56px] lg:text-[71px] font-single-day leading-[120%] text-[#72DB73] font-normal mb-2 md:mb-4 tracking-wide">
            Super app
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-bold tracking-tight leading-[115%] max-w-md text-white">
            Choose your entertainment category
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-x-2 gap-y-2 max-h-[120px] md:max-h-[160px] overflow-y-auto pr-1">
            {selectedCategories.map((catId) => {
              const cat = AVAILABLE_CATEGORIES.find((c) => c.id === catId);
              return (
                <div 
                  key={catId} 
                  className="bg-[#148A08] text-white text-sm sm:text-base lg:text-lg font-normal px-4 md:px-5 py-1.5 md:py-2 rounded-full flex items-center gap-3 border border-transparent shadow-sm"
                >
                  <span>{cat?.name}</span>
                  <button 
                    onClick={() => toggleCategory(catId)} 
                    className="text-[#969696] hover:text-white text-xs font-bold transition-colors"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>

          <div className="h-6">
            {error && (
              <div className="flex items-center gap-2 text-[#FF0000] text-sm md:text-base font-normal tracking-wide">
                <span>⚠️</span> {error}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/5 flex flex-col justify-between h-auto md:h-full md:max-h-[640px] py-2 gap-6 md:gap-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 w-full grow">
          {AVAILABLE_CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <div
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`relative rounded-2xl p-4 h-[140px] sm:h-[160px] md:h-auto flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-200 ${category.color} ${
                  isSelected ? 'border-[4px] md:border-[5px] border-[#11B700]' : 'border-[4px] md:border-[5px] border-transparent'
                }`}
              >
                <h3 className="text-lg sm:text-xl lg:text-[24px] font-semibold tracking-wide text-white relative z-10 leading-none">
                  {category.name}
                </h3>
                
                <div className="absolute bottom-4 left-4 right-4 top-12 z-0 overflow-hidden rounded-xl shadow-sm">
                  <Image 
                    src={category.bgImage} 
                    alt={category.name}
                    fill
                    className="object-cover object-center scale-105"
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 20vw"
                    priority
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleNextPage}
          className="bg-[#148A08] hover:bg-[#1b9e0b] text-white font-medium tracking-wide px-8 md:px-10 py-2 md:py-2.5 rounded-full text-base md:text-lg lg:text-xl transition-colors shadow-md self-end mt-4 shrink-0 w-full sm:w-auto"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}