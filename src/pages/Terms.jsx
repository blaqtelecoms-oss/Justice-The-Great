import React from "react";

export default function Terms() {
  return (
    <div className="bg-landing-bg min-h-screen pt-24">
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-landing-navy tracking-tight">Terms & Conditions</h1>
          <p className="text-sm text-landing-mut mt-2">Last updated: 2026</p>

          <div className="mt-8 space-y-6 text-landing-ink leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-landing-navy">1. Acceptance of terms</h2>
              <p className="mt-2">
                By using this website or any service from Justice The Great, you agree to these
                terms. If you do not agree, please do not use our services.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">2. About us</h2>
              <p className="mt-2">
                Justice The Great is a licensed South African Financial Services Provider,
                registered with CIPC (2004) and licensed as an FSP (2005). We administer funeral
                schemes and group cover.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">3. Membership & policies</h2>
              <p className="mt-2">
                Membership is open to persons aged 16–64. Your policy schedule sets out the specific
                terms of your cover, including the cover amount, premium, waiting period and
                beneficiaries. In the event of any conflict, your policy schedule prevails over this
                website.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">4. Premiums</h2>
              <p className="mt-2">
                Premiums are payable monthly. If a premium is not paid, cover may lapse after the
                grace period set out in your policy schedule. Lapsed policies may be reinstated on
                terms we determine, which may include a new waiting period.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">5. Claims</h2>
              <p className="mt-2">
                Claims must be submitted with the required documents (death certificate, ID
                copies and proof of relationship). We assess claims in line with your policy terms
                and will notify you of the outcome. We reserve the right to reject claims that do
                not meet the policy conditions.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">6. Beneficiary changes</h2>
              <p className="mt-2">
                Beneficiary changes submitted through the member portal are sent to our admin team
                for approval. Changes only take effect once approved and logged with an audit
                trail. We do not silently overwrite beneficiary data.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">7. Account security</h2>
              <p className="mt-2">
                You are responsible for keeping your login details secure. Do not share your
                password. Notify us immediately if you suspect unauthorised access to your account.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">8. Complaints</h2>
              <p className="mt-2">
                If you have a complaint, please use our Complaints page. If we cannot resolve it,
                you may escalate to the Ombudsman for Financial Services.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-navy">9. Changes to these terms</h2>
              <p className="mt-2">
                We may update these terms from time to time. Continued use of our services after
                changes constitutes acceptance of the updated terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}