import React from "react";

interface DiagnosisCardProps {
    title: string;
    explanation: string;
}

export default function DiagnosisCard({ title, explanation }: DiagnosisCardProps) {
    return (
        <div className="bg-white p-5 rounded-lg shadow-sm border border-l-4 border-l-blue-500">
            <h3 className="text-gray-500 text-sm font-bold mb-2">🛠️ التشخيص الأساسي:</h3>
            <p className="text-xl font-bold text-gray-900 mb-2">{title}</p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{explanation}</p>
        </div>
    );
}
