"use client";

import React from 'react';

const ProjectStyles: React.FC = () => {
  return (
    <style jsx global>{`
      /* Global Styles */
      html {
        scroll-behavior: smooth;
      }

      body {
        overflow-x: hidden;
      }

      /* Animations */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideInFromBottom {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      @keyframes slideInFromLeft {
        from { transform: translateX(-50px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }

      @keyframes slideInFromRight {
        from { transform: translateX(50px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }

      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }

      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* Faceted card animations */
      @keyframes facetedGradientShift {
        0% { 
          background-position: 0% 50%;
          transform: scale(1);
          filter: brightness(0.9) contrast(1.1);
        }
        25% {
          filter: brightness(1.1) contrast(1.2);
        }
        50% { 
          background-position: 100% 50%;
          transform: scale(1.05);
          filter: brightness(1.2) contrast(1.3);
        }
        75% {
          filter: brightness(1.1) contrast(1.2);
        }
        100% { 
          background-position: 0% 50%;
          transform: scale(1);
          filter: brightness(0.9) contrast(1.1);
        }
      }

      @keyframes facetedShine {
        0% {
          opacity: 0;
          transform: translateY(-100%) translateX(-100%) rotate(45deg);
        }
        50% {
          opacity: 0.5;
        }
        100% {
          opacity: 0;
          transform: translateY(100%) translateX(100%) rotate(45deg);
        }
      }

      .project-card {
        position: relative;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      .project-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%);
        opacity: 0;
        transition: opacity 0.5s ease;
        z-index: 1;
        pointer-events: none;
      }

      .project-card:hover::before {
        opacity: 0.5;
        animation: facetedShine 2s infinite;
      }

      .project-card .faceted-bg {
        position: absolute;
        inset: -1px;
        background: linear-gradient(135deg, rgba(147,51,234,0.3), rgba(59,130,246,0.3), rgba(147,51,234,0.3));
        background-size: 200% 200%;
        border-radius: 0.75rem;
        opacity: 0;
        transition: opacity 0.5s ease;
        filter: blur(12px);
        z-index: -1;
        pointer-events: none;
      }

      .project-card:hover .faceted-bg {
        opacity: 0.8;
        animation: facetedGradientShift 8s ease infinite;
      }

      .project-card .faceted-overlay {
        position: absolute;
        inset: 0;
        background-image: 
          linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.05) 25%, 
          rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, 
          rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05));
        background-size: 40px 40px;
        border-radius: 0.75rem;
        opacity: 0;
        transition: opacity 0.5s ease, background-position 8s linear;
        z-index: 1;
        pointer-events: none;
      }

      .project-card:hover .faceted-overlay {
        opacity: 0.3;
        background-position: 100px 100px;
      }

      /* Bento Box Styles */
      .bento-box {
        position: relative;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }

      .bento-box::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%);
        opacity: 0;
        transition: opacity 0.5s ease;
        z-index: 2;
        pointer-events: none;
        border-radius: inherit;
      }

      .bento-box:hover::before {
        opacity: 0.5;
        animation: facetedShine 2s infinite;
      }

      .bento-box .faceted-bg {
        position: absolute;
        inset: -1px;
        background: linear-gradient(135deg, rgba(147,51,234,0.3), rgba(59,130,246,0.3), rgba(147,51,234,0.3));
        background-size: 200% 200%;
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.5s ease;
        filter: blur(12px);
        z-index: 0;
        pointer-events: none;
      }

      .bento-box:hover .faceted-bg {
        opacity: 0.8;
        animation: facetedGradientShift 8s ease infinite;
      }

      .bento-box .faceted-overlay {
        position: absolute;
        inset: 0;
        background-image: 
          linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.05) 25%, 
          rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, 
          rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05));
        background-size: 40px 40px;
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.5s ease, background-position 8s linear;
        z-index: 1;
        pointer-events: none;
      }

      .bento-box:hover .faceted-overlay {
        opacity: 0.3;
        background-position: 100px 100px;
      }

      /* Arrow button animation */
      .arrow-button {
        overflow: hidden;
        position: relative;
        z-index: 10;
        transition: all 0.3s ease;
      }

      .arrow-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        transform: scale(0);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      .arrow-button:hover::before {
        transform: scale(1.5);
      }

      .arrow-button .arrow-icon {
        transition: transform 0.3s ease;
      }

      .arrow-button:hover .arrow-icon {
        transform: translate(2px, -2px);
      }

      .arrow-button:active {
        transform: scale(0.95);
        box-shadow: 0 0 15px rgba(147, 51, 234, 0.5);
      }

      .project-card:hover .arrow-button {
        box-shadow: 0 0 20px rgba(147, 51, 234, 0.7);
      }

      /* Other animations */
      .animate-gradient-shift {
        background-size: 200% 200%;
        animation: gradientShift 8s ease infinite;
      }

      .hover-scale {
        transition: transform 0.3s ease-in-out;
      }

      .hover-scale:hover {
        transform: scale(1.02);
      }

      .metallic-shine {
        position: relative;
        overflow: hidden;
      }

      .metallic-shine::after {
        content: '';
        position: absolute;
        top: -100%;
        left: -100%;
        width: 50%;
        height: 50%;
        background: linear-gradient(
          to bottom right,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.1) 100%
        );
        transform: rotate(45deg);
        transition: all 0.5s ease;
      }

      .metallic-shine:hover::after {
        top: 100%;
        left: 100%;
      }

      /* Scroll Reveal Animation */
      .scroll-reveal {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }

      .scroll-reveal.revealed {
        opacity: 1;
        transform: translateY(0);
      }

      /* Arrow Animation */
      .arrow-animation {
        position: absolute;
        width: 50px;
        height: 50px;
        border-top: 2px solid rgba(147, 51, 234, 0.5);
        border-right: 2px solid rgba(147, 51, 234, 0.5);
        transform: rotate(-45deg);
        animation: arrow-wave 2s infinite;
        opacity: 0.6;
      }

      .arrow-animation.right {
        transform: rotate(135deg);
      }

      .arrow-animation::before,
      .arrow-animation::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-top: 2px solid rgba(147, 51, 234, 0.5);
        border-right: 2px solid rgba(147, 51, 234, 0.5);
        animation: arrow-wave 2s infinite;
      }

      .arrow-animation::before {
        right: 10px;
        top: -10px;
        animation-delay: 0.2s;
      }

      .arrow-animation::after {
        right: 20px;
        top: -20px;
        animation-delay: 0.4s;
      }

      @keyframes arrow-wave {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 0.5;
        }
        100% {
          opacity: 0;
        }
      }

      /* Purple Glow Effect */
      .purple-glow {
        text-shadow: 0 0 10px rgba(147, 51, 234, 0.5);
      }

      /* Blur animations */
      @keyframes blur-in {
        from {
          opacity: 0;
          filter: blur(20px);
        }
        to {
          opacity: 1;
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
    `}</style>
  );
};

export default ProjectStyles;
