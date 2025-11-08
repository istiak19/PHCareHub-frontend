export type UserRole = "ADMIN" | "DOCTOR" | "PATIENT";

// exact : ["/my-profile", "settings"]
// patterns: [/^\/dashboard/, /^\/patient/], // Routes starting with /dashboard/* /patient/*
export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
};

export interface StepCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    index: number;
};

export interface HeroProps {
    badge?: { text: string };
    heading?: { line1: string; line2: string };
    description?: string[];
    buttons?: {
        primary?: { text: string; onClick?: () => void };
        secondary?: { text: string; onClick?: () => void };
    };
    stats?: Array<{ value: string; label: string; icon?: React.ReactNode }>;
    formCard?: {
        title: string;
        symptomLabel: string;
        symptomPlaceholder: string;
        submitText: string;
        footerText: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSubmit?: (data: any) => void;
    };
};

export interface ILogin {
    email: string;
    password: string
};

export interface HeartbeatLoaderProps {
    text?: string;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
    animated?: boolean;
    showIcon?: boolean;
};

export interface AISuggestionPayload {
    symptoms: string;
};

export interface UserInterface {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "DOCTOR" | "PATIENT";
    profilePhoto?: string;
    exp?: number;
    iat?: number;
};

export interface AuthResponse {
    isAuthenticated: boolean;
    user: UserInterface | null;
};