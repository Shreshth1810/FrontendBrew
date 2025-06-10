import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = ({ onScanSuccess }) => {
  const scannerRef = useRef(null);
  const isRunningRef = useRef(false); // 🟢 Track running state
  const qrRegionId = "qr-reader";

  useEffect(() => {
    const html5QrCode = new Html5Qrcode(qrRegionId);
    scannerRef.current = html5QrCode;

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            console.log("QR Code Scanned:", decodedText);
            onScanSuccess(decodedText);

            // ✅ Stop after first successful scan
            if (isRunningRef.current) {
              html5QrCode
                .stop()
                .then(() => {
                  html5QrCode.clear();
                  isRunningRef.current = false;
                })
                .catch((err) => {
                  console.warn("Error stopping scanner:", err.message);
                });
            }
          }
        );
        isRunningRef.current = true;
      } catch (err) {
        console.error("Failed to start QR scanner:", err.message);
      }
    };

    startScanner();

    // ✅ Cleanup on unmount
    return () => {
      if (scannerRef.current && isRunningRef.current) {
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current.clear();
            isRunningRef.current = false;
          })
          .catch((err) =>
            console.warn("Scanner already stopped on unmount:", err.message)
          );
      }
    };
  }, [onScanSuccess]);

  return (
    <div className="scanner-container">
      <h2 className="scanner-heading">Scan QR Code</h2>
      <div id={qrRegionId} className="scanner-box"></div>
    </div>
  );
};

export default QRScanner;
