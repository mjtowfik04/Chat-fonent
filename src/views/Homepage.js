import React, { useState } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import logo2 from "../assets/images/854894-removebg-preview.png";
import bac from "../assets/images/343434343.jpg";

function Homepage() {
  const [activeAccountType, setActiveAccountType] = useState("personal");

  return (
    <div className="bank-homepage">
      {/* Hero Section */}
      <section
        className="hero-section py-5 d-flex align-items-center"
        style={{
          backgroundImage: `url(${bac})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          minHeight: "70vh",
          zIndex: 1,
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-white text-center text-lg-start">
              <h1 className="display-4 fw-bold mb-3" style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.7)" }}>
                Welcome to Tell Me ChatBox
              </h1>
              <p className="lead" style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>
                Secure, fast, and user-friendly communication platform.
              </p>
              <Button
                as={Link}
                to="/register"
                variant="light"
                size="lg"
                className="mt-3"
              >
                Get Started
              </Button>
            </Col>
            <Col lg={6} className="text-center mt-4 mt-lg-0">
              <img
                src={logo2}
                alt="Hero Illustration"
                className="img-fluid rounded-3 shadow hero-img"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5 mb-3">Why Choose Tell me ChatBox?</h2>
            <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "600px" }}>
              Experience the best messaging service designed to keep your conversations safe and speedy.
            </p>
          </div>
          <Row className="g-4">
            {[
              {
                icon: "bi-lock",
                title: "Secure",
                text: "Your messages are encrypted and stored securely.",
                color: "primary",
              },
              {
                icon: "bi-speedometer2",
                title: "Fast",
                text: "Experience lightning-fast communication.",
                color: "success",
              },
              {
                icon: "bi-stars",
                title: "User-friendly",
                text: "Simple and intuitive design for everyone.",
                color: "warning",
              },
            ].map((item, idx) => (
              <Col md={4} key={idx}>
                <Card className="service-card h-100 border-0 shadow-sm p-4 text-center">
                  <div
                    className={`icon-wrapper bg-${item.color} bg-opacity-10 text-${item.color} rounded-circle p-3 mb-4 mx-auto`}
                    style={{ width: "70px", height: "70px", fontSize: "2rem" }}
                  >
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <Card.Body>
                    <Card.Title className="mb-3">{item.title}</Card.Title>
                    <Card.Text className="text-muted">{item.text}</Card.Text>
                    <Button variant={`outline-${item.color}`} size="sm" className="mt-3">
                      Learn more <i className="bi bi-arrow-right ms-2"></i>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mb-4 mb-lg-0 text-center text-lg-start">
              <h2 className="fw-bold mb-3">Ready to open your new account?</h2>
              <p className="lead mb-0">
                Join thousands of satisfied customers who trust Tell Me ChatBox with their communication.
              </p>
            </Col>
            <Col lg={4} className="text-center text-lg-end">
              <Button
                as={Link}
                to="/register"
                variant="light"
                size="lg"
                className="px-4 me-2 mb-2 mb-lg-0"
              >
                Open Account
              </Button>
              <Button
                as={Link}
                to="/contact"
                variant="outline-light"
                size="lg"
                className="px-4"
              >
                Contact Us
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-3">
        <Container>
          <Row className="align-items-center">
            <Col lg={4} className="mb-3 mb-lg-0 text-center text-lg-start">
              <h3 className="fw-bold d-flex align-items-center justify-content-center justify-content-lg-start mb-2">
                <i className="bi bi-chat-left-text me-2"></i>TELL ME
              </h3>
              <img
                src={logo}
                alt="Tell Me Logo"
                style={{
                  width: "60px",
                  height: "60px",
                  padding: "10px",
                  borderRadius: "20%",
                  objectFit: "cover",
                }}
                className="mx-auto mx-lg-0"
              />
              <div className="social-icons mt-3 d-flex justify-content-center justify-content-lg-start gap-3 fs-5">
                <a href="#" className="text-white" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white" aria-label="Twitter">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-white" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#" className="text-white" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </Col>
            <Col lg={8}>
              <Row>
                <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
                  <p className="mb-0">&copy; 2025 Tell Me ChatBox. All rights reserved.</p>
                </Col>
                <Col md={6} className="text-center text-md-end">
                  <p className="mb-0">Production by Towfik</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Inline Styles */}
      <style jsx>{`
        .bank-homepage {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9f9f9;
        }
        .hero-section {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)),
            url(${bac});
          background-size: cover;
          background-position: center;
          color: white;
          min-height: 70vh;
          display: flex;
          align-items: center;
        }
        .hero-img {
          max-width: 100%;
          height: auto;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          transition: transform 0.3s ease;
        }
        .hero-img:hover {
          transform: scale(1.05);
        }
        .service-card {
          transition: all 0.3s ease;
          border-radius: 15px;
          cursor: default;
        }
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
        }
        .icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        }
        footer a:hover {
          color: #0d6efd;
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: 50vh;
            text-align: center;
          }
          .hero-img {
            max-width: 80%;
          }
        }
      `}</style>
    </div>
  );
}

export default Homepage;
