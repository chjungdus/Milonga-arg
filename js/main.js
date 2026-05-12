/* ── Hamburger Menu ── */
const burger    = document.getElementById('burger')
const mobileNav = document.getElementById('mobile-nav')

burger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open')
  burger.classList.toggle('active')
  burger.setAttribute('aria-expanded', isOpen)
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

document.querySelectorAll('#mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open')
    burger.classList.remove('active')
    burger.setAttribute('aria-expanded', 'false')
    document.body.style.overflow = ''
  })
})

/* ── Navbar Scroll Effect ── */
const navbar    = document.getElementById('navbar')
const scrollTop = document.getElementById('scroll-top')

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(10,22,40,0.98)'
    navbar.style.boxShadow  = '0 2px 24px rgba(0,0,0,0.5)'
  } else {
    navbar.style.background = 'rgba(10,22,40,0.85)'
    navbar.style.boxShadow  = 'none'
  }
  scrollTop.classList.toggle('visible', window.scrollY > 400)
}, { passive: true })

scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

/* ── Intersection Observer: Fade-in ── */
const fadeEls = document.querySelectorAll('.fade-in')
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible')
      }, i * 80)
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

fadeEls.forEach(el => observer.observe(el))

/* ── Smooth Scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'))
    if (!target) return
    e.preventDefault()
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 70
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  })
})

/* ── Active Nav Link highlight on scroll ── */
const sections = document.querySelectorAll('section[id]')
const navLinks  = document.querySelectorAll('.nav-links a')

function updateActiveLink() {
  let current = ''
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100
    if (window.scrollY >= sectionTop) current = section.getAttribute('id')
  })
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--gold)'
      : ''
  })
}

window.addEventListener('scroll', updateActiveLink, { passive: true })
updateActiveLink()
