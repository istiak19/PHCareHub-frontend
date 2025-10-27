import { HeartPulse, Brain, Bone, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const specialists = [
    { name: 'Cardiology', icon: HeartPulse, iconColor: 'text-red-500' },
    { name: 'Neurology', icon: Brain, iconColor: 'text-blue-500' },
    { name: 'Orthopedic', icon: Bone, iconColor: 'text-pink-500' },
    { name: 'Pediatric', icon: Baby, iconColor: 'text-green-500' },
];

const Specialties = () => {
    return (
        <section className="py-10 bg-gray-50 dark:bg-[#0f172a]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Our Specialists
                        </h2>
                        <p className="text-muted-foreground max-w-md mt-2">
                            Access to medical experts across all major specialties.
                        </p>
                    </div>
                    <a
                        href="#"
                        className="text-primary font-semibold hover:underline mt-4 sm:mt-0"
                    >
                        View All
                    </a>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {specialists.map((specialist) => (
                        <Card
                            key={specialist.name}
                            className={cn(
                                'text-center cursor-pointer transition-transform duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105',
                                'bg-linear-to-br from-card/50 to-card/80 shadow-card hover:shadow-lg rounded-2xl',
                                'hover:bg-primary hover:text-primary-foreground'
                            )}
                        >
                            <CardContent className="p-8 flex flex-col items-center">
                                <div
                                    className={cn(
                                        'w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-muted-foreground/20 shadow-md'
                                    )}
                                >
                                    <specialist.icon
                                        className={cn(specialist.iconColor)}
                                        size={36}
                                    />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                                    {specialist.name}
                                </h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Specialties;