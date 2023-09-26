"use client"

import React from "react";

const Home = () => {



  return (
    <div className="home min-h-full">
      <header>

        <h1>Welcome to the Blood Bank</h1>
      </header>
      <main>
        <section className="hero-section">
          <div className="hero-content">
            {/* Add hero image or video */}
            {/* Example: 
              <img src="/images/hero-image.jpg" alt="Blood Donation" />
             */}
            {/* <h2>{loginUserInfo.user?.email}</h2> */}
            <p>Join us in our mission to help those in need.</p>
            {/* Add call-to-action button */}
            {/* Example:
              <Link to="/donate" className="cta-button">Donate Now</Link>
             */}
          </div>
        </section>

        {/* Other sections like about, services, testimonials can be added */}

        {/* Footer section */}
        <footer>
          &copy; {new Date().getFullYear()} Blood Bank. All rights reserved.
          {" | "}
          Developed by Your Name
        </footer>

      </main>

    </div>


  );
};

export default Home;
