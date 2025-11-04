import styles from "./CTA.module.css";
import WhatsAppButton from "./Whatsapp/Whatsapp";

const CTA = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaBackground} />
      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaTitle}>Join the Fitnora Revolution</h2>
        <p className={styles.ctaSubtitle}>
          Start every day with premium nutrition. Your fitness goals are closer
          than you think.
        </p>
        <WhatsAppButton
          ele={<button className={styles.ctaButton}>Shop Now</button>}
        />

        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✓</span>
            <span>Free Shipping</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✓</span>
            <span>30-Day Guarantee</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✓</span>
            <span>Subscribe & Save 20%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
