import styles from './ProductCard.module.css';

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  features: string[];
}

const ProductCard = ({ image, title, description, features }: ProductCardProps) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.productImage} />
      </div>
      <div className={styles.productContent}>
        <h3 className={styles.productTitle}>{title}</h3>
        <p className={styles.productDescription}>{description}</p>
        <div className={styles.productFeatures}>
          {features.map((feature, index) => (
            <span key={index} className={styles.feature}>
              {feature}
            </span>
          ))}
        </div>
        {/* <button className={styles.addToCartButton}>Add to Cart</button> */}
      </div>
    </div>
  );
};

export default ProductCard;
