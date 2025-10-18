type SectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({
  id,
  title,
  subtitle,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="mb-10 animate-fade-in-up">
            <h2 className="heading-lg hover:text-accent transition-colors duration-300">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-body text-black/60 dark:text-white/60 animate-fade-in-up animate-stagger-1">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="animate-fade-in-up animate-stagger-2">{children}</div>
      </div>
    </section>
  );
}
