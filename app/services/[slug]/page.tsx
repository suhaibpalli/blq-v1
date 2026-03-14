import { SERVICES } from "@/lib/constants";
import { notFound } from "next/navigation";
import ServicePageClient from "./ServicePageClient";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} - Black Quantum Labs`,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceIndex = SERVICES.findIndex((s) => s.slug === slug);
  const relatedServices = SERVICES.filter(
    (_, idx) =>
      idx !== serviceIndex &&
      idx !== serviceIndex - 1 &&
      idx !== serviceIndex + 1,
  ).slice(0, 3);

  return (
    <ServicePageClient service={service} relatedServices={relatedServices} />
  );
}
