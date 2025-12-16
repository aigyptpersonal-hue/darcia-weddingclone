import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LocationQRCodeProps {
  mapsLink: string;
  size?: number;
}

const LocationQRCode = ({ mapsLink, size = 150 }: LocationQRCodeProps) => {
  const [qrUrl, setQrUrl] = useState<string>("");

  useEffect(() => {
    // Generate QR code using Google Charts API
    const encodedLink = encodeURIComponent(mapsLink);
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedLink}&bgcolor=0d0d0d&color=c9a86c`;
    setQrUrl(qrApiUrl);
  }, [mapsLink, size]);

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-3 bg-white rounded-lg shadow-lg">
        {qrUrl && (
          <img
            src={qrUrl}
            alt="QR Code Lokasi"
            width={size}
            height={size}
            className="rounded"
          />
        )}
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Scan untuk navigasi
      </p>
    </motion.div>
  );
};

export default LocationQRCode;
