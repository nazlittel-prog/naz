import React from "react";

interface AudioRecorderProps {
    isRecording: boolean;
    recordingTime: number;
    onStartRecording: () => void;
    onStopRecording: () => void;
}

export default function AudioRecorder({
    isRecording,
    recordingTime,
    onStartRecording,
    onStopRecording,
}: AudioRecorderProps) {
    return (
        <div className="flex flex-col gap-3">
            <button
                type="button"
                onClick={isRecording ? onStopRecording : onStartRecording}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white transition ${isRecording
                        ? "bg-red-600 hover:bg-red-700 animate-pulse"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
            >
                {isRecording ? `⏹️ إيقاف التسجيل (${recordingTime}s)` : "🎤 سجل صوت المشكلة"}
            </button>
            {isRecording && (
                <p className="text-sm text-gray-600 text-center">
                    الحد الأقصى: 60 ثانية
                </p>
            )}
        </div>
    );
}
