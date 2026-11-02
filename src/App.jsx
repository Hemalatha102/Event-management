
import React, { useState } from "react";
import "./App.css";

const events = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    category: "Technology",
    date: "Nov 15, 2026",
    time: "10:00 AM",
    location: "Bengaluru, India",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85",
    description:
      "Explore emerging technologies, web development, cybersecurity, and innovative ideas with technology enthusiasts and industry professionals.",
    featured: true,
  },
  {
    id: 2,
    title: "Creative Arts Festival",
    category: "Arts",
    date: "Nov 20, 2026",
    time: "11:00 AM",
    location: "Chennai, India",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85",
    description:
      "Enjoy a colorful celebration of art, creativity, music, photography, and live performances by talented creators.",
    featured: false,
  },
  {
    id: 3,
    title: "Startup Networking Night",
    category: "Business",
    date: "Nov 25, 2026",
    time: "6:00 PM",
    location: "Hyderabad, India",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85",
    description:
      "Meet entrepreneurs, exchange ideas, discover new opportunities, and build valuable professional connections.",
    featured: true,
  },
  {
    id: 4,
    title: "Live Music Experience",
    category: "Music",
    date: "Dec 05, 2026",
    time: "5:30 PM",
    location: "Bengaluru, India",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
    description:
      "Experience an unforgettable evening of live music, energetic performances, great sound, and a lively crowd.",
    featured: false,
  },
  {
    id: 5,
    title: "Wellness & Yoga Retreat",
    category: "Wellness",
    date: "Dec 12, 2026",
    time: "7:00 AM",
    location: "Mysuru, India",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85",
    description:
      "Take a refreshing break with guided yoga, mindfulness sessions, breathing exercises, and wellness activities.",
    featured: false,
  },
  {
    id: 6,
    title: "Digital Design Workshop",
    category: "Technology",
    date: "Dec 18, 2026",
    time: "2:00 PM",
    location: "Chennai, India",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
    description:
      "Learn design thinking, user interface fundamentals, creative workflows, and practical tips for building better digital experiences.",
    featured: true,
  },
];

const categories = [
  "All Events",
  "Technology",
  "Arts",
  "Business",
  "Music",
  "Wellness",
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Events");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationEvent, setRegistrationEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [registrations, setRegistrations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("eventoraRegistrations")) || [];
    } catch {
      return [];
    }
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      category === "All Events" || event.category === category;

    const searchText =
      `${event.title} ${event.location} ${event.category}`.toLowerCase();

    return matchesCategory && searchText.includes(search.toLowerCase());
  });

  function openRegistration(event) {
    setSelectedEvent(null);
    setRegistrationEvent(event);
    setMessage("");
    setForm({ name: "", email: "", phone: "" });
  }

  function handleRegistration(e) {
    e.preventDefault();

    const newRegistration = {
      id: Date.now(),
      eventId: registrationEvent.id,
      eventTitle: registrationEvent.title,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      registeredAt: new Date().toLocaleString(),
    };

    const updatedRegistrations = [...registrations, newRegistration];

    setRegistrations(updatedRegistrations);

    try {
      localStorage.setItem(
        "eventoraRegistrations",
        JSON.stringify(updatedRegistrations)
      );
    } catch {
      // The registration remains visible in the current session.
    }

    setMessage(
      `You're registered for ${registrationEvent.title}!`
    );
    setRegistrationEvent(null);
    setForm({ name: "", email: "", phone: "" });
  }

  function closeMessage() {
    setMessage("");
  }

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-icon">✦</span>
          eventora<span className="brand-dot">.</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#events">Explore Events</a>
          <a href="#about">About</a>
        </nav>

        <a href="#events" className="nav-button">
          Find Events <span>↗</span>
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="live-dot"></span>
              YOUR NEXT GREAT EXPERIENCE STARTS HERE
            </div>

            <h1>
              Make time for
              <br />
              <span>something amazing.</span>
            </h1>

            <p className="hero-description">
              Discover inspiring events, meet incredible people,
              and create memories worth talking about.
            </p>

            <div className="hero-actions">
              <a href="#events" className="primary-button">
                Explore Events <span>→</span>
              </a>
              <a href="#about" className="text-button">
                Discover Eventora ↗
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>06</strong>
                <span>Curated events</span>
              </div>
              <div className="stat-divider"></div>
              <div>
                <strong>05</strong>
                <span>Categories</span>
              </div>
              <div className="stat-divider"></div>
              <div>
                <strong>∞</strong>
                <span>Possibilities</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <img
              className="hero-image"
              src={events[0].image}
              alt="People enjoying a live event"
            />

            <div className="floating-card floating-top">
              <span className="floating-icon">✦</span>
              <div>
                <strong>Find your people</strong>
                <small>Experiences that connect</small>
              </div>
            </div>

            <div className="floating-card floating-bottom">
              <span className="calendar-icon">▦</span>
              <div>
                <strong>Your next memory</strong>
                <small>It starts with one event.</small>
              </div>
            </div>

            <div className="hero-image-label">
              <span>01 / 06</span>
              <span>Experiences worth sharing</span>
            </div>
          </div>
        </section>

        <section className="events-section" id="events">
          <div className="section-heading">
            <div>
              <span className="section-kicker">THE GOOD STUFF</span>
              <h2>Find your next <span>favorite.</span></h2>
              <p>
                From big ideas to unforgettable nights, there is
                something waiting for you.
              </p>
            </div>

            <div className="event-count">
              <strong>{filteredEvents.length.toString().padStart(2, "0")}</strong>
              <span>EVENTS FOUND</span>
            </div>
          </div>

          <div className="search-filter-row">
            <div className="search-box">
              <span className="search-icon">⌕</span>
              <input
                type="text"
                placeholder="Search events, places..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search events"
              />
              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="category-list">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`category-button ${
                    category === item ? "active" : ""
                  }`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="event-grid">
              {filteredEvents.map((event) => (
                <article className="event-card" key={event.id}>
                  <div className="event-image-wrap">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="event-image"
                      loading="lazy"
                    />

                    <span className="event-category">
                      {event.category}
                    </span>

                    {event.featured && (
                      <span className="featured-label">✦ FEATURED</span>
                    )}
                  </div>

                  <div className="event-card-content">
                    <div className="event-date">
                      <span>▦</span> {event.date} <span className="date-dot">·</span> {event.time}
                    </div>

                    <h3>{event.title}</h3>

                    <p className="event-location">
                      <span>⌖</span> {event.location}
                    </p>

                    <p className="event-description">
                      {event.description}
                    </p>

                    <div className="event-card-footer">
                      <div className="event-price">
                        <span>ENTRY FROM</span>
                        <strong>₹{event.price}</strong>
                      </div>

                      <button
                        className="details-button"
                        onClick={() => setSelectedEvent(event)}
                      >
                        View Details <span>↗</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>⌕</span>
              <h3>No events found</h3>
              <p>Try another search term or choose a different category.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All Events");
                }}
              >
                Show All Events
              </button>
            </div>
          )}
        </section>

        <section className="cta-section" id="about">
          <div className="cta-decoration">✳</div>
          <span className="section-kicker">LIFE HAPPENS OUT THERE</span>
          <h2>Don't just scroll through life. <span>Show up.</span></h2>
          <p>
            Your next story, new connection, or big idea could begin
            at an event. Find yours today.
          </p>
          <a href="#events" className="cta-button">
            Find Your Next Event <span>→</span>
          </a>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="brand footer-brand">
          <span className="brand-icon">✦</span>
          eventora<span className="brand-dot">.</span>
        </a>
        <p>Made for moments that matter.</p>
        <span>© 2026 Eventora · Frontend Demo</span>
      </footer>

      {selectedEvent && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedEvent(null);
          }}
        >
          <div className="modal event-modal">
            <button
              className="modal-close"
              onClick={() => setSelectedEvent(null)}
              aria-label="Close event details"
            >
              ×
            </button>

            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="modal-image"
            />

            <div className="modal-content">
              <span className="section-kicker">
                {selectedEvent.category} EVENT
              </span>
              <h2>{selectedEvent.title}</h2>
              <p className="modal-description">
                {selectedEvent.description}
              </p>

              <div className="detail-list">
                <div><span>▦</span><div><small>DATE & TIME</small><strong>{selectedEvent.date} · {selectedEvent.time}</strong></div></div>
                <div><span>⌖</span><div><small>LOCATION</small><strong>{selectedEvent.location}</strong></div></div>
                <div><span>₹</span><div><small>ENTRY PRICE</small><strong>₹{selectedEvent.price} per person</strong></div></div>
              </div>

              <button
                className="primary-button modal-register"
                onClick={() => openRegistration(selectedEvent)}
              >
                Register for This Event <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {registrationEvent && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setRegistrationEvent(null);
          }}
        >
          <div className="modal registration-modal">
            <button
              className="modal-close"
              onClick={() => setRegistrationEvent(null)}
              aria-label="Close registration"
            >
              ×
            </button>

            <span className="section-kicker">SAVE YOUR SPOT</span>
            <h2>Join the experience.</h2>
            <p className="registration-subtitle">
              Register for <strong>{registrationEvent.title}</strong>
            </p>

            <form onSubmit={handleRegistration} className="registration-form">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                minLength={2}
                required
              />

              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />

              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                pattern="[0-9+() -]{7,20}"
                title="Enter a valid phone number"
                required
              />

              <div className="registration-summary">
                <span>Entry price</span>
                <strong>₹{registrationEvent.price}</strong>
              </div>

              <button type="submit" className="primary-button modal-register">
                Confirm Registration <span>→</span>
              </button>

              <p className="privacy-note">
                Demo registration only. No payment is collected.
              </p>
            </form>
          </div>
        </div>
      )}

      {message && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>You're on the list!</h2>
            <p>{message}</p>
            <p className="success-note">
              Your registration is saved in this browser.
            </p>
            <button className="primary-button" onClick={closeMessage}>
              Wonderful! <span>✦</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
