import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Security | VIRENZA",
  description: "Security practices for the VIRENZA Landscape Solutions website.",
};

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Security"
      title="Security"
      intro="This page summarizes basic security practices for this website and gives visitors a clear way to report a concern."
      sections={[
        {
          title: "Website Protection",
          body: [
            "The website is designed to run over HTTPS in production, uses server-side validation for quote requests, and includes spam reduction for form submissions.",
            "Sensitive service credentials are intended to stay in server environment variables and should not be placed in public website code.",
          ],
        },
        {
          title: "Payments and Passwords",
          body: [
            "This website does not collect account passwords or process payments directly. If that changes later, the security and privacy pages should be updated before launch.",
            "Do not send payment card details, gate codes, or highly sensitive information through the general quote form.",
          ],
        },
        {
          title: "Report an Issue",
          body: [
            "If you believe you found a security issue, email veilllc0555@gmail.com with the page URL, a short description, and steps to reproduce the concern.",
            "Please do not misuse the website, access customer information, or disrupt service while reporting an issue.",
          ],
        },
      ]}
    />
  );
}
