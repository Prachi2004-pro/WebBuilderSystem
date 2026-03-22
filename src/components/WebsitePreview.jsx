"use client";

import { useState } from "react";

export default function WebsitePreview({ data }) {
  const { headerSection, heroSection, sections } = data || {};
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 border-b relative">
        <div className="font-bold text-xl">
          {headerSection?.businessName || "Your Company"}
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Category</a>
          <a href="#" className="hover:text-blue-600">Service</a>
          <a href="#" className="hover:text-blue-600">Jobs</a>
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">Login</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Register
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg z-50 md:hidden">
            <div className="flex flex-col px-4 py-3 space-y-3">
              <a href="#" className="hover:text-blue-600 py-1">Home</a>
              <a href="#" className="hover:text-blue-600 py-1">Category</a>
              <a href="#" className="hover:text-blue-600 py-1">Service</a>
              <a href="#" className="hover:text-blue-600 py-1">Jobs</a>
              <hr />
              <div className="flex space-x-3 pb-1">
                <button className="text-gray-600 hover:text-gray-900">Login</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {sections?.hero && (
        <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center px-4 sm:px-6 py-10 max-w-6xl mx-auto">
          <div>
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              ✨ Now trending
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
              {heroSection?.tagline || "Your tagline"}{" "}
              <span className="text-blue-600 text-4xl sm:text-5xl">
                {heroSection?.title || "Your title"}.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
              {heroSection?.description || "Your description goes here."}
            </p>
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              {heroSection?.button || "Call to Action"}
            </button>
          </div>
          <div className="flex justify-center mt-6 md:mt-0">
            <div className="w-full max-w-sm aspect-square rounded-xl overflow-hidden">
              {heroSection?.heroImage ? (
                <img
                  src={heroSection.heroImage}
                  alt="Hero"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextElementSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200"
                style={{ display: heroSection?.heroImage ? "none" : "flex" }}
              >
                <div className="text-center">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm">No image selected</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {sections?.features && data.features?.length > 0 && (
        <section className="px-4 sm:px-6 max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {data.features.map((feature, index) => (
              <div
                key={index}
                className="p-5 sm:p-6 border rounded-xl hover:shadow-lg transition"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  {feature.title || "Feature title"}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.description || "Feature description"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About Us */}
      {sections?.aboutUs && data.aboutUs && (
        <section className="px-4 sm:px-6 max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">About Us</h2>
          <div className="bg-gray-100 text-black rounded-xl py-8 sm:py-10 px-4 sm:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              {data.aboutUs.aboutTitle || "About Title"}
            </h2>
            <p className="text-gray-800 max-w-3xl mx-auto text-sm sm:text-base">
              {data.aboutUs.aboutDescription ||
                "Write something about your company here."}
            </p>
          </div>
        </section>
      )}

      {/* Contact Us */}
      {sections?.contactUs && data.contactUs && (
        <section className="px-4 sm:px-6 max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Contact Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="py-5 sm:py-6 border rounded-xl">
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-gray-600 text-sm sm:text-base break-words px-2">
                {data.contactUs.email || "example@email.com"}
              </p>
            </div>
            <div className="py-5 sm:py-6 border rounded-xl">
              <h4 className="font-semibold mb-2">Phone</h4>
              <p className="text-gray-600 text-sm sm:text-base">
                {data.contactUs.phoneNo || "+91 00000 00000"}
              </p>
            </div>
            <div className="py-5 sm:py-6 border rounded-xl">
              <h4 className="font-semibold mb-2">Address</h4>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                {data.contactUs.address || "Your address here"}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {sections?.faq && data.FAQ?.length > 0 && (
        <section className="px-4 sm:px-6 max-w-4xl mx-auto mt-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {data.FAQ.map((faq, index) => (
              <details
                key={index}
                className="border rounded-lg p-4 cursor-pointer"
              >
                <summary className="font-semibold text-sm sm:text-base">
                  {faq.question || "Your question"}
                </summary>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  {faq.answer || "Your answer goes here"}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      {sections?.footer && (
        <footer className="bg-blue-600 text-white mt-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              {data.footer?.brandName || "Your Brand"}
            </h3>
            {data.footer?.brandLogo && (
              <img
                src={data.footer.brandLogo}
                alt="Brand Logo"
                className="mx-auto h-10 sm:h-12 mb-4"
              />
            )}
            {data.footer?.SocialLinks && (
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                {data.footer.SocialLinks}
              </p>
            )}
            <p className="text-xs sm:text-sm text-gray-300">
              {data.footer?.copywrite || "© 2026 All rights reserved."}
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}