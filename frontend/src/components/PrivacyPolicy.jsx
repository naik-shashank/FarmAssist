const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: March 24, 2023</p>

        <div className="prose prose-blue dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to FarmAsssist AI ("we," "our," or "us"). We are committed to protecting your privacy and ensuring
            the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our PlantDisease detection service.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect several types of information from and about users of our service, including:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> This includes your name, email address, and payment information
              when you create an account or purchase our services.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our service, including the images you upload
              for analysis.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, device information, and cookies.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing and maintaining our service</li>
            <li>Processing your payments and managing your account</li>
            <li>Improving our PlantDisease detection algorithms</li>
            <li>Communicating with you about updates or changes to our service</li>
            <li>Responding to your inquiries and providing customer support</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information from
            unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the
            Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this
            Privacy Policy, unless a longer retention period is required or permitted by law.
          </p>

          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate or incomplete information</li>
            <li>The right to delete your personal information</li>
            <li>The right to restrict or object to processing</li>
            <li>The right to data portability</li>
          </ul>

          <h2>7. Children's Privacy</h2>
          <p>
            Our service is not intended for children under the age of 13. We do not knowingly collect personal
            information from children under 13. If you are a parent or guardian and believe that your child has provided
            us with personal information, please contact us.
          </p>

          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>9. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <ul>
            <li>Email: privacy@FarmAsssist.ai</li>
            <li>Address: 123 Innovation Street, San Francisco, CA 94103</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

