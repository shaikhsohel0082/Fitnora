import styles from './ProductShowcase.module.css';
import ProductCard from './ProductCard';
import chocolateImage from '@/assets/product-chocolate.jpg';
import berryImage from '@/assets/product-berry.jpg';
import nutImage from '@/assets/product-nut.jpg';

const products = [
  {
    image: chocolateImage,
    title: 'Chocolate Crunch',
    description: 'Rich dark chocolate chunks meet premium oats and nuts. A delicious post-workout treat.',
    features: ['High Protein', 'Low Sugar', 'Energy Boost']
  },
  {
    image: berryImage,
    title: 'Berry Blast',
    description: 'Fresh berries packed with antioxidants. Perfect fuel for your morning routine.',
    features: ['Antioxidants', 'Vitamins', 'Natural Flavor']
  },
  {
    image: nutImage,
    title: 'Nut Delight',
    description: 'Premium almonds, cashews, and hazelnuts with honey. Pure energy in every bite.',
    features: ['Healthy Fats', 'Fiber Rich', 'Sustained Energy']
  }
];

const ProductShowcase = () => {
  return (
    <section className={styles.showcase}>
      <div className={styles.showcaseContainer}>
        <div className={styles.showcaseHeader}>
          <h2 className={styles.showcaseTitle}>Our Premium Flavours</h2>
          <p className={styles.showcaseSubtitle}>
            Handcrafted muesli blends designed for peak performance and incredible taste
          </p>
        </div>
        <div className={styles.productsGrid}>
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
