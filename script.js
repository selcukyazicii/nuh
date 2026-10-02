/* =========================================================
   NUH YAPI İNŞAAT - ANA JAVASCRIPT DOSYASI
   İçerik: Navbar scroll efekti, mobil menü, scroll animasyonları,
   sayaç (counter) animasyonu ve iletişim formu
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. NAVBAR: SCROLL SONRASI ARKA PLAN DEĞİŞİMİ ---------- */
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 60; // px cinsinden - bu değerden sonra navbar beyazlaşır

  const handleNavbarScroll = () => {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // sayfa yenilendiğinde mevcut konumu kontrol et

  /* ---------- 2. MOBİL HAMBURGER MENÜ ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  navToggle.addEventListener('click', toggleMenu);

  // Bir linke tıklanınca mobil menüyü kapat
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });

  /* ---------- 3. SCROLL ANİMASYONLARI (INTERSECTION OBSERVER) ---------- */
  const animatedElements = document.querySelectorAll('[data-animate]');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // her eleman sadece bir kez animasyonlanır
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  animatedElements.forEach((el) => revealObserver.observe(el));

  /* ---------- 4. SAYAÇ (COUNTER) ANİMASYONU ---------- */
  const statNumbers = document.querySelectorAll('.stat__number');
  const statsContainer = document.querySelector('.stats');

  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 1800; // ms
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuad ile yumuşak bir yavaşlama efekti
      const eased = 1 - (1 - progress) * (1 - progress);
      element.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(step);
  };

  if (statsContainer) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            statNumbers.forEach((num) => animateCounter(num));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    statsObserver.observe(statsContainer);
  }

  /* ---------- 5. İLETİŞİM FORMU (FRONT-END SİMÜLASYONU) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Basit alan kontrolü (gerçek backend bağlanana kadar placeholder)
      if (!contactForm.checkValidity()) {
        formStatus.textContent = 'Lütfen tüm alanları eksiksiz doldurun.';
        formStatus.style.color = '#c0392b';
        return;
      }

      // NOT: Burada gerçek bir sunucu/e-posta servisi entegrasyonu yapılacaktır.
      formStatus.textContent = 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.';
      formStatus.style.color = '';
      contactForm.reset();
    });
  }

  /* ---------- 6. FOOTER: GÜNCEL YIL ---------- */
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ---------- 7. PROJE GALERİSİ (img/ klasörlerinden gerçek görseller) ---------- */
  // IMG_XXXX.JPG şeklinde sıralı dosya adları üreten yardımcı fonksiyon
  const imgRange = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => `IMG_${String(start + i).padStart(4, '0')}.JPG`);

  const PROJECTS = {
    ormanyaka: {
      title: 'Devam Eden Projemiz - Ormanyaka',
      folder: 'img/Ormanyaka',
      images: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'],
    },
    atayurt: {
      title: 'Atayurt Sitesi',
      folder: 'img/Atayurt Sitesi(2012)',
      images: ['CPUH9530.JPG', 'FYTY2329.JPG'],
    },
    begonya: {
      title: 'Begonya Villaları',
      folder: 'img/Begonya Villaları(2001)',
      images: imgRange(253, 260),
    },
    buket: {
      title: 'Buket Apartmanı',
      folder: 'img/Buket Apartmanı(1983)',
      images: imgRange(299, 303),
    },
    aliaksakal: {
      title: 'Ali Aksakal Apartmanı',
      folder: 'img/AliAksakalApt',
      images: imgRange(311, 324),
    },
    asici: {
      title: 'Aşıcı Apartmanı',
      folder: 'img/Aşıcı Apartmanı(2009)',
      images: [
        'WhatsApp Image 2019-08-27 at 19.25.11.jpeg',
        'WhatsApp Image 2019-08-27 at 19.25.12 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 19.25.13 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 19.25.13.jpeg',
      ],
    },
    burak: {
      title: 'Burak Apartmanı',
      folder: 'img/Burak Apartmanı(1982)',
      images: imgRange(279, 285),
    },
    esentepe: {
      title: 'Esentepe Evleri',
      folder: 'img/Esentepe Evleri(2019)',
      images: [
        'AKYO1984.JPG', 'BZFL9590.JPG', 'DGXE6066.JPG', 'EDUA4752.JPG', 'EOXA9982.JPG',
        'FDZX4309.JPG', 'GSPM2924.JPG', 'HEXI4039.JPG', 'IKDT8674.JPG',
        'WhatsApp Image 2019-08-27 at 19.25.20.jpeg',
        'WhatsApp Image 2019-08-27 at 19.25.21 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 19.25.21.jpeg',
        'WhatsApp Image 2019-08-27 at 19.25.22 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 19.25.22.jpeg',
        'WhatsApp Image 2019-08-27 at 19.26.34.jpeg',
        'WhatsApp Image 2019-08-27 at 19.26.35.jpeg',
        'WhatsApp Image 2019-08-27 at 19.26.38.jpeg',
        'WhatsApp Image 2019-08-27 at 19.26.39.jpeg',
        'WhatsApp Image 2019-08-27 at 19.26.40 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 19.26.40.jpeg',
        'WhatsApp Image 2019-08-27 at 19.26.41.jpeg',
      ],
    },
    kaptaniderya: {
      title: 'Kaptanıderya',
      folder: 'img/Kaptaniderya',
      images: ['kaptaniderya.jpeg'],
    },
    gunes: {
      title: 'Güneş Sitesi',
      folder: 'img/Güneş Sitesi',
      images: [
        'WhatsApp Image 2019-08-27 at 20.08.57 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 20.08.57 (2).jpeg',
        'WhatsApp Image 2019-08-27 at 20.08.57.jpeg',
        'WhatsApp Image 2019-08-27 at 20.08.58.jpeg',
        'WhatsApp Image 2019-08-27 at 20.08.59 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 20.08.59.jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.00 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.00.jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.01 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.01.jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.02 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.02.jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.03.jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.04.jpeg',
      ],
    },
    nuhoglu1992: {
      title: 'Nuhoğlu Apartmanı (1992)',
      folder: 'img/Nuhoğlu Apartmanı(1992)',
      images: imgRange(273, 277),
    },
    nuhoglu2006: {
      title: 'Nuhoğlu Apartmanı (2006)',
      folder: 'img/Nuhoğlu Apartmanı (2006)',
      images: imgRange(304, 308),
    },
    ormanyakavillalari: {
      title: 'Ormanyaka Villaları',
      folder: 'img/Ormanyaka2',
      images: Array.from({ length: 14 }, (_, i) => `${i + 1}.jpeg`),
    },
    safran: {
      title: 'Safran Villaları',
      folder: 'img/Safran Villaları(2011)',
      images: [
        'WhatsApp Image 2019-08-27 at 19.26.43 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 19.26.43.jpeg',
        'WhatsApp Image 2019-08-27 at 19.26.44.jpeg',
        'WhatsApp Image 2019-08-27 at 19.26.45.jpeg',
        'WhatsApp Image 2019-08-27 at 19.26.47.jpeg',
        'WhatsApp Image 2019-08-27 at 19.26.48 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 19.26.48.jpeg',
        'WhatsApp Image 2019-08-27 at 20.06.39 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 20.06.39.jpeg',
        'WhatsApp Image 2019-08-27 at 20.06.40 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 20.06.40.jpeg',
        'WhatsApp Image 2019-08-27 at 20.06.41 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 20.06.41.jpeg',
        'WhatsApp Image 2019-08-27 at 20.08.56 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 20.08.56.jpeg',
      ],
    },
    yagmur: {
      title: 'Yağmur Sitesi',
      folder: 'img/Yağmur Sitesi(2011)',
      images: [
        'WhatsApp Image 2019-08-27 at 20.09.05.jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.07.jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.09 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.09 (2).jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.09.jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.10 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.10 (2).jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.10.jpeg',
        'WhatsApp Image 2019-08-27 at 20.09.11.jpeg',
        'WhatsApp Image 2019-08-27 at 20.10.08.jpeg',
        'WhatsApp Image 2019-08-27 at 20.10.10 (1).jpeg',
        'WhatsApp Image 2019-08-27 at 20.10.10.jpeg',
      ],
    },
  };

  const buildImagePath = (folder, file) => encodeURI(`${folder}/${file}`);

  const galleryModal = document.getElementById('galleryModal');
  const galleryTitle = document.getElementById('galleryModalTitle');
  const galleryCounter = document.getElementById('galleryCounter');
  const galleryMainImg = document.getElementById('galleryMainImg');
  const galleryThumbs = document.getElementById('galleryThumbs');

  let currentImages = [];
  let currentIndex = 0;

  const updateThumbActive = () => {
    galleryThumbs.querySelectorAll('.gallery-modal__thumb').forEach((thumb, i) => {
      thumb.classList.toggle('is-active', i === currentIndex);
    });
  };

  const showImage = (index) => {
    if (!currentImages.length) return;
    currentIndex = (index + currentImages.length) % currentImages.length;
    galleryMainImg.src = currentImages[currentIndex];
    galleryCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    updateThumbActive();
  };

  const renderThumbs = () => {
    galleryThumbs.innerHTML = '';
    currentImages.forEach((src, i) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'gallery-modal__thumb';
      thumb.innerHTML = `<img src="${src}" alt="" loading="lazy">`;
      thumb.addEventListener('click', () => showImage(i));
      galleryThumbs.appendChild(thumb);
    });
  };

  const openGallery = (key, startIndex = 0) => {
    const project = PROJECTS[key];
    if (!project || !galleryModal) return;

    currentImages = project.images.map((file) => buildImagePath(project.folder, file));
    galleryTitle.textContent = project.title;
    renderThumbs();
    showImage(startIndex);

    galleryModal.classList.add('is-open');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    if (!galleryModal) return;
    galleryModal.classList.remove('is-open');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Proje kartlarındaki kapak görsellerini de ilgili klasördeki ilk fotoğrafla eşleştir
  document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    const project = PROJECTS[card.dataset.project];
    if (!project || !project.images.length) return;
    const img = card.querySelector('.project-card__image img');
    if (img) {
      img.src = buildImagePath(project.folder, project.images[0]);
    }
  });

  document.querySelectorAll('.js-gallery-btn').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const startIndex = btn.dataset.index ? parseInt(btn.dataset.index, 10) : 0;
      openGallery(btn.dataset.project, startIndex);
    });
  });

  if (galleryModal) {
    galleryModal.querySelectorAll('[data-gallery-close]').forEach((el) => {
      el.addEventListener('click', closeGallery);
    });
    galleryModal.querySelector('[data-gallery-prev]').addEventListener('click', () => showImage(currentIndex - 1));
    galleryModal.querySelector('[data-gallery-next]').addEventListener('click', () => showImage(currentIndex + 1));

    document.addEventListener('keydown', (event) => {
      if (!galleryModal.classList.contains('is-open')) return;
      if (event.key === 'Escape') closeGallery();
      if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (event.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  }

});
