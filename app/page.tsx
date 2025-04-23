'use client'

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react'
import Head from 'next/head'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Roboto, Playfair_Display } from 'next/font/google'
import Link from 'next/link'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import Script from 'next/script'
import dynamic from 'next/dynamic'
import ProjectStyles from '@/components/ProjectStyles';

// Dynamically import non-critical components
const EmailDomainSuggestions = dynamic(() => import('@/components/EmailDomainSuggestions'), {
  ssr: false,
  loading: () => <div className="text-gray-400 text-sm mt-1">Loading suggestions...</div>
})

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

const roboto = Roboto({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700', '900'],
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
  
  // Track if this is the initial site load
  const [showLoadingScreen, setShowLoadingScreen] = useState(true); 
  const [isFirstLoad, setIsFirstLoad] = useState(true); 
  
  // Use effect to handle initial loading - show loading screen on every page load
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Always show loading screen on page load
    setShowLoadingScreen(true);
    setIsFirstLoad(true);
    
    // Don't manipulate DOM directly in the initial render
    // Instead use CSS classes
    if (document && document.body) {
      document.body.classList.add('loading-active');
    }
    
    return () => {
      if (document && document.body) {
        document.body.classList.remove('loading-active');
      }
    };
  }, []);
  
  // Handle loading completion
  const handleLoadingComplete = () => {
    if (typeof window !== 'undefined' && document && document.body) {
      document.body.classList.remove('loading-active');
    }
    setIsLoading(false);
    setShowLoadingScreen(false);
  };

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

  // Scroll animation for scribbles
  useEffect(() => {
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.scroll-reveal');
      scrollElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Filter countries based on search term
  const filteredCountries = COUNTRY_CODES.filter(country => {
    const searchLower = countrySearchTerm.toLowerCase()
    return country.name.toLowerCase().includes(searchLower) || 
           country.code.toLowerCase().includes(searchLower)
  })

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll animation for elements
    const handleScroll = () => {
      // Reveal elements on scroll
      const scrollElements = document.querySelectorAll('.scroll-reveal');
      scrollElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState({
    email: '',
    phone: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)

  // Handle form validation and submission
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setFormData({...formData, email})
    
    // Email validation
    if (!email) {
      setFormErrors({...formErrors, email: ''})
      return
    }
    
    // Get domain part of the email
    const parts = email.split('@')
    if (parts.length !== 2) {
      setFormErrors({...formErrors, email: 'Please enter a valid email address'})
      return
    }
    
    const localPart = parts[0]
    const domainPart = parts[1]
    
    // Check local part (before @) has at least one character and valid format
    if (!localPart || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart)) {
      setFormErrors({...formErrors, email: 'Please enter a valid email address'})
      return
    }
    
    // List of accepted domains (same as in EmailDomainSuggestions component)
    const acceptedDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'icloud.com',
      'protonmail.com',
      'aol.com',
      'mail.com',
      'zoho.com',
      'gmx.com',
      'yandex.com',
      'live.com'
    ]
    
    // Check if the domain is in our accepted list
    if (domainPart && !acceptedDomains.includes(domainPart)) {
      setFormErrors({...formErrors, email: `Please use one of our supported email domains`})
      return
    }
    
    setFormErrors({...formErrors, email: ''})
  }
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    
    // Keep formatting characters for display but strip for validation
    setFormData({...formData, phone: rawValue})
    
    // Remove non-digits for validation
    const phoneDigits = rawValue.replace(/\D/g, '')
    
    if (!phoneDigits) {
      setFormErrors({...formErrors, phone: ''})
      return
    }
    
    // Validation based on country code
    let isValid = true
    let errorMessage = ''
    
    // Israel (+972) validation
    if (selectedCountry.code === '+972') {
      // Israeli numbers should have 9 digits (with or without leading 0)
      const effectiveLength = phoneDigits.length;
      if (effectiveLength !== 9) {
        isValid = false
        errorMessage = 'Israeli phone numbers require 9 digits'
      }
    } 
    // US (+1) validation
    else if (selectedCountry.code === '+1') {
      if (phoneDigits.length !== 10) {
        isValid = false
        errorMessage = 'US phone numbers require 10 digits'
      }
    }
    // UK (+44) validation
    else if (selectedCountry.code === '+44') {
      if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        isValid = false
        errorMessage = 'UK phone numbers require 10-11 digits'
      }
    }
    // Generic validation for other countries
    else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      isValid = false
      errorMessage = `Please enter a valid phone number for ${selectedCountry.name}`
    }
    
    setFormErrors({...formErrors, phone: isValid ? '' : errorMessage})
  }
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check for validation errors
    if (formErrors.email || formErrors.phone) {
      return
    }
    
    // Simulate form submission with loading state
    setIsSubmitting(true)
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      setFormSubmitted(true)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      }, 5000)
    }, 1500)
  }

  return (
    <>
      <Head>
        <title>AIDEA - Bringing your AI ideas to life</title>
        <meta name="description" content="AIDEA is a creative agency specializing in AI-powered solutions for businesses of all sizes." />
        {/* Add preload for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" as="style" />
        <link rel="preload" href="https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js" as="script" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      
      {/* Project Styles */}
      <ProjectStyles />
      
      {/* Main content with slide-up animation when loading completes */}
      <div className={`min-h-screen bg-black text-white ${roboto.className} ${!isLoading ? 'animate-slide-up-enter' : 'opacity-0'}`}>
        {/* Navbar */}
        <Suspense fallback={<div className="h-16 bg-black"></div>}>
          <Navbar currentPath="/" />
        </Suspense>
        
        {/* Hero Section */}
        <section className="pt-52 sm:pt-56 md:pt-60 lg:pt-64 2k:pt-72 4k:pt-80 pb-12 md:pb-20 2k:pb-32 4k:pb-40 px-4 sm:px-6 relative min-h-[90vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Spline 3D Animation as Background - Load with priority false for better performance */}
          <div className="absolute inset-0 w-full h-full z-0">
            <div className="absolute inset-0 bg-transparent"></div>
            <Script 
              type="module" 
              src="https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js" 
              strategy="lazyOnload"
              crossOrigin="anonymous"
            />
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
          <div className="max-w-[1200px] 2k:max-w-[1800px] 4k:max-w-[2400px] w-full mx-auto text-center relative z-10">
            <div className="flex flex-col items-center justify-center">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2k:text-8xl 4k:text-9xl font-bold mb-4 md:mb-6 2k:mb-8 4k:mb-10 ${roboto.className} text-white leading-tight max-w-3xl 2k:max-w-4xl 4k:max-w-6xl mx-auto text-shadow-purple`}>
                <span className="block">YOUR CREATIVE</span>{" "}
                <span className="block">AGENCY</span>
              </h1>
              <Link href="/lets-begin" legacyBehavior passHref>
                <button 
                  className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 md:px-6 md:py-3 2k:px-8 2k:py-4 4k:px-10 4k:py-5 rounded-full text-white font-medium transition-all hover:opacity-90 hover:scale-[1.03] text-sm md:text-base 2k:text-xl 4k:text-2xl"
                >
                  Let&#39;s Begin »
                </button>
              </Link>
              
              {/* New tagline */}
              <div className="mt-12 md:mt-16 2k:mt-24 4k:mt-32 mb-8 2k:mb-12 4k:mb-16">
                <p className="text-lg md:text-xl 2k:text-2xl 4k:text-3xl text-white font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-6 2k:mb-8 4k:mb-10">
                  Ready To Improve Your Brand with Limitless AI Solutions?
                </p>
                
                {/* Animated down arrows - larger, lower, and clickable */}
                <div 
                  className="flex flex-col items-center mt-12 md:mt-16 2k:mt-24 4k:mt-32 cursor-pointer" 
                  onClick={() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <div className="p-4 hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-16 md:h-16 2k:w-20 2k:h-20 4k:w-24 4k:h-24 text-purple-500 animate-bounce">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notable Collaborations */}
        <section id="noteable-collabs" className="py-10 md:py-16 2k:py-24 4k:py-32 bg-[#190a37]/50 backdrop-blur-md w-full overflow-hidden relative">
          <div>
            <div className="text-center mb-8 md:mb-12 2k:mb-16 4k:mb-20">
              <h2 className={`text-2xl md:text-3xl 2k:text-4xl 4k:text-5xl font-medium ${roboto.className}`}>OUR NOTEABLE COLLABS</h2>
            </div>
            
            {/* Marquee for all screen sizes */}
            <div className="relative w-full overflow-hidden">
              <div className="flex w-[200%] animate-marquee">
                {/* First set of logos */}
                <div className="flex w-1/2 justify-around items-center">
                  <div className="w-20 h-20 md:w-28 md:h-28 2k:w-36 2k:h-36 4k:w-44 4k:h-44 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/ATLANTIC.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 2k:w-24 2k:h-24 4k:w-32 4k:h-32 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 2k:w-36 2k:h-36 4k:w-44 4k:h-44 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/WB.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 2k:w-24 2k:h-24 4k:w-32 4k:h-32 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 2k:w-36 2k:h-36 4k:w-44 4k:h-44 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/Vector-3.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 2k:w-24 2k:h-24 4k:w-32 4k:h-32 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 2k:w-36 2k:h-36 4k:w-44 4k:h-44 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/alibaba.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 2k:w-24 2k:h-24 4k:w-32 4k:h-32 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 2k:w-36 2k:h-36 4k:w-44 4k:h-44 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/GMC.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 2k:w-24 2k:h-24 4k:w-32 4k:h-32 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
                
                {/* Duplicate set for infinite effect */}
                <div className="flex w-1/2 justify-around items-center">
                  <div className="w-20 h-20 md:w-28 md:h-28 2k:w-36 2k:h-36 4k:w-44 4k:h-44 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/ATLANTIC.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 2k:w-24 2k:h-24 4k:w-32 4k:h-32 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 2k:w-36 2k:h-36 4k:w-44 4k:h-44 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/WB.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 2k:w-24 2k:h-24 4k:w-32 4k:h-32 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 2k:w-36 2k:h-36 4k:w-44 4k:h-44 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/Vector-3.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 2k:w-24 2k:h-24 4k:w-32 4k:h-32 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 2k:w-36 2k:h-36 4k:w-44 4k:h-44 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/alibaba.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 2k:w-24 2k:h-24 4k:w-32 4k:h-32 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="w-20 h-20 md:w-28 md:h-28 2k:w-36 2k:h-36 4k:w-44 4k:h-44 bg-[#1a0B38]/40 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center mx-2 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-900/20 overflow-visible group">
                    <img src="/images/GMC.png" alt="Partner Logo" className="w-12 h-12 md:w-16 md:h-16 2k:w-24 2k:h-24 4k:w-32 4k:h-32 object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section - Redesigned as Bento Box */}
        <section id="projects" className="py-12 md:py-20 px-4 sm:px-6 bg-black relative">
          <div className="max-w-[1400px] mx-auto relative z-10">
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 ${roboto.className} text-center`}>
              <span className="text-white">Explore our</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 purple-glow">Services</span>
            </h2>
            
            {/* Bento Box Grid Layout */}
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              {/* Large Feature Box */}
              <div className="col-span-12 md:col-span-8 row-span-2 rounded-2xl overflow-hidden group">
                <div className="bento-box h-full relative bg-gradient-to-br from-[#1a0B38]/40 to-[#1a0B38]/60 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all duration-500 overflow-hidden">
                  <div className="faceted-bg"></div>
                  <div className="faceted-overlay"></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                    <div className="flex items-start justify-between">
                      <div className="w-16 h-16 bg-purple-900/40 rounded-full flex items-center justify-center relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                      </div>
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-purple-500/20 arrow-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white arrow-icon">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">AI-Powered Design</h3>
                      <p className="text-gray-300 max-w-lg">Transform your creative vision with our cutting-edge AI design tools. From concept to completion, our technology delivers stunning results in record time.</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                  <img src="/images/service1.jpg" alt="AI-Powered Design" className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>
              
              {/* Medium Box 1 */}
              <div className="col-span-12 md:col-span-4 rounded-2xl overflow-hidden group">
                <div className="bento-box h-full min-h-[240px] relative bg-gradient-to-br from-[#1a0B38]/40 to-[#1a0B38]/60 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all duration-500 overflow-hidden">
                  <div className="faceted-bg"></div>
                  <div className="faceted-overlay"></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-blue-900/40 rounded-full flex items-center justify-center relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
                          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                          <line x1="7" y1="2" x2="7" y2="22" />
                          <line x1="17" y1="2" x2="17" y2="22" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <line x1="2" y1="7" x2="7" y2="7" />
                          <line x1="2" y1="17" x2="7" y2="17" />
                          <line x1="17" y1="17" x2="22" y2="17" />
                          <line x1="17" y1="7" x2="22" y2="7" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-purple-500/20 arrow-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white arrow-icon">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">Video Production</h3>
                  </div>
                </div>
              </div>
              
              {/* Medium Box 2 */}
              <div className="col-span-6 md:col-span-4 rounded-2xl overflow-hidden group">
                <div className="bento-box h-full min-h-[240px] relative bg-gradient-to-br from-[#1a0B38]/40 to-[#1a0B38]/60 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all duration-500 overflow-hidden">
                  <div className="faceted-bg"></div>
                  <div className="faceted-overlay"></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-pink-900/40 rounded-full flex items-center justify-center relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
                          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-purple-500/20 arrow-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white arrow-icon">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">Audio Services</h3>
                  </div>
                </div>
              </div>
              
              {/* Medium Box 3 */}
              <div className="col-span-6 md:col-span-4 rounded-2xl overflow-hidden group">
                <div className="bento-box h-full min-h-[240px] relative bg-gradient-to-br from-[#1a0B38]/40 to-[#1a0B38]/60 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all duration-500 overflow-hidden">
                  <div className="faceted-bg"></div>
                  <div className="faceted-overlay"></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-green-900/40 rounded-full flex items-center justify-center relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                          <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                          <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                          <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-purple-500/20 arrow-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white arrow-icon">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">3D Modeling</h3>
                  </div>
                </div>
              </div>
              
              {/* Wide Box */}
              <div className="col-span-12 md:col-span-8 rounded-2xl overflow-hidden group">
                <div className="bento-box h-full min-h-[240px] relative bg-gradient-to-br from-[#1a0B38]/40 to-[#1a0B38]/60 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all duration-500 overflow-hidden">
                  <div className="faceted-bg"></div>
                  <div className="faceted-overlay"></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-indigo-900/40 rounded-full flex items-center justify-center relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </div>
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-purple-500/20 arrow-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white arrow-icon">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Creative AI Solutions</h3>
                      <p className="text-gray-300 max-w-lg">Unleash your creativity with our AI-powered tools designed for artists, designers, and creators.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-16 md:py-24 2k:py-32 4k:py-40 px-4 sm:px-6 2k:px-10 4k:px-16 bg-gradient-to-b from-black to-[#0c0118] relative">
          <div className="max-w-[1400px] 2k:max-w-[2000px] 4k:max-w-[2800px] mx-auto relative z-10">
            <h2 className={`text-3xl md:text-5xl lg:text-6xl 2k:text-7xl 4k:text-8xl font-bold mb-12 md:mb-16 2k:mb-20 4k:mb-24 ${roboto.className} text-center`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 purple-glow">Advantages</span>{" "}
              <span className="text-white">of our Services</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 2k:gap-12 4k:gap-16">
              {/* Advantage 1 */}
              <div className="bg-[#1a0B38]/30 backdrop-blur-md rounded-xl border border-white/10 p-8 2k:p-10 4k:p-12 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 group">
                <div className="w-16 h-16 2k:w-20 2k:h-20 4k:w-24 4k:h-24 bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-full flex items-center justify-center mb-6 2k:mb-8 4k:mb-10 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 2k:w-10 2k:h-10 4k:w-12 4k:h-12 text-white">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl 2k:text-3xl 4k:text-4xl font-bold mb-4 2k:mb-6 4k:mb-8 text-white">Lightning Fast</h3>
                <p className="text-gray-300 2k:text-xl 4k:text-2xl">Our AI-powered services deliver results in seconds, not hours. Experience the fastest turnaround times in the industry.</p>
              </div>
              
              {/* Advantage 2 */}
              <div className="bg-[#1a0B38]/30 backdrop-blur-md rounded-xl border border-white/10 p-8 2k:p-10 4k:p-12 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 group">
                <div className="w-16 h-16 2k:w-20 2k:h-20 4k:w-24 4k:h-24 bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-full flex items-center justify-center mb-6 2k:mb-8 4k:mb-10 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 2k:w-10 2k:h-10 4k:w-12 4k:h-12 text-white">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl 2k:text-3xl 4k:text-4xl font-bold mb-4 2k:mb-6 4k:mb-8 text-white">Unmatched Quality</h3>
                <p className="text-gray-300 2k:text-xl 4k:text-2xl">We combine cutting-edge AI with expert human oversight to ensure every project meets the highest standards of quality.</p>
              </div>
              
              {/* Advantage 3 */}
              <div className="bg-[#1a0B38]/30 backdrop-blur-md rounded-xl border border-white/10 p-8 2k:p-10 4k:p-12 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 group">
                <div className="w-16 h-16 2k:w-20 2k:h-20 4k:w-24 4k:h-24 bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-full flex items-center justify-center mb-6 2k:mb-8 4k:mb-10 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 2k:w-10 2k:h-10 4k:w-12 4k:h-12 text-white">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl 2k:text-3xl 4k:text-4xl font-bold mb-4 2k:mb-6 4k:mb-8 text-white">Endless Scalability</h3>
                <p className="text-gray-300 2k:text-xl 4k:text-2xl">Whether you need one project or one thousand, our platform scales effortlessly to meet your business demands.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-20 2k:py-28 4k:py-36 px-4 sm:px-6 2k:px-10 4k:px-16 relative">
          <div className="max-w-md 2k:max-w-xl 4k:max-w-2xl mx-auto text-center">
            <h2 className={`text-2xl md:text-4xl 2k:text-5xl 4k:text-6xl font-medium mb-4 md:mb-6 2k:mb-8 4k:mb-10 ${roboto.className}`}>Let&#39;s Have a Chat</h2>
            <div className="max-w-md 2k:max-w-xl 4k:max-w-2xl mx-auto">
              <form className="space-y-3 md:space-y-4 2k:space-y-6 4k:space-y-8" onSubmit={handleFormSubmit} aria-label="Contact form">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-3 md:px-4 2k:px-5 4k:px-6 py-2.5 md:py-3 2k:py-4 4k:py-5 bg-neutral-800/80 border border-neutral-700 rounded-md text-sm md:text-base 2k:text-lg 4k:text-xl"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    aria-label="Your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="johndoe@gmail.com"
                      className={`w-full px-3 md:px-4 2k:px-5 4k:px-6 py-2.5 md:py-3 2k:py-4 4k:py-5 bg-neutral-800/80 border ${formErrors.email ? 'border-red-500' : formData.email && !formErrors.email ? 'border-green-500' : 'border-neutral-700'} rounded-md text-sm md:text-base 2k:text-lg 4k:text-xl pr-10`}
                      value={formData.email}
                      onChange={handleEmailChange}
                      required
                      aria-label="Email address"
                      aria-describedby="email-error"
                      autoComplete="email"
                      ref={emailInputRef}
                    />
                    <EmailDomainSuggestions 
                      email={formData.email}
                      onSelectDomain={(fullEmail) => {
                        setFormData({...formData, email: fullEmail});
                        // Validate the email after selection - this will always pass for autocomplete selections
                        const parts = fullEmail.split('@');
                        const domainPart = parts.length === 2 ? parts[1] : '';
                        const acceptedDomains = [
                          'gmail.com',
                          'yahoo.com',
                          'hotmail.com',
                          'outlook.com',
                          'icloud.com',
                          'protonmail.com',
                          'aol.com',
                          'mail.com',
                          'zoho.com',
                          'gmx.com',
                          'yandex.com',
                          'live.com'
                        ];
                        
                        const isValid = acceptedDomains.includes(domainPart);
                        setFormErrors({
                          ...formErrors, 
                          email: isValid ? '' : 'Please use one of our supported email domains'
                        });
                      }}
                      inputRef={emailInputRef}
                      className="mt-2"
                    />
                    {formErrors.email && (
                      <p id="email-error" className="text-red-500 text-xs 2k:text-sm 4k:text-base mt-2 text-left">{formErrors.email}</p>
                    )}
                    {formData.email && !formErrors.email && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 2k:h-6 2k:w-6 4k:h-7 4k:w-7 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex items-center w-full">
                    <div className="relative">
                      <button 
                        type="button"
                        id="countryCodeButton"
                        className="flex items-center justify-between gap-2 bg-neutral-800/80 border border-neutral-700 rounded-l-md px-2 md:px-3 2k:px-4 4k:px-5 py-2.5 md:py-3 2k:py-4 4k:py-5 text-white min-w-[80px] md:min-w-[90px] 2k:min-w-[100px] 4k:min-w-[120px] text-sm md:text-base 2k:text-lg 4k:text-xl"
                        onClick={() => setShowCountryDropdown(prev => !prev)}
                        aria-label="Select country code"
                        aria-expanded={showCountryDropdown}
                        aria-controls="countryCodeDropdown"
                      >
                        <span>{selectedCountry.code}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" className="text-white">
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                      </button>
                      <div 
                        id="countryCodeDropdown" 
                        ref={countryDropdownRef}
                        className={`absolute z-10 mt-1 w-60 sm:w-72 2k:w-80 4k:w-100 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg ${showCountryDropdown ? '' : 'hidden'} max-h-60 overflow-y-auto`}
                      >
                        <div className="p-2">
                          <input 
                            type="text" 
                            id="countrySearch"
                            placeholder="Search country or code..." 
                            className="w-full px-2 py-1 bg-neutral-700/50 border border-neutral-600 rounded-md text-sm 2k:text-base 4k:text-lg mb-2"
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
                                  <span className="w-12 md:w-14 2k:w-16 4k:w-18 inline-block font-medium text-sm md:text-base 2k:text-lg 4k:text-xl">{country.code}</span> {country.name}
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
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder={selectedCountry.code === '+972' ? '54-232-7876' : '(555) 123-4567'}
                        className={`w-full px-3 md:px-4 2k:px-5 4k:px-6 py-2.5 md:py-3 2k:py-4 4k:py-5 bg-neutral-800/80 border ${formErrors.phone ? 'border-red-500' : formData.phone && !formErrors.phone ? 'border-green-500' : 'border-neutral-700'} rounded-r-md border-l-0 text-sm md:text-base 2k:text-lg 4k:text-xl pr-10`}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required
                        aria-label="Phone number"
                        aria-describedby="phone-error"
                        autoComplete="tel"
                      />
                      {formData.phone && !formErrors.phone && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 2k:h-6 2k:w-6 4k:h-7 4k:w-7 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {formErrors.phone && (
                      <p id="phone-error" className="text-red-500 text-xs 2k:text-sm 4k:text-base mt-2 text-left">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <textarea
                    placeholder="Your message"
                    rows={4}
                    className="w-full px-3 md:px-4 2k:px-5 4k:px-6 py-2.5 md:py-3 2k:py-4 4k:py-5 bg-neutral-800/80 border border-neutral-700 rounded-md text-sm md:text-base 2k:text-lg 4k:text-xl"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    aria-label="Your message"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 2k:px-8 2k:py-4 4k:px-10 4k:py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-md hover:opacity-90 transition-opacity text-sm md:text-base 2k:text-lg 4k:text-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer currentPath="/" />
      </div>
    </>
  )
}