import React from "react";
import { Navigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./EnrollmentSuccessPage.css"; // Import your CSS file for custom styling

function EnrollmentSuccessPage() {
  const isSubmittedDirectly = !sessionStorage.getItem("formSubmitted");

  if (isSubmittedDirectly) {
    return <Navigate to="/enrollment-form" />;
  }

  return (
    <div>
      <Header />
      <div className="success-page-container">
        <div className="success-message-container">
          <h3 className="success-header">
            Enrollment Form Submitted Successfully
          </h3>
          <p className="success-text">
            Your information has been submitted successfully. An admin will
            contact you soon.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentSuccessPage;
