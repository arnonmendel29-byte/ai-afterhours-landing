import { homeProductCards, homeProducts, productChooser } from './callbotProducts';
import { Reveal } from './Reveal';
import { CtaStar } from './StarBorder';
import './HomeProductsSection.css';

export function HomeProductsSection() {
  return (
    <section className="section hp-section" id="solutions" aria-labelledby="solutions-title">
      <div className="container">
        <Reveal className="hp-head">
          <p className="eyebrow">{homeProducts.eyebrow}</p>
          <h2 id="solutions-title">{homeProducts.title}</h2>
          <p>{homeProducts.subtitle}</p>
        </Reveal>

        <Reveal className="hp-chooser" aria-label="איך לבחור בין הפתרונות">
          {productChooser.map((item) => (
            <a
              key={item.href}
              className={`hp-chooser-card${item.featured ? ' hp-chooser-card--featured' : ''}`}
              href={item.href}
            >
              <span className="hp-chooser-q">{item.question}</span>
              <span className="hp-chooser-a">{item.answer}</span>
            </a>
          ))}
        </Reveal>

        <div className="hp-grid">
          {homeProductCards.map((product) => (
            <Reveal
              as="article"
              key={product.id}
              className={`hp-card${product.featured ? ' hp-card--featured' : ''}`}
              delay={!product.featured}
            >
              {product.featured ? <p className="hp-kicker">הפתרון המרכזי כרגע</p> : null}
              <h3>{product.title}</h3>
              <p className="hp-fit">{product.fit}</p>
              <p>{product.description}</p>
              <ul className="hp-points">
                {product.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="hp-actions">
                {product.featured ? (
                  <CtaStar as="a" className="cta-block" href={product.href}>
                    {product.cta}
                  </CtaStar>
                ) : (
                  <a className="hp-cta-quiet" href={product.href}>
                    {product.cta}
                  </a>
                )}
                {product.secondaryCta ? (
                  <a className="hp-secondary" href={product.secondaryCta.href}>
                    {product.secondaryCta.label}
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
