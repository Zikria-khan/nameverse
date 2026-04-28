'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sparkles, Heart, BookOpen, Info, ChevronDown, Search } from 'lucide-react';
import UniversalSearch from './searchBar';

/**
 * NameVerse Navbar Component
 * - Clean responsive design
 * - Smooth dropdowns
 * - Mobile-friendly menu
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpenSection, setMobileOpenSection] = useState(null);

  // Handle mount state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setActiveDropdown(null);
        setMobileOpenSection(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setActiveDropdown(null);
        setMobileOpenSection(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const scrollPositionRef = useRef(0);

  // Prevent body scroll when mobile menu is open, while preserving page position
  useEffect(() => {
    if (isOpen) {
      scrollPositionRef.current = window.scrollY || window.pageYOffset;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPositionRef.current);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPositionRef.current);
    };
  }, [isOpen]);



  // Simplified navigation links - only pages that exist in this app
  const navLinks = [
    {
      name: 'Names',
      icon: Sparkles,
      subLinks: [
        { name: 'Islamic Boy Names', href: '/islamic/boy-names' },
        { name: 'Islamic Girl Names', href: '/islamic/girl-names' },
        { name: 'Christian Boy Names', href: '/christian/boy-names' },
        { name: 'Christian Girl Names', href: '/christian/girl-names' },
        { name: 'Hindu Boy Names', href: '/hindu/boy-names' },
        { name: 'Hindu Girl Names', href: '/hindu/girl-names' },
        { name: 'Full Islamic Names', href: '/names/religion/islamic/1' },
        { name: 'Full Christian Names', href: '/names/religion/christian/1' },
        { name: 'Full Hindu Names', href: '/names/religion/hindu/1' },
      ]
    },
    {
      name: 'More',
      href: '/about',
      icon: Info,
      subLinks: [
        { name: 'Search', href: '/search' },
        { name: 'Blog', href: '/blog' },
        { name: 'About Us', href: '/about' },
        { name: 'Naming Guide', href: '/guides/expert-naming-guide' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ]
    },
  ];

  // Don't render until mounted
  if (!mounted) {
    return (
      <nav className="sticky top-0 z-[100] bg-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 animate-pulse" />
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
          
          {/* Logo */}
          <div className="flex-shrink-0">
              <Link href="/" title="Go to NameVerse home" aria-label="NameVerse Home" className="flex items-center gap-2 group logo4">
                <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center transition-all group-hover:scale-110 shadow-md logo4">
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

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md">
            <UniversalSearch />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
               <div 
                 key={link.name} 
                 className="relative"
               >
                 {link.subLinks ? (
                   <>
                     <button
                       type="button"
                       onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                       className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 font-semibold transition-all duration-200 ${
                         activeDropdown === link.name ? 'text-indigo-600 bg-indigo-50' : ''
                       }`}
                     >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === link.name ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {activeDropdown === link.name && (
                      <div 
                         className="absolute left-0 top-full pt-1"
                       >
                        <div className="min-w-[220px] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
                          <div className="py-2">
                            {link.subLinks.map((subLink) => (
                              <Link
                                key={subLink.name}
                                href={subLink.href}
                                className="block px-5 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="font-medium">{subLink.name}</div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="px-4 py-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 font-semibold transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/names/islamic/letter/A/1"
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              Explore Names
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 active:scale-90 transition-all"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[102] lg:hidden animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed inset-x-0 top-0 bottom-0 bg-white shadow-2xl z-[103] lg:hidden animate-in slide-in-from-top-2 duration-300 overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl">
                  <Image src="/logo.png" alt="NameVerse logo" width={32} height={32} className="object-contain" />
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">NameVerse</p>
                  <p className="text-xs text-gray-500">Names, meanings & guides</p>
                </div>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-2xl text-gray-600 hover:bg-gray-100 transition-all"
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-4 py-4 space-y-4">
              <div className="rounded-3xl border border-gray-100 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-gray-700">Quick Links</p>
                <p className="mt-1 text-xs text-gray-500">Tap a section to explore fast.</p>
              </div>

              {navLinks.map((link) => (
                <div key={link.name} className="rounded-3xl border border-gray-100 overflow-hidden">
                  {link.subLinks ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setMobileOpenSection((current) => current === link.name ? null : link.name)}
                        className="w-full px-4 py-4 flex items-center justify-between gap-3 text-left"
                        aria-expanded={mobileOpenSection === link.name}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center">
                            <link.icon className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{link.name}</p>
                            <p className="text-xs text-gray-500">Explore curated sections</p>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${mobileOpenSection === link.name ? 'rotate-180' : ''}`} />
                      </button>

                      {mobileOpenSection === link.name && (
                        <div className="space-y-1 border-t border-gray-100 bg-white px-4 pb-4">
                          {link.subLinks.map((subLink) => (
                            <Link
                              key={subLink.name}
                              href={subLink.href}
                              onClick={() => {
                                setIsOpen(false);
                                setMobileOpenSection(null);
                              }}
                              className="block rounded-2xl px-3 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors"
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-4"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <link.icon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{link.name}</p>
                        <p className="text-xs text-gray-500">Visit {link.name}</p>
                      </div>
                    </Link>
                  )}
                </div>
              ))}

              <div className="grid gap-3 py-2">
                <Link
                  href="/names/religion/islamic/1"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-100"
                >
                  Browse All Names
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-4 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Read Guides
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