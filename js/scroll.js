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

  function initScrollReveals() {
    // 1. Group Stagger Observer (Ensures clean left-to-right & sequential rendering)
    var revealGroups = document.querySelectorAll('.reveal-group');
    
    var groupObserver = new IntersectionObserver(function (entries, self) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var group = entry.target;
          var children = group.querySelectorAll('.reveal');
          children.forEach(function (child, index) {
            // Cascade animations in document order with responsive cap
            setTimeout(function () {
              child.classList.add('revealed');
            }, Math.min(index * 70, 420));
          });
          self.unobserve(group);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -35px 0px' });

    revealGroups.forEach(function (group) {
      // Find all direct grid elements or cards to animate
      var children = group.querySelectorAll(':scope > div, :scope > article, :scope > a, :scope > img, .team-card');
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
    }, { threshold: 0, rootMargin: '0px 0px -35px 0px' });

    standaloneElements.forEach(function (el) {
      // Check if element is already in viewport initially on page load
      var rect = el.getBoundingClientRect();
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      var windowWidth = window.innerWidth || document.documentElement.clientWidth;
      var inViewport = (
        rect.top < windowHeight - 35 &&
        rect.bottom > 0 &&
        rect.left < windowWidth &&
        rect.right > 0
      );
      if (inViewport) {
        requestAnimationFrame(function () {
          setTimeout(function () {
            el.classList.add('revealed');
          }, 50);
        });
      } else {
        standaloneObserver.observe(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveals);
  } else {
    initScrollReveals();
  }
})();
