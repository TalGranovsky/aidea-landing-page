'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Playfair_Display } from 'next/font/google';
import { useRouter } from 'next/navigation';

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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Country code selection state
  const [selectedCountry, setSelectedCountry] = useState({ code: '+1', name: 'United States' });
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [phone, setPhone] = useState('');

  // Ensure scroll position is at the top when this page loads
  useEffect(() => {
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
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
    if (href === '/lets-begin') return; // Already on this page
    
    setIsTransitioning(true);
    setTransitionTarget(href);
    
    setTimeout(() => {
      router.push(href);
    }, 500); // Match this with your CSS transition time
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill out all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return;
    }
    
    // Clear any previous errors
    setFormError('');
    
    // Simulate form submission
    setTimeout(() => {
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
      
      // Reset form after showing success message
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }, 1000);
  };

  // List of countries with country codes
  const countries = [
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Your Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="john@example.com"
                          required
                        />
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
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                      <div className="flex">
                        <div className="relative">
                          <button
                            type="button"
                            className="flex items-center justify-between bg-black/50 border border-gray-700 rounded-l-lg px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                          >
                            <span>{selectedCountry.code}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {countryDropdownOpen && (
                            <div className="absolute z-10 mt-1 w-60 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                              <div className="p-2">
                                <input
                                  type="text"
                                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                  placeholder="Search countries..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
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
                                    }}
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
                        
                        <input
                          type="tel"
                          className="flex-1 bg-black/50 border border-gray-700 border-l-0 rounded-r-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="(555) 123-4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
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
                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                      >
                        <span>Send Message</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
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
