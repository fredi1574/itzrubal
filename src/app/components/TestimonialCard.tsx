type Props = {
  quote: string;
  author: string;
  role?: string;
};

export default function TestimonialCard({ quote, author, role }: Props) {
  return (
    <blockquote className="rounded-xl border border-black/10 dark:border-white/10 p-6 text-sm hover-lift hover-glow transition-all duration-300 group cursor-pointer">
      <div className="relative">
        <div className="absolute -top-2 -left-2 text-4xl text-accent/20 font-serif">
          &quot;
        </div>
        <p className="relative z-10 text-quote">&quot;{quote}&quot;</p>
        <div className="absolute -bottom-2 -right-2 text-4xl text-accent/20 font-serif transform rotate-180">
          &quot;
        </div>
      </div>
      <footer className="mt-4 text-foreground/60 group-hover:text-accent transition-colors duration-300">
        — {author}
        {role ? ", " + role : ""}
      </footer>
    </blockquote>
  );
}
