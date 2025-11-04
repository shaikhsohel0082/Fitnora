import React from "react";
import styles from "./whatsapp.module.css";
interface Props {
  ele: JSX.Element;
}
const WhatsAppButton = ({ ele }: Props) => {
  const phoneNumber = "919834012163";
  const message = "Hi Fitnora! I’m interested in your muesli product.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "#FFFF" }}
    >
      {ele}
    </a>
  );
};

export default WhatsAppButton;
