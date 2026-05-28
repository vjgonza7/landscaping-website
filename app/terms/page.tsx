import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | VIRENZA",
  description: "Website and service terms for VIRENZA Landscape Solutions.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Service"
      intro="These terms explain how visitors may use this website and what to expect when requesting information, quotes, or landscaping services from VIRENZA Landscape Solutions."
      sections={[
        {
          title: "Website Use",
          body: [
            "You may use this website to learn about our services, request a quote, and contact our team. You agree not to misuse the site, attempt to interfere with its operation, or submit false or abusive information.",
            "Content on this website is provided for general information. It may change at any time as services, availability, pricing, and business details are updated.",
          ],
        },
        {
          title: "Quotes and Estimates",
          body: [
            "Online quote requests, heat survival predictions, HOA checks, and website messages are not final contracts. Actual recommendations, scheduling, pricing, and timelines may depend on an in-person review, site conditions, material availability, and customer approval.",
            "Any final scope of work should be confirmed directly with VIRENZA before service begins.",
          ],
        },
        {
          title: "Customer Responsibilities",
          body: [
            "Customers are responsible for providing accurate contact information, safe property access, and any HOA, utility, irrigation, or property details that may affect the work.",
            "Customers should review and approve final project details, materials, and timing before installation or repair work begins.",
          ],
        },
        {
          title: "Limitations",
          body: [
            "Weather, plant health, water restrictions, soil conditions, pests, and prior installation issues can affect landscaping outcomes. We work to provide practical recommendations, but outdoor results can vary.",
            "To the fullest extent allowed by law, this website is provided as-is and VIRENZA is not responsible for website interruptions, outdated information, or decisions made only from automated website tools.",
          ],
        },
      ]}
    />
  );
}
