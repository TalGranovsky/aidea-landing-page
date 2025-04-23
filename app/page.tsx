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
        <style jsx global>{`
          /* Prevent FOUC (Flash of Unstyled Content) */
          .js-loading {
            opacity: 0;
          }
          
          /* Smooth page transitions */
          body {
            opacity: 1;
            transition: opacity 0.3s ease;
          }
          
          @keyframes slide-up-enter {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          .animate-slide-up-enter {
            animation: slide-up-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          .animate-gradient-shift {
            animation: gradient-shift 10s ease-in-out infinite;
          }
          
          @keyframes gradient-shift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          
          .metallic-shine {
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .hover-scale {
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .hover-scale:hover {
            transform: scale(1.02);
          }
          
          @keyframes pulse {
            0% { opacity: 0.7; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(5px); }
            100% { opacity: 0.7; transform: translateY(0); }
          }
          
          .scroll-arrow {
            animation: pulse 1.5s ease-in-out infinite;
            cursor: pointer;
          }
          
          .scroll-arrow-2 {
            animation: pulse 1.5s ease-in-out infinite;
            animation-delay: 0.3s;
            cursor: pointer;
          }
          
          .scroll-arrow-3 {
            animation: pulse 1.5s ease-in-out infinite;
            animation-delay: 0.6s;
            cursor: pointer;
          }
          
          @keyframes reveal-text {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          .reveal-text {
            opacity: 0;
            transform: translateY(20px);
          }
          
          .reveal-text-1 {
            animation: reveal-text 0.8s ease-out forwards;
            animation-delay: 0.2s;
          }
          
          .reveal-text-2 {
            animation: reveal-text 0.8s ease-out forwards;
            animation-delay: 0.6s;
          }
          
          .reveal-text-3 {
            animation: reveal-text 0.8s ease-out forwards;
            animation-delay: 1s;
          }
          
          @keyframes blur-in {
            0% { 
              opacity: 0; 
              filter: blur(10px);
              transform: translateY(10px);
            }
            30% {
              opacity: 0.5;
              filter: blur(4px);
            }
            100% { 
              opacity: 1; 
              filter: blur(0);
              transform: translateY(0);
            }
          }
          
          .phrase-card {
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            position: relative;
          }
          
          .phrase-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to right, rgba(139, 92, 246, 0.1), rgba(79, 70, 229, 0.1));
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .elegant-reveal {
            opacity: 0;
            animation: elegant-reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          
          @keyframes elegant-reveal {
            0% { 
              opacity: 0; 
              transform: translateY(20px);
              filter: blur(8px);
            }
            30% {
              opacity: 0.5;
              filter: blur(4px);
            }
            100% { 
              opacity: 1; 
              transform: translateY(0);
              filter: blur(0);
            }
          }
          
          .blur-in-1 {
            opacity: 0;
            animation: blur-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.2s;
          }
          
          .blur-in-2 {
            opacity: 0;
            animation: blur-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.5s;
          }
          
          .blur-in-3 {
            opacity: 0;
            animation: blur-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.8s;
          }
          
          body.loading-active {
            overflow: hidden;
            background-color: #000000;
          }
          html {
            background-color: #000000;
          }
        `}</style>
      </Head>
      
      {/* Always show loading screen on page load */}
      {showLoadingScreen && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      {/* Main content with slide-up animation when loading completes */}
      <div className={`min-h-screen bg-black text-white ${roboto.className} ${!isLoading ? 'animate-slide-up-enter' : 'opacity-0'}`}>
        {/* Navbar */}
        <Suspense fallback={<div className="h-16 bg-black"></div>}>
          <Navbar currentPath="/" />
        </Suspense>
        
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 sm:px-6 relative min-h-[90vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
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
          <div className="scroll-reveal">
            <div className="arrow-animation" style={{ left: '15%', top: '25%' }}></div>
          </div>
          <div className="scroll-reveal">
            <div className="arrow-animation right" style={{ right: '15%', top: '25%' }}></div>
          </div>
          <div className="scroll-reveal">
            <div className="arrow-animation" style={{ left: '40%', top: '40%' }}></div>
          </div>
          <div className="scroll-reveal">
            <div className="arrow-animation right" style={{ right: '40%', top: '40%' }}></div>
          </div>
          <div className="max-w-[1200px] w-full mx-auto text-center relative z-10">
            <div className="flex flex-col items-center justify-center pt-16 sm:pt-12 md:pt-8 lg:pt-0">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 ${roboto.className} text-white leading-tight max-w-3xl mx-auto text-shadow-purple`}>
                <span className="block">YOUR CREATIVE</span>{" "}
                <span className="block">AGENCY</span>
              </h1>
              <Link href="/lets-begin" legacyBehavior passHref>
                <button 
                  className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 md:px-6 md:py-3 rounded-full text-white font-medium transition-all hover:opacity-90 hover:scale-[1.03] text-sm md:text-base"
                >
                  Let&#39;s Begin »
                </button>
              </Link>
              
              {/* New tagline */}
              <div className="mt-12 md:mt-16 mb-8">
                <p className="text-lg md:text-xl text-white font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
                  Ready To Improve Your Brand with Limitless AI Solutions?
                </p>
                
                {/* Animated down arrows - larger, lower, and clickable */}
                <div 
                  className="flex flex-col items-center mt-12 md:mt-16 cursor-pointer" 
                  onClick={() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <div className="p-4 hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-16 md:h-16 text-purple-500 animate-bounce">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notable Collaborations */}
        <section id="noteable-collabs" className="py-10 md:py-16 bg-[#190a37]/50 backdrop-blur-md w-full overflow-hidden relative">
          <div>
            <div className="text-center mb-8 md:mb-12">
              <h2 className={`text-2xl md:text-3xl font-medium ${roboto.className}`}>OUR NOTEABLE COLLABS</h2>
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

        {/* Projects Section */}
        <section id="projects" className="py-12 md:py-20 px-4 sm:px-6 bg-black relative">
          <div className="scroll-reveal">
            <div className="arrow-animation" style={{ left: '10%', top: '-30px' }}></div>
          </div>
          <div className="scroll-reveal">
            <div className="arrow-animation right" style={{ right: '10%', top: '-30px' }}></div>
          </div>
          <div className="max-w-[1400px] mx-auto relative z-10">
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 ${roboto.className} text-center`}>
              <span className="text-white">Explore our</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 purple-glow">Services</span>
            </h2>
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 md:gap-8">
                {/* Top Left: Project Card 1 */}
                <div className="project-card p-8 md:p-10 col-span-1 sm:col-span-4 bg-[#1a0B38]/40 backdrop-blur-md rounded-xl border border-white/10 hover:border-purple-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/30 flex flex-col items-center justify-center hover-scale metallic-shine relative overflow-hidden group min-h-[300px] md:min-h-[350px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 animate-gradient-shift"></div>
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-purple-900/40 rounded-full mb-6 md:mb-8 flex items-center justify-center relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 md:w-12 md:h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">Project 1</h3>
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-purple-500/20 arrow-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white arrow-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
                
                {/* Center: Featured Card */}
                <div className="project-card p-8 md:p-12 col-span-1 sm:col-span-4 row-span-2 bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-md rounded-xl border border-white/10 hover:border-purple-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/30 flex flex-col items-center justify-center hover-scale metallic-shine relative overflow-hidden group min-h-[400px] md:min-h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-transparent to-blue-600/30 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 animate-gradient-shift"></div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">Featured Project</h3>
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-purple-500/20 arrow-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white arrow-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
                
                {/* Top Right: Project Card 2 */}
                <div className="project-card p-8 md:p-10 col-span-1 sm:col-span-4 bg-[#1a0B38]/40 backdrop-blur-md rounded-xl border border-white/10 hover:border-purple-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/30 flex flex-col items-center justify-center hover-scale metallic-shine relative overflow-hidden group min-h-[300px] md:min-h-[350px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 animate-gradient-shift"></div>
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-900/40 rounded-full mb-6 md:mb-8 flex items-center justify-center relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 md:w-12 md:h-12">
                      <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">Project 2</h3>
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-purple-500/20 arrow-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white arrow-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
                
                {/* Bottom Left: Project Card 4 */}
                <div className="project-card p-8 md:p-10 col-span-1 sm:col-span-4 bg-[#1a0B38]/40 backdrop-blur-md rounded-xl border border-white/10 hover:border-purple-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/30 flex flex-col items-center justify-center hover-scale metallic-shine relative overflow-hidden group min-h-[300px] md:min-h-[350px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 animate-gradient-shift"></div>
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-pink-900/40 rounded-full mb-6 md:mb-8 flex items-center justify-center relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 md:w-12 md:h-12">
                      <path strokeLinecap="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">Project 4</h3>
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-purple-500/20 arrow-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white arrow-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
                
                {/* Bottom Right: Project Card 5 */}
                <div className="project-card p-8 md:p-10 col-span-1 sm:col-span-4 bg-[#1a0B38]/40 backdrop-blur-md rounded-xl border border-white/10 hover:border-purple-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/30 flex flex-col items-center justify-center hover-scale metallic-shine relative overflow-hidden group min-h-[300px] md:min-h-[350px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 animate-gradient-shift"></div>
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-green-900/40 rounded-full mb-6 md:mb-8 flex items-center justify-center relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 md:w-12 md:h-12">
                      <path strokeLinecap="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">Project 5</h3>
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-purple-500/20 arrow-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white arrow-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-black to-[#0c0118] relative">
          <div className="scroll-reveal">
            <div className="arrow-animation" style={{ left: '10%', top: '50px' }}></div>
          </div>
          <div className="scroll-reveal">
            <div className="arrow-animation right" style={{ right: '10%', top: '50px' }}></div>
          </div>
          <div className="max-w-[1400px] mx-auto relative z-10">
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 ${roboto.className} text-center`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 purple-glow">Advantages</span>{" "}
              <span className="text-white">of our Services</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {/* Advantage 1 */}
              <div className="bg-[#1a0B38]/30 backdrop-blur-md rounded-xl border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Lightning Fast</h3>
                <p className="text-gray-300">Our AI-powered services deliver results in seconds, not hours. Experience the fastest turnaround times in the industry.</p>
              </div>
              
              {/* Advantage 2 */}
              <div className="bg-[#1a0B38]/30 backdrop-blur-md rounded-xl border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 013.296-1.043 3.746 3.746 0 011.043-3.296A3.745 3.745 0 0121 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Unmatched Quality</h3>
                <p className="text-gray-300">We combine cutting-edge AI with expert human oversight to ensure every project meets the highest standards of quality.</p>
              </div>
              
              {/* Advantage 3 */}
              <div className="bg-[#1a0B38]/30 backdrop-blur-md rounded-xl border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Endless Scalability</h3>
                <p className="text-gray-300">Whether you need one project or one thousand, our platform scales effortlessly to meet your business demands.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-20 px-4 sm:px-6 relative">
          <div className="max-w-md mx-auto text-center">
            <h2 className={`text-2xl md:text-4xl font-medium mb-4 md:mb-6 ${roboto.className}`}>Let&#39;s Have a Chat</h2>
            <div className="max-w-md mx-auto">
              <form className="space-y-3 md:space-y-4" onSubmit={handleFormSubmit} aria-label="Contact form">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-neutral-800/80 border border-neutral-700 rounded-md text-sm md:text-base"
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
                      className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-neutral-800/80 border ${formErrors.email ? 'border-red-500' : formData.email && !formErrors.email ? 'border-green-500' : 'border-neutral-700'} rounded-md text-sm md:text-base pr-10`}
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
                      <p id="email-error" className="text-red-500 text-xs mt-2 text-left">{formErrors.email}</p>
                    )}
                    {formData.email && !formErrors.email && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
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
                        className="flex items-center justify-between gap-2 bg-neutral-800/80 border border-neutral-700 rounded-l-md px-2 md:px-3 py-2.5 md:py-3 text-white min-w-[80px] md:min-w-[90px] text-sm md:text-base"
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
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder={selectedCountry.code === '+972' ? '54-232-7876' : '(555) 123-4567'}
                        className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-neutral-800/80 border ${formErrors.phone ? 'border-red-500' : formData.phone && !formErrors.phone ? 'border-green-500' : 'border-neutral-700'} rounded-r-md border-l-0 text-sm md:text-base pr-10`}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required
                        aria-label="Phone number"
                        aria-describedby="phone-error"
                        autoComplete="tel"
                      />
                      {formData.phone && !formErrors.phone && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {formErrors.phone && (
                      <p id="phone-error" className="text-red-500 text-xs mt-2 text-left">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Message"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-neutral-800/80 border border-neutral-700 rounded-md resize-none text-sm md:text-base"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    aria-label="Message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-2.5 md:py-3 rounded-md text-white font-medium text-sm md:text-base relative"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="opacity-0">Send Message</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    </>
                  ) : "Send Message"}
                </button>
                {formSubmitted && (
                  <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-2 rounded-md text-sm">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
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