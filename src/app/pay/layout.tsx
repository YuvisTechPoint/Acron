import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pay Online | Acorn Legal Consultants, Kolkata",
  description:
    "Secure digital payment gateway for existing clients of Acorn Legal Consultants to pay consultation fees, retainers, and matter invoices via Razorpay.",
  alternates: {
    canonical: "https://www.acornlegal.in/pay",
  },
};

export default function PayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

