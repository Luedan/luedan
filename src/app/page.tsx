'use client';

import { Header } from '@/features/landing/components/Header';
import { Hero } from '@/features/landing/components/Hero';
import { About } from '@/features/landing/components/About';
import { Skills } from '@/features/landing/components/Skills';
import { Experience } from '@/features/landing/components/Experience';
import { Portfolio } from '@/features/landing/components/Portfolio';
import { Contact } from '@/features/landing/components/Contact';
import { Footer } from '@/features/landing/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}
