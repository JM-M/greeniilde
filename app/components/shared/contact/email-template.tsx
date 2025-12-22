import * as React from "react";

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactFormEmail: React.FC<ContactFormEmailProps> = ({
  name,
  email,
  phone,
  message,
}) => (
  <div
    style={{
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      backgroundColor: "#ffffff",
      padding: "40px 20px",
      color: "#333333",
    }}
  >
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#000000",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            margin: 0,
            fontSize: "24px",
            fontWeight: 600,
          }}
        >
          New Project Inquiry
        </h1>
      </div>
      <div style={{ padding: "30px" }}>
        <p style={{ fontSize: "16px", lineHeight: "1.5", margin: "0 0 20px" }}>
          You have received a new message from the Greeniilde contact form.
        </p>

        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 600,
              margin: "0 0 15px",
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: "10px",
            }}
          >
            Contact Details
          </h2>
          <p style={{ margin: "5px 0" }}>
            <strong>Name:</strong> {name}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${email}`}
              style={{ color: "#000000", textDecoration: "underline" }}
            >
              {email}
            </a>
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Phone:</strong>{" "}
            <a
              href={`tel:${phone}`}
              style={{ color: "#000000", textDecoration: "none" }}
            >
              {phone}
            </a>
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "6px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 600,
              margin: "0 0 15px",
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: "10px",
            }}
          >
            Project Details
          </h2>
          <p
            style={{
              whiteSpace: "pre-wrap",
              margin: 0,
              fontSize: "15px",
              lineHeight: "1.6",
            }}
          >
            {message}
          </p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          textAlign: "center",
          fontSize: "12px",
          color: "#666666",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Greeniilde. All rights reserved.
        </p>
      </div>
    </div>
  </div>
);

export default ContactFormEmail;
