"use client";

export default function PortfolioPreview({ data }) {
  const { sections, heroSection, projects, aboutUs, contactUs } = data || {};

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">

      {/* ── NAV ── */}
      <nav className=" bg-white/90 backdrop-blur border-b flex items-center justify-between px-8 py-4">
        <div className="font-extrabold text-lg tracking-tight text-gray-900">
          {heroSection?.title || "Your Name"}
        </div>
        <div className="hidden md:flex items-center space-x-7 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Projects</a>
          <a href="#" className="hover:text-blue-600 transition-colors">About</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-sm">
          Hire Me
        </button>
      </nav>

      {/* ── HERO ── */}
      {sections?.hero && (
        <section className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full mb-5 tracking-wide uppercase">
              ✨ Open to work
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 text-gray-900">
              Hi, I'm{" "}
              <span className="text-blue-600">
                {heroSection?.title || "Your Name"}
              </span>
            </h1>

            <p className="text-base sm:text-lg font-semibold text-blue-500 mb-4">
              {heroSection?.tagline || "Your Role / Tagline"}
            </p>

            <p className="text-gray-500 leading-relaxed mb-8 max-w-lg">
              {heroSection?.description || "Your introduction goes here."}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors shadow">
                View Projects
              </button>
              <button className="px-6 py-3 border border-gray-200 text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors">
                Contact Me
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex-shrink-0 w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg bg-gray-100 flex items-center justify-center">
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
              className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100"
              style={{ display: heroSection?.heroImage ? "none" : "flex" }}
            >
              <svg className="h-12 w-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs">No photo</p>
            </div>
          </div>
        </section>
      )}

      {/* ── PROJECTS ── ✅ Fixed: uses data.projects with projectName/projectDescription/projectImage */}
      {sections?.projects && projects?.length > 0 && (
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Portfolio</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-1">My Projects</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group"
                >

                  {/* Project Info */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {proj.projectName || "Project Title"}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-8">
                      {proj.projectDescription || "Project description goes here."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT ── */}
      {sections?.aboutUs && aboutUs && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Who I Am</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">About Me</h2>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl px-10 py-12 text-center border border-blue-100">
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-base">
              {aboutUs?.aboutDescription || "Write something about yourself here."}
            </p>
          </div>
        </section>
      )}

      {/* ── CONTACT ── */}
      {sections?.contactUs && contactUs && (
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Get In Touch</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1 mb-10">Contact</h2>
            <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
              {contactUs?.email && (
                <a
                  href={`mailto:${contactUs.email}`}
                  className="flex items-center gap-3 px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-400 font-medium">Email</p>
                    <p className="text-sm font-semibold text-gray-800">{contactUs.email}</p>
                  </div>
                </a>
              )}
              {contactUs?.phoneNo && (
                <div className="flex items-center gap-3 px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0
                        .684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-400 font-medium">Phone</p>
                    <p className="text-sm font-semibold text-gray-800">{contactUs.phoneNo}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-blue-600 text-white mt-0">
        <div className="max-w-5xl mx-auto px-6 py-10 text-center">
          <h3 className="text-xl font-extrabold mb-1">
            {heroSection?.title || "Your Name"}
          </h3>
          <p className="text-blue-200 text-sm mb-6">
            {heroSection?.tagline || ""}
          </p>
          <div className="border-t border-blue-500 pt-6">
            <p className="text-xs text-blue-300">
              © {new Date().getFullYear()} {heroSection?.title || "Your Name"}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}