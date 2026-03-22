"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import WebsitePreview from "@/components/WebsitePreview";
import PortfolioPreview from "@/components/PortfolioPreview";
// import { useParams } from "next/navigation";
import axios from "axios";

const defaultWebsiteData = {
  templateType: "website", // or "portfolio"
  sections: {
    hero: true,
    features: true,
    aboutUs: true,
    contactUs: true,
    faq: true,
    footer: true,
  },

  headerSection: {
    logo: "",
    businessName: "",
    navigationLinks: [],
  },

  heroSection: {
    title: "",
    tagline: "",
    description: "",
    heroImage: "",
    button: "",
    heroFile: null, // frontend-only
  },

  features: [],

  aboutUs: {
    aboutTitle: "",
    aboutDescription: "",
    team: [],
  },

  contactUs: {
    email: "",
    phoneNo: "",
    address: "",
  },

  FAQ: [],

  footer: {
    brandName: "",
    brandLogo: "",
    SocialLinks: "",
    copywrite: "",
  },

  projects: [], // For portfolio template
};

export default function PreviewPage() {
  const params = useParams();
  // console.log("Editor Params Id: ", params.id); // DEBUG
  const templateId = params?.id;
  const [websiteData, setWebsiteData] = useState(defaultWebsiteData);
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/template/public/${templateId}`);

        const template = res.data.template || res.data;

        if (template) {
          setWebsiteData({
            templateType: template.templateType || "website",
            sections: template.sections || {
              hero: true,
              features: true,
              aboutUs: true,
              contactUs: true,
              faq: true,
              footer: true,
            },

            headerSection: {
              logo: template.headerSection?.logo || "",
              businessName: template.headerSection?.businessName || "",
              navigationLinks: template.headerSection?.navigationLinks || [],
            },

            heroSection: {
              title: template.heroSection?.title || "",
              tagline: template.heroSection?.tagline || "",
              description: template.heroSection?.description || "",
              heroImage: template.heroSection?.heroImage || "",
              button: template.heroSection?.button || "",
              heroFile: null, // frontend only
            },

            features: template.features || [],

            aboutUs: {
              aboutTitle: template.aboutUs?.aboutTitle || "",
              aboutDescription: template.aboutUs?.aboutDescription || "",
              team: template.aboutUs?.team || [],
            },

            contactUs: {
              email: template.contactUs?.email || "",
              phoneNo: template.contactUs?.phoneNo || "",
              address: template.contactUs?.address || "",
            },

            FAQ: template.FAQ || [],

            footer: {
              brandName: template.footer?.brandName || "",
              brandLogo: template.footer?.brandLogo || "",
              SocialLinks: template.footer?.SocialLinks || "",
              copywrite: template.footer?.copywrite || "",
            },

            projects: template.projects || [], // For portfolio template
          });
        }
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };

    if (templateId) {
      fetchTemplateData();
    }
  }, [templateId]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (websiteData.heroImage && websiteData.heroImage.startsWith("blob:")) {
        URL.revokeObjectURL(websiteData.heroImage);
      }
    };
  }, [websiteData.heroImage]);

  return (
    <div>
      {websiteData?.templateType === "portfolio" ? (
        // Render Portfolio Template
        <PortfolioPreview data={websiteData} />
      ) : (
        // render Website Template
        <WebsitePreview data={websiteData} />
      )}
    </div>
  );
}
