import React from "react";

interface ActionButtonProps {
    nextAction: string;
}

export default function ActionButton({ nextAction }: ActionButtonProps) {
    if (!nextAction) return null;

    return (
        <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
            <h3 className="text-blue-800 font-bold mb-2 flex items-center gap-2">
                <span>💡 الخطوة الجاية:</span>
            </h3>
            <p className="text-blue-900 font-medium text-lg whitespace-pre-wrap">{nextAction}</p>
        </div>
    );
}
