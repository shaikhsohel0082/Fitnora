import { useState, useEffect } from "react";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    quote:
      "Fitnora Muesli has completely transformed my morning routine. The energy it gives me lasts throughout my entire workout, and it tastes incredible!",
    author: "Sarah Mitchell",
    role: "Marathon Runner",
    avatar: "🏃‍♀️",
  },
  {
    quote:
      "As a personal trainer, I recommend Fitnora to all my clients. It's the perfect balance of nutrition and taste. The Chocolate Crunch is my absolute favorite!",
    author: "Mike Johnson",
    role: "Personal Trainer",
    avatar: "💪",
  },
  {
    quote:
      "I've tried countless breakfast options, but nothing compares to Fitnora. It keeps me full, energized, and ready to tackle any challenge. Game changer!",
    author: "Emma Davis",
    role: "CrossFit Athlete",
    avatar: "🏋️‍♀️",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrevious = () => {
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section className={styles.testimonials}>
      <div className={styles.testimonialsContainer}>
        <div className={styles.testimonialsHeader}>
          <h2 className={styles.testimonialsTitle}>What Athletes Say</h2>
          <p className={styles.testimonialsSubtitle}>
            Trusted by fitness enthusiasts worldwide
          </p>
        </div>

        <div
          className={styles.carouselContainer}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.testimonialCard} key={activeIndex}>
            <div className={styles.stars}>★★★★★</div>
            <div className={styles.quoteIcon}>"</div>
            <p className={styles.quote}>{testimonials[activeIndex].quote}</p>
            <div className={styles.author}>
              <div className={styles.authorImage}>
                {testimonials[activeIndex].avatar}
              </div>
              <div className={styles.authorInfo}>
                <div className={styles.authorName}>
                  {testimonials[activeIndex].author}
                </div>
                <div className={styles.authorRole}>
                  {testimonials[activeIndex].role}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.carouselControls}>
            <button
              className={styles.navButton}
              onClick={handlePrevious}
              aria-label="Previous testimonial"
            >
              ‹
            </button>

            <div className={styles.carouselDots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${
                    index === activeIndex ? styles.active : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              className={styles.navButton}
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
