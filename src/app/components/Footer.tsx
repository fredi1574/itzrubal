import Image from "next/image";
import Link from "next/link";

const links = [
  {
    href: "https://www.instagram.com/hagit_int_design/",
    icon: "/instagram.png",
    alt: "Instagram",
  },
  {
    href: "https://www.facebook.com/hagitp.interior.design",
    icon: "/facebook.png",
    alt: "Facebook",
  },
  {
    href: "https://www.linkedin.com/in/hagit-oz-interior-design/",
    icon: "/linkedin.png",
    alt: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <footer className="border-t hairline animate-fade-in">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300 animate-fade-in-up">
            {new Date().getFullYear()} Hagit Oz ©
          </p>
          <div className="text-sm flex gap-3 text-foreground/60 hover:text-accent transition-colors duration-300 animate-fade-in-up animate-stagger-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <Image src={link.icon} alt={link.alt} width={20} height={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
