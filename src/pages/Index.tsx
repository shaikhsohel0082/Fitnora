import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import styles from "./Index.module.css";
import WhatsAppButton from "@/components/Whatsapp/Whatsapp";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.pageContainer}>
      <div className={styles.adimnWrapper}>
        <button
          className={styles.adminBtn}
          onClick={() => {
            navigate("/superadmin");
          }}
        >
          Admin login
        </button>
      </div>
      <Hero />
      <ProductShowcase />
      <Benefits />
      <Testimonials />
      <CTA />
      <Footer />
      <div className={styles.whatsAppWrapper}>
        <WhatsAppButton ele={<i className="fa-brands fa-whatsapp"></i>} />
      </div>
    </div>
  );
};

export default Index;
