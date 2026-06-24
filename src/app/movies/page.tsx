'use client';

import { useEffect, useState } from 'react';
import { useCategoryStore } from '@/store/useCategoryStore';
import Image from 'next/image';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Genre?: string;
  Plot?: string;
  Actors?: string;
  imdbRating?: string;
}

export default function EntertainmentDiscoveryPage() {
  const selectedCategories = useCategoryStore((state) => state.selectedCategories);
  const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Movie[]>>({});
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllGenres() {
      const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
      const results: Record<string, Movie[]> = {};
      
      const targets = selectedCategories.length 
        ? selectedCategories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase())
        : ['Action', 'Thriller', 'Horror'];

      for (const genre of targets) {
        try {
          const searchWord = genre.toLowerCase() === 'music' ? 'concert' : genre;
          const res = await fetch(`https://www.omdbapi.com/?s=${searchWord}&type=movie&apikey=${apiKey}`);
          const json = await res.json();
          if (json.Search) {
            results[genre] = json.Search.slice(0, 4);
          }
        } catch (e) {
          console.error(e);
        }
      }
      setMoviesByGenre(results);
      setLoading(false);
    }

    fetchAllGenres();
  }, [selectedCategories]);

  const loadMovieDetails = async (id: string) => {
    const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
    try {
      const res = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=${apiKey}`);
      const detailed = await res.json();
      setSelectedMovie(detailed);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMovie(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) return <div className="bg-black text-green-400 min-h-screen flex items-center justify-center font-mono">SYNCHRONIZING ENTERTAINMENT REPOSITORIES...</div>;

  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif text-green-400 font-bold">Super app</h1>
        <div className="w-10 h-10 rounded-full border border-green-400 overflow-hidden relative bg-zinc-800">
          <Image
            src="/images/avatar.png"
            alt="User Profile Avatar"
            fill
            className="object-cover"
            sizes="40px"
            priority
          />
        </div>
      </header>

      <div className="max-w-6xl mx-auto space-y-10">
        <h2 className="text-zinc-400 text-lg tracking-wide font-medium">Entertainment according to your choices</h2>
        
        {Object.entries(moviesByGenre).map(([genre, list]) => (
          <section key={genre} className="space-y-4">
            <h3 className="text-zinc-400 font-semibold uppercase tracking-widest text-sm">{genre}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {list.map((movie) => (
                <div 
                  key={movie.imdbID}
                  onClick={() => loadMovieDetails(movie.imdbID)}
                  className="bg-zinc-900 rounded-xl overflow-hidden cursor-pointer group border border-zinc-800 hover:border-green-400 transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] bg-zinc-950 flex flex-col items-center justify-center p-4 text-center">
                    {movie.Poster !== 'N/A' ? (
                      <Image 
                        src={movie.Poster} 
                        alt={movie.Title} 
                        fill 
                        className="object-cover group-hover:scale-102 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center p-4">
                        <span className="text-xs font-bold text-zinc-400 tracking-wide line-clamp-3 uppercase font-mono">
                          {movie.Title}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-sm truncate">{movie.Title}</h4>
                    <p className="text-xs text-zinc-500 mt-1">{movie.Year}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {selectedMovie && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedMovie(null)}
        >
          <div 
            className="bg-zinc-900 border border-zinc-800 text-white rounded-3xl w-full max-w-2xl overflow-hidden relative flex flex-col md:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-black/40 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-10"
            >
              ✕
            </button>

            <div className="relative w-full md:w-5/12 aspect-[3/4] md:h-auto bg-black flex flex-col items-center justify-center p-6 text-center">
              {selectedMovie.Poster !== 'N/A' ? (
                <Image 
                  src={selectedMovie.Poster} 
                  alt={selectedMovie.Title} 
                  fill 
                  className="object-cover" 
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center p-6">
                  <span className="text-sm font-black text-zinc-400 tracking-wider uppercase font-mono">
                    {selectedMovie.Title}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 md:w-7/12 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-green-500/10 text-green-400 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded font-mono font-bold">
                    ★ {selectedMovie.imdbRating || 'N/A'}
                  </span>
                  <span className="text-xs text-zinc-500">{selectedMovie.Year}</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight">{selectedMovie.Title}</h2>
                <p className="text-xs text-green-400 font-semibold mt-1">{selectedMovie.Genre}</p>
              </div>

              <div className="space-y-2 text-xs text-zinc-400 leading-relaxed max-h-48 overflow-y-auto">
                <p className="text-zinc-300 font-medium">{selectedMovie.Plot}</p>
                <p className="pt-2"><strong className="text-zinc-200">Cast:</strong> {selectedMovie.Actors}</p>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end">
                <button 
                  onClick={() => setSelectedMovie(null)}
                  className="bg-zinc-800 hover:bg-zinc-700 transition-colors text-white text-xs px-6 py-2 rounded-full font-bold"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}