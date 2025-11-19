import type { JSX } from "react";

const aboutParagraphs = [
  "אני מאמינה שבית הוא לא רק מקום פיזי - הוא תחושה. תחושה של שקט, של נעימות, של זרימה טבעית בין החללים.",
  "הגישה שלי לעיצוב משלבת אלמנטים בוהמיים וכפריים עם נגיעות נורדיות נקיות, תוך שימוש בחומרים טבעיים וצבעים רכים. לפעמים, אני גם אוהבת להוסיף נגיעה תעשייתית - משהו מחוספס ואותנטי שיוצר ניגוד מעניין.",
  "כל פרויקט מתחיל בהקשבה - להבין מי אתם, איך אתם חיים, ומה גורם לכם להרגיש בבית.",
] as const;

const valueCards = [
  {
    title: "קשובה",
    description:
      "כל פרויקט מתחיל בשיחה אמיתית. אני לומדת אתכם, את הצרכים שלכם, ואת מה שגורם לכם להרגיש טוב בבית.",
  },
  {
    title: "טבעית",
    description:
      "אני משתמשת בחומרים טבעיים - עץ, אבן, פשתן, חרס. חומרים שמביאים חום, מרקם ותחושה אותנטית לחלל.",
  },
  {
    title: "ייחודית",
    description:
      "אין שני בתים זהים, כי אין שני אנשים זהים. כל פרויקט מקבל את הטביעה האישית שלו, שמשקפת את מי שגר בו.",
  },
] as const;

const portfolioItems = [
  "[דירה בוהו-כפרית בתל אביב]",
  "[בית נורדי-תעשייתי בצפון]",
  "[דירת סטודיו רגועה]",
] as const;

const HomePage = (): JSX.Element => (
  <div className="home-page" dir="rtl" lang="he">
    <HeroSection />
    <AboutSection />
    <PhilosophySection />
    <PortfolioSection />
    <CallToActionSection />
  </div>
);

const HeroSection = (): JSX.Element => (
  <section className="home-hero" id="home">
    <div className="home-hero-content">
      <h1 className="home-hero-title">איצטרובל</h1>
      <p className="home-hero-subtitle">
        עיצוב פנים שקט, נעים וזורם
        <br />
        חללים שמרגישים כמו בית
      </p>
      <a className="home-cta-button" href="#contact">
        בואו נתחיל לעצב
      </a>
    </div>
    <ScrollIndicator />
  </section>
);

const ScrollIndicator = (): JSX.Element => (
  <div aria-hidden="true" className="home-scroll-indicator" />
);

const AboutSection = (): JSX.Element => (
  <section className="home-about" id="about">
    <div className="home-about-image">[תמונה של המעצבת או פרויקט מרכזי]</div>
    <div className="home-about-content">
      <h2>היי, אני מאחורי איצטרובל</h2>
      {aboutParagraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  </section>
);

const PhilosophySection = (): JSX.Element => (
  <section className="home-philosophy">
    <div className="home-philosophy-content">
      <h2>הגישה שלי לעיצוב</h2>
      <div className="home-values">
        {valueCards.map((value) => (
          <article className="home-value-card" key={value.title}>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const PortfolioSection = (): JSX.Element => (
  <section className="home-portfolio" id="portfolio">
    <h2>פרויקטים נבחרים</h2>
    <div className="home-portfolio-grid">
      {portfolioItems.map((item) => (
        <div className="home-portfolio-item" key={item}>
          {item}
        </div>
      ))}
    </div>
  </section>
);

const CallToActionSection = (): JSX.Element => (
  <section className="home-cta" id="contact">
    <h2>מוכנים להתחיל?</h2>
    <p>
      בואו נדבר על איך אפשר להפוך את הבית שלכם
      <br />
      למקום שבאמת מרגיש כמו בית
    </p>
    <a className="home-cta-secondary" href="mailto:contact@itztrubel.co.il">
      צרו קשר
    </a>
  </section>
);

export default HomePage;
