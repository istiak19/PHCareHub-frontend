"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AIDoctorSuggestion() {
    const [symptoms, setSymptoms] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [suggestion, setSuggestion] = useState<string>("");
    const [showSuggestion, setShowSuggestion] = useState(false);

    const handleGetSuggestion = async () => {
        if (!symptoms.trim() || symptoms.trim().length < 5) {
            toast.error("Please describe your symptoms (at least 5 characters)");
            return;
        }

        setIsLoading(true);
        setSuggestion("");
        setShowSuggestion(false);

        try {
            //   const response = await getDoctorSuggestion(symptoms);
            //   if (response.success) {
            //     setSuggestion(response.data || "No suggestion available");
            //     setShowSuggestion(true);
            //   } else {
            //     toast.error(response.message || "Failed to get AI suggestion");
            //   }
        } catch (error) {
            console.error("Error getting AI suggestion:", error);
            toast.error("Failed to get AI suggestion");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="bg-white border-purple-200 
            dark:bg-black dark:border-gray-700">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <CardTitle className="text-purple-900 dark:text-purple-200">
                        AI Doctor Suggestion
                    </CardTitle>
                </div>
                <CardDescription className="dark:text-gray-300">
                    Describe your symptoms and get AI-powered doctor specialty recommendations
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <Textarea
                        placeholder="Describe your symptoms in detail (e.g., headache, fever, cough, etc.)..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        rows={4}
                        disabled={isLoading}
                        className="
                            resize-none bg-white 
                            dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700
                        "
                    />
                    <p className="text-xs text-muted-foreground mt-1 dark:text-gray-400">
                        {symptoms.length} characters
                    </p>
                </div>

                <Button
                    onClick={handleGetSuggestion}
                    disabled={isLoading || symptoms.trim().length < 5}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Getting AI Suggestion...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Get AI Recommendation
                        </>
                    )}
                </Button>

                {showSuggestion && suggestion && (
                    <div className="
                        space-y-3 p-4 rounded-lg border 
                        bg-white border-purple-200
                        dark:bg-gray-800 dark:border-gray-700
                    ">
                        <div className="flex items-center gap-2">
                            <Badge
                                variant="outline"
                                className="bg-purple-100 text-purple-700 
                                           dark:bg-gray-700 dark:text-purple-300"
                            >
                                AI Recommendation
                            </Badge>
                        </div>

                        <div className="prose prose-sm max-w-none dark:prose-invert">
                            <p className="text-sm text-gray-700 whitespace-pre-wrap dark:text-gray-300">
                                {suggestion}
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};