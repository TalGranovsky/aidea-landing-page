'use client'

import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Playfair_Display, Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import Script from 'next/script'

// Country codes list
const COUNTRY_CODES = [
  { name: 'Afghanistan', code: '+93' },
  { name: 'Albania', code: '+355' },
  { name: 'Algeria', code: '+213' },
  { name: 'American Samoa', code: '+1 684' },
  { name: 'Andorra', code: '+376' },
  { name: 'Angola', code: '+244' },
  { name: 'Anguilla', code: '+1 264' },
  { name: 'Antarctica', code: '' },
  { name: 'Antigua and Barbuda', code: '+1 268' },
  { name: 'Argentina', code: '+54' },
  { name: 'Armenia', code: '+374' },
  { name: 'Aruba', code: '+297' },
  { name: 'Australia', code: '+61' },
  { name: 'Austria', code: '+43' },
  { name: 'Azerbaijan', code: '+994' },
  { name: 'Bahamas', code: '+1 242' },
  { name: 'Bahrain', code: '+973' },
  { name: 'Bangladesh', code: '+880' },
  { name: 'Barbados', code: '+1 246' },
  { name: 'Belarus', code: '+375' },
  { name: 'Belgium', code: '+32' },
  { name: 'Belize', code: '+501' },
  { name: 'Benin', code: '+229' },
  { name: 'Bermuda', code: '+1 441' },
  { name: 'Bhutan', code: '+975' },
  { name: 'Bolivia', code: '+591' },
  { name: 'Bosnia and Herzegovina', code: '+387' },
  { name: 'Botswana', code: '+267' },
  { name: 'Brazil', code: '+55' },
  { name: 'British Indian Ocean Territory', code: '+246' },
  { name: 'Brunei', code: '+673' },
  { name: 'Bulgaria', code: '+359' },
  { name: 'Burkina Faso', code: '+226' },
  { name: 'Burundi', code: '+257' },
  { name: 'Cambodia', code: '+855' },
  { name: 'Cameroon', code: '+237' },
  { name: 'Canada', code: '+1' },
  { name: 'Central African Republic', code: '+236' },
  { name: 'Chad', code: '+235' },
  { name: 'Chile', code: '+56' },
  { name: 'China', code: '+86' },
  { name: 'Christmas Island', code: '+61' },
  { name: 'Cocos (Keeling) Islands', code: '+61' },
  { name: 'Colombia', code: '+57' },
  { name: 'Comoros', code: '+269' },
  { name: 'Congo', code: '+242' },
  { name: 'Congo (Brazzaville)', code: '+242' },
  { name: 'Cook Islands', code: '+682' },
  { name: 'Costa Rica', code: '+506' },
  { name: 'Croatia', code: '+385' },
  { name: 'Cuba', code: '+53' },
  { name: 'Curacao', code: '+599' },
  { name: 'Cyprus', code: '+357' },
  { name: 'Czech Republic', code: '+420' },
  { name: 'Denmark', code: '+45' },
  { name: 'Djibouti', code: '+253' },
  { name: 'Dominica', code: '+1 767' },
  { name: 'Dominican Republic', code: '+1 809' },
  { name: 'Ecuador', code: '+593' },
  { name: 'Egypt', code: '+20' },
  { name: 'El Salvador', code: '+503' },
  { name: 'Equatorial Guinea', code: '+240' },
  { name: 'Eritrea', code: '+291' },
  { name: 'Estonia', code: '+372' },
  { name: 'Ethiopia', code: '+251' },
  { name: 'Falkland Islands (Malvinas)', code: '+500' },
  { name: 'Faroe Islands', code: '+298' },
  { name: 'Fiji', code: '+679' },
  { name: 'Finland', code: '+358' },
  { name: 'France', code: '+33' },
  { name: 'French Guiana', code: '+594' },
  { name: 'French Polynesia', code: '+689' },
  { name: 'Gabon', code: '+241' },
  { name: 'Gambia', code: '+220' },
  { name: 'Georgia', code: '+995' },
  { name: 'Germany', code: '+49' },
  { name: 'Ghana', code: '+233' },
  { name: 'Gibraltar', code: '+350' },
  { name: 'Greece', code: '+30' },
  { name: 'Greenland', code: '+299' },
  { name: 'Grenada', code: '+1 473' },
  { name: 'Guadeloupe', code: '+590' },
  { name: 'Guam', code: '+1 671' },
  { name: 'Guatemala', code: '+502' },
  { name: 'Guinea', code: '+224' },
  { name: 'Guinea-Bissau', code: '+245' },
  { name: 'Guyana', code: '+592' },
  { name: 'Haiti', code: '+509' },
  { name: 'Honduras', code: '+504' },
  { name: 'Hong Kong', code: '+852' },
  { name: 'Hungary', code: '+36' },
  { name: 'Iceland', code: '+354' },
  { name: 'India', code: '+91' },
  { name: 'Indonesia', code: '+62' },
  { name: 'Iran', code: '+98' },
  { name: 'Iraq', code: '+964' },
  { name: 'Ireland', code: '+353' },
  { name: 'Israel', code: '+972' },
  { name: 'Italy', code: '+39' },
  { name: 'Jamaica', code: '+1 876' },
  { name: 'Japan', code: '+81' },
  { name: 'Jordan', code: '+962' },
  { name: 'Kazakhstan', code: '+7' },
  { name: 'Kenya', code: '+254' },
  { name: 'Kiribati', code: '+686' },
  { name: 'South Korea', code: '+82' },
  { name: 'Kuwait', code: '+965' },
  { name: 'Kyrgyzstan', code: '+996' },
  { name: 'Laos', code: '+856' },
  { name: 'Latvia', code: '+371' },
  { name: 'Lebanon', code: '+961' },
  { name: 'Lesotho', code: '+266' },
  { name: 'Liberia', code: '+231' },
  { name: 'Libya', code: '+218' },
  { name: 'Lithuania', code: '+370' },
  { name: 'Luxembourg', code: '+352' },
  { name: 'Macau', code: '+853' },
  { name: 'North Macedonia', code: '+389' },
  { name: 'Madagascar', code: '+261' },
  { name: 'Malawi', code: '+265' },
  { name: 'Malaysia', code: '+60' },
  { name: 'Maldives', code: '+960' },
  { name: 'Mali', code: '+223' },
  { name: 'Malta', code: '+356' },
  { name: 'Marshall Islands', code: '+692' },
  { name: 'Martinique', code: '+596' },
  { name: 'Mauritania', code: '+222' },
  { name: 'Mauritius', code: '+230' },
  { name: 'Mayotte', code: '+262' },
  { name: 'Mexico', code: '+52' },
  { name: 'Micronesia', code: '+691' },
  { name: 'Moldova', code: '+373' },
  { name: 'Monaco', code: '+377' },
  { name: 'Mongolia', code: '+976' },
  { name: 'Montenegro', code: '+382' },
  { name: 'Montserrat', code: '+1 664' },
  { name: 'Morocco', code: '+212' },
  { name: 'Mozambique', code: '+258' },
  { name: 'Myanmar', code: '+95' },
  { name: 'Namibia', code: '+264' },
  { name: 'Nauru', code: '+674' },
  { name: 'Nepal', code: '+977' },
  { name: 'Netherlands', code: '+31' },
  { name: 'New Caledonia', code: '+687' },
  { name: 'New Zealand', code: '+64' },
  { name: 'Nicaragua', code: '+505' },
  { name: 'Niger', code: '+227' },
  { name: 'Nigeria', code: '+234' },
  { name: 'Niue', code: '+683' },
  { name: 'Norfolk Island', code: '+672' },
  { name: 'Northern Mariana Islands', code: '+1 670' },
  { name: 'Norway', code: '+47' },
  { name: 'Oman', code: '+968' },
  { name: 'Pakistan', code: '+92' },
  { name: 'Palau', code: '+680' },
  { name: 'Palestine', code: '+970' },
  { name: 'Panama', code: '+507' },
  { name: 'Papua New Guinea', code: '+675' },
  { name: 'Paraguay', code: '+595' },
  { name: 'Peru', code: '+51' },
  { name: 'Philippines', code: '+63' },
  { name: 'Poland', code: '+48' },
  { name: 'Portugal', code: '+351' },
  { name: 'Puerto Rico', code: '+1 787' },
  { name: 'Qatar', code: '+974' },
  { name: 'Reunion', code: '+262' },
  { name: 'Romania', code: '+40' },
  { name: 'Russia', code: '+7' },
  { name: 'Rwanda', code: '+250' },
  { name: 'Saint Kitts and Nevis', code: '+1 869' },
  { name: 'Saint Lucia', code: '+1 758' },
  { name: 'Saint Vincent and the Grenadines', code: '+1 784' },
  { name: 'Samoa', code: '+685' },
  { name: 'San Marino', code: '+378' },
  { name: 'Sao Tome and Principe', code: '+239' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Senegal', code: '+221' },
  { name: 'Serbia', code: '+381' },
  { name: 'Seychelles', code: '+248' },
  { name: 'Sierra Leone', code: '+232' },
  { name: 'Singapore', code: '+65' },
  { name: 'Slovakia', code: '+421' },
  { name: 'Slovenia', code: '+386' },
  { name: 'Solomon Islands', code: '+677' },
  { name: 'Somalia', code: '+252' },
  { name: 'South Africa', code: '+27' },
  { name: 'Spain', code: '+34' },
  { name: 'Sri Lanka', code: '+94' },
  { name: 'Sudan', code: '+249' },
  { name: 'Suriname', code: '+597' },
  { name: 'Swaziland', code: '+268' },
  { name: 'Sweden', code: '+46' },
  { name: 'Switzerland', code: '+41' },
  { name: 'Syria', code: '+963' },
  { name: 'Taiwan', code: '+886' },
  { name: 'Tajikistan', code: '+992' },
  { name: 'Tanzania', code: '+255' },
  { name: 'Thailand', code: '+66' },
  { name: 'Timor-Leste', code: '+670' },
  { name: 'Togo', code: '+228' },
  { name: 'Tokelau', code: '+690' },
  { name: 'Tonga', code: '+676' },
  { name: 'Trinidad and Tobago', code: '+1 868' },
  { name: 'Tunisia', code: '+216' },
  { name: 'Turkey', code: '+90' },
  { name: 'Turkmenistan', code: '+993' },
  { name: 'Turks and Caicos Islands', code: '+1 649' },
  { name: 'Tuvalu', code: '+688' },
  { name: 'Uganda', code: '+256' },
  { name: 'Ukraine', code: '+380' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'UK', code: '+44' },
  { name: 'USA', code: '+1' },
  { name: 'Uruguay', code: '+598' },
  { name: 'Uzbekistan', code: '+998' },
  { name: 'Vanuatu', code: '+678' },
  { name: 'Vatican City', code: '+379' },
  { name: 'Venezuela', code: '+58' },
  { name: 'Vietnam', code: '+84' },
  { name: 'Virgin Islands, British', code: '+1 284' },
  { name: 'Virgin Islands, U.S.', code: '+1 340' },
  { name: 'Wallis and Futuna', code: '+681' },
  { name: 'Yemen', code: '+967' },
  { name: 'Zambia', code: '+260' },
  { name: 'Zimbabwe', code: '+263' }
];

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

// Custom script loader
const useScript = (src: string) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [src])
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const isFirstRender = useRef(true)
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES.find(c => c.code === '+972') || COUNTRY_CODES[0])
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearchTerm, setCountrySearchTerm] = useState('')
  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState('');
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Filter countries based on search term
  const filteredCountries = COUNTRY_CODES.filter(country => {
    const searchLower = countrySearchTerm.toLowerCase()
    return country.name.toLowerCase().includes(searchLower) || 
           country.code.toLowerCase().includes(searchLower)
  })

  // Set body styles immediately on mount
  useEffect(() => {
    // Set body background to black immediately to prevent flash
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = '#000000'
      document.body.style.margin = '0'
      document.body.style.padding = '0'
      document.body.style.overflow = 'visible' // Force visible overflow
      document.documentElement.style.overflow = 'visible' // Also set on html element
    }

    // Intersection Observer setup - only after loading
    if (!isLoading && isFirstRender.current) {
      isFirstRender.current = false
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      }, { threshold: 0.1 })

      const elements = document.querySelectorAll('.card, .pill')
      elements.forEach((el) => observer.observe(el))

      // Load Tally widget script after page is fully loaded
      const script = document.createElement('script')
      script.src = 'https://tally.so/widgets/embed.js'
      script.async = true
      document.body.appendChild(script)
      
      // Cleanup
      return () => {
        elements.forEach((el) => observer.unobserve(el))
        document.body.removeChild(script)
      }
    }
  }, [isLoading])

  // Use refs for parallax sections
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  // Transform values for parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  // Avoid rendering the LoadingScreen on the server
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Create refs for sections
  const contactSectionRef = useRef<HTMLElement>(null);
  
  // Navigation transition
  const handleNavigation = (href: string) => {
    setTransitionTarget(href);
    setIsTransitioning(true);
    
    // After animation completes, navigate to the page
    setTimeout(() => {
      window.location.href = href;
    }, 500);
  };

  // Smooth scroll function with transition animation
  const scrollToSection = (elementRef: React.RefObject<HTMLElement>, href: string = '') => {
    // Start transition animation
    setTransitionTarget(href);
    setIsTransitioning(true);
    
    // After animation completes, scroll to section
    setTimeout(() => {
      if (elementRef.current) {
        elementRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else if (href && href.startsWith('/')) {
        // For links to other pages
        window.location.href = href;
      } else if (href) {
        // For links that don't have a ref (like Home)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // End transition animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 500);
    
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  // Ensure scroll position is at the top when this page loads
  useEffect(() => {
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      <Head>
        <title>AIDEA - Bringing your AI ideas to life</title>
        <meta name="description" content="AIDEA is a creative agency specializing in AI-powered solutions for businesses." />
      </Head>
      
      {/* All global styles in a single jsx global block */}
      <style jsx global>{`
        html, body {
          background-color: #000000;
          color: #FFFFFF;
          margin: 0;
          padding: 0;
          overflow: visible !important;
          height: auto !important;
          min-height: 100%;
        }
        
        body {
          overflow-y: auto !important;
          position: relative;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          from { background-position: 0 0; }
          to { background-position: 100% 0; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .hidden-element {
          opacity: 0;
          transform: translateY(20px);
          transition: all 1s ease;
        }
        
        .show {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        /* Card hover effect */
        .service-card {
          background: rgba(20, 20, 20, 0.3);
          border-radius: 20px;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          position: relative;
          overflow: hidden;
          min-height: 280px;
        }
        
        .service-card:hover {
          transform: translateY(-8px);
          border-color: rgba(123, 0, 215, 0.3);
          box-shadow: 0 15px 30px -5px rgba(123, 0, 215, 0.4);
        }
        
        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          background-size: 200% 100%;
          pointer-events: none;
        }
        
        .service-card:hover::before {
          left: 100%;
        }
        
        /* Pill hover effect */
        .pill-button {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .pill-button:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(123, 0, 215, 0),
            rgba(123, 0, 215, 0.3),
            rgba(123, 0, 215, 0)
          );
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        
        .pill-button:hover:after {
          transform: translateX(100%);
        }
        
        /* Marquee animation */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        @media (prefers-reduced-motion) {
          .animate-marquee {
            animation-play-state: paused;
          }
        }

        .animate {
          animation: fadeIn 0.7s ease-out forwards;
        }

        .card, .pill {
          opacity: 0;
          transform: translateY(20px);
        }

        /* Stagger animations for cards */
        .card:nth-child(1) { animation-delay: 0.1s; }
        .card:nth-child(2) { animation-delay: 0.2s; }
        .card:nth-child(3) { animation-delay: 0.3s; }
        .card:nth-child(4) { animation-delay: 0.4s; }
        .card:nth-child(5) { animation-delay: 0.5s; }
        .card:nth-child(6) { animation-delay: 0.6s; }
        
        /* Animation Preloading */
        .preload-animations * {
          -webkit-animation-duration: 0.01s;
          animation-duration: 0.01s;
          -webkit-animation-delay: 0s !important;
          animation-delay: 0s !important;
        }
        
        .fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        @keyframes curtain-up {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
        
        .animate-curtain-up {
          animation: curtain-up 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          transform: translateY(100%);
        }
        
        .glimmer-card {
          position: relative;
          background: rgb(23, 23, 23);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .glimmer-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(236, 72, 153, 0.03),
            rgba(236, 72, 153, 0.06),
            rgba(236, 72, 153, 0.03),
            transparent
          );
          background-size: 200% 100%;
          pointer-events: none;
        }

        .glimmer-pill {
          position: relative;
          background: rgb(23, 23, 23);
          border-radius: 9999px;
          overflow: hidden;
        }
        
        .glimmer-pill::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(236, 72, 153, 0.03),
            rgba(236, 72, 153, 0.06),
            rgba(236, 72, 153, 0.03),
            transparent
          );
          background-size: 200% 100%;
          pointer-events: none;
        }

        .hero-glow {
          position: absolute;
          top: 85%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140%;
          height: 600px;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.03) 35%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
          filter: blur(50px);
        }
        
        .center-card {
          grid-column: span 2;
        }

        /* Dotted grid pattern for background */
        .bg-dotted-grid {
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* Ensure proper scrolling behavior */
        #__next, main {
          min-height: 100vh;
          overflow: visible;
        }
        
        .text-shadow-purple {
          text-shadow: 0 0 10px rgba(123, 0, 215, 0.5), 0 0 20px rgba(123, 0, 215, 0.3), 0 0 30px rgba(123, 0, 215, 0.2);
        }
        
        /* Hamburger menu animation */
        .hamburger-line {
          width: 24px;
          height: 2px;
          background-color: white;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .hamburger-top {
          transform: translateY(-4px);
        }
        
        .hamburger-middle {
          margin: 5px 0;
        }
        
        .hamburger-bottom {
          transform: translateY(4px);
        }
        
        .open .hamburger-top {
          transform: rotate(45deg) translateY(6px) translateX(6px);
        }
        
        .open .hamburger-middle {
          opacity: 0;
        }
        
        .open .hamburger-bottom {
          transform: rotate(-45deg) translateY(-6px) translateX(6px);
        }
        
        /* Menu link continuous glossy animation */
        .menu-link {
          position: relative;
          overflow: hidden;
          padding: 0.5rem 2rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          z-index: 1;
          background: rgba(123, 0, 215, 0.05);
        }
        
        .menu-link:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.03),
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.03)
          );
          background-size: 200% 100%;
          animation: glossyEffect 5s infinite ease-in-out;
          z-index: -1;
        }
        
        @keyframes glossyEffect {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .menu-link:hover {
          background: rgba(123, 0, 215, 0.1);
        }
        
        /* Page transition animation */
        .page-transition {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(0,0,0,0), rgba(123, 0, 215, 0.2), rgba(0,0,0,0));
          transform: translateX(-100%);
          z-index: 100;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .page-transition.active {
          animation: wipeTransition 1s ease-in-out forwards;
          opacity: 1;
        }
        
        @keyframes wipeTransition {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
      
      {/* Loading Screen - only render on client side */}
      {isMounted && isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      
      {/* Page Transition Animation */}
      <PageTransition isTransitioning={isTransitioning} />
      
      {/* Main Content */}
      <main 
        className={`min-h-screen bg-black text-white ${inter.className}`}
        style={{
          visibility: isLoading ? 'hidden' : 'visible',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
          overflow: 'visible',
          height: 'auto'
        }}
      >
        {/* Header */}
        <Navbar onNavigate={handleNavigation} currentPath="/" />
        
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 relative min-h-[90vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Spline 3D Animation as Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <div className="absolute inset-0 bg-transparent"></div>
            <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js" />
            <div 
              className="absolute inset-0 scale-[1.5] sm:scale-[1.3] md:scale-[1.1] lg:scale-100 origin-center"
              style={{ 
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                transform: 'translate3d(0, 0, 0)'
              }}
              dangerouslySetInnerHTML={{
                __html: `<spline-viewer url="https://prod.spline.design/K1uWPfLyeDeWdxiO/scene.splinecode"></spline-viewer>`
              }}
            />
          </div>
          
          <div className="hero-glow z-[1]" />
          <div className="max-w-[1200px] w-full mx-auto text-center relative z-10">
            <div className="flex flex-col items-center justify-center pt-16 sm:pt-12 md:pt-8 lg:pt-0">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 ${playfair.className} text-white leading-tight max-w-3xl mx-auto text-shadow-purple`}>
                <span className="block">YOUR CREATIVE</span>
                <span className="block">AGENCY</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-200 drop-shadow-lg mb-8 max-w-xl mx-auto px-4">
                Bringing your AI ideas to life with cutting-edge technology
              </p>
              <button 
                onClick={() => {
                  setTransitionTarget('/lets-begin');
                  setIsTransitioning(true);
                  setTimeout(() => {
                    window.location.href = '/lets-begin';
                  }, 500);
                }}
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 md:px-6 md:py-3 rounded-full text-white font-medium transition-all hover:opacity-90 hover:scale-[1.03] text-sm md:text-base"
              >
                Get Started »
              </button>
            </div>
          </div>
        </section>

        {/* Notable Collaborations */}
        <section id="noteable-collabs" className="py-10 md:py-16 bg-[#190a37]/50 backdrop-blur-md w-full overflow-hidden relative">
          <div>
            <div className="text-center mb-8 md:mb-12">
              <h2 className={`text-2xl md:text-3xl font-medium ${playfair.className}`}>OUR NOTEABLE COLLABS</h2>
            </div>
            
            {/* Marquee for all screen sizes */}
            <div className="relative w-full overflow-hidden">
              <div className="flex w-[200%] animate-marquee">
                {/* First set of logos */}
                <div className="flex w-1/2 justify-around items-center">
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/ATLANTIC.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/WB.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/Vector-3.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/alibaba.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/GMC.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
                
                {/* Duplicate set for infinite effect */}
                <div className="flex w-1/2 justify-around items-center">
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/ATLANTIC.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/WB.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/Vector-3.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/alibaba.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/GMC.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section id="services" className="py-12 md:py-20 px-4 sm:px-6 bg-black relative">
          <div className="max-w-[1200px] mx-auto relative z-10">
            <h2 className={`text-2xl md:text-4xl font-medium mb-4 md:mb-6 ${playfair.className} text-center`}>Explore our Services</h2>
            <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-8 md:mb-12 text-sm md:text-base">
              We bring your AI ideas to life with cutting-edge technology and creative expertise, delivering solutions that transform businesses and enhance user experiences.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-8">
              {/* Top Left: Service Card 1 */}
              <div className="service-card p-6 md:p-8 card sm:col-span-1 lg:col-span-3 flex flex-col items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-900/40 rounded-full mb-4 md:mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Image Generation</h3>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </div>
              </div>
              
              {/* Center: Featured Card */}
              <div className="service-card p-6 md:p-10 card col-span-1 sm:col-span-2 lg:col-span-6 lg:row-span-2 bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex flex-col items-center justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">Experience Our Work</h3>
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-12 md:h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </div>
              </div>
              
              {/* Top Right: Service Card 2 */}
              <div className="service-card p-6 md:p-8 card sm:col-span-1 lg:col-span-3 flex flex-col items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-900/40 rounded-full mb-4 md:mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m0 0h-1.5m-15 0h-1.5m15 0h-1.5M10.5 15.75h3.375c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H10.5a1.125 1.125 0 00-1.125 1.125v5.25c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Video Generation</h3>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </div>
              </div>
              
              {/* Bottom Left: Service Card 4 */}
              <div className="service-card p-6 md:p-8 card sm:col-span-1 lg:col-span-3 flex flex-col items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-pink-900/40 rounded-full mb-4 md:mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.7 7.93a2.7 2.7 0 0 0-1.9-2.7c-.189-.189-.387-.387-.59-.59a2.7 2.7 0 0 0-2.7 2.7s.387 2.7.59 3.59c.2.2.387.387.59.387a2.7 2.7 0 0 0 2.7-2.7c.2-.2.387-.387.59-.387a2.7 2.7 0 0 0 2.7-2.7z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Music Production</h3>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </div>
              </div>
              
              {/* Bottom Right: Service Card 5 */}
              <div className="service-card p-6 md:p-8 card sm:col-span-1 lg:col-span-3 flex flex-col items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-900/40 rounded-full mb-4 md:mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5v2.25m0-2.25l2.25 1.313M3 7.5l2.25-1.313M3 7.5v2.25m0-2.25l2.25 1.313" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">3D Models</h3>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactSectionRef} className="py-12 md:py-20 px-4 sm:px-6 relative">
          <div className="max-w-[1200px] mx-auto text-center">
            <h2 className={`text-2xl md:text-4xl font-medium mb-4 md:mb-6 ${playfair.className}`}>Get in Touch</h2>
            <div className="max-w-md mx-auto">
              <form className="space-y-3 md:space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-neutral-800/80 border border-neutral-700 rounded-md text-sm md:text-base"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-neutral-800/80 border border-neutral-700 rounded-md text-sm md:text-base"
                />
                <div className="flex items-center w-full">
                  <div className="relative">
                    <button 
                      type="button"
                      id="countryCodeButton"
                      className="flex items-center justify-between gap-2 bg-neutral-800/80 border border-neutral-700 rounded-l-md px-2 md:px-3 py-2.5 md:py-3 text-white min-w-[80px] md:min-w-[90px] text-sm md:text-base"
                      onClick={() => setShowCountryDropdown(prev => !prev)}
                    >
                      <span>{selectedCountry.code}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" className="text-white">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                    </button>
                    <div 
                      id="countryCodeDropdown" 
                      ref={countryDropdownRef}
                      className={`absolute z-10 mt-1 w-60 sm:w-72 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg ${showCountryDropdown ? '' : 'hidden'} max-h-60 overflow-y-auto`}
                    >
                      <div className="p-2">
                        <input 
                          type="text" 
                          id="countrySearch"
                          placeholder="Search country or code..." 
                          className="w-full px-2 py-1 bg-neutral-700/50 border border-neutral-600 rounded-md text-sm mb-2"
                          value={countrySearchTerm}
                          onChange={(e) => setCountrySearchTerm(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
                              const key = e.key.toLowerCase();
                              const items = document.querySelectorAll('#countryCodeDropdown .country-item');
                              
                              // Find the first country that starts with this letter
                              for (let i = 0; i < items.length; i++) {
                                const item = items[i] as HTMLElement;
                                const text = item.textContent?.toLowerCase() || '';
                                const countryName = text.substring(text.indexOf(' ')).trim();
                                
                                if (countryName.startsWith(key)) {
                                  // Highlight this item
                                  document.querySelectorAll('.country-item.highlighted').forEach(el => {
                                    el.classList.remove('highlighted', 'bg-purple-900/30');
                                  });
                                  
                                  item.classList.add('highlighted', 'bg-purple-900/30');
                                  item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                                  break;
                                }
                              }
                            }
                          }}
                        />
                        <div className="country-list space-y-1">
                          {filteredCountries.map((country, index) => (
                            <div 
                              key={index} 
                              className={`country-item cursor-pointer hover:bg-neutral-700 p-2 rounded flex items-center justify-between ${selectedCountry.code === country.code ? 'bg-purple-900/80 text-white font-semibold' : ''}`}
                              onClick={() => {
                                setSelectedCountry(country);
                                setShowCountryDropdown(false);
                              }}
                            >
                              <div>
                                <span className="w-12 md:w-14 inline-block font-medium text-sm md:text-base">{country.code}</span> {country.name}
                              </div>
                              {selectedCountry.code === country.code && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-white">
                                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-neutral-800/80 border border-neutral-700 rounded-r-md border-l-0 text-sm md:text-base"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Message"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-neutral-800/80 border border-neutral-700 rounded-md resize-none text-sm md:text-base"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-2.5 md:py-3 rounded-md text-white font-medium text-sm md:text-base"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer onNavigate={handleNavigation} currentPath="/" />
      </main>
    </>
  )
}