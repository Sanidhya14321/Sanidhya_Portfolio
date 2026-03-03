'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, cardCSS } from '@/lib/themes';

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo?: string | React.ReactNode;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo = 'SV',
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  showCTA = true,
  ctaText = 'Get Started',
  ctaHref = '/contact'
}) => {
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const cc = cardCSS[theme];

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Theme-specific colors
  const baseColor = themeColors.bgSecondary;
  const menuColor = themeColors.heading;
  
  // Theme-specific button styling for better contrast
  let buttonBgColor = '';
  let buttonTextColor = '';
  
  if (theme === 'aurora') {
    buttonBgColor = themeColors.accent; // Purple
    buttonTextColor = '#000';
  } else if (theme === 'industrial') {
    buttonBgColor = '#FFFFFF'; // White button for contrast against dark nav
    buttonTextColor = '#000000';
  } else if (theme === 'glass') {
    buttonBgColor = '#6B7280'; // Darker gray for visibility
    buttonTextColor = '#FFFFFF';
  } else {
    // dark-horse
    buttonBgColor = themeColors.accent; // Emerald green
    buttonTextColor = '#000';
  }

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    if (!tl) return;
    
    tlRef.current = tl;
    
    // If menu is currently expanded, set timeline to end state
    if (isExpanded) {
      tl.progress(1);
    }

    return () => {
      if (tl) {
        tl.eventCallback('onReverseComplete', null);
        tl.eventCallback('onComplete', null);
        tl.kill();
      }
      tlRef.current = null;
    };
  }, [ease, items, theme]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        // Clear callbacks before killing timeline
        tlRef.current.eventCallback('onReverseComplete', null);
        tlRef.current.eventCallback('onComplete', null);
        tlRef.current.kill();
        
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        // Clear callbacks before killing timeline
        tlRef.current.eventCallback('onReverseComplete', null);
        tlRef.current.eventCallback('onComplete', null);
        tlRef.current.kill();
        
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded, theme]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    
    // Clear any existing callbacks to prevent glitches
    tl.eventCallback('onReverseComplete', null);
    tl.eventCallback('onComplete', null);
    
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      // Set callback to update state after animation completes
      tl.eventCallback('onReverseComplete', () => {
        setIsExpanded(false);
        // Clear the callback after it's used
        tl.eventCallback('onReverseComplete', null);
      });
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const handleLinkClick = () => {
    setIsHamburgerOpen(false);
    setIsExpanded(false);
    if (tlRef.current) {
      tlRef.current.reverse();
    }
  };

  const borderColor = theme === 'industrial' 
    ? 'rgba(64, 64, 64, 0.5)' 
    : theme === 'glass' 
    ? 'rgba(255, 255, 255, 0.08)'
    : cc.border;

  return (
    <div
      className={`card-nav-container relative w-full ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl shadow-lg relative overflow-hidden will-change-[height]`}
        style={{ 
          backgroundColor: baseColor,
          border: `1px solid ${borderColor}`,
          backdropFilter: theme === 'glass' ? 'blur(16px)' : 'none'
        }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor }}
          >
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
              } group-hover:opacity-75`}
            />
          </div>

          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
            {typeof logo === 'string' ? (
              logo.startsWith('http') || logo.startsWith('/') ? (
                <img src={logo} alt={logoAlt} className="logo h-[28px]" />
              ) : (
                <span className="logo text-xl font-bold" style={{ color: menuColor }}>{logo}</span>
              )
            ) : (
              logo
            )}
          </div>

          {showCTA && (
            <Link
              href={ctaHref}
              onClick={handleLinkClick}
              className="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-4 items-center h-full font-medium cursor-pointer transition-all duration-300 hover:opacity-80"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            >
              {ctaText}
            </Link>
          )}
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-semibold tracking-[-0.5px] text-[18px] md:text-[22px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => (
                  <Link
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                    href={lnk.href}
                    onClick={handleLinkClick}
                    aria-label={lnk.ariaLabel || lnk.label}
                  >
                    <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                    {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
