import LoginPage from "@/components/modules/Auth/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | PHCareHub",
    description:
        "Login to your PHCareHub account to manage appointments, connect with doctors, and access personalized healthcare services.",
    openGraph: {
        title: "Login | PHCareHub",
        description:
            "Login to PHCareHub — your personal healthcare management platform.",
        url: "https://yourdomain.com/login",
        siteName: "PHCareHub",
        images: [
            {
                url: "/og-login.png",
                width: 1200,
                height: 630,
                alt: "PHCareHub Login",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

const Login = async ({ searchParams }: { searchParams?: Promise<{ redirect?: string }> }) => {
    const params = (await searchParams) || {};

    return <LoginPage redirect={params.redirect} />;
};

export default Login;