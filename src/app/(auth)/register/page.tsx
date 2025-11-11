import RegisterPage from "@/components/modules/Auth/RegisterPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register | PHCareHub",
    description:
        "Create your PHCareHub account to manage appointments, connect with doctors, and access personalized healthcare services.",
    openGraph: {
        title: "Register | PHCareHub",
        description: "Join PHCareHub — your personal healthcare management platform.",
        url: "https://yourdomain.com/register",
        siteName: "PHCareHub",
        images: [
            {
                url: "/og-register.png",
                width: 1200,
                height: 630,
                alt: "PHCareHub Register",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

const Register = () => {
    return <RegisterPage />;
};

export default Register;