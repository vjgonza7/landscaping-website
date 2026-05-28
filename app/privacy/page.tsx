import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | VIRENZA",
  description: "How VIRENZA Landscape Solutions collects and uses customer information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This page explains what information VIRENZA Landscape Solutions collects through this website and how we use it to respond to quote requests and service inquiries."
      sections={[
        {
          title: "Information We Collect",
          body: [
            "When you submit a form, we may collect your name, phone number, email address, service interest, message details, ZIP code, address details, and any plant or yard information you choose to provide.",
            "We may also receive basic technical information such as browser type, approximate device information, pages visited, and timestamps if analytics or security tools are enabled.",
          ],
        },
        {
          title: "How We Use Information",
          body: [
            "We use your information to respond to quote requests, schedule estimates, provide landscaping and irrigation service information, improve the website, reduce spam, and keep records of customer communication.",
            "If you ask for a heat survival or HOA readiness check, the information you provide is used to create that estimate-style result and help us recommend next steps.",
          ],
        },
        {
          title: "Sharing",
          body: [
            "We do not sell your personal information. We may share information with service providers that help operate this website, send email, host the site, prevent abuse, or support customer communication.",
            "We may disclose information if required by law or if needed to protect our business, customers, website, or legal rights.",
          ],
        },
        {
          title: "Your Choices",
          body: [
            "You can request that we update or delete your contact information by emailing veilllc0555@gmail.com. Some records may be kept when needed for legitimate business, tax, security, or legal reasons.",
            "Cookie and tracking choices can be managed from the Cookie Preferences link in the footer.",
          ],
        },
      ]}
    />
  );
}
