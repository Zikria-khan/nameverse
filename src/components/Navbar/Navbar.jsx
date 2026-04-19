'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sparkles, Heart, User, BookOpen, Info, ChevronDown, Search, Star, TrendingUp } from 'lucide-react';
import UniversalSearch from './searchBar';

/**
 * NameVerse Navbar Component - Premium UX
 * - Mega menu dropdowns
 * - Smooth animations
 * - Responsive design
 * - Search integration
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
        setActiveDropdown(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when Escape key is pressed
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
    }, 150);
  };

  const navLinks = [
    {
      name: 'Names',
      href: '/names',
      icon: Sparkles,
      megaMenu: true,
      subLinks: [
        {
          category: 'By Religion',
          items: [
            { name: 'All Names', href: '/names', icon: Star, description: 'Explore all baby names' },
            { name: 'Islamic Names', href: '/names/islamic', icon: Sparkles, description: 'Muslim baby names' },
            { name: 'Hindu Names', href: '/names/hindu', icon: Heart, description: 'Hindu baby names' },
            { name: 'Christian Names', href: '/names/christian', icon: BookOpen, description: 'Christian baby names' },
            { name: 'Sikh Names', href: '/names/sikh', icon: User, description: 'Sikh baby names' },
          ]
        },
        {
          category: 'Popular',
          items: [
            { name: 'Trending Names', href: '/names/trending', icon: TrendingUp, description: 'Most popular right now' },
            { name: 'Unique Names', href: '/names/unique', icon: Star, description: 'Rare and beautiful names' },
            { name: 'Modern Names', href: '/names/modern', icon: Sparkles, description: 'Contemporary choices' },
            { name: 'Traditional Names', href: '/names/traditional', icon: BookOpen, description: 'Classic timeless names' },
          ]
        },
        {
          category: 'Resources',
          items: [
            { name: 'Name Generator', href: '/tools/name-generator', icon: Search, description: 'Find perfect names' },
            { name: 'Name Lists', href: '/lists', icon: Star, description: 'Curated collections' },
            { name: 'Search', href: '/search', icon: Search, description: 'Advanced search' },
          ]
        }
      ]
    },
    { 
      name: 'Blog', 
      href: '/blog', 
      icon: BookOpen,
      subLinks: [
        { name: 'Latest Articles', href: '/blog', description: 'Newest posts' },
        { name: 'Naming Guides', href: '/blog/category/guides', description: 'Expert advice' },
        { name: 'Name Meanings', href: '/blog/category/meanings', description: 'Deep dives' },
        { name: 'Parenting Tips', href: '/blog/category/parenting', description: 'Helpful insights' },
      ]
    },
    {
      name: 'More',
      href: '/about',
      icon: Info,
      subLinks: [
        { name: 'About Us', href: '/about', description: 'Our story' },
        { name: 'Naming Guide', href: '/guides/expert-naming-guide', description: 'Complete guide' },
        { name: 'Contact', href: '/contact', description: 'Get in touch' },
        { name: 'Privacy Policy', href: '/privacy', description: 'How we protect data' },
        { name: 'Terms of Service', href: '/terms', description: 'Terms & conditions' },
      ]
    },
  ];

  // Don't render interactive elements until mounted
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
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center transition-all group-hover:rotate-6 group-hover:scale-110 shadow-md group-hover:shadow-lg">
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

          {/* Desktop Search - Responsive sizing */}
          <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg">
            <UniversalSearch />
          </div>

          {/* Desktop Navigation Links with Enhanced Dropdowns */}
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
                      aria-expanded={activeDropdown === link.name}
                      aria-haspopup="true"
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === link.name ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* Mega Menu Dropdown */}
                    {activeDropdown === link.name && (
                      <div className="absolute left-0 top-full mt-2 w-screen max-w-4xl rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                        {link.megaMenu ? (
                          <div className="grid grid-cols-3 gap-6 p-6">
                            {link.subLinks.map((section) => (
                              <div key={section.category} className="space-y-3">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                  <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                                  {section.category}
                                </h3>
                                <div className="space-y-2">
                                  {section.items.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                      <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-indigo-50 transition-all duration-200 group"
                                      >
                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center transition-all">
                                          <Icon className="w-4 h-4 text-gray-600 group-hover:text-indigo-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                            {item.name}
                                          </p>
                                          <p className="text-xs text-gray-500">{item.description}</p>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="min-w-[260px] py-2">
                            {link.subLinks.map((subLink) => (
                              <Link
                                key={subLink.name}
                                href={subLink.href}
                                className="block px-6 py-3 hover:bg-indigo-50 transition-all duration-200"
                              >
                                <div className="font-semibold text-gray-900 hover:text-indigo-600">
                                  {subLink.name}
                                </div>
                                {subLink.description && (
                                  <p className="text-xs text-gray-500 mt-0.5">{subLink.description}</p>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
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

          {/* Right side CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/favorites"
              className="p-2 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 relative group"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <Link
              href="/names"
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Explore Names
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Search - Responsive width */}
            <div className="w-40 xs:w-48 sm:w-64 md:hidden">
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

      {/* Mobile Slide-down Menu with Enhanced UX */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-[102] lg:hidden animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div className="absolute top-full left-0 w-full bg-white shadow-2xl z-[103] lg:hidden animate-in slide-in-from-top-2 duration-300 max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="px-4 pt-2 pb-8 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-2">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-4 text-lg font-bold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <link.icon className="w-5 h-5 text-indigo-600" />
                      </div>
                      {link.name}
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-400 rotate-180" />
                  </Link>
                  
                  {link.subLinks && (
                    <div className="space-y-1 pl-14">
                      {link.subLinks.map((subLink) => {
                        // Handle both array and object structures
                        if (Array.isArray(link.subLinks)) {
                          // For simple subLinks array
                          return (
                            <Link
                              key={subLink.name}
                              href={subLink.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                            >
                              <div className="font-medium">{subLink.name}</div>
                              {subLink.description && (
                                <div className="text-xs text-gray-500 mt-0.5">{subLink.description}</div>
                              )}
                            </Link>
                          );
                        } else if (subLink.items) {
                          // For mega menu structure
                          return subLink.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                            >
                              <div className="font-medium">{item.name}</div>
                              {item.description && (
                                <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                              )}
                            </Link>
                          ));
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <Link
                  href="/favorites"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold shadow-lg active:scale-[0.98] transition-all"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  Favorites
                </Link>
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