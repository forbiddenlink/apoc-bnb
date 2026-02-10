"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Droplets, Wifi, AlertCircle, Wind } from "lucide-react";

interface StatusData {
  radiation: number;
  airQuality: number;
  waterDays: number;
  networkStatus: "SECURE" | "COMPROMISED" | "SCANNING";
}

const getRadiationLabel = (level: number): string => {
  if (level <= 20) return "Pristine";
  if (level <= 40) return "Tolerable";
  if (level <= 60) return "Mostly Acceptable";
  if (level <= 80) return "Concerning";
  return "Seek Shelter";
};

const getRadiationColor = (level: number): string => {
  if (level <= 30) return "bg-green-500";
  if (level <= 60) return "bg-yellow-500";
  return "bg-red-500";
};

const getAirQualityLabel = (quality: number): string => {
  if (quality >= 90) return "Breathable";
  if (quality >= 70) return "Mask Optional";
  if (quality >= 50) return "Mask Advised";
  if (quality >= 30) return "Hazmat Suit";
  return "Hold Breath";
};

const getAirQualityColor = (quality: number): string => {
  if (quality >= 70) return "text-green-400";
  if (quality >= 40) return "text-yellow-400";
  return "text-red-400";
};

const getWaterLabel = (days: number): string => {
  if (days >= 30) return "Abundant";
  if (days >= 14) return "Comfortable";
  if (days >= 7) return "Ration Mode";
  if (days >= 3) return "Critical";
  return "Pray for Rain";
};

const getWaterColor = (days: number): string => {
  if (days >= 14) return "text-cyan-400";
  if (days >= 7) return "text-yellow-400";
  return "text-red-400";
};

export function SystemStatus() {
  const [status, setStatus] = useState<StatusData>({
    radiation: 42,
    airQuality: 78,
    waterDays: 23,
    networkStatus: "SECURE",
  });
  const [isBlinking, setIsBlinking] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Mount detection and timestamp
  useEffect(() => {
    setIsMounted(true);
    const updateTimestamp = () => {
      setTimestamp(new Date().toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTimestamp();
    const timestampInterval = setInterval(updateTimestamp, 1000);
    return () => clearInterval(timestampInterval);
  }, []);

  // Simulate status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => {
        const radiationDelta = (Math.random() - 0.5) * 10;
        const airDelta = (Math.random() - 0.5) * 5;
        const waterChange = Math.random() < 0.1 ? -1 : 0;

        // 5% chance to toggle network status
        let newNetworkStatus = prev.networkStatus;
        if (Math.random() < 0.05) {
          const statuses: StatusData["networkStatus"][] = ["SECURE", "COMPROMISED", "SCANNING"];
          newNetworkStatus = statuses[Math.floor(Math.random() * statuses.length)];
        }

        return {
          radiation: Math.max(5, Math.min(95, prev.radiation + radiationDelta)),
          airQuality: Math.max(20, Math.min(99, prev.airQuality + airDelta)),
          waterDays: Math.max(1, prev.waterDays + waterChange),
          networkStatus: newNetworkStatus,
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Scan progress when scanning
  useEffect(() => {
    if (status.networkStatus === "SCANNING") {
      const scanInterval = setInterval(() => {
        setScanProgress((prev) => (prev + 10) % 100);
      }, 200);
      return () => clearInterval(scanInterval);
    }
  }, [status.networkStatus]);

  const radiationPercent = Math.round(status.radiation);
  const airPercent = Math.round(status.airQuality);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm mx-auto bg-black/80 backdrop-blur-sm border-2 border-dashed border-cyan-500/50 rounded-lg p-3 sm:p-4 font-mono text-[10px] sm:text-xs shadow-lg shadow-cyan-500/10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-cyan-500/30">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-cyan-400" />
          <span className="text-cyan-400 uppercase tracking-widest font-bold">System Status</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${isBlinking ? "bg-green-400" : "bg-green-600"}`} />
          <span className="text-green-400 text-[10px]">ONLINE</span>
        </div>
      </div>

      {/* Radiation Level */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle className="h-3 w-3" />
            <span>RADIATION</span>
          </div>
          <span className={`${radiationPercent > 60 ? "text-red-400" : radiationPercent > 30 ? "text-yellow-400" : "text-green-400"}`}>
            {radiationPercent}% — {getRadiationLabel(radiationPercent)}
          </span>
        </div>
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${getRadiationColor(radiationPercent)} transition-colors`}
            initial={{ width: 0 }}
            animate={{ width: `${radiationPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>SAFE</span>
          <span>LETHAL</span>
        </div>
      </div>

      {/* Air Quality */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Wind className="h-3 w-3" />
          <span>AIR QUALITY</span>
        </div>
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={airPercent}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`font-bold ${getAirQualityColor(airPercent)}`}
            >
              {airPercent}%
            </motion.span>
          </AnimatePresence>
          <span className={`text-[10px] ${getAirQualityColor(airPercent)}`}>
            {getAirQualityLabel(airPercent)}
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              airPercent >= 70 ? "bg-green-400" : airPercent >= 40 ? "bg-yellow-400" : "bg-red-400"
            } ${isBlinking ? "opacity-100" : "opacity-40"} transition-opacity`}
          />
        </div>
      </div>

      {/* Water Reserves */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Droplets className="h-3 w-3" />
          <span>WATER RESERVES</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={status.waterDays}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className={`font-bold ${getWaterColor(status.waterDays)}`}
          >
            {status.waterDays}
          </motion.span>
          <span className={`text-[10px] ${getWaterColor(status.waterDays)}`}>
            days — {getWaterLabel(status.waterDays)}
          </span>
        </div>
      </div>

      {/* Network Status */}
      <div className="flex items-center justify-between pt-2 border-t border-cyan-500/30">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Wifi className="h-3 w-3" />
          <span>NETWORK</span>
        </div>
        <div className="flex items-center gap-2">
          {status.networkStatus === "SCANNING" && (
            <span className="text-cyan-400 text-[10px]">{scanProgress}%</span>
          )}
          <span
            className={`font-bold ${
              status.networkStatus === "SECURE"
                ? "text-green-400"
                : status.networkStatus === "COMPROMISED"
                ? "text-red-400"
                : "text-cyan-400"
            }`}
          >
            {status.networkStatus}
          </span>
          <motion.span
            animate={
              status.networkStatus === "COMPROMISED"
                ? { opacity: [1, 0, 1] }
                : status.networkStatus === "SCANNING"
                ? { rotate: 360 }
                : {}
            }
            transition={
              status.networkStatus === "COMPROMISED"
                ? { duration: 0.5, repeat: Infinity }
                : status.networkStatus === "SCANNING"
                ? { duration: 1, repeat: Infinity, ease: "linear" }
                : {}
            }
            className={`w-2 h-2 rounded-full ${
              status.networkStatus === "SECURE"
                ? "bg-green-400"
                : status.networkStatus === "COMPROMISED"
                ? "bg-red-500"
                : "bg-cyan-400"
            }`}
          />
        </div>
      </div>

      {/* Footer timestamp */}
      <div className="mt-4 pt-2 border-t border-cyan-500/20 text-center text-[10px] text-muted-foreground">
        LAST UPDATED: {timestamp ?? "--:--:--"} UTC
        <span className={`ml-2 ${isBlinking ? "opacity-100" : "opacity-0"}`}>█</span>
      </div>
    </motion.div>
  );
}

/**
 * Compact version for navbar or smaller spaces
 */
export function SystemStatusCompact() {
  const [radiation, setRadiation] = useState(42);
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadiation((prev) => {
        const delta = (Math.random() - 0.5) * 8;
        return Math.max(5, Math.min(95, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 800);
    return () => clearInterval(blinkInterval);
  }, []);

  const level = Math.round(radiation);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-black/50 backdrop-blur border border-dashed border-cyan-500/40 rounded-full font-mono text-xs"
    >
      <div className="flex items-center gap-1.5">
        <AlertCircle className={`h-3 w-3 ${level > 60 ? "text-red-400 animate-pulse" : level > 30 ? "text-yellow-400" : "text-green-400"}`} />
        <span className="text-muted-foreground">RAD:</span>
        <motion.span
          key={level}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`font-bold ${level > 60 ? "text-red-400" : level > 30 ? "text-yellow-400" : "text-green-400"}`}
        >
          {level}%
        </motion.span>
      </div>
      <div className="w-px h-3 bg-cyan-500/30" />
      <div className="flex items-center gap-1.5">
        <Wifi className="h-3 w-3 text-green-400" />
        <span className="text-green-400">SECURE</span>
        <span className={`w-1.5 h-1.5 rounded-full bg-green-400 ${isBlinking ? "opacity-100" : "opacity-40"}`} />
      </div>
    </motion.div>
  );
}
