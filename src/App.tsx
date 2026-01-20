// React UI Phase 3B - Modular Components
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import RiskBanner from "./components/RiskBanner";
import VehicleInfoDisplay from "./components/VehicleInfoDisplay";
import DiagnosisCard from "./components/DiagnosisCard";
import ActionButton from "./components/ActionButton";
import SummaryCard from "./components/SummaryCard";

const API_URL = "https://naz-ai-backend.nazlittel.workers.dev/diagnose";

interface Phase3Response {
    // Phase 3 Fields
    Tone_Check: string;
    Vehicle_Confirmed: boolean;
    Diagnosis_Level: "confirmed" | "estimated" | "impossible";
    Primary_Diagnosis_Info: {
        title: string;
        confidence: "high" | "medium" | "low";
        explanation: string;
    } | null;
    New_Alternative_Causes?: { title: string; likelihood: string }[];
    Risk_Level: "low" | "medium" | "high";
    Recommended_Action: string | null;
    Next_Action_Request: string | null;

    // Phase 2 Fields (Legacy/Backward Compat)
    Vehicle_Context: {
        VIN_or_Model: string;
        Confidence_Level: "Confirmed" | "Estimated";
    };
    Understanding: string;
    Primary_Diagnosis: string;
    Alternative_Causes: string[];
    Quick_Workshop_Test: string;
    Practical_Fix: string;
    Visual_Guidance: string;
    Safety_Warning: string;
    Osta_Advice: string;
}

function App() {
    const [userMessage, setUserMessage] = useState("");
    const [imageFile, setImageFile] = useState<string | null>(null);
    const [response, setResponse] = useState<Phase3Response | null>(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const options = { maxWidthOrHeight: 800, useWebWorker: true, maxSizeMB: 0.5 };
            const compressedFile = await imageCompression(file, options);
            const reader = new FileReader();
            reader.onloadend = () => setImageFile(reader.result as string);
            reader.readAsDataURL(compressedFile);
        } catch (err) {
            console.error("Error compressing image:", err);
            alert("فشل في ضغط الصورة، حاول مرة أخرى");
        }
    };

    const handleSubmit = async () => {
        if (!userMessage && !imageFile) {
            alert("الرجاء إدخال وصف العطل أو رفع صورة");
            return;
        }

        setLoading(true);
        setResponse(null);

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    image_base64: imageFile || "",
                    conversation_history: []
                })
            });

            const data = await res.json();
            if (data.status === "success") {
                setResponse(data.reply);
            } else {
                alert("حدث خطأ في المعالجة: " + (data.message || "Unknown Error"));
            }
        } catch (err: any) {
            console.error(err);
            alert("فشل الاتصال بالسيرفر: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans" dir="rtl">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-slate-800 text-white p-6 text-center">
                    <h1 className="text-3xl font-bold mb-2">الأسطى ناز 🔧</h1>
                    <p className="text-blue-200">خبير صيانة السيارات السوداني (AI)</p>
                </div>

                {/* Input Section */}
                <div className="p-6 space-y-4">
                    <textarea
                        className="w-full border-2 border-gray-200 p-4 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition h-32 resize-none"
                        placeholder="اوصف مشكلة العربية هنا... (مثلاً: لمبة الزيت والعة، صوت طقطقة، العربية مخنوقة)"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                    />

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition text-gray-700">
                            <span>📷 إضافة صورة</span>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                        {imageFile && <span className="text-green-600 text-sm font-bold">تم إضافة الصورة ✅</span>}
                    </div>

                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "جاري الفحص... ⏳" : "افحص يا أسطى 🛠️"}
                    </button>
                </div>

                {/* Results Section (Mechanic Dashboard) */}
                {response && (
                    <div className="border-t-2 border-gray-100 bg-gray-50/50">
                        {/* 1. Risk Banner */}
                        {response.Risk_Level && <RiskBanner riskLevel={response.Risk_Level} />}

                        <div className="p-6 space-y-6">
                            {/* 2. Vehicle Info & Diagnosis Badge */}
                            <VehicleInfoDisplay
                                vehicleModel={response.Vehicle_Context?.VIN_or_Model || "غير محدد"}
                                diagnosisLevel={response.Diagnosis_Level}
                            />

                            {/* 3. Primary Diagnosis */}
                            <DiagnosisCard
                                title={response.Primary_Diagnosis_Info?.title || response.Primary_Diagnosis}
                                explanation={response.Primary_Diagnosis_Info?.explanation || response.Understanding}
                            />

                            {/* 4. Next Action */}
                            {response.Next_Action_Request && (
                                <ActionButton nextAction={response.Next_Action_Request} />
                            )}

                            {/* 5. Legacy Details & Advice */}
                            <SummaryCard
                                quickTest={response.Quick_Workshop_Test}
                                practicalFix={response.Practical_Fix}
                                ostaAdvice={response.Osta_Advice}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
