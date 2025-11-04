import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import styles from "./Index.module.css";
import WhatsAppButton from "@/components/Whatsapp/Whatsapp";

const Index = () => {
  return (
    <div className={styles.pageContainer}>
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
