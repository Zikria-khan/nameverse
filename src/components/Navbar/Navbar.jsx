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
  const dropdownTimeoutRef = useRef(null);

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
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

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

  const handleDropdownEnter = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleDropdownContentEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  // Simplified navigation links - only what you have
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
        { name: 'Search Names', href: '/search' },
      ]
    },
    { 
      name: 'Blog', 
      href: '/blog', 
      icon: BookOpen,
      subLinks: [
        { name: 'Latest Posts', href: '/blog' },
        { name: 'Naming Guides', href: '/blog/guides' },
        { name: 'Name Meanings', href: '/blog/meanings' },
      ]
    },
    {
      name: 'More',
      href: '/about',
      icon: Info,
      subLinks: [
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
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center transition-all group-hover:scale-110 shadow-md">
                <Image
                  src="/logo.png"
                  alt="NameVerse Logo"
                  width={36}
                  height={36}
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                NameVerse
              </span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <UniversalSearch />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => handleDropdownEnter(link.name)}
                onMouseLeave={handleDropdownLeave}
              >
                {link.subLinks ? (
                  <>
                    <button
                      type="button"
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
                        onMouseEnter={handleDropdownContentEnter}
                        onMouseLeave={handleDropdownLeave}
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
              href="/names"
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              Explore Names
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="w-40 sm:w-56 md:hidden">
              <UniversalSearch />
            </div>
            
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
          
          <div className="absolute top-full left-0 right-0 bg-white shadow-2xl z-[103] lg:hidden animate-in slide-in-from-top-2 duration-300 max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="py-2">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-gray-50">
                  {link.subLinks ? (
                    <>
                      <div className="px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                            <link.icon className="w-5 h-5 text-indigo-600" />
                          </div>
                          <span className="font-semibold text-gray-800">{link.name}</span>
                        </div>
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="pl-14 pb-2 space-y-1">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-3 text-gray-600 hover:text-indigo-600 transition-colors"
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <link.icon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <span className="font-semibold text-gray-800">{link.name}</span>
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="p-4 mt-4">
                <Link
                  href="/names"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg"
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