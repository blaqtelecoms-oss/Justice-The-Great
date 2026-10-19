import React from "react";

export default function Privacy() {
  return (
    <div className="bg-landing-bg min-h-screen pt-24">
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-landing-navy tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-landing-mut mt-2">Last updated: 2026</p>

          <div className="mt-8 space-y-6 text-landing-ink leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-landing-navy">1. Introduction</h2>
              <p className="mt-2">
                Justice The Great ("we", "us") is a licensed Financial Services Provider committed to
                protecting your personal information in line with the Protection of Personal
                Information Act, 2013 (POPIA). This policy explains how we collect, use and protect
                your information.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">2. Information we collect</h2>
              <p className="mt-2">We collect personal information necessary to provide financial services, including:</p>
              <ul className="mt-2 list-disc list-inside">
                <li>Full name, ID number and contact details</li>
                <li>Address and policy details</li>
                <li>Beneficiary and dependent information</li>
                <li>Claims and payment records</li>
                <li>Documents you submit (ID copies, death certificates, proof of relationship)</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">3. How we use your information</h2>
              <p className="mt-2">We use your information to:</p>
              <ul className="mt-2 list-disc list-inside">
                <li>Administer your policy and process claims</li>
                <li>Communicate with you about your cover and premiums</li>
                <li>Comply with legal and regulatory obligations as an FSP</li>
                <li>Prevent fraud and verify identity</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">4. Sharing your information</h2>
              <p className="mt-2">
                We only share your information with third parties where necessary to provide our
                services (such as underwriters or payment processors), or where required by law.
                We do not sell your personal information.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">5. Data security</h2>
              <p className="mt-2">
                We use appropriate technical and organisational measures to protect your personal
                information against unauthorised access, loss or misuse.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">6. Your rights</h2>
              <p className="mt-2">
                You have the right to access, correct or request deletion of your personal
                information, and to object to the processing of it. To exercise these rights,
                contact us using the details on our Contact page.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">7. Contact</h2>
              <p className="mt-2">
                For any privacy questions or requests, email jtfgunerals@gmail.com or visit our
                office in Scott Street, Newcastle.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}