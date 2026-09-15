document.addEventListener('DOMContentLoaded', () => {
  console.log('Isadora website loaded!');

  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const section = document.querySelector(href);
        section?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const btn = document.querySelector('.btn');
  if (btn) {
    btn.addEventListener('click', () => {
      alert('🚀 Проект успешно запущен на Netlify!');
    });
  }
});
