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