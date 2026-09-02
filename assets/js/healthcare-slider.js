/**
 * Vizz Web Solutions - Healthcare Page Script
 * Page: healthcare.html
 * Functionality:
 * 1. Smooth-scrolling lead form triggers with auto input focus.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll handler for all lead form triggers
  const leadTriggers = document.querySelectorAll('a[href^="#lead-form"]');

  leadTriggers.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetElement = document.getElementById('lead-form');
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        // Focus first input for enhanced accessibility and conversion
        const firstInput = targetElement.querySelector('input');
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 450);
        }
      }
    });
  });
});
