// src/components/dashboard/NotesWidget.tsx
'use client';

import { useEffect, useState } from 'react';

export default function NotesWidget() {
  const [notes, setNotes] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('superapp-notes') || '';
    }
    return '';
  });

  useEffect(() => {
    localStorage.setItem('superapp-notes', notes);
  }, [notes]);

  return (
    <div className="bg-[#F1C40F] text-black h-full min-h-[350px] rounded-3xl p-6 flex flex-col">
      <h3 className="text-2xl font-bold mb-4 font-sans tracking-tight">All notes</h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full flex-grow bg-transparent resize-none focus:outline-none text-base leading-relaxed font-medium placeholder-zinc-700"
        placeholder="Type your strategic thoughts here... Saves automatically."
      />
    </div>
  );
}