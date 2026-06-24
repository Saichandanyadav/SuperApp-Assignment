// src/components/dashboard/NewsWidget.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
}

export default function NewsWidget() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const isHovered = useRef(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
        const res = await fetch(`https://newsapi.org/v2/top-headlines?category=general&language=en&pageSize=5&apiKey=${apiKey}`);
        const json = await res.json();
        if (json.articles) {
          const validArticles = json.articles.filter((a: Article) => a.urlToImage && a.title);
          setArticles(validArticles.length ? validArticles : placeholderArticles);
        }
      } catch {
        setArticles(placeholderArticles);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  useEffect(() => {
    if (articles.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHovered.current) {
        setActiveIndex((prev) => (prev + 1) % articles.length);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [articles]);

  if (loading) return <div className="bg-zinc-900 rounded-3xl h-full animate-pulse border border-zinc-800" />;
  
  const currentArticle = articles[activeIndex];

  return (
    <div 
      className="bg-zinc-900 rounded-3xl overflow-hidden h-full flex flex-col border border-zinc-800 relative group"
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      {/* Interactive Feature Visual Area */}
      <div className="relative w-full h-[60%] bg-zinc-950 overflow-hidden">
        <Image 
          src={currentArticle?.urlToImage || '/news-fallback.png'} 
          alt="News feed banner" 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        
        <div className="absolute bottom-4 left-6 right-6">
          <h2 className="text-xl font-bold leading-snug tracking-tight text-white drop-shadow-md line-clamp-3">
            {currentArticle?.title}
          </h2>
          <span className="text-[10px] uppercase text-zinc-400 tracking-widest mt-2 block">
            {new Date(currentArticle?.publishedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Description Content Block Layout matching Page 4 */}
      <div className="p-6 flex-grow overflow-y-auto text-sm text-zinc-400 leading-relaxed font-medium">
        <p className="line-clamp-6">{currentArticle?.description || 'No summary overview details provided for this active live-feed instance.'}</p>
      </div>
    </div>
  );
}

const placeholderArticles = [{
  title: "Want to climb Mount Everest?",
  description: "In the history of tracking expeditions, early season teams face unprecedented climate dynamics alongside altered navigation paths across high altitude segments.",
  urlToImage: "/mountain.png",
  publishedAt: new Date().toISOString()
}];