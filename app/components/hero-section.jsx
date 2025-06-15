"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { Settings, BarChart3, Circle } from "lucide-react"

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [animationCycle, setAnimationCycle] = useState(0)
  const pulseControls = useAnimation()
  const textControls = useAnimation()
  const buttonControls = useAnimation()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Main animation sequence
  useEffect(() => {
    const runAnimation = async () => {
      // Reset everything
      await Promise.all([
        pulseControls.set({ pathLength: 0, opacity: 0 }),
        textControls.set({ opacity: 0, y: 30 }),
        buttonControls.set({ opacity: 0, scale: 0.8 }),
      ])

      // Wait for initial fade in
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Start pulse line animation with multiple waves
      await pulseControls.start({
        pathLength: 1,
        opacity: 1,
        transition: { duration: 2.5, ease: "easeInOut" },
      })

      // Animate text in letter by letter
      await textControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1.5, ease: "easeOut" },
      })

      // Animate button in
      await buttonControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      })

      // Wait before next cycle
      await new Promise((resolve) => setTimeout(resolve, 5000))
      setAnimationCycle((prev) => prev + 1)
    }

    runAnimation()
  }, [animationCycle, pulseControls, textControls, buttonControls])

  // Enhanced background particles
  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 8,
    speed: Math.random() * 2 + 1,
  }))

  // Lightning bolts
  const lightningBolts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: i * 30 + Math.random() * 15,
    length: Math.random() * 300 + 200,
    delay: Math.random() * 4,
  }))

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 flex items-center justify-center">
      {/* Enhanced Background with Lightning */}
      <div className="absolute inset-0">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-600/20 via-blue-600/10 to-transparent" />

        {/* Lightning Effects */}
        <div className="absolute inset-0 flex items-center justify-center">
          {lightningBolts.map((bolt) => (
            <motion.div
              key={bolt.id}
              className="absolute w-1 bg-gradient-to-t from-transparent via-blue-400 to-transparent origin-bottom"
              style={{
                height: `${bolt.length}px`,
                transform: `rotate(${bolt.angle}deg)`,
                filter: "drop-shadow(0 0 10px #3B82F6)",
              }}
              animate={{
                opacity: [0, 1, 0.3, 1, 0],
                scaleY: [0.5, 1.5, 0.8, 1.2, 0.5],
                filter: [
                  "drop-shadow(0 0 10px #3B82F6)",
                  "drop-shadow(0 0 30px #6529B2)",
                  "drop-shadow(0 0 15px #3B82F6)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: bolt.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Enhanced Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, ${
                particle.id % 3 === 0 ? "#6529B2" : particle.id % 3 === 1 ? "#3B82F6" : "#8B5CF6"
              }, transparent)`,
              filter: `drop-shadow(0 0 ${particle.size * 2}px currentColor)`,
            }}
            animate={{
              opacity: [0.3, 1, 0.5, 1, 0.3],
              scale: [1, 1.8, 1.2, 2, 1],
              x: [0, mousePosition.x * 0.8, mousePosition.x * 0.3, 0],
              y: [0, mousePosition.y * 0.8, mousePosition.y * 0.3, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: particle.speed * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Enhanced Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40">
          {particles.slice(0, 25).map((particle, i) => {
            const connections = particles.slice(i + 1, i + 4)
            return connections.map((connectedParticle, j) => (
              <motion.line
                key={`line-${i}-${j}`}
                x1={`${particle.x}%`}
                y1={`${particle.y}%`}
                x2={`${connectedParticle.x}%`}
                y2={`${connectedParticle.y}%`}
                stroke="url(#networkGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0.5, 1, 0],
                  opacity: [0, 0.8, 0.4, 0.9, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: (i + j) * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))
          })}
          <defs>
            <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6529B2" stopOpacity="0" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Parallax Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
            background: `radial-gradient(600px circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, rgba(101, 41, 178, 0.3), transparent 60%)`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main Headline */}
        <motion.div animate={textControls} className="mb-8">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight mb-6"
            style={{
              fontFamily: "Satoshi, system-ui, sans-serif",
              textShadow: "0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(101,41,178,0.2)",
            }}
          >
            {"The Future is".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  textShadow: [
                    "0 0 20px rgba(255,255,255,0.3)",
                    "0 0 40px rgba(255,255,255,0.6), 0 0 60px rgba(101,41,178,0.4)",
                    "0 0 20px rgba(255,255,255,0.3)",
                  ],
                }}
                transition={{
                  duration: 0.15,
                  delay: i * 0.08,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <br />
            {"Connected.".split("").map((char, i) => (
              <motion.span
                key={i + 100}
                className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 0.15,
                  delay: (i + 15) * 0.08,
                  backgroundPosition: {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  filter: "drop-shadow(0 0 20px rgba(101,41,178,0.6))",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-2xl md:text-3xl text-white/90 font-light tracking-wide"
            style={{
              fontFamily: "Syne, system-ui, sans-serif",
              textShadow: "0 0 20px rgba(255,255,255,0.2)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            Ventures. Vision. Velocity.
          </motion.p>
        </motion.div>

        {/* Enhanced CTA Button */}
        <motion.div animate={buttonControls} className="mb-16">
          <Button
            asChild
            size="lg"
            className="relative bg-transparent border-2 border-purple-400/60 text-white hover:bg-purple-600/30 px-12 py-6 text-xl font-bold rounded-full group overflow-hidden transition-all duration-500"
            style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}
          >
            <Link href="/ventures" className="relative z-10">
              <span>Explore Ventures</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{
                  scale: 1.2,
                  opacity: 1,
                  transition: { duration: 0.4 },
                }}
              />
              <motion.div
                className="absolute inset-0 border-2 border-purple-400 rounded-full"
                initial={{ scale: 1, opacity: 0 }}
                whileHover={{
                  scale: 1.3,
                  opacity: 0.8,
                  transition: { duration: 0.4 },
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(101,41,178,0.3)",
                    "0 0 40px rgba(101,41,178,0.6), 0 0 60px rgba(59,130,246,0.3)",
                    "0 0 20px rgba(101,41,178,0.3)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </Link>
          </Button>
        </motion.div>

        {/* Enhanced Pulse Line with Icons */}
        <div className="relative h-40 flex items-center justify-center">
          {/* Multiple SVG Pulse Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 120" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="pulseGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6529B2" stopOpacity="0" />
                <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
                <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6529B2" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="pulseGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                <stop offset="50%" stopColor="#6529B2" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Main Pulse Line */}
            <motion.path
              d="M 50 60 Q 150 30 250 60 Q 350 90 450 60 Q 550 30 650 60 Q 700 45 750 60"
              stroke="url(#pulseGradient1)"
              strokeWidth="4"
              fill="none"
              animate={pulseControls}
              style={{
                filter: "drop-shadow(0 0 15px #6529B2) drop-shadow(0 0 30px #3B82F6)",
              }}
            />

            {/* Secondary Pulse Line */}
            <motion.path
              d="M 50 60 Q 200 40 300 60 T 550 60 Q 650 40 750 60"
              stroke="url(#pulseGradient2)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1,
                ease: "easeInOut",
              }}
              style={{
                filter: "drop-shadow(0 0 10px #8B5CF6)",
              }}
            />

            {/* Pulse Waves */}
            {[0, 1, 2].map((wave) => (
              <motion.circle
                key={wave}
                cx="400"
                cy="60"
                r="5"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                initial={{ r: 5, opacity: 0.8 }}
                animate={{
                  r: [5, 50, 100],
                  opacity: [0.8, 0.4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: wave * 0.7 + 2,
                  ease: "easeOut",
                }}
              />
            ))}
          </svg>

          {/* Enhanced Icons with Better Animations */}
          <div className="relative flex justify-between items-center w-full max-w-2xl px-8">
            {/* Gear Icon */}
            <motion.div
              className="flex items-center justify-center w-20 h-20 rounded-full border-3 border-purple-400 bg-gradient-to-br from-purple-900/40 to-purple-600/20 backdrop-blur-lg"
              initial={{ scale: 0, opacity: 0, rotateY: -180 }}
              animate={{
                scale: [0, 1.4, 1.1, 1],
                opacity: [0, 1, 1, 1],
                rotateY: [-180, 0, 0, 0],
                boxShadow: [
                  "0 0 20px rgba(101,41,178,0.3)",
                  "0 0 40px rgba(101,41,178,0.8), 0 0 60px rgba(147,51,234,0.4)",
                  "0 0 30px rgba(101,41,178,0.5)",
                ],
              }}
              transition={{
                duration: 1.2,
                delay: 1.8,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.8 },
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Settings className="w-10 h-10 text-purple-300" />
              </motion.div>
            </motion.div>

            {/* Bar Chart Icon */}
            <motion.div
              className="flex items-center justify-center w-20 h-20 rounded-full border-3 border-blue-400 bg-gradient-to-br from-blue-900/40 to-blue-600/20 backdrop-blur-lg"
              initial={{ scale: 0, opacity: 0, y: 100 }}
              animate={{
                scale: [0, 1.4, 1.1, 1],
                opacity: [0, 1, 1, 1],
                y: [100, -10, 5, 0],
                boxShadow: [
                  "0 0 20px rgba(59,130,246,0.3)",
                  "0 0 40px rgba(59,130,246,0.8), 0 0 60px rgba(37,99,235,0.4)",
                  "0 0 30px rgba(59,130,246,0.5)",
                ],
              }}
              transition={{
                duration: 1.2,
                delay: 2.8,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.2,
                y: -10,
                transition: { duration: 0.4 },
              }}
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <BarChart3 className="w-10 h-10 text-blue-300" />
              </motion.div>
            </motion.div>

            {/* Circle Icon */}
            <motion.div
              className="flex items-center justify-center w-20 h-20 rounded-full border-3 border-purple-400 bg-gradient-to-br from-purple-900/40 to-indigo-600/20 backdrop-blur-lg"
              initial={{ scale: 0, opacity: 0, rotateX: -180 }}
              animate={{
                scale: [0, 1.4, 1.1, 1],
                opacity: [0, 1, 1, 1],
                rotateX: [-180, 0, 0, 0],
                boxShadow: [
                  "0 0 20px rgba(139,92,246,0.3)",
                  "0 0 40px rgba(139,92,246,0.8), 0 0 60px rgba(124,58,237,0.4)",
                  "0 0 30px rgba(139,92,246,0.5)",
                ],
              }}
              transition={{
                duration: 1.2,
                delay: 3.8,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.2,
                rotate: 720,
                transition: { duration: 1.2 },
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Circle className="w-10 h-10 text-purple-300" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 5 }}
      >
        <motion.div
          className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm"
          animate={{
            y: [0, 10, 0],
            boxShadow: [
              "0 0 10px rgba(255,255,255,0.2)",
              "0 0 20px rgba(101,41,178,0.4)",
              "0 0 10px rgba(255,255,255,0.2)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-2 h-4 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
        <p className="text-white/70 text-sm mt-3 text-center font-medium">Scroll to explore</p>
      </motion.div>
    </section>
  )
}
