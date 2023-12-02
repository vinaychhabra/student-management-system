import React from 'react';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <Header />

      <section className="overview-section">
        <div className="container">
          <h1>Welcome to Loyalist College</h1>
          <p>Empowering Minds, Enriching Lives</p>
          <p>Experience excellence in education and innovation.</p>
        </div>
      </section>

      <section className="programs-section">
        <div className="container">
          <h2>Our Cutting-Edge Programs</h2>
          <div className="program-card">
            <h3>Computer Science</h3>
            <p>Explore the limitless possibilities of technology with our Computer Science program.</p>
          </div>
          <div className="program-card">
            <h3>Business Administration</h3>
            <p>Shape the future of business with our dynamic Business Administration program.</p>
          </div>
          <div className="program-card">
            <h3>Engineering Innovation</h3>
            <p>Innovate and create with our state-of-the-art Engineering Innovation program.</p>
          </div>
        </div>
      </section>

      <section className="admissions-section">
        <div className="container">
          <h2>Join Us for a Transformative Journey</h2>
          <p>Admissions are now open. Take the first step towards a brighter future.</p>
          <span className="text-light fw-bold font-monospace text-end">
            
            <button className='btn btn-success me-1'><i className="fa fa-user-circle-o" aria-hidden="true"></i>
              <Link to="/enrollment-form/" className="text-light text-decoration-none">Apply Now</Link>
            </button>
          </span>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2>What Our Students Say</h2>
          <div className="testimonial-card">
            <p>"Loyalist College has provided me with an unparalleled learning experience. The faculty is top-notch, and the programs are designed for success."</p>
            <span className="testimonial-author">- Emily Johnson, Computer Science</span>
          </div>
          <div className="testimonial-card">
            <p>"The Business Administration program at Loyalist College prepared me for the challenges of the business world. I am grateful for the skills and knowledge gained."</p>
            <span className="testimonial-author">- James Anderson, Business Administration</span>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <h2>Get in Touch</h2>
          <p>Have questions or need more information? Contact our admissions team: <a href ="mailto:admin@loyalistcollege.com">admin@loyalistcollege.com</a></p>

        </div>
      </section>
    </div>
  );
}

export default LandingPage;
