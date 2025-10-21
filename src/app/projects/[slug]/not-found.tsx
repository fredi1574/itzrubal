"use client";

import { ButtonLink } from "@/app/components/Button";
import { useLocale } from "@/app/lib/LocaleProvider";

export default function ProjectNotFound() {
  const { t } = useLocale();

  return (
    <div className="h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-accent/30 mb-10">
          {t("notFound.title") as string}
        </h1>

        <div className="flex justify-center gap-10">
          <div>
            <ButtonLink href="/" variant="primary">
              {t("notFound.backToHome") as string}
            </ButtonLink>
          </div>

          <div>
            <ButtonLink href="/projects" variant="secondary">
              {t("notFound.viewAllProjects") as string}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
