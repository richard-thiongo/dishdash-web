import { ArrowRight, CheckCircle, Mail, MapPin, Phone, Shield, Star, Truck, Utensils, ShoppingBasket } from "lucide-react";
import React, { useEffect } from "react";

const LandingPage = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-zoom, .reveal-fade');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Uncomment next line to only animate once
            // observer.unobserve(entry.target);
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-vh-100">
      {/* navbar */}
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm glass fixed-top" style={{ zIndex: 1030 }}>
        <div className="container">
          <div className="navbar-brand d-flex align-items-center">
            <div className="bg-success rounded-circle p-2 me-2">
              <Utensils className="text-white" size={24} />
            </div>
            <span className="fw-bold fs-4 text-success">DishDash</span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#services" className="nav-link">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a href="/login" className="btn btn-success text-white px-4 ms-2">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section
        className="bg-gradient-success text-white d-flex align-items-center reveal-fade"
        style={{ minHeight: "calc(90vh - 64px)", paddingTop: "96px", paddingBottom: "96px" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4 animate-slide-up reveal">
                Fresh Food Delivered Fast
              </h1>
              <p className="lead mb-4 animate-fade-in animate-delay-1 reveal">
                Discover restaurants, order meals, and get your food delivered 
                to your doorstep with DishDash — quick, reliable, and delicious.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 animate-fade-in animate-delay-2 reveal">
                <a href="/register" className="btn btn-light btn-lg text-success px-4">
                  Get Started <ArrowRight size={20} className="ms-2" />
                </a>
                <a href="#about" className="btn btn-outline-light btn-lg px-4">
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="glass rounded-3 p-5 mt-5 mt-lg-0 shadow-soft animate-zoom-in animate-delay-2 reveal-zoom">
                <Utensils size={120} className="mb-3" />
                <h3 className="mb-3">Tasty Meals Anytime</h3>
                <p className="mb-0">Connecting you with the best restaurants in town</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="py-5" id="services">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-success mb-3 animate-slide-up reveal">
              Our Services
            </h2>
            <p className="lead text-muted animate-fade-in animate-delay-1 reveal">
              Making food delivery simple, fast, and enjoyable
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-soft hover-lift animate-slide-up reveal">
                <div className="card-body text-center p-4 glass rounded-3">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <Utensils className="text-success" size={28} />
                  </div>
                  <h5 className="card-title">Wide Restaurant Choices</h5>
                  <p className="card-text text-muted">
                    Explore hundreds of restaurants and diverse cuisines.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-soft hover-lift animate-slide-up animate-delay-1 reveal">
                <div className="card-body text-center p-4 glass rounded-3">
                  <div className="bg-warning bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <ShoppingBasket className="text-warning" size={32} />
                  </div>
                  <h5 className="card-title">Easy Ordering</h5>
                  <p className="card-text text-muted">
                    Quick and seamless ordering experience with secure checkout.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-soft hover-lift animate-slide-up animate-delay-2 reveal">
                <div className="card-body text-center p-4 glass rounded-3">
                  <div className="bg-danger bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <Truck className="text-danger" size={32} />
                  </div>
                  <h5 className="card-title">Fast Delivery</h5>
                  <p className="card-text text-muted">
                    Get your favorite meals delivered hot and on time.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-soft hover-lift animate-slide-up animate-delay-3 reveal">
                <div className="card-body text-center p-4 glass rounded-3">
                  <div className="bg-info bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <Shield className="text-info" size={32} />
                  </div>
                  <h5 className="card-title">Secure Payments</h5>
                  <p className="card-text text-muted">
                    Safe and reliable payment options at your convenience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5 bg-light" id="about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold text-success mb-4 animate-slide-up reveal">
                Why Choose DishDash?
              </h2>

              <div className="mb-3">
                <div className="d-flex align-items-center mb-2 animate-fade-in reveal">
                  <CheckCircle className="text-success me-3" size={24} />
                  <h5 className="mb-0">Delicious Variety</h5>
                </div>
                <p className="text-muted ms-5 animate-fade-in animate-delay-1 reveal">
                  From street food to fine dining — find it all in one app.
                </p>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center mb-2 animate-fade-in animate-delay-1 reveal">
                  <CheckCircle className="text-success me-3" size={24} />
                  <h5 className="mb-0">Reliable Delivery</h5>
                </div>
                <p className="text-muted ms-5 animate-fade-in animate-delay-2 reveal">
                  Track your orders live and enjoy fast doorstep delivery.
                </p>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center mb-2 animate-fade-in animate-delay-2 reveal">
                  <CheckCircle className="text-success me-3" size={24} />
                  <h5 className="mb-0">Affordable Deals</h5>
                </div>
                <p className="text-muted ms-5 animate-fade-in animate-delay-3 reveal">
                  Enjoy exclusive discounts and meal combos every day.
                </p>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center mb-2 animate-fade-in animate-delay-3 reveal">
                  <CheckCircle className="text-success me-3" size={24} />
                  <h5 className="mb-0">Trusted by Thousands</h5>
                </div>
                <p className="text-muted ms-5 animate-fade-in animate-delay-4 reveal">
                  Join our growing community of happy customers.
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="glass rounded-3 p-4 shadow-soft animate-zoom-in reveal-zoom">
                <h3 className="text-center mb-4">
                  Loved by Foodies Everywhere
                </h3>
                <div className="row text-center">
                  <div className="col-4">
                    <h2 className="text-success fw-bold animate-slide-up reveal">300+</h2>
                    <small className="text-muted">Restaurants</small>
                  </div>
                  <div className="col-4">
                    <h2 className="text-success fw-bold animate-slide-up animate-delay-1 reveal">20K+</h2>
                    <small className="text-muted">Orders Delivered</small>
                  </div>
                  <div className="col-4">
                    <h2 className="text-success fw-bold animate-slide-up animate-delay-2 reveal">4.9★</h2>
                    <small className="text-muted">Avg Rating</small>
                  </div>
                </div>

                <div className="mt-4 p-3 glass rounded reveal">
                  <div className="d-flex align-items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-warning"
                        size={16}
                        fill="currentColor"
                      />
                    ))}
                    <span className="ms-2 small text-muted">5.0 out of 5</span>
                  </div>
                  <p className="small text-muted mb-0">
                    "DishDash makes ordering food so simple! Always on time and
                    the meals are fantastic."
                  </p>
                  <small className="text-muted">- Jane Mwangi, Customer</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5" id="contact">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-success mb-3 animate-slide-up reveal">
              Get In Touch
            </h2>
            <p className="lead text-muted animate-fade-in animate-delay-1 reveal">
              Have a question or want to partner with us? Reach out today!
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-8 mx-auto">
              <div className="row g-4">
                <div className="col-md-4 text-center animate-slide-up reveal">
                  <div className="glass rounded-circle p-3 d-inline-block mb-3 hover-lift">
                    <Phone className="text-success" size={24} />
                  </div>
                  <h5>Call Us</h5>
                  <p className="text-muted">+254 700 123 456</p>
                </div>

                <div className="col-md-4 text-center animate-slide-up animate-delay-1 reveal">
                  <div className="glass rounded-circle p-3 d-inline-block mb-3 hover-lift">
                    <Mail className="text-success" size={24} />
                  </div>
                  <h5>Email Us</h5>
                  <p className="text-muted">support@dishdash.com</p>
                </div>

                <div className="col-md-4 text-center animate-slide-up animate-delay-2 reveal">
                  <div className="glass rounded-circle p-3 d-inline-block mb-3 hover-lift">
                    <MapPin className="text-success" size={24} />
                  </div>
                  <h5>Visit Us</h5>
                  <p className="text-muted">
                    Nairobi, Kenya <br />
                    Westlands, Waiyaki Way
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <div className="bg-success rounded-circle p-2 me-2">
                  <Utensils className="text-white" size={20} />
                </div>
                <span className="fw-bold">DishDash</span>
              </div>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <small className="text-muted">
                © 2025 DishDash. All rights reserved. | Privacy Policy | Terms of Service
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
