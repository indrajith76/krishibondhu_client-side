"use client";

import { CiCamera } from "react-icons/ci";
import { useRef } from "react";

export default function CropDiseaseDetection({ onCapture, onCheckDisease }) {
  const cameraInputRef = useRef(null);

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleImageCapture = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      // Send the captured image to parent component
      onCapture?.(file);
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 p-6">
      {/* Hidden camera input */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageCapture}
        className="hidden"
      />

      {/* Camera button */}
      <button
        type="button"
        onClick={handleCameraClick}
        className="flex h-56 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-green-400 bg-white text-green-600 transition-colors hover:bg-green-50"
      >
        <CiCamera className="text-5xl" />

        <span className="text-xl font-medium leading-tight">
          Take a photo
        </span>
      </button>

      {/* Helper label */}
      <p className="text-sm font-medium text-green-600">
        Open your camera
      </p>

      {/* Action button */}
      <button
        type="button"
        onClick={onCheckDisease}
        className="w-full rounded-xl border border-green-300 bg-green-200 px-4 py-3 text-base font-semibold text-green-800 shadow-sm transition-colors hover:bg-green-300 active:bg-green-300"
      >
        Check Disease
      </button>
    </div>
  );
}