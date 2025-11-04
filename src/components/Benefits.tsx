import styles from './Benefits.module.css';

const benefits = [
  {
    icon: <i className="fa-solid fa-battery-full"></i>,
    title: 'High Protein',
    description: 'Packed with plant-based protein to support muscle recovery and growth after your workouts.'
  },
  {
    icon: <i className="fa-solid fa-seedling"></i>,
    title: 'Natural Ingredients',
    description: '100% natural, organic ingredients with no artificial additives or preservatives.'
  },
  {
    icon:<i className="fa-solid fa-bolt-lightning"></i>,
    title: 'Sustained Energy',
    description: 'Complex carbs and healthy fats provide long-lasting energy throughout your day.'
  },
  {
    icon: <i className="fa-solid fa-heart"></i>,
    title: 'Heart Healthy',
    description: 'Rich in fiber and omega-3s to support cardiovascular health and overall wellness.'
  }
];

const Benefits = () => {
  return (
    <section className={styles.benefits}>
      <div className={styles.backgroundGlow} />
      <div className={styles.benefitsContainer}>
        <div className={styles.benefitsHeader}>
          <h2 className={styles.benefitsTitle}>Why Choose Fitnora?</h2>
          <p className={styles.benefitsSubtitle}>
            Premium nutrition designed for peak performance
          </p>
        </div>
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{benefit.icon}</span>
              </div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
