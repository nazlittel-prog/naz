import React from "react";

interface SummaryCardProps {
    quickTest?: string;
    practicalFix?: string;
    ostaAdvice?: string;
}

export default function SummaryCard({ quickTest, practicalFix, ostaAdvice }: SummaryCardProps) {
    return (
        <>
            {/* Legacy Details Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                {quickTest && (
                    <div className="bg-white p-4 rounded border">
                        <h4 className="font-bold text-gray-600 text-sm mb-1">🔍 اختبار سريع:</h4>
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{quickTest}</p>
                    </div>
                )}
                {practicalFix && (
                    <div className="bg-white p-4 rounded border">
                        <h4 className="font-bold text-gray-600 text-sm mb-1">🔧 الإصلاح العملي:</h4>
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{practicalFix}</p>
                    </div>
                )}
            </div>

            {/* Osta Advice Footer */}
            {ostaAdvice && (
                <div className="text-center text-sm text-gray-500 italic mt-4">
                    "نصيحة أسطى: {ostaAdvice}"
                </div>
            )}
        </>
    );
}
