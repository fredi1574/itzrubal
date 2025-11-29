import Image from "next/image";
import type { JSX } from "react";

export const metadata = { title: "About" };

const storyParagraphs = [
  "שמי חגית.",
  "אני בעלת תואר ראשון במתמטיקה ומדעי המחשב ותואר שני במנהל עסקים, שני עולמות שדורשים חשיבה אנליטית, ראייה מערכתית, סדר ויכולת להתמקד במטרה. הרקע הזה בנה אצלי חשיבה לוגית, דיוק ואהבה לפתרון בעיות מורכבות.",
  "אבל הלב תמיד חיפש דרך להביא לידי ביטוי גם יצירתיות ורגש. רציתי שהעשייה שלי תהיה משמעותית ושתביא ערך אמיתי לעולם, לא רק לייצר תוצרים אלא גם לגעת באנשים ולשפר את איכות חייהם.",
] as const;

const storyJourney = [
  "ההכרות שלי עם עולם העיצוב החלה בקורס הום סטיילינג.  אז גיליתי איזו השפעה יש לעיצוב על התחושה הפנימית, ואיך דרך הבנה עמוקה של צרכים ואורח חיים אפשר לייצר תחושת בית אמיתית.",
  "כשסיימתי את לימודי ההום סטיילינג הבנתי שזה לא מספיק בשבילי. רציתי להבין את הדברים לעומק ולכן החלטתי להמשיך ולהרחיב את הכלים המקצועיים שלי ונרשמתי ללימודי עיצוב פנים. מהר מאוד הבנתי שזה הרבה מעבר לשינוי של צבע או רהיט, זהו תהליך אישי, שמבקש להבין מה באמת עושה טוב לאנשים במרחב הפרטי שלהם - בבית.",
  `כשאני מתחילה פרויקט חדש, לפני הכל, אני רוצה להכיר את האנשים שגרים בבית.
באמצעות שאלות ממוקדות אבני לומדת להכיר את הדרך שבה הם חווים את הבית. 
אני משלבת חשיבה שיטתית עם אינטואיציה, יצירתיות עם סדר, כדי ליצור מרחב שמרגיש נכון, נינוח ומעורר השראה.
`,
] as const;

const approachParagraphs = [
  "כשאני עובדת, אני לא מתמקדת רק בקירות, מידות וצבעים – אני מקשיבה לאנשים שיחיו שם, לדרך שבה הם חווים את הבית. אני משלבת חשיבה שיטתית עם אינטואיציה, יצירתיות עם סדר, כדי ליצור מרחב שמרגיש נכון, נינוח ומעורר השראה.",
] as const;

const values = [
  {
    title: "חשיבה מערכתית",
    description: "ראייה רחבה של כל המרכיבים – מהתכנון הראשוני ועד הפרט האחרון.",
  },
  {
    title: "יצירתיות ורגש",
    description: "שילוב של אמנות ואינטואיציה ליצירת חללים שמדברים ללב.",
  },
  {
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
    <section className="flex gap-10 max-w-7xl mx-auto">
      <ImageSection />
      <StorySection />
    </section>
    <ApproachSection />
    <ValuesSection />
    <ClosingSection />
    <CtaSection />
  </div>
);

const HeroSection = (): JSX.Element => (
  <section className="about-hero">
    <h1 className="about-hero-title">נעים להכיר</h1>
  </section>
);

const ImageSection = (): JSX.Element => (
  <div className="about-image w-1/2">[תמונה של המעצבת]</div>
);

const StorySection = (): JSX.Element => (
  <section className="w-1/2">
    <h2 className="text-5xl my-8 font-light text-foreground tracking-widest text-center">
      המסע שלי
    </h2>
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
  <section className="max-w-7xl mx-auto">
    <h2 className="text-5xl my-8 font-light text-foreground tracking-widest text-center">
      הגישה שלי
    </h2>
    {approachParagraphs.map((text) => (
      <p className="about-section-paragraph" key={text}>
        {text}
      </p>
    ))}
    <p className="about-highlight">
      בעיניי, עיצוב הוא לא רק איך המקום נראה, אלא איך הוא גורם לנו להרגיש.
    </p>
  </section>
);

const ValuesSection = (): JSX.Element => (
  <section className="about-values">
    <h2 className="about-values-title">הערכים שמנחים אותי</h2>
    <div className="about-values-grid">
      {values.map((value) => (
        <article className="about-value-card" key={value.title}>
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
