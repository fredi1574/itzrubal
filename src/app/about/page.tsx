export const metadata = { title: "About" };
import { HiUser } from "react-icons/hi";

export default function About() {
  return (
    <div className="grid mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-justify mt-10 grid-cols-1 lg:flex lg:justify-start gap-16 lg:gap-8 items-start">
      {/* First column - Image placeholder */}
      <div className="animate-fade-in-up relative lg:w-[30%] lg:flex-none">
        <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
              <HiUser className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Second column */}
      <div className="animate-fade-in-up animate-stagger-1 relative lg:w-[35%] lg:flex-none min-w-0">
        <div className="prose prose-lg max-w-none space-y-8">
          <p className="text-sm">
            נעים להכיר, אני חגית.
            <br /> עיצוב פנים עבורי הוא לא רק מקצוע, אלא הדרך בה אני רואה את
            העולם. כמו שמוזיקאי שומע צלילים, אני רואה חללים והם מספרים לי סיפור.
            אני מחפשת את ההרמוניה בין צבע, חומר ואור, את מה שנמצא שם בפוטנציאל
            ומחכה להתגלות.
          </p>

          <p className="text-sm leading-relaxed">
            המסע שלי לעיצוב התחיל מתוך הרצון לשלב בין עולמות: מצד אחד יש לי תואר
            במתמטיקה ומדעי המחשב ותואר שני במנהל עסקים מה שמקנה לי את הכלים לגשת
            לפרויקטים בצורה מסודרת, עם ראייה מערכתית ומיקוד. מצד שני, הלב שלי
            תמיד חיפש את הדרך לבטא יצירתיות ורגש והעיצוב זו הדרך המושלמת בשבילי
            למציאת האיזון הזה.
          </p>
        </div>
        {/* Divider */}
        <div className="hidden lg:block absolute top-0 w-px h-full bg-accent/40 -mr-4"></div>

        <div className="animate-fade-in-up animate-stagger-2">
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="leading-relaxed text-sm">
              הסטודיו שלי, <span className="studio-name">אִצְטְרוּבָּל</span>,
              נולד מתוך אהבה גדולה ליצור מרחבים שנוגעים בנפש, לא רק בעיניים. כל
              פרויקט שאני לוקחת על עצמי הוא הזדמנות להקשיב, להבין ולהרגיש יחד עם
              הלקוחות שלי איך אפשר להפוך כל מקום לבית אמיתי.
            </p>

            <p className="leading-relaxed text-sm">
              אני לא רק מעצבת חללים - אני יוצרת חוויות, תחושות, רגעים. אני
              מאמינה שעיצוב טוב הוא כזה שמרגיש נכון, נינוח ומעורר השראה, כזה
              שמלווה את האנשים שנמצאים בו בכל יום מחדש.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
