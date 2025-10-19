"use client";

import Section from "../components/Section";

export default function About() {
  return (
    <main>
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-in-up">
            {/* Placeholder for designer image */}
            <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-sm">תמונת המעצבת</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up animate-stagger-1">
            <div className="prose prose-lg max-w-none">
              <p className="text-body-lg leading-relaxed">
                שמי חגית עוז. עיצוב פנים הוא לא רק מקצוע – זו הדרך שבה אני
                מתבוננת על העולם.
              </p>

              <p className="text-body leading-relaxed">
                עבורי, כמו שמוזיקאי שומע צלילים, אני רואה חללים - מחפשת את
                ההרמוניה, את מה שנמצא שם בפוטנציאל ומחכה להתגלות ואני עושה זאת
                באמצעות שימוש בצבע, חומר ואור.
              </p>

              <p className="text-body leading-relaxed">
                אני בעלת תואר ראשון במתמטיקה ומדעי המחשב ותואר שני במנהל עסקים –
                שני עולמות שדורשים חשיבה אנליטית, ראייה מערכתית, סדר ויכולת
                להתמקד במטרה. הרקע הזה בנה אצלי חשיבה לוגית, דיוק ואהבה לפתרון
                בעיות מורכבות.
              </p>

              <p className="text-body leading-relaxed">
                אבל הלב תמיד חיפש דרך להביא לידי ביטוי גם יצירתיות ורגש. רציתי
                שהעשייה שלי תהיה משמעותית ושתביא ערך אמיתי לעולם, לא רק לייצר
                תוצרים אלא גם לגעת באנשים ולשפר את איכות חייהם. ומכאן זה
                התחיל.....
              </p>
            </div>
          </div>
        </div>
      </Section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="heading-lg text-gradient">ההתחלה</h2>

              <p className="text-body leading-relaxed">
                ההכרות שלי עם עולם העיצוב החלה בקורס הום סטיילינג. זו הייתה
                עבורי חוויה מכוננת – גיליתי כמה עיצוב משפיע על התחושה הפנימית,
                ואיך דרך הבנה עמוקה של צרכים ואורח חיים אפשר לייצר תחושת בית
                אמיתית.
              </p>

              <p className="text-body leading-relaxed">
                לכן החלטתי להמשיך ולהרחיב את הכלים המקצועיים שלי ונרשמתי ללימודי
                עיצוב פנים. מהר מאוד הבנתי שזה הרבה מעבר לשינוי של צבע או רהיט –
                זהו תהליך אישי, שמבקש להבין מה באמת עושה טוב לאנשים כשהם חוזרים
                הביתה.
              </p>

              <p className="text-body leading-relaxed">
                כשאני עובדת, אני לא מתמקדת רק בקירות, מידות וצבעים – אני מקשיבה
                לאנשים שיחיו שם, לדרך שבה הם חווים את הבית. אני משלבת חשיבה
                שיטתית עם אינטואיציה, יצירתיות עם סדר, כדי ליצור מרחב שמרגיש
                נכון, נינוח ומעורר השראה.
              </p>

              <p className="text-body leading-relaxed">
                בעיניי, עיצוב הוא לא רק איך המקום נראה – אלא איך הוא גורם לנו
                להרגיש. וכך נולד הסטודיו לעיצוב פנים - האצטרובל.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="heading-lg text-gradient">האצטרובל - הסמל</h2>

              <p className="text-body leading-relaxed">
                האצטרובל, סמל טבעי ואורגני, מגלם בתוכו חיבור עמוק לטבע ולסביבה.
                מעבר ליופיו הפשוט לכאורה, מסתתר בו סדר מתמטי מרהיב – מבנהו מבוסס
                על יחס הזהב, מה שמעיד על הרמוניה, פרופורציות מדויקות ואסתטיקה
                על-זמנית, שמופיעים בעולם עיצוב הפנים.
              </p>

              <p className="text-body leading-relaxed">
                על אף שכלל נראה דומה, אין שניים זהים – ממש כמו כל פרויקט עיצוב
                אישי שמותאם בקפידה לצרכיו הייחודיים של הלקוח.
              </p>

              <p className="text-body leading-relaxed">
                האצטרובל מזוהה בתרבויות רבות עם בלוטת האצטרובל – אותה &quot;עין
                שלישית&quot; סמלית, המייצגת תודעה גבוהה, אינטואיציה וחיבור לרוח.
              </p>

              <p className="text-body leading-relaxed font-medium text-accent">
                נעים להכיר
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="heading-lg text-gradient">החזון שלי</h2>

              <p className="text-body leading-relaxed">
                הבית בעיניי הוא לא רק מבנה, אלא מרחב שמכיל חיים שלמים – וזה מה
                שאני מבקשת לעצב. החזון שלי הוא לתכנן בתים שנולדים מתוך הדיוק של
                מי שגר בהם: מה חשוב להם, מה מרגיע אותם, ומה נותן להם תחושת
                שייכות.
              </p>

              <p className="text-body leading-relaxed">
                בתים שלא רק נראים &quot;מעוצבים&quot; – אלא מרגישים שלמים. אני
                פועלת מתוך ערכים של אחריות, יושרה והקשבה אמיתית, תוך שמירה על
                מקצועיות ויצירתיות המובילים לתוצאות מדויקות ואישיות.
              </p>

              <p className="text-body leading-relaxed">
                בה בעת, אני משתדלת לשלב חשיבה סביבתית בתהליך, מתוך מחויבות
                לעיצוב שאכפת לו מההשפעה על העולם שסביבנו.
              </p>

              <p className="text-body leading-relaxed">
                אני מאמינה שעיצוב נכון הוא כזה שמבין את המורכבות של החיים – את
                השילוב בין רצון לאילוץ, בין סדר לבלגן של היומיום, בין חלום
                לתקציב.
              </p>

              <p className="text-body leading-relaxed">
                בתוך כל אלה, אני מחפשת את הדרך לייצר בית שקט, פשוט, פונקציונלי,
                נעים ובעיקר – אמיתי.
              </p>

              <p className="text-body leading-relaxed">
                השליחות שלי היא להפוך את תהליך העיצוב לנגיש, אנושי ומבוסס הקשבה.
                לשלב בין ראייה מערכתית לבין רגישות לפרטים, בין פתרון בעיות לבין
                השראה – וליצור בתים שיש בהם מרחב להיות. לא מושלם, אלא מדויק.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
