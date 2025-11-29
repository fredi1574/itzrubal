import Image from "next/image";
import type { JSX } from "react";

export const metadata = { title: "Services" };

const introText =
  "כל פרויקט מתחיל בהקשבה - להבין מי אתם, איך אתם חיים, ומה חשוב לכם. לכן אני מציעה מגוון שירותים שמתאימים לצרכים שונים, מפגישת ייעוץ בודדת ועד ליווי מלא של כל תהליך השיפוץ והעיצוב.";

const services = [
  {
    title: "ייעוץ נקודתי בבית הלקוח",
    subtitle: "פגישה חד-פעמית להתנעת תהליך או פתרון ממוקד",
    description:
      "תהליך קצר ומדויק המאפשר לקבל החלטות עיצוביות בטוחות. מתאים לרענון חלל קיים או כמענה לשאלות מקצועיות לפני קנייה, שינוי או שיפוץ קטן.",
    features: [
      "פגישת ייעוץ בבית (כשעתיים–שלוש)",
      "ניתוח צרכים והגדרת סגנון",
      "כיווני צבע, חומרים, תאורה ופריסה",
      "רעיונות לשדרוג מהיר בתקציב מגוון",
      "סיכום מפגש מסודר עם המלצות ולינקים",
    ],
  },
  {
    title: "עיצוב מרחוק",
    subtitle: "ליווי דיגיטלי מלא מכל מקום בארץ",
    description:
      "עיצוב מלא און־ליין, ללא צורך בפגישות פיזיות. שיחות וידאו, סקיצות והדמיות מותאמות מרחוק, עם תוצרים ברורים ליישום עצמאי או בליווי קל.",
    features: [
      "פגישת היכרות בזום",
      "שליחת מידות ותמונות של החלל",
      "תוכנית פריסה והדמיות תלת־ממד",
      "בחירת צבעים, חומרים ופרטי ריהוט",
      "רשימת קניות מקיפה עם קישורים",
    ],
  },
  {
    title: "עיצוב חדר בודד",
    subtitle: "פוקוס על חלל אחד שמקבל תשומת לב מלאה",
    description:
      "תכנון ועיצוב של חדר יחיד - חדר שינה, סלון, מטבח, חדר ילדים או כל חלל שזקוק לשידרוג.",
    features: [
      "תכנון מפורט של החלל",
      "בחירת צבעים וחומרים",
      "תוכנית ריהוט ופריסה",
      "המלצות לרכישת פריטים",
      "ליווי עד להשלמת החדר",
    ],
  },
  {
    title: "שיפוץ חלקי / אזור מוגדר בבית",
    subtitle: "שדרוג משמעותי ללא שיפוץ כולל",
    description:
      "תכנון ועיצוב לחלל מרכזי או אזור מסוים בבית — מטבח, סלון, יחידת הורים, אמבטיה או כל מרחב שזקוק לרענון או חידוש.",
    features: [
      "פגישת אפיון בבית",
      "תוכנית פריסה וסקיצות עיצוב",
      "המלצות לחומרים, חיפויים ונגרות",
      "ליווי בבחירת רהיטים ותאורה",
      "ביקורי שטח ופיקוח נקודתי",
      "תמיכה עד לסיום העבודה",
    ],
  },
  {
    title: "ליווי מלא לשיפוץ או בנייה",
    subtitle: "תהליך כולל – משלב הרעיון ועד הכניסה לבית",
    description:
      "מסלול מקיף ומעמיק הכולל תכנון מלא, הדמיות מפורטות, ליווי קבלנים ופיקוח מקצועי עד רגע המסירה. מתאים לדירות חדשות, בתים פרטיים ושיפוץ גדול.",
    features: [
      "תכנון אדריכלי מלא",
      "תוכניות חשמל, תאורה, אינסטלציה ונגרות",
      "הדמיות תלת־ממד מפורטות",
      "תכנון חומרים, ריצופים וגמרים",
      "ליווי בבחירת כל רכישות הבית",
      "פיקוח בשטח ותיאום בעלי מקצוע",
      "ליווי עד מסירה מושלמת",
    ],
  },
  {
    title: "עיצוב לעסקים",
    subtitle: "חללים שמספרים סיפור מותג ומעצימים חוויית לקוח",
    description:
      "תכנון פנימי מלא לעסקים: חנויות, קליניקות, משרדים ומרחבי עבודה. שילוב בין פונקציונליות לויזואליות מדויקת לפי ערכי המותג.",
    features: [
      "אפיון מותג וצרכי העסק",
      "תכנון פריסת חללים ואזורי עבודה",
      "בחירת חומרים, צבעים ותאורה עסקית",
      "עיצוב ריהוט ואלמנטים גרפיים",
      "ליווי רכישות ושדרוג חוויית הלקוח",
      "ליווי ופיקוח על בעלי מקצוע",
    ],
  },
] as const;

const processSteps = [
  {
    number: "1",
    title: "פגישת היכרות",
    text: "נפגש, נדבר על החזון, הצרכים והחלומות שלכם.",
    icon: "/meeting.png",
  },
  {
    number: "2",
    title: "תכנון והצעה",
    text: "אכין עבורכם הצעה מפורטת עם קונספט ראשוני.",
    icon: "/planning.png",
  },
  {
    number: "3",
    title: "עיצוב ופיתוח",
    text: "נעבוד יחד על הפיתוח המלא של העיצוב.",
    icon: "/sketches.png",
  },
  {
    number: "4",
    title: "ביצוע והשלמה",
    text: "אלווה אתכם עד לרגע שהמפתח מסתובב בדלת.",
    icon: "/finish.png",
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
          <div className="services-step-icon">
            <Image
              alt={step.title}
              className="services-step-icon-image"
              height={96}
              src={step.icon}
              width={96}
            />
          </div>
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
