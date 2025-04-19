'use client';

import { useState, useEffect, useRef } from 'react';
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
    if (!localPart || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart)) {
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

  const handleSubmit = (e: React.FormEvent) => {
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
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
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
    }, 1500);
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
        <title>Let's Begin - AIDEA</title>
        <meta name="description" content="Start your journey with AIDEA - Your AI-powered creative agency" />
      </Head>

      <div className={`min-h-screen bg-black text-white ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        <Navbar onNavigate={handleNavigate} currentPath="/lets-begin" />
        
        {isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <main className="pt-24 pb-20">
            <section className="container mx-auto px-4 py-16 md:py-24">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${playfair.className} text-white leading-tight`}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Let's Begin</span> Your Journey
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                  Ready to transform your ideas into reality? Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 md:p-10 shadow-xl shadow-purple-900/10">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-gray-300">Your message has been sent successfully. We'll be in touch soon!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formError && (
                      <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-lg">
                        {formError}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address *</label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full bg-black/50 border ${formErrors.email ? 'border-red-500' : formData.email && !formErrors.email ? 'border-green-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10`}
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">Your Company</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Company Name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">Your Budget (Optional)</label>
                        <input
                          type="text"
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="$5,000 - $10,000"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number *</label>
                      <div className="flex">
                        <div className="relative">
                          <button
                            type="button"
                            className="flex items-center gap-2 bg-black/50 border border-gray-700 rounded-l-lg px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                            className={`w-full bg-black/50 border ${formErrors.phone ? 'border-red-500' : phone && !formErrors.phone ? 'border-green-500' : 'border-gray-700'} border-l-0 rounded-r-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10`}
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
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Tell us about your project..."
                        required
                      ></textarea>
                    </div>
                    
                    <div className="text-center">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 relative"
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
                        ) : (
                          <>
                            <span>Send Message</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </>
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
