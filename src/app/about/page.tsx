import type { JSX } from "react";

export const metadata = { title: "About" };

const introLines = [
  "עבורי, עיצוב פנים הוא לא רק מקצוע – זו הדרך שבה אני מתבוננת על העולם.",
  "כמו שמוזיקאי שומע צלילים, אני רואה חללים – מחפשת את ההרמוניה,",
  "את מה שנמצא שם בפוטנציאל ומחכה להתגלות.",
] as const;

const storyParagraphs = [
  "אני בעלת תואר ראשון במתמטיקה ומדעי המחשב ותואר שני במנהל עסקים – שני עולמות שדורשים חשיבה אנליטית, ראייה מערכתית, סדר ויכולת להתמקד במטרה. הרקע הזה בנה אצלי חשיבה לוגית, דיוק ואהבה לפתרון בעיות מורכבות.",
  "אבל הלב תמיד חיפש דרך להביא לידי ביטוי גם יצירתיות ורגש. רציתי שהעשייה שלי תהיה משמעותית ושתביא ערך אמיתי לעולם, לא רק לייצר תוצרים אלא גם לגעת באנשים ולשפר את איכות חייהם.",
] as const;

const storyJourney = [
  "ההכרות שלי עם עולם העיצוב החלה בקורס הום סטיילינג. זו הייתה עבורי חוויה מכוננת – גיליתי כמה עיצוב משפיע על התחושה הפנימית, ואיך דרך הבנה עמוקה של צרכים ואורח חיים אפשר לייצר תחושת בית אמיתית.",
  "לכן החלטתי להמשיך ולהרחיב את הכלים המקצועיים שלי ונרשמתי ללימודי עיצוב פנים. מהר מאוד הבנתי שזה הרבה מעבר לשינוי של צבע או רהיט – זהו תהליך אישי, שמבקש להבין מה באמת עושה טוב לאנשים כשהם חוזרים הביתה.",
] as const;

const approachParagraphs = [
  "כשאני עובדת, אני לא מתמקדת רק בקירות, מידות וצבעים – אני מקשיבה לאנשים שיחיו שם, לדרך שבה הם חווים את הבית. אני משלבת חשיבה שיטתית עם אינטואיציה, יצירתיות עם סדר, כדי ליצור מרחב שמרגיש נכון, נינוח ומעורר השראה.",
] as const;

const pineconeParagraphs = [
  "האִצְטְרֻבָּל, סמל טבעי ואורגני, מגלם בתוכו חיבור עמוק לטבע ולסביבה.",
  "מעבר ליופיו הפשוט לכאורה, מסתתר בו סדר מתמטי מרהיב – מבנהו מבוסס על יחס הזהב, מה שמעיד על הרמוניה, פרופורציות מדויקות ואסתטיקה על-זמנית, שמופיעים בעולם עיצוב הפנים.",
  "על אף שכל אִצְטְרֻבָּל נראה דומה, אין שניים זהים – ממש כמו כל פרויקט עיצוב אישי שמותאם בקפידה לצרכיו הייחודיים של הלקוח.",
  'האִצְטְרֻבָּל מזוהה בתרבויות רבות עם בלוטת האִצְטְרֻבָּל – אותה "עין שלישית" סמלית, המייצגת תודעה גבוהה, אינטואיציה וחיבור לרוח.',
] as const;

const values = [
  {
    icon: "🎯",
    title: "חשיבה מערכתית",
    description: "ראייה רחבה של כל המרכיבים – מהתכנון הראשוני ועד הפרט האחרון.",
  },
  {
    icon: "💫",
    title: "יצירתיות ורגש",
    description: "שילוב של אמנות ואינטואיציה ליצירת חללים שמדברים ללב.",
  },
  {
    icon: "🤝",
    title: "הקשבה אמיתית",
    description:
      "הבנה עמוקה של מי שאתם, איך אתם חיים, ומה גורם לכם להרגיש בבית.",
  },
] as const;

/**
 * Renders the about page with hero, story, values and CTA sections.
 * @returns {JSX.Element} Full about experience in Hebrew RTL layout.
 */
const AboutPage = (): JSX.Element => (
  <div className="about-page" dir="rtl" lang="he">
    <HeroSection />
    <section className="about-content">
      <IntroText />
      <ImageSection />
      <StorySection />
      <ApproachSection />
    </section>
    <PineconeSection />
    <ValuesSection />
    <ClosingSection />
    <CtaSection />
  </div>
);

const HeroSection = (): JSX.Element => (
  <section className="about-hero">
    <h1 className="about-hero-title">נעים להכיר</h1>
    <p className="about-hero-subtitle">הסיפור מאחורי איצטרובל</p>
  </section>
);

const IntroText = (): JSX.Element => (
  <p className="about-intro-text">
    {introLines.map((line, index) => (
      <span key={line}>
        {line}
        {index < introLines.length - 1 && <br />}
      </span>
    ))}
  </p>
);

const ImageSection = (): JSX.Element => (
  <div className="about-image">[תמונה של המעצבת]</div>
);

const StorySection = (): JSX.Element => (
  <section className="about-section">
    <h2 className="about-section-title">המסע שלי</h2>
    {storyParagraphs.map((text) => (
      <p className="about-section-paragraph" key={text}>
        {text}
      </p>
    ))}
    <p className="about-highlight">ומכאן זה התחיל...</p>
    {storyJourney.map((text) => (
      <p className="about-section-paragraph" key={text}>
        {text}
      </p>
    ))}
  </section>
);

const ApproachSection = (): JSX.Element => (
  <section className="about-section">
    <h2 className="about-section-title">הגישה שלי</h2>
    {approachParagraphs.map((text) => (
      <p className="about-section-paragraph" key={text}>
        {text}
      </p>
    ))}
    <p className="about-highlight">
      בעיניי, עיצוב הוא לא רק איך המקום נראה – אלא איך הוא גורם לנו להרגיש.
    </p>
  </section>
);

const PineconeSection = (): JSX.Element => (
  <section className="about-pinecone">
    <h2 className="about-pinecone-title">אִצְטְרֻבָּל</h2>
    <p className="about-pinecone-subtitle">הסמל שמאחורי השם</p>
    <div className="about-pinecone-content">
      <div aria-hidden="true" className="about-pinecone-image">
        🌲
      </div>
      <div className="about-pinecone-text">
        {pineconeParagraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </div>
  </section>
);

const ValuesSection = (): JSX.Element => (
  <section className="about-values">
    <h2 className="about-values-title">הערכים שמנחים אותי</h2>
    <div className="about-values-grid">
      {values.map((value) => (
        <article className="about-value-card" key={value.title}>
          <div className="about-value-icon" aria-hidden="true">
            {value.icon}
          </div>
          <h3 className="about-value-title">{value.title}</h3>
          <p className="about-value-description">{value.description}</p>
        </article>
      ))}
    </div>
  </section>
);

const ClosingSection = (): JSX.Element => (
  <section className="about-closing">
    <h2 className="about-closing-title">נעים להכיר</h2>
    <p className="about-closing-text">
      אני מזמינה אתכם למסע משותף – מסע שבו נבין יחד מה באמת חשוב לכם, נחלום על
      האפשרויות, וניצור את הבית שמשקף את מי שאתם באמת.
    </p>
  </section>
);

const CtaSection = (): JSX.Element => (
  <section className="about-cta" id="contact">
    <h2 className="about-cta-title">בואו נתחיל את המסע שלכם</h2>
    <p className="about-cta-text">
      אשמח לשמוע על הבית שלכם ולגלות יחד את הפוטנציאל שמחכה בו
    </p>
    <a className="about-cta-button" href="mailto:contact@itztrubel.co.il">
      צרו קשר
    </a>
  </section>
);

export default AboutPage;
