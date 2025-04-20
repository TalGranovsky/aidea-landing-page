'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';

interface EmailDomainSuggestionsProps {
  email: string;
  onSelectDomain: (fullEmail: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  className?: string;
}

// List of common email domains
const EMAIL_DOMAINS = [
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

export default function EmailDomainSuggestions({ 
  email, 
  onSelectDomain,
  inputRef,
  className = ''
}: EmailDomainSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Generate suggestions based on the email input
  useEffect(() => {
    if (!email.includes('@')) {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    const [localPart, domainPart] = email.split('@');
    
    // If there's nothing after @, show all domains
    if (!domainPart) {
      setSuggestions(EMAIL_DOMAINS.map(domain => `${localPart}@${domain}`));
      return;
    }
    
    // Filter domains based on what the user has typed after @
    const matchingDomains = EMAIL_DOMAINS.filter(domain => 
      domain.toLowerCase().startsWith(domainPart.toLowerCase())
    );
    
    // If there are matching domains, create full email suggestions
    if (matchingDomains.length > 0) {
      setSuggestions(matchingDomains.map(domain => `${localPart}@${domain}`));
    } else {
      setSuggestions([]);
    }
    
    // Reset selected index when suggestions change
    setSelectedIndex(-1);
  }, [email]);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!suggestions.length) return;
    
    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    }
    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    }
    // Enter
    else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      onSelectDomain(suggestions[selectedIndex]);
    }
    // Escape
    else if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  // Add event listener for keyboard navigation
  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('keydown', handleKeyDown as any);
      return () => {
        inputElement.removeEventListener('keydown', handleKeyDown as any);
      };
    }
  }, [suggestions, selectedIndex, inputRef, handleKeyDown]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef]);

  // If no suggestions, don't render anything
  if (!suggestions.length) return null;

  return (
    <div 
      ref={suggestionsRef}
      className={`absolute z-10 mt-1 w-full bg-black/90 border border-purple-500/30 rounded-md shadow-lg max-h-60 overflow-y-auto ${className}`}
      role="listbox"
      aria-label="Email domain suggestions"
    >
      <ul className="py-1">
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion}
            className={`px-4 py-2 text-sm cursor-pointer ${
              index === selectedIndex 
                ? 'bg-purple-700/50 text-white' 
                : 'text-gray-300 hover:bg-purple-700/30'
            }`}
            onClick={() => onSelectDomain(suggestion)}
            onMouseEnter={() => setSelectedIndex(index)}
            role="option"
            aria-selected={index === selectedIndex}
            tabIndex={0}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}
