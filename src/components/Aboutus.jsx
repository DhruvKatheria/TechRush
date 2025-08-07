import React from 'react';
import { Heart, Users, Target, Shield, Mail, Phone, MapPin, Clock } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#00AAE4] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 text-white" />
          <h1 className="text-4xl font-bold mb-4 text-black">About CharityConnect</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Bridging the gap between generous hearts and meaningful causes through transparent,
            efficient charitable giving and community impact.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      {/* Mission & Vision (in Cards) */}
<div className="py-16">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid md:grid-cols-3 gap-8">
      {/* Mission Card */}
      <div className="text-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
        <Target className="h-12 w-12 text-[#00AAE4] mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-3 text-black">Our Mission</h3>
        <p className="text-black/60">
          To democratize charitable giving by connecting donors directly with
          verified NGOs, ensuring transparency and maximum impact for every
          donation.
        </p>
      </div>

      {/* Vision Card */}
      <div className="text-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
        <Users className="h-12 w-12 text-[#00AAE4] mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-3 text-black">Our Vision</h3>
        <p className="text-black/60">
          A world where compassion meets action seamlessly, where every person
          can contribute to positive change and see the real impact of their
          generosity.
        </p>
      </div>

      {/* Values Card */}
      <div className="text-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
        <Shield className="h-12 w-12 text-[#00AAE4] mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-3 text-black">Our Values</h3>
        <p className="text-black/60">
          Transparency, integrity, and accountability in every transaction. We
          believe in building trust through verified partnerships and detailed
          impact reporting.
        </p>
      </div>
    </div>
  </div>
</div>


      {/* Our Story */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Our Story</h2>
          <div className="prose prose-lg mx-auto text-black/60">
            <p className="mb-6">
              CharityConnect was born from a simple observation: while people want to give back to
              their communities, they often struggle to find trustworthy organizations and
              understand how their donations create real impact.
            </p>
            <p className="mb-6">
              Founded in 2023, our platform emerged as a solution to bridge this gap. We recognized
              that both donors and NGOs needed a transparent, efficient way to connect. Donors
              wanted assurance that their contributions would be used effectively, while NGOs needed
              reliable funding and broader reach for their vital work.
            </p>
            <p className="mb-6">
              Today, CharityConnect serves as a trusted intermediary, carefully vetting NGOs,
              providing detailed impact reports, and ensuring that every donation creates measurable
              positive change in communities around the world.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-[#00AAE4]/20 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#00AAE4] mb-2">4+</div>
              <div className="text-black/60">Verified NGOs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#00AAE4] mb-2">1500+</div>
              <div className="text-black/60">Donations Facilitated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#00AAE4] mb-2">1000+</div>
              <div className="text-black/60">Lives Impacted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#00AAE4] mb-2">98%</div>
              <div className="text-black/60">Transparency Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="bg-gray py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-black">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-[#00AAE4]" />
                  <div>
                    <p className="text-black font-medium">Office Address</p>
                    <p className="text-black/60">
                      123 Charity Street, Pune, Maharashtra 411001
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#00AAE4]" />
                  <div>
                    <p className="text-black font-medium">Phone</p>
                    <p className="text-black/60">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#00AAE4]" />
                  <div>
                    <p className="text-black font-medium">Email</p>
                    <p className="text-black/60">contact@charityconnect.org</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-[#00AAE4]" />
                  <div>
                    <p className="text-black font-medium">Business Hours</p>
                    <p className="text-black/60">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-black/60">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-black">Follow Us</h4>
                <div className="flex space-x-4">
                  <button className="bg-[#3b5998] text-white px-4 py-2 rounded-lg hover:bg-[#2d4373] transition-colors">
                    Facebook
                  </button>
                  <button className="bg-[#1DA1F2] text-white px-4 py-2 rounded-lg hover:bg-[#0d95e8] transition-colors">
                    Twitter
                  </button>
                  <button className="bg-[#0077b5] text-white px-4 py-2 rounded-lg hover:bg-[#005983] transition-colors">
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-black">Send us a Message</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92AEE0]"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92AEE0]"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92AEE0]"
                    placeholder="Message subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92AEE0]"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  onClick={() => alert('Message sent! We will get back to you soon.')}
                  className="w-full bg-[#00AAE4] text-white py-2 px-4 rounded-lg hover:bg-[#7f9ed8] transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
