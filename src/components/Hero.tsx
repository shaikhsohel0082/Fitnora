import styles from "./Hero.module.css";
import fitness from "../assets/fitness.mp4";
import WhatsAppButton from "./Whatsapp/Whatsapp";
const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <video autoPlay loop muted playsInline className={styles.heroVideo}>
          <source src={fitness} type="video/mp4" />
        </video>
      </div>
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Fuel Your Fitness with Fitnora Muesli
        </h1>
        <p className={styles.heroSubtitle}>
          Premium natural ingredients, packed with protein and energy. The
          perfect breakfast for champions.
        </p>
        <div className={styles.heroCta}>
          <WhatsAppButton
            ele={<button className={styles.primaryButton}>Shop Now</button>}
          />
          {/* <button className={styles.secondaryButton}>Learn More</button> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
