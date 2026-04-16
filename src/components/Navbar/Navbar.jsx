'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Search, Baby, Sparkles } from 'lucide-react';
import SearchBar from './searchBar';

const navItems = [
  { href: '/', label: 'Home' },
  { 
    label: 'Boy Names', 
    submenu: [
      { href: '/islamic/boy-names', label: 'Islamic' },
      { href: '/christian/boy-names', label: 'Christian' },
      { href: '/hindu/boy-names', label: 'Hindu' },
    ]
  },
  { 
    label: 'Girl Names', 
    submenu: [
      { href: '/islamic/girl-names', label: 'Islamic' },
      { href: '/christian/girl-names', label: 'Christian' },
      { href: '/hindu/girl-names', label: 'Hindu' },
    ]
  },
  { href: '/blog', label: 'Blog' },
  { 
    label: 'More', 
    submenu: [
      { href: '/guides/expert-naming-guide', label: 'Naming Guides' },
      { href: '/names/islamic', label: 'All Islamic Names' },
      { href: '/names/christian', label: 'All Christian Names' },
      { href: '/names/hindu', label: 'All Hindu Names' },
{ href: '/about', label: 'About Us' },
{ href: '/terms', label: 'Terms' },
{ href: '/privacy', label: 'Privacy' },
    ]
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 text-xs">
            <div className="hidden sm:flex items-center gap-2 text-gray-500">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span className="font-medium">Trusted by millions of parents worldwide</span>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <Link href="/search" className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors font-medium">
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group" onClick={closeMenu}>
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <Baby className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  NameVerse
                </span>
                <div className="text-[10px] text-gray-400 font-medium tracking-wide -mt-0.5">
                  Baby Names & Meanings
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.submenu ? (
                    <div 
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                        activeDropdown === item.label 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}>
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <div className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-200 ${
                        activeDropdown === item.label 
                          ? 'opacity-100 visible translate-y-0' 
                          : 'opacity-0 invisible -translate-y-2'
                      }`}>
                        {item.submenu.map((subItem) => (
                          <Link 
                            key={subItem.href} 
                            href={subItem.href} 
                            className={`block px-4 py-2 text-sm transition-colors ${
                              isActive(subItem.href) 
                                ? 'text-blue-600 bg-blue-50 font-medium' 
                                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                            }`}
                            onClick={closeMenu}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      href={item.href} 
                      className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                        isActive(item.href) 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-64">
                <SearchBar />
              </div>
              <Link 
                href="/names" 
                className="px-4 py-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white text-xs font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md whitespace-nowrap"
              >
                Explore Names
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'top-[9px] rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-[9px] w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
                <span className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'top-[9px] -rotate-45' : 'top-[18px]'}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" 
            onClick={closeMenu}
          />
          
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col animate-slideIn">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <Link href="/" className="flex items-center gap-2.5" onClick={closeMenu}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <Baby className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-extrabold text-gray-900 text-lg">NameVerse</span>
                  <div className="text-[9px] text-gray-500 font-medium">Baby Names</div>
                </div>
              </Link>
              <button 
                onClick={closeMenu} 
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-white/80 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search baby names..." 
                  className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" 
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="px-5 pb-4">
              <Link 
                href="/names" 
                className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={closeMenu}
              >
                <Sparkles className="w-5 h-5" />
                <span>Explore All Names</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 pb-6">
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <div key={index}>
                    {item.submenu ? (
                      <div className="mb-1">
                        <button 
                          onClick={() => setMobileDropdown(mobileDropdown === item.label ? null : item.label)} 
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                            mobileDropdown === item.label ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span className="font-medium">{item.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdown === item.label ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-200 ${mobileDropdown === item.label ? 'max-h-96' : 'max-h-0'}`}>
                          <div className="ml-4 py-1 space-y-1 border-l-2 border-gray-100">
                            {item.submenu.map((subItem) => (
                              <Link 
                                key={subItem.href} 
                                href={subItem.href} 
                                className={`block px-4 py-2 rounded-lg transition-colors text-sm ${
                                  isActive(subItem.href) 
                                    ? 'text-blue-600 bg-blue-50 font-medium' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                                onClick={closeMenu}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link 
                        href={item.href} 
                        className={`block px-4 py-3 rounded-lg transition-colors ${
                          isActive(item.href) 
                            ? 'text-blue-600 bg-blue-50 font-medium' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span className="font-medium">Trusted by millions worldwide</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-[92px] sm:h-[84px]" />
    </>
  );
}