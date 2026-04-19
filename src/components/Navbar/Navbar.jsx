'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sparkles, Heart, User, BookOpen, Info, ChevronDown } from 'lucide-react';
import UniversalSearch from './searchBar';

/**
 * NameVerse Navbar Component
 * - Responsive design (Mobile/Desktop)
 * - Integrated Universal Search
 * - Scroll-aware styling
 * - Hydration-safe rendering
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mount state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize if screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    {
      name: 'Names',
      href: '/names',
      icon: Sparkles,
      subLinks: [
        { name: 'All Names', href: '/names' },
        { name: 'Islamic Names', href: '/names/islamic' },
        { name: 'Hindu Names', href: '/names/hindu' },
        { name: 'Christian Names', href: '/names/christian' },
        { name: 'Search', href: '/search' },
      ],
    },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    {
      name: 'More',
      href: '/about',
      icon: Info,
      subLinks: [
        { name: 'About', href: '/about' },
        { name: 'Naming Guide', href: '/guides/expert-naming-guide' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
      ],
    },
  ];

  // Don't render interactive elements until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="sticky top-0 z-[100] bg-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-indigo-50 flex items-center justify-center">
                  <div className="w-9 h-9 bg-gray-200 rounded-lg animate-pulse" />
                </div>
                <div className="w-24 h-6 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`sticky top-0 z-[100] transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-1' 
        : 'bg-white py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-indigo-50 flex items-center justify-center transition-transform group-hover:rotate-6 group-hover:scale-110">
                <Image
                  src="/logo.png"
                  alt="NameVerse Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                NameVerse
              </span>
            </Link>
          </div>

          {/* Desktop Search - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex flex-1 max-w-md">
            <UniversalSearch />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.subLinks ? (
                  <>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 font-semibold transition-all duration-200"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                    <div className="pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 absolute left-0 top-full mt-2 min-w-[220px] rounded-3xl border border-gray-100 bg-white shadow-xl p-3 z-50">
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          className="block px-4 py-3 rounded-2xl text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="px-4 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 font-semibold transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/names"
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200 hover:scale-105"
            >
              Explore Names
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Search - Only shown on very small screens where main search is hidden */}
            <div className="md:hidden w-32 xs:w-40">
              <UniversalSearch />
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 active:scale-90 transition-all relative z-[101]"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu with overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-[102] lg:hidden animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div className="absolute top-full left-0 w-full bg-white shadow-2xl z-[103] lg:hidden animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="px-4 pt-2 pb-8 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-1">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-4 text-lg font-bold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                      <link.icon className="w-5 h-5" />
                    </div>
                    {link.name}
                  </Link>
                  {link.subLinks && (
                    <div className="space-y-1 pl-14">
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 rounded-2xl text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  href="/names"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all"
                >
                  Browse All Names
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;