import { useRef, useState, useEffect } from "react";
import { Camera, RefreshCw, Check, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const ComputerVisionPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null); // Used to ensure we can stop the camera reliably

  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } }
        });

        // Save to ref so cleanup always has access to the tracks
        streamRef.current = mediaStream;

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setIsCameraReady(true);
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }

    startCamera();

    // CLEANUP: This runs when the component unmounts (navigating away)
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop(); // Stops the hardware (turns off the light)
          console.log("Camera track stopped:", track.label);
        });
        streamRef.current = null;
      }
    };
  }, []);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(dataUrl);
    }
  };

  const handleProceed = () => {
    if (capturedImage) {
      sessionStorage.setItem("captured_image", capturedImage);
      // The useEffect cleanup above will trigger automatically here
      navigate("/body-details");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-8 left-8 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-900 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-bold uppercase tracking-[0.3em]">Vision Analysis</h1>
      </div>

      <div className="relative w-full max-w-2xl aspect-[4/3] flex items-center justify-center">
        {/* Broken Outline Frame */}
        <div className="absolute inset-0 border border-zinc-800 pointer-events-none" />
        <div className="absolute -top-px left-1/3 right-1/3 h-px bg-zinc-950" />
        <div className="absolute -bottom-px left-1/3 right-1/3 h-px bg-zinc-950" />
        <div className="absolute -left-px top-1/3 bottom-1/3 w-px bg-zinc-950" />
        <div className="absolute -right-px top-1/3 bottom-1/3 w-px bg-zinc-950" />

        {!capturedImage ? (
          <div className="relative w-full h-full overflow-hidden bg-zinc-900/50">
            {!isCameraReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-zinc-700" />
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Initializing Lens...</p>
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-500 ${isCameraReady ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        ) : (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={capturedImage}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="mt-12 flex gap-6 items-center">
        {!capturedImage ? (
          <button
            onClick={capturePhoto}
            disabled={!isCameraReady}
            className="w-16 h-16 rounded-full border-4 border-zinc-800 flex items-center justify-center group hover:border-zinc-100 transition-all disabled:opacity-30"
          >
            <div className="w-10 h-10 rounded-full bg-zinc-100 group-hover:scale-90 transition-transform" />
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => setCapturedImage(null)}
              className="flex items-center gap-2 px-6 py-3 border border-zinc-800 hover:bg-zinc-900 transition-colors uppercase text-xs font-bold tracking-widest"
            >
              <RefreshCw size={16} /> Retake
            </button>
            <button
              onClick={handleProceed}
              className="flex items-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-950 hover:bg-white transition-colors uppercase text-xs font-bold tracking-widest"
            >
              <Check size={16} /> Proceed to Details
            </button>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

export default ComputerVisionPage;
