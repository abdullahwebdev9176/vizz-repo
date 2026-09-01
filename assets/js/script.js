/**
 * Vizz Web - Custom Web Development
 * Interactive Script: FAQ Accordion & Form Enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
  // FAQ Accordion Logic
  const faqButtons = document.querySelectorAll('.faq-question-btn');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.closest('.faq-item');
      const isCurrentlyActive = faqItem.classList.contains('active');

      // Close all other FAQ items for a clean single-open accordion
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const btn = item.querySelector('.faq-question-btn');
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
        }
      });

      // If clicked item was closed, open it
      if (!isCurrentlyActive) {
        faqItem.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Smooth scroll handler for all lead form triggers
  const leadTriggers = document.querySelectorAll('a[href^="#lead-form"]');
  leadTriggers.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetElement = document.getElementById('lead-form');
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        
        // Focus first input for enhanced accessibility and conversion
        const firstInput = targetElement.querySelector('input');
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 600);
        }
      }
    });
  });
});