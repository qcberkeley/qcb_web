/**
 * QC@B Scroll Reveal & Stagger Cascade Engine
 * Automatically handles sequential left-to-right scroll reveals.
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var isBot = /bot|google|baidu|bing|msn|duckduckgo|teoma|slurp|yandex|lighthouse/i.test(navigator.userAgent) || navigator.webdriver;

  if (isBot) {
    document.documentElement.classList.add('bot-detected');
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('revealed');
      });
    });
    return;
  }



  // ── Scroll Reveal & Stagger Cascade ──────────────────────────────────────────────────
  if (prefersReducedMotion.matches) {
    return; // Fallback to CSS immediate visibility
  }

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Group Stagger Observer (Ensures strict left-to-right rendering)
    var revealGroups = document.querySelectorAll('.reveal-group');
    
    var groupObserver = new IntersectionObserver(function (entries, self) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var group = entry.target;
          var children = group.querySelectorAll('.reveal');
          children.forEach(function (child, index) {
            // Strictly cascade animations in document order
            setTimeout(function () {
              child.classList.add('revealed');
            }, index * 70); // 70ms stagger increment
          });
          self.unobserve(group);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    revealGroups.forEach(function (group) {
      // Find all direct grid elements or cards to animate
      var children = group.querySelectorAll(':scope > div, :scope > article, .team-card');
      children.forEach(function (child) {
        if (!child.classList.contains('reveal')) {
          child.classList.add('reveal');
        }
      });
      groupObserver.observe(group);
    });

    // 2. Standalone Reveal Observer (Elements not inside staggered groups)
    var standaloneElements = [];
    document.querySelectorAll('.reveal').forEach(function (el) {
      // Filter out elements that are inside staggered reveal-groups
      if (!el.closest('.reveal-group')) {
        standaloneElements.push(el);
      }
    });

    var standaloneObserver = new IntersectionObserver(function (entries, self) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          self.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

    standaloneElements.forEach(function (el) {
      // Check if element is already in viewport initially
      var rect = el.getBoundingClientRect();
      var inViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
      if (inViewport) {
        el.classList.add('revealed');
      } else {
        standaloneObserver.observe(el);
      }
    });
  });
})();
