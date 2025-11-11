import About from "@/components/modules/About";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | PHCareHub",
    description:
        "Learn more about PHCareHub, our mission, and how we help patients, doctors, and healthcare providers.",
    metadataBase: new URL("https://www.phcarehub.com"),
    openGraph: {
        title: "About Us | PHCareHub",
        description:
            "Learn more about PHCareHub, our mission, and how we help patients, doctors, and healthcare providers.",
        url: "https://yourdomain.com/about",
        siteName: "PHCareHub",
        images: [
            {
                url: "/og-about.png",
                width: 1200,
                height: 630,
                alt: "PHCareHub About Us",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

const AboutPage = () => {
    return (
        <div>
            <About />
        </div>
    );
};

export default AboutPage;