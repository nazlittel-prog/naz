import React from "react";

interface VehicleInfoDisplayProps {
    vehicleModel: string;
    diagnosisLevel: "confirmed" | "estimated" | "impossible";
}

export default function VehicleInfoDisplay({ vehicleModel, diagnosisLevel }: VehicleInfoDisplayProps) {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-lg shadow-sm border gap-3">
            <div>
                <p className="text-gray-500 text-xs mb-1">المركبة:</p>
                <p className="font-bold text-lg text-gray-800">{vehicleModel || "غير محدد"}</p>
            </div>
            <div
                className={`px-3 py-1 rounded-full text-sm font-bold ${diagnosisLevel === "confirmed"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}
            >
                {diagnosisLevel === "confirmed" ? "تشخيص مؤكد ✅" : "تشخيص تقديري ⚖️"}
            </div>
        </div>
    );
}
