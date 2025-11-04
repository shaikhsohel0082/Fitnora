import styles from "./Footer.module.css";
import WhatsAppButton from "./Whatsapp/Whatsapp";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.logo}>Fitnora Muesli</div>
            <p style={{ color: "hsl(var(--muted-foreground))" }}>
              Premium natural muesli for fitness enthusiasts. Fuel your body,
              achieve your goals.
            </p>
            <div className={styles.socialIcons}>
              <div
                className={styles.socialIcon}
                style={{
                  background:
                    "linear-gradient(45deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5)",
                }}
              >
                <a
                  href={
                    "https://www.instagram.com/fitnora_global?igsh=M3NydzgwMGQzbWsw"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#FFFF" }}
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
              <div
                className={styles.socialIcon}
                style={{
                  background: "linear-gradient(45deg, #25D366, #075E54)",
                }}
              >
                <WhatsAppButton
                  ele={<i className="fa-brands fa-whatsapp"></i>}
                />
              </div>
            </div>
          </div>

          {/* <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Shop</h4>
            <div className={styles.footerLinks}>
              <a className={styles.footerLink}>All Products</a>
              <a className={styles.footerLink}>Best Sellers</a>
              <a className={styles.footerLink}>New Arrivals</a>
              <a className={styles.footerLink}>Subscriptions</a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Company</h4>
            <div className={styles.footerLinks}>
              <a className={styles.footerLink}>About Us</a>
              <a className={styles.footerLink}>Our Story</a>
              <a className={styles.footerLink}>Sustainability</a>
              <a className={styles.footerLink}>Careers</a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Support</h4>
            <div className={styles.footerLinks}>
              <a className={styles.footerLink}>Contact Us</a>
              <a className={styles.footerLink}>FAQs</a>
              <a className={styles.footerLink}>Shipping Info</a>
              <a className={styles.footerLink}>Returns</a>
            </div>
          </div> */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Contact Us</h4>
            <div className={styles.footerLinks}>
              <a
                className={styles.footerLink}
                href="mailto:fitnoraglobal@gmail.com"
              >
                <i className="fa-solid fa-envelope"></i>{" "}
                <span>fitnoraglobal@gmail.com</span>
              </a>
              <a className={styles.footerLink} href="tel:+919834012163">
                <i className="fa-solid fa-phone"></i>{" "}
                <span>+91 9834012163</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2024 Fitnora Muesli. All rights reserved. | Privacy Policy | Terms
            of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
