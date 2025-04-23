'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Head from 'next/head';
import { Playfair_Display } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition';
import EmailDomainSuggestions from '@/components/EmailDomainSuggestions';

// Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export default function LetsBegin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });
  const [phone, setPhone] = useState('');
  const [formErrors, setFormErrors] = useState<{
    email: string;
    phone: string;
  }>({
    email: '',
    phone: ''
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ code: '+972', name: 'Israel' });
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Ensure scroll position is at the top when this page loads
  useEffect(() => {
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Ensure scrolling is enabled
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    // Cleanup function
    return () => {
      // Reset overflow when component unmounts
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (href: string) => {
    setTransitionTarget(href);
    setIsTransitioning(true);
    
    setTimeout(() => {
      window.location.href = href;
    }, 800); // Increased from 500ms to 800ms to ensure transition completes before navigation
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear general form error when user starts typing
    if (formError) {
      setFormError('');
    }
    
    // Email validation
    if (name === 'email') {
      validateEmail(value);
    }
  };

  const validateEmail = (email: string) => {
    if (!email) {
      setFormErrors(prev => ({ ...prev, email: '' }));
      return false;
    }
    
    // Get domain part of the email
    const parts = email.split('@');
    if (parts.length !== 2) {
      setFormErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return false;
    }
    
    const localPart = parts[0];
    const domainPart = parts[1];
    
    // Check local part (before @) has at least one character and valid format
    if (!localPart || !/^[a-zA-Z0-9.!#$%&apos;*+/=?^_`{|}~-]+$/.test(localPart)) {
      setFormErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return false;
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
    ];
    
    // Check if the domain is in our accepted list
    if (domainPart && !acceptedDomains.includes(domainPart)) {
      setFormErrors(prev => ({ ...prev, email: `Please use one of our supported email domains` }));
      return false;
    }
    
    setFormErrors(prev => ({ ...prev, email: '' }));
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep formatting characters for display
    const rawValue = e.target.value;
    setPhone(rawValue);
    
    // Remove non-digits for validation
    const phoneDigits = rawValue.replace(/\D/g, '');
    
    if (!phoneDigits) {
      setFormErrors(prev => ({ ...prev, phone: '' }));
      return false;
    }
    
    // Validation based on country code
    let isValid = true;
    let errorMessage = '';
    
    // Israel (+972) validation
    if (selectedCountry.code === '+972') {
      // Israeli numbers should have 9 digits (with or without leading 0)
      const effectiveLength = phoneDigits.length;
      if (effectiveLength !== 9) {
        isValid = false;
        errorMessage = 'Israeli phone numbers require 9 digits';
      }
    } 
    // US (+1) validation
    else if (selectedCountry.code === '+1') {
      if (phoneDigits.length !== 10) {
        isValid = false;
        errorMessage = 'US phone numbers require 10 digits';
      }
    }
    // UK (+44) validation
    else if (selectedCountry.code === '+44') {
      if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        isValid = false;
        errorMessage = 'UK phone numbers require 10-11 digits';
      }
    }
    // Generic validation for other countries
    else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      isValid = false;
      errorMessage = `Please enter a valid phone number for ${selectedCountry.name}`;
    }
    
    setFormErrors(prev => ({ ...prev, phone: isValid ? '' : errorMessage }));
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message || !phone) {
      setFormError('Please fill out all required fields');
      return;
    }
    
    // Email validation
    if (!validateEmail(formData.email)) {
      return;
    }
    
    // Phone validation
    const phoneDigits = phone.replace(/\D/g, '');
    if (!phoneDigits || formErrors.phone) {
      return;
    }
    
    // Clear any previous errors
    setFormError('');
    setApiError('');
    setIsSubmitting(true);
    
    try {
      const formDataToSubmit = {
        ...formData,
        phone: `${selectedCountry.code} ${phone}`,
      };
      
      console.log('Submitting form data:', formDataToSubmit);
      
      // Submit form data to the API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });
      
      // Get the raw response text
      const responseText = await response.text();
      console.log('Raw API response:', responseText);
      
      // Try to parse the response as JSON
      let result;
      try {
        result = JSON.parse(responseText);
        console.log('Parsed API response:', result);
      } catch (parseError) {
        console.error('Error parsing API response:', parseError);
        throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 100)}...`);
      }
      
      if (!response.ok) {
        const errorMessage = result?.message || `Server error: ${response.status} ${response.statusText}`;
        console.error('API error:', errorMessage);
        throw new Error(errorMessage);
      }
      
      // Handle successful submission
      setFormSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
        message: ''
      });
      setPhone('');
      setFormErrors({
        email: '',
        phone: ''
      });
      
      // Reset form after showing success message
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setApiError(error instanceof Error ? error.message : String(error) || 'An unknown error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // List of countries with country codes
  const countries = [
    { code: '+972', name: 'Israel' },
    { code: '+1', name: 'United States' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+49', name: 'Germany' },
    { code: '+33', name: 'France' },
    { code: '+81', name: 'Japan' },
    { code: '+86', name: 'China' },
    { code: '+91', name: 'India' },
    { code: '+61', name: 'Australia' },
    { code: '+55', name: 'Brazil' },
    { code: '+7', name: 'Russia' },
    { code: '+82', name: 'South Korea' },
    { code: '+39', name: 'Italy' },
    { code: '+34', name: 'Spain' },
    { code: '+1', name: 'Canada' },
    { code: '+52', name: 'Mexico' },
  ];

  // Filter countries based on search query
  const filteredCountries = countries.filter(
    country => 
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      country.code.includes(searchQuery)
  );

  return (
    <>
      <Head>
        <title>Let&#39;s Begin - AIDEA</title>
        <meta name="description" content="Start your journey with AIDEA - Your AI-powered creative agency" />
      </Head>

      <div className={`min-h-screen bg-black text-white ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        {isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <main className="min-h-screen bg-black text-white">
            {/* Navbar */}
            <Suspense fallback={<div>Loading navigation...</div>}>
              <Navbar currentPath="/lets-begin" />
            </Suspense>
            
            <section className="container mx-auto px-4 py-16 md:py-24 pt-32 md:pt-36 lg:pt-40 2k:pt-52 4k:pt-64 pb-20 2k:pb-28 4k:pb-36">
              <div className="max-w-4xl 2k:max-w-5xl 4k:max-w-6xl mx-auto text-center mb-16 2k:mb-24 4k:mb-32">
                <h1 className={`text-4xl sm:text-5xl md:text-6xl 2k:text-7xl 4k:text-8xl font-bold mb-6 2k:mb-8 4k:mb-10 ${playfair.className} text-white leading-tight`}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Let&#39;s Begin</span> Your Journey
                </h1>
                <p className="text-lg md:text-xl 2k:text-2xl 4k:text-3xl text-gray-300 max-w-2xl 2k:max-w-3xl 4k:max-w-4xl mx-auto">
                  Ready to transform your ideas into reality? Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>
              
              <div className="max-w-3xl 2k:max-w-4xl 4k:max-w-5xl mx-auto bg-black/40 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 md:p-10 2k:p-12 4k:p-16 shadow-xl shadow-purple-900/10">
                {(formError || apiError) && (
                  <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          There was an error with your submission
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          {formError && <p>{formError}</p>}
                          {apiError && <p>{apiError}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-gray-300 mb-4">Your message has been sent successfully. We'll be in touch soon!</p>
                    <p className="text-gray-400 text-sm">We've also sent you a confirmation email with more details.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 2k:space-y-8 4k:space-y-10">
                    {formError && (
                      <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 2k:px-6 2k:py-4 4k:px-8 4k:py-5 rounded-lg">
                        {formError}
                      </div>
                    )}
                    
                    {apiError && (
                      <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 2k:px-6 2k:py-4 4k:px-8 4k:py-5 rounded-lg">
                        <p className="font-medium">Server Error:</p>
                        <p>{apiError}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 2k:gap-8 4k:gap-10">
                      <div>
                        <label htmlFor="name" className="block text-sm 2k:text-base 4k:text-lg font-medium text-gray-300 mb-1 2k:mb-2 4k:mb-3">Your Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 2k:px-5 2k:py-4 4k:px-6 4k:py-5 text-white 2k:text-lg 4k:text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm 2k:text-base 4k:text-lg font-medium text-gray-300 mb-1 2k:mb-2 4k:mb-3">Email Address *</label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full bg-black/50 border ${formErrors.email ? 'border-red-500' : formData.email && !formErrors.email ? 'border-green-500' : 'border-gray-700'} rounded-lg px-4 py-3 2k:px-5 2k:py-4 4k:px-6 4k:py-5 text-white 2k:text-lg 4k:text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10`}
                            placeholder="johndoe@gmail.com"
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
                              validateEmail(fullEmail);
                            }}
                            inputRef={emailInputRef}
                            className="mt-2"
                          />
                          {formData.email && !formErrors.email && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        {formErrors.email && (
                          <p id="email-error" className="text-red-500 text-xs mt-2 text-left">{formErrors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 2k:gap-8 4k:gap-10">
                      <div>
                        <label htmlFor="company" className="block text-sm 2k:text-base 4k:text-lg font-medium text-gray-300 mb-1 2k:mb-2 4k:mb-3">Your Company</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 2k:px-5 2k:py-4 4k:px-6 4k:py-5 text-white 2k:text-lg 4k:text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Company Name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="budget" className="block text-sm 2k:text-base 4k:text-lg font-medium text-gray-300 mb-1 2k:mb-2 4k:mb-3">Your Budget (Optional)</label>
                        <input
                          type="text"
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 2k:px-5 2k:py-4 4k:px-6 4k:py-5 text-white 2k:text-lg 4k:text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="$5,000 - $10,000"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm 2k:text-base 4k:text-lg font-medium text-gray-300 mb-1 2k:mb-2 4k:mb-3">Phone Number *</label>
                      <div className="flex">
                        <div className="relative">
                          <button
                            type="button"
                            className="flex items-center gap-2 bg-black/50 border border-gray-700 rounded-l-lg px-3 py-3 2k:px-4 2k:py-4 4k:px-5 4k:py-5 text-white 2k:text-lg 4k:text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                            aria-label="Select country code"
                            aria-expanded={countryDropdownOpen}
                            aria-controls="countryDropdown"
                          >
                            <span>{selectedCountry.code}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {countryDropdownOpen && (
                            <div id="countryDropdown" className="absolute z-10 mt-1 w-60 bg-black/90 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                              <div className="p-2">
                                <input
                                  type="text"
                                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                  placeholder="Search countries..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  aria-label="Search countries"
                                />
                              </div>
                              <div className="py-1">
                                {filteredCountries.map((country) => (
                                  <div
                                    key={`${country.code}-${country.name}`}
                                    className={`country-item cursor-pointer hover:bg-neutral-700 p-2 rounded flex items-center justify-between ${selectedCountry.code === country.code && selectedCountry.name === country.name ? 'bg-purple-900/80 text-white font-semibold' : ''}`}
                                    onClick={() => {
                                      setSelectedCountry(country);
                                      setCountryDropdownOpen(false);
                                      setSearchQuery('');
                                      // Re-validate phone when country changes
                                      if (phone) {
                                        handlePhoneChange({ target: { value: phone } } as React.ChangeEvent<HTMLInputElement>);
                                      }
                                    }}
                                    role="option"
                                    aria-selected={selectedCountry.code === country.code && selectedCountry.name === country.name}
                                  >
                                    <div>
                                      <span className="w-12 md:w-14 inline-block font-medium text-sm md:text-base">{country.code}</span> {country.name}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="relative flex-1">
                          <input
                            type="tel"
                            className={`w-full bg-black/50 border ${formErrors.phone ? 'border-red-500' : phone && !formErrors.phone ? 'border-green-500' : 'border-gray-700'} border-l-0 rounded-r-lg px-4 py-3 2k:px-5 2k:py-4 4k:px-6 4k:py-5 text-white 2k:text-lg 4k:text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10`}
                            placeholder={selectedCountry.code === '+972' ? '54-232-7876' : '(555) 123-4567'}
                            value={phone}
                            onChange={handlePhoneChange}
                            required
                            aria-label="Phone number"
                            aria-describedby="phone-error"
                            autoComplete="tel"
                          />
                          {phone && !formErrors.phone && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      {formErrors.phone && (
                        <p id="phone-error" className="text-red-500 text-xs mt-2 text-left">{formErrors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm 2k:text-base 4k:text-lg font-medium text-gray-300 mb-1 2k:mb-2 4k:mb-3">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 2k:px-5 2k:py-4 4k:px-6 4k:py-5 text-white 2k:text-lg 4k:text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Tell us about your project..."
                        required
                      ></textarea>
                    </div>
                    
                    <div className="mt-8 2k:mt-10 4k:mt-12">
                      <button
                        type="submit"
                        className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 2k:py-4 2k:px-8 4k:py-5 4k:px-10 rounded-lg 2k:text-xl 4k:text-2xl transition-all duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 2k:h-6 2k:w-6 4k:h-8 4k:w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </section>
          </main>
        )}
      </div>
    </>
  );
}
