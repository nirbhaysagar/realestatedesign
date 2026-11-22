// Poperty - Architectural Real Estate Interactive Engine

const propertiesData = [
  {
    title: "Commercial Spaces",
    desc: "Functional, inspiring environments engineered for modern teams and creative agencies. Features triple-height ceilings, glass partition walls, and private landscaped courtyard access.",
    price: "Custom Leasing / $3.2M Purchase",
    location: "Austin, TX • Innovation District",
    beds: "N/A (Open Floor)",
    baths: "4 Washrooms",
    sqft: "6,400 Sq. Ft.",
    image: "images/listing-commercial.jpg"
  },
  {
    title: "Modern 3-Bedroom Villa in Downtown",
    desc: "A masterpiece of contemporary residential architecture with polished concrete accents, recessed ambient perimeter lighting, bespoke Italian cabinetry, and a private plunge pool.",
    price: "$450,000",
    location: "Miami, FL • Prime Downtown Enclave",
    beds: "3 Beds",
    baths: "2 Baths",
    sqft: "1,800 Sq. Ft.",
    image: "images/listing-villa.jpg"
  },
  {
    title: "Interior Architecture Residence",
    desc: "Seamlessly integrating historic arched colonnades with ultra-clean modern minimalism. Natural stone finishes, custom brass hardware, and museum-grade gallery lighting.",
    price: "$890,000",
    location: "Austin, TX • Historic Heights",
    beds: "4 Beds",
    baths: "3 Baths",
    sqft: "2,450 Sq. Ft.",
    image: "images/listing-interior.jpg"
  },
  {
    title: "Skyline Penthouse Loft",
    desc: "Perched high above the city skyline featuring 360-degree panoramic glass walls, wrap-around sunset terrace, private elevator foyer, and a custom marble wine cellar.",
    price: "$1,450,000",
    location: "Chicago, IL • Lakeshore Core",
    beds: "4 Beds",
    baths: "3 Baths",
    sqft: "2,650 Sq. Ft.",
    image: "images/listing-penthouse.jpg"
  },
  {
    title: "Minimalist Waterfront Sanctuary",
    desc: "Direct private ocean access with floor-to-ceiling glass pavilions. Sustainable geothermal climate control, Japanese courtyard zen garden, and heated infinity pool.",
    price: "$2,750,000",
    location: "Malibu, CA • Pacific Coast Reserve",
    beds: "5 Beds",
    baths: "4 Baths",
    sqft: "4,100 Sq. Ft.",
    image: "images/listing-waterfront.jpg"
  },
  {
    title: "Geometric Concrete Residence",
    desc: "A bold brutalist design celebrating tactile cast-in-place concrete, oversized floor-to-ceiling pivot windows, and uninterrupted panoramic views of the Rocky Mountains.",
    price: "$1,980,000",
    location: "Boulder, CO • Alpine Ridge",
    beds: "4 Beds",
    baths: "4 Baths",
    sqft: "3,600 Sq. Ft.",
    image: "images/partner-brutalist.jpg"
  }
];

// Carousel Navigation (only active on index.html)
const prevBtn = document.getElementById('prevSlideBtn');
const nextBtn = document.getElementById('nextSlideBtn');
const counterLabel = document.getElementById('carouselCounter');
const listingsTrack = document.getElementById('listingsTrack');

if (listingsTrack && prevBtn && nextBtn) {
  const allCards = listingsTrack.querySelectorAll('.listing-card');
  let currentSlideIndex = 1;
  const totalSlides = allCards.length;

  function updateCarouselView() {
    allCards.forEach((card, idx) => {
      if (idx >= currentSlideIndex && idx < currentSlideIndex + 3) {
        card.style.display = 'block';
      } else if (currentSlideIndex + 3 > totalSlides && idx < (currentSlideIndex + 3) % totalSlides) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    const formattedNum = String(currentSlideIndex + 1).padStart(2, '0');
    if (counterLabel) {
      counterLabel.textContent = `(${formattedNum}) Featured Listings`;
    }
  }

  updateCarouselView();

  nextBtn.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % (totalSlides - 2);
    updateCarouselView();
  });

  prevBtn.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex - 1 + (totalSlides - 2)) % (totalSlides - 2);
    updateCarouselView();
  });
}

// Smooth scroll helper
function scrollToFeatured() {
  const el = document.getElementById('featured');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Modal Functions
function openPropertyModal(index) {
  const data = propertiesData[index] || propertiesData[0];
  const t = document.getElementById('modalTitle');
  const d = document.getElementById('modalDesc');
  const p = document.getElementById('modalPrice');
  const l = document.getElementById('modalLocation');
  const bd = document.getElementById('modalBeds');
  const ba = document.getElementById('modalBaths');
  const s = document.getElementById('modalSqft');
  const im = document.getElementById('modalImg');

  if (t) t.textContent = data.title;
  if (d) d.textContent = data.desc;
  if (p) p.textContent = data.price;
  if (l) l.textContent = data.location;
  if (bd) bd.textContent = data.beds;
  if (ba) ba.textContent = data.baths;
  if (s) s.textContent = data.sqft;
  if (im) im.src = data.image;

  const modal = document.getElementById('propertyModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePropertyModal() {
  const modal = document.getElementById('propertyModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeModalOnBackdrop(event) {
  if (event.target.id === 'propertyModal') {
    closePropertyModal();
  }
}

// ESC key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePropertyModal();
});

// Inline VIP Tour Submission Handler
function handleTourSubmit(event) {
  event.preventDefault();
  const nameEl = document.getElementById('tourName');
  const contactEl = document.getElementById('tourContact');
  const interestEl = document.getElementById('tourInterest');
  const feedback = document.getElementById('formFeedback');

  if (!nameEl || !contactEl || !feedback) return;

  const name = nameEl.value.trim();
  const contact = contactEl.value.trim();
  const interest = interestEl ? interestEl.value.trim() : '';

  if (!name || !contact) {
    feedback.className = 'form-feedback error';
    feedback.style.display = 'block';
    feedback.textContent = 'Please enter your name and email or phone.';
    return;
  }

  feedback.className = 'form-feedback';
  feedback.style.display = 'block';
  feedback.textContent = '✓ Private tour requested! Our advisor will contact you within 2 hours.';

  nameEl.value = '';
  contactEl.value = '';
  if (interestEl) interestEl.value = '';
}
