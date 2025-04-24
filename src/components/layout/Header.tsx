'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-neutral-light shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary text-2xl font-semibold">Micro-Ritual</span>
              <span className="ml-1 text-secondary text-2xl font-light">Designer</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-neutral-dark hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/rituals" className="text-neutral-dark hover:text-primary transition-colors">
              My Rituals
            </Link>
            <Link href="/create" className="text-neutral-dark hover:text-primary transition-colors">
              Create New
            </Link>
            <Link href="/profile" className="text-neutral-dark hover:text-primary transition-colors">
              Profile
            </Link>
            <button className="btn-primary">
              Sign In
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-dark hover:text-primary"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/dashboard" 
                className="text-neutral-dark hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/rituals" 
                className="text-neutral-dark hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                My Rituals
              </Link>
              <Link 
                href="/create" 
                className="text-neutral-dark hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Create New
              </Link>
              <Link 
                href="/profile" 
                className="text-neutral-dark hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <button className="btn-primary w-full">
                Sign In
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
