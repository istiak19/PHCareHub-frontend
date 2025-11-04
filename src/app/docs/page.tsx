"use client";

import { useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOpen, FileText, Code, Info, Settings, Github, Cloud, Home } from "lucide-react";

export default function DocsPage() {
    const [active, setActive] = useState("introduction");

    const sections = [
        { id: "introduction", label: "Introduction", icon: <BookOpen className="w-4 h-4" /> },
        { id: "getting-started", label: "Getting Started", icon: <FileText className="w-4 h-4" /> },
        { id: "api", label: "API Reference", icon: <Code className="w-4 h-4" /> },
        { id: "configuration", label: "Configuration", icon: <Settings className="w-4 h-4" /> },
        { id: "cloudinary", label: "Cloudinary Setup", icon: <Cloud className="w-4 h-4" /> },
        { id: "about", label: "About Project", icon: <Info className="w-4 h-4" /> },
    ];

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-card p-4 hidden md:flex flex-col">
                {/* 🏠 Back to Home */}
                <Button
                    asChild
                    variant="ghost"
                    className="flex items-center justify-start gap-2 mb-4 text-sm hover:bg-muted"
                >
                    <Link href="/" className="cursor-pointer">
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                </Button>

                <h2 className="text-lg font-semibold mb-4">Documentation</h2>

                <nav className="space-y-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActive(section.id)}
                            className={cn(
                                "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md transition-all cursor-pointer",
                                active === section.id
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted"
                            )}
                        >
                            {section.icon}
                            {section.label}
                        </button>
                    ))}
                </nav>

                <Separator className="my-4" />

                <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="mt-auto flex items-center justify-center gap-2"
                >
                    <a
                        href="https://github.com/istiak19"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github className="w-4 h-4" />
                        View on GitHub
                    </a>
                </Button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6">
                {active === "introduction" && (
                    <section>
                        <h1 className="text-3xl font-bold mb-4">Introduction</h1>
                        <p className="text-muted-foreground">
                            Welcome to the <span className="font-semibold text-primary">PHCareHub</span> documentation.
                            Here you’ll find everything you need to understand and extend the platform — including API references, setup instructions, and usage examples.
                        </p>
                    </section>
                )}

                {active === "getting-started" && (
                    <section>
                        <h1 className="text-3xl font-bold mb-4">Getting Started</h1>
                        <p className="mb-2 text-muted-foreground">
                            Follow these steps to get your project running locally:
                        </p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            <code>{`git clone https://github.com/istiak19/PHCareHub-frontend
cd phcarehub
npm install
npm run dev`}</code>
                        </pre>
                    </section>
                )}

                {active === "api" && (
                    <section>
                        <h1 className="text-3xl font-bold mb-4">API Reference</h1>
                        <p className="mb-2 text-muted-foreground">
                            Example endpoint for fetching dashboard meta data:
                        </p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            <code>{`GET http://localhost:5000/api/v1/meta-data

Response:
{
  "success": true,
  "data": {
    "patientCount": 2,
    "doctorCount": 2,
    "appointmentCount": 1
  }
}`}</code>
                        </pre>
                    </section>
                )}

                {active === "configuration" && (
                    <section>
                        <h1 className="text-3xl font-bold mb-4">Configuration</h1>
                        <p className="text-muted-foreground mb-4">
                            The app uses environment variables for configuration.
                            Create a <code>.env.local</code> file in your root directory:
                        </p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            <code>{`NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset`}</code>
                        </pre>
                    </section>
                )}

                {/* 🌩 Cloudinary Section */}
                {active === "cloudinary" && (
                    <section>
                        <h1 className="text-3xl font-bold mb-4">Cloudinary Setup</h1>
                        <p className="text-muted-foreground mb-4">
                            Cloudinary is used for secure and scalable image uploads in the PHCareHub project.
                            Follow these steps to configure it:
                        </p>

                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li>
                                Go to <a href="https://cloudinary.com" className="text-primary underline">Cloudinary</a> and create a free account.
                            </li>
                            <li>
                                In your Cloudinary Dashboard, find your credentials:
                                <ul className="list-disc list-inside ml-6">
                                    <li>Cloud Name</li>
                                    <li>API Key</li>
                                    <li>API Secret</li>
                                </ul>
                            </li>
                            <li>Add these to your <code>.env.local</code> file.</li>
                        </ol>

                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm mt-3">
                            <code>{`CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret`}</code>
                        </pre>

                        <p className="text-muted-foreground mt-4">
                            Use Cloudinary’s REST API or SDK to upload images:
                        </p>

                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            <code>{`const formData = new FormData();
formData.append("file", imageFile);
formData.append("upload_preset", "your_preset_name");

const res = await fetch(
  \`https://api.cloudinary.com/v1_1/\${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload\`,
  {
    method: "POST",
    body: formData,
  }
);

const data = await res.json();
console.log("Uploaded URL:", data.secure_url);`}</code>
                        </pre>
                    </section>
                )}

                {active === "about" && (
                    <section>
                        <h1 className="text-3xl font-bold mb-4">About PHCareHub</h1>
                        <p className="text-muted-foreground">
                            PHCareHub is a modern healthcare management platform built with
                            Next.js, TypeScript, Tailwind CSS, and ShadCN UI.
                            It provides role-based dashboards for Admins, Doctors, and Patients with secure authentication, appointment tracking, and analytics.
                        </p>
                    </section>
                )}
            </main>
        </div>
    );
}