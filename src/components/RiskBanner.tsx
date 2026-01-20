import React from "react";

interface RiskBannerProps {
    riskLevel: "low" | "medium" | "high";
}

export default function RiskBanner({ riskLevel }: RiskBannerProps) {
    const getRiskStyles = () => {
        switch (riskLevel) {
            case "high":
                return "bg-red-100 border-red-500 text-red-900";
            case "medium":
                return "bg-orange-100 border-orange-500 text-orange-900";
            default:
                return "bg-blue-50 border-blue-400 text-blue-900";
        }
    };

    const getRiskMessage = () => {
        switch (riskLevel) {
            case "high":
                return "⚠️ خطر عالي: وقف العربية فوراً!";
            case "medium":
                return "⚠️ تنبيه: محتاج صيانة قريبة";
            default:
                return "ℹ️ حالة مستقرة نسبياً";
        }
    };

    return (
        <div className={`p-4 border-b-2 flex items-center justify-center gap-2 font-bold text-lg ${getRiskStyles()}`}>
            <span>{getRiskMessage()}</span>
        </div>
    );
}
