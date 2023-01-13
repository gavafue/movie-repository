import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function NotificationsBottom({ array }) {
  return (
    array && (
      <div
        aria-live="polite"
        aria-atomic="true"
        className="bg-dark position-relative"
        style={{ minHeight: "240px" }}
      >
        <ToastContainer position="top-end" className="p-3">
          {array.map((arrayElement) => (
            <Toast delay={3000} closeButton>
              <Toast.Header>
                <strong className="me-auto">{arrayElement.title}</strong>
              </Toast.Header>
              <Toast.Body>{arrayElement.description}</Toast.Body>
            </Toast>
          ))}
        </ToastContainer>
      </div>
    )
  );
}

export default NotificationsBottom;
