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
        className="hero-section py-5"
        style={{
          backgroundImage: `url(${bac})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6}></Col>
            <Col lg={6}>
              <img
                src={logo2}
                alt="Hero Illustration"
                className="img-fluid rounded-3 shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-white">
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5 mb-3">Why Choose Tell me ChatBox?</h2>
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
                <Card className="service-card h-100 border-0 shadow-sm p-4">
                  <Card.Body className="text-center">
                    <div
                      className={`icon-wrapper bg-${item.color} bg-opacity-10 text-${item.color} rounded-circle p-3 mb-4 mx-auto`}
                      style={{ width: "60px", height: "60px" }}
                    >
                      <i className={`bi ${item.icon} fs-4`}></i>
                    </div>
                    <Card.Title className="mb-3">{item.title}</Card.Title>
                    <Card.Text className="text-muted">{item.text}</Card.Text>
                    <Button variant="link" className="text-primary p-0">
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
        <Container className="py-4">
          <Row className="align-items-center">
            <Col lg={8} className="mb-4 mb-lg-0">
              <h2 className="fw-bold mb-3">Ready to open your new account?</h2>
              <p className="lead mb-0">
                Join thousands of satisfied customers who trust Core Bank with their finances.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end d-flex justify-content-lg-end gap-2">
              <Button as={Link} to="/register" variant="light" size="lg" className="px-4">
                Open Account
              </Button>
              <Button as={Link} to="/contact" variant="outline-light" size="lg" className="px-4">
                Contact Us
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-2">
        <Container>
          <Row className="align-items-center">
            <Col lg={4} className="mb-4 mb-lg-0 text-center text-lg-start">
              <h3 className="fw-bold mb-3 d-flex align-items-center justify-content-center justify-content-lg-start">
                <i className="bi bi-bank me-2"></i>TELL ME
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
              <div className="social-icons mt-4 d-flex justify-content-center justify-content-lg-start gap-3">
                <a href="#" className="text-white fs-5" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white fs-5" aria-label="Twitter">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-white fs-5" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#" className="text-white fs-5" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </Col>
            <Col lg={8}>
              <Row>
                <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
                  <p className="mb-0">&copy; 2025 Core Tell Me. All rights reserved.</p>
                </Col>
                <Col md={6} className="text-center text-md-end">
                  <p className="mb-0">Towfik</p>
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
        }
        .hero-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        .service-card {
          transition: all 0.3s ease;
          border-radius: 10px;
          cursor: default;
        }
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }
        footer a:hover {
          color: #0d6efd;
        }
      `}</style>
    </div>
  );
}

export default Homepage;
