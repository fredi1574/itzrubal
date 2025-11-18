import type { JSX } from "react";

export const metadata = { title: "Services" };

const introText =
  "כל פרויקט מתחיל בהקשבה - להבין מי אתם, איך אתם חיים, ומה חשוב לכם. לכן אני מציעה מגוון שירותים שמתאימים לצרכים שונים, מפגישת ייעוץ בודדת ועד ליווי מלא של כל תהליך השיפוץ והעיצוב.";

const services = [
  {
    icon: "💡",
    title: "ייעוץ עיצובי",
    subtitle: "נקודת התחלה מושלמת",
    description:
      "פגישה אישית בביתכם למשך 2-3 שעות, שבה אני מספקת המלצות מקצועיות, פתרונות יצירתיים והמון השראה.",
    features: [
      "ניתוח המרחב והפוטנציאל שלו",
      "המלצות לתכנון וארגון החלל",
      "הצעות לצבעים, חומרים וסגנון",
      "טיפים מעשיים ליישום עצמי",
      "סיכום בכתב עם המלצות",
    ],
  },
  {
    icon: "📐",
    title: "תכנון מלא",
    subtitle: "עיצוב מקיף מהיסוד",
    description:
      "תכנון מקיף של כל הדירה או הבית, עם תשומת לב לכל פרט - מהתכנון הראשוני ועד לבחירת האביזרים האחרונים.",
    features: [
      "תכנון מרחבי מלא",
      "תוכניות עבודה מפורטות",
      "תלת-ממד ויזואליזציות",
      "בחירת כל החומרים והגימורים",
      "תיאום צבעים ומרקמים",
      "רשימת קניות מפורטת",
    ],
  },
  {
    icon: "🔨",
    title: "ליווי שיפוצים",
    subtitle: "ניהול הפרויקט מתחילתו ועד סופו",
    description:
      "ליווי צמוד לאורך כל תהליך השיפוץ - מהתכנון הראשוני, דרך תיאום עם קבלנים ובעלי מלאכה, ועד לסיום.",
    features: [
      "ניהול מלא של הפרויקט",
      "תיאום עם קבלנים ובעלי מלאכה",
      "פיקוח שוטף על התקדמות העבודה",
      "פתרון בעיות בזמן אמת",
      "שמירה על לוח זמנים ותקציב",
      "ליווי עד למסירה סופית",
    ],
  },
  {
    icon: "✨",
    title: "הום סטיילינג",
    subtitle: "שינוי בלי שיפוץ",
    description:
      "עיצוב מחדש של החלל עם הרהיטים והפריטים הקיימים שלכם - שינוי פריסה, הוספת אלמנטים חדשים, והפיכת הבית למקום חדש.",
    features: [
      "ניתוח החלל והפריטים הקיימים",
      "תכנון פריסה חדשה",
      "המלצות להוספת אלמנטים",
      "שילוב צבעים וטקסטורות",
      "יצירת אווירה חדשה ללא שיפוץ",
    ],
  },
  {
    icon: "🛋️",
    title: "עיצוב חדר בודד",
    subtitle: "פוקוס על חלל אחד",
    description:
      "תכנון ועיצוב של חדר בודד - חדר שינה, סלון, מטבח, חדר ילדים או כל חלל אחר שזקוק לשדרוג.",
    features: [
      "תכנון מפורט של החדר",
      "בחירת צבעים וחומרים",
      "תוכנית ריהוט ופריסה",
      "המלצות לרכישת פריטים",
      "ליווי עד להשלמת החדר",
    ],
  },
  {
    icon: "🎨",
    title: "בחירת חומרים וגימורים",
    subtitle: "הפרטים שעושים את ההבדל",
    description:
      "ליווי בבחירת כל החומרים והגימורים - ריצוף, ציפוי קירות, צבעים, ברזים, ידיות ועוד.",
    features: [
      "סיורי בחירות מלווים",
      "בחירת ריצוף וקרמיקה",
      "בחירת צבעים ושילובים",
      "בחירת אביזרים וידיות",
      "תיאום בין כל החומרים",
    ],
  },
] as const;

const processSteps = [
  {
    number: "1",
    title: "פגישת היכרות",
    text: "נפגש, נדבר על החזון, הצרכים והחלומות שלכם.",
  },
  {
    number: "2",
    title: "תכנון והצעה",
    text: "אכין עבורכם הצעה מפורטת עם קונספט ראשוני.",
  },
  {
    number: "3",
    title: "עיצוב ופיתוח",
    text: "נעבוד יחד על הפיתוח המלא של העיצוב.",
  },
  {
    number: "4",
    title: "ביצוע והשלמה",
    text: "אלווה אתכם עד לרגע שהמפתח מסתובב בדלת.",
  },
] as const;

const faqItems = [
  {
    question: "כמה זמן לוקח פרויקט עיצוב?",
    answer:
      "משך הפרויקט תלוי בהיקפו - ייעוץ בודד יכול להתבצע תוך שבוע, בעוד שיפוץ מלא יכול לקחת 3-6 חודשים. בפגישת ההיכרות נוכל לקבוע לוח זמנים מדויק.",
  },
  {
    question: "איך מחושב התמחור?",
    answer:
      "כל פרויקט הוא ייחודי, והתמחור תלוי בהיקפו, המורכבות והשירותים שנכללים בו. לאחר פגישת ההיכרות אני מכינה הצעת מחיר מפורטת ושקופה.",
  },
  {
    question: "האם יש צורך בשיפוץ מלא?",
    answer:
      "בכלל לא! יש הרבה דרכים לשפר ולשדרג חלל גם בלי שיפוץ - דרך הום סטיילינג, החלפת אלמנטים בודדים, או עיצוב חכם של החלל הקיים.",
  },
  {
    question: "האם את עובדת עם קבלנים שלי?",
    answer:
      "בהחלט! אני יכולה לעבוד עם הקבלנים והספקים שלכם, או לחלופין להמליץ על אנשי מקצוע מוכחים שאני עובדת איתם בקביעות.",
  },
] as const;

/**
 * Displays the services overview with hero, offerings, process and FAQ.
 * @returns {JSX.Element} Services landing page content in Hebrew RTL layout.
 */
const ServicesPage = (): JSX.Element => (
  <div className="services-page" dir="rtl" lang="he">
    <HeroSection />
    <IntroSection />
    <ServicesSection />
    <ProcessSection />
    <FaqSection />
    <CtaSection />
  </div>
);

const HeroSection = (): JSX.Element => (
  <section className="services-hero">
    <h1 className="services-hero-title">השירותים שלי</h1>
    <p className="services-hero-text">
      מייעוץ ראשוני ועד ליווי מלא - אני כאן כדי להפוך את החלל שלכם לבית
    </p>
  </section>
);

const IntroSection = (): JSX.Element => (
  <section className="services-intro">
    <p className="services-intro-text">{introText}</p>
  </section>
);

const ServicesSection = (): JSX.Element => (
  <section className="services-container">
    <div className="services-grid">
      {services.map((service) => (
        <article className="services-card" key={service.title}>
          <div aria-hidden="true" className="services-icon">
            {service.icon}
          </div>
          <h3 className="services-title">{service.title}</h3>
          <p className="services-subtitle">{service.subtitle}</p>
          <p className="services-description">{service.description}</p>
          <ul className="services-features">
            {service.features.map((feature) => (
              <li className="services-feature" key={feature}>
                {feature}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

const ProcessSection = (): JSX.Element => (
  <section className="services-process">
    <h2 className="services-process-title">איך אנחנו עובדים יחד?</h2>
    <div className="services-steps">
      {processSteps.map((step) => (
        <article className="services-step" key={step.number}>
          <div className="services-step-number">{step.number}</div>
          <h4 className="services-step-title">{step.title}</h4>
          <p className="services-step-text">{step.text}</p>
        </article>
      ))}
    </div>
  </section>
);

const FaqSection = (): JSX.Element => (
  <section className="services-faq">
    <h2 className="services-faq-title">שאלות נפוצות</h2>
    {faqItems.map((item) => (
      <article className="services-faq-item" key={item.question}>
        <h4 className="services-faq-question">{item.question}</h4>
        <p className="services-faq-answer">{item.answer}</p>
      </article>
    ))}
  </section>
);

const CtaSection = (): JSX.Element => (
  <section className="services-cta">
    <h2 className="services-cta-title">בואו נתחיל לעצב את הבית שלכם</h2>
    <p className="services-cta-text">
      אשמח לשמוע על הפרויקט שלכם ולגלות יחד איך אני יכולה לעזור
    </p>
    <a className="services-cta-button" href="/contact">
      צרו קשר לייעוץ ראשוני
    </a>
  </section>
);

export default ServicesPage;
