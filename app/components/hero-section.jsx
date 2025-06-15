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

  // Enhanced geometric shapes with better visibility
  const geometricShapes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 30,
    rotation: Math.random() * 360,
    delay: Math.random() * 8,
    type: i % 4, // 0: square, 1: circle, 2: triangle, 3: hexagon
  }))

  // Enhanced particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 8,
    speed: Math.random() * 2 + 1,
  }))

  return (
    <section className="relative min-h-screen overflow-hidden bg-white flex items-center justify-center">
      {/* Flowing Gradient Lines Background */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* Gradient definitions for flowing lines */}
            <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="flowGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6529B2" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="flowGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#6529B2" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Top-right flowing lines */}
          <g>
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.path
                key={`flow-top-${i}`}
                d={`M ${800 + i * 8} 0 Q ${900 + i * 6} ${100 + i * 4} ${1000 + i * 4} ${200 + i * 6} T ${1200} ${400 + i * 8}`}
                stroke="url(#flowGradient1)"
                strokeWidth="2"
                fill="none"
                opacity={0.6 - i * 0.02}
                animate={{
                  d: [
                    `M ${800 + i * 8} 0 Q ${900 + i * 6} ${100 + i * 4} ${1000 + i * 4} ${200 + i * 6} T ${1200} ${400 + i * 8}`,
                    `M ${800 + i * 8} 0 Q ${920 + i * 6} ${120 + i * 4} ${1020 + i * 4} ${220 + i * 6} T ${1200} ${420 + i * 8}`,
                    `M ${800 + i * 8} 0 Q ${900 + i * 6} ${100 + i * 4} ${1000 + i * 4} ${200 + i * 6} T ${1200} ${400 + i * 8}`,
                  ],
                }}
                transition={{
                  duration: 8 + i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </g>

          {/* Bottom-left flowing lines */}
          <g>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.path
                key={`flow-bottom-${i}`}
                d={`M 0 ${600 + i * 6} Q ${200 + i * 8} ${500 + i * 4} ${400 + i * 6} ${600 + i * 8} T ${800 + i * 4} ${700 + i * 6}`}
                stroke="url(#flowGradient2)"
                strokeWidth="2"
                fill="none"
                opacity={0.5 - i * 0.02}
                animate={{
                  d: [
                    `M 0 ${600 + i * 6} Q ${200 + i * 8} ${500 + i * 4} ${400 + i * 6} ${600 + i * 8} T ${800 + i * 4} ${700 + i * 6}`,
                    `M 0 ${600 + i * 6} Q ${220 + i * 8} ${480 + i * 4} ${420 + i * 6} ${620 + i * 8} T ${820 + i * 4} ${720 + i * 6}`,
                    `M 0 ${600 + i * 6} Q ${200 + i * 8} ${500 + i * 4} ${400 + i * 6} ${600 + i * 8} T ${800 + i * 4} ${700 + i * 6}`,
                  ],
                }}
                transition={{
                  duration: 10 + i * 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
              />
            ))}
          </g>

          {/* Left side flowing lines */}
          <g>
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.path
                key={`flow-left-${i}`}
                d={`M 0 ${200 + i * 12} Q ${150 + i * 6} ${300 + i * 8} ${300 + i * 4} ${250 + i * 10} T ${600 + i * 6} ${400 + i * 12}`}
                stroke="url(#flowGradient3)"
                strokeWidth="1.5"
                fill="none"
                opacity={0.4 - i * 0.02}
                animate={{
                  d: [
                    `M 0 ${200 + i * 12} Q ${150 + i * 6} ${300 + i * 8} ${300 + i * 4} ${250 + i * 10} T ${600 + i * 6} ${400 + i * 12}`,
                    `M 0 ${200 + i * 12} Q ${170 + i * 6} ${320 + i * 8} ${320 + i * 4} ${270 + i * 10} T ${620 + i * 6} ${420 + i * 12}`,
                    `M 0 ${200 + i * 12} Q ${150 + i * 6} ${300 + i * 8} ${300 + i * 4} ${250 + i * 10} T ${600 + i * 6} ${400 + i * 12}`,
                  ],
                }}
                transition={{
                  duration: 12 + i * 0.4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </g>
        </svg>

        {/* Enhanced Geometric Shapes with Better Visibility */}
        {geometricShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation + 360],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
              x: [0, mousePosition.x * 0.3, 0],
              y: [0, mousePosition.y * 0.3, 0],
            }}
            transition={{
              duration: 8 + shape.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {shape.type === 0 && (
              // Enhanced Square
              <div
                className="w-full h-full bg-gradient-to-br from-purple-300/60 to-blue-300/60 rounded-lg border border-purple-200/40 shadow-lg"
                style={{
                  transform: `rotate(${shape.rotation}deg)`,
                  backdropFilter: "blur(2px)",
                }}
              />
            )}
            {shape.type === 1 && (
              // Enhanced Circle
              <div
                className="w-full h-full bg-gradient-to-br from-blue-300/60 to-indigo-300/60 rounded-full border border-blue-200/40 shadow-lg"
                style={{
                  backdropFilter: "blur(2px)",
                }}
              />
            )}
            {shape.type === 2 && (
              // Enhanced Triangle
              <div
                className="w-full h-full bg-gradient-to-br from-indigo-300/60 to-purple-300/60 border border-indigo-200/40 shadow-lg"
                style={{
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  backdropFilter: "blur(2px)",
                }}
              />
            )}
            {shape.type === 3 && (
              // Enhanced Hexagon
              <div
                className="w-full h-full bg-gradient-to-br from-purple-300/60 to-pink-300/60 border border-purple-200/40 shadow-lg"
                style={{
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  backdropFilter: "blur(2px)",
                }}
              />
            )}
          </motion.div>
        ))}

        {/* Enhanced Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full border border-white/20 shadow-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, ${
                particle.id % 3 === 0 ? "#6529B2" : particle.id % 3 === 1 ? "#3B82F6" : "#8B5CF6"
              }60, ${particle.id % 3 === 0 ? "#6529B2" : particle.id % 3 === 1 ? "#3B82F6" : "#8B5CF6"}20)`,
              backdropFilter: "blur(1px)",
            }}
            animate={{
              opacity: [0.4, 0.9, 0.4],
              scale: [1, 1.8, 1],
              x: [0, mousePosition.x * 0.5, 0],
              y: [0, mousePosition.y * 0.5, 0],
            }}
            transition={{
              duration: particle.speed * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle gradient overlays */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-purple-100/40 via-purple-50/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-blue-100/40 via-blue-50/20 to-transparent rounded-full blur-3xl" />

        {/* Parallax Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
            background: `radial-gradient(600px circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, rgba(101, 41, 178, 0.1), transparent 60%)`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main Headline */}
        <motion.div animate={textControls} className="mb-8">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 leading-none tracking-tight mb-6"
            style={{
              fontFamily: "Satoshi, system-ui, sans-serif",
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
                className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent"
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
                  filter: "drop-shadow(0 2px 10px rgba(101,41,178,0.3))",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-2xl md:text-3xl text-gray-700 font-light tracking-wide"
            style={{
              fontFamily: "Syne, system-ui, sans-serif",
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
            className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-bold rounded-full group overflow-hidden transition-all duration-500 shadow-lg hover:shadow-xl"
            style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}
          >
            <Link href="/ventures" className="relative z-10">
              <span>Explore Ventures</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{
                  scale: 1.2,
                  opacity: 1,
                  transition: { duration: 0.4 },
                }}
              />
              <motion.div
                className="absolute inset-0 border-2 border-purple-400/50 rounded-full"
                initial={{ scale: 1, opacity: 0 }}
                whileHover={{
                  scale: 1.1,
                  opacity: 0.8,
                  transition: { duration: 0.4 },
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(101,41,178,0.2)",
                    "0 0 40px rgba(101,41,178,0.4), 0 0 60px rgba(59,130,246,0.2)",
                    "0 0 20px rgba(101,41,178,0.2)",
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
                <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
                <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#6529B2" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="pulseGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                <stop offset="50%" stopColor="#6529B2" stopOpacity="0.7" />
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
              className="flex items-center justify-center w-20 h-20 rounded-full border-3 border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 backdrop-blur-lg shadow-lg"
              initial={{ scale: 0, opacity: 0, rotateY: -180 }}
              animate={{
                scale: [0, 1.4, 1.1, 1],
                opacity: [0, 1, 1, 1],
                rotateY: [-180, 0, 0, 0],
                boxShadow: [
                  "0 4px 20px rgba(101,41,178,0.2)",
                  "0 8px 40px rgba(101,41,178,0.4), 0 0 60px rgba(147,51,234,0.2)",
                  "0 6px 30px rgba(101,41,178,0.3)",
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
                <Settings className="w-10 h-10 text-purple-600" />
              </motion.div>
            </motion.div>

            {/* Bar Chart Icon */}
            <motion.div
              className="flex items-center justify-center w-20 h-20 rounded-full border-3 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-lg shadow-lg"
              initial={{ scale: 0, opacity: 0, y: 100 }}
              animate={{
                scale: [0, 1.4, 1.1, 1],
                opacity: [0, 1, 1, 1],
                y: [100, -10, 5, 0],
                boxShadow: [
                  "0 4px 20px rgba(59,130,246,0.2)",
                  "0 8px 40px rgba(59,130,246,0.4), 0 0 60px rgba(37,99,235,0.2)",
                  "0 6px 30px rgba(59,130,246,0.3)",
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
                <BarChart3 className="w-10 h-10 text-blue-600" />
              </motion.div>
            </motion.div>

            {/* Circle Icon */}
            <motion.div
              className="flex items-center justify-center w-20 h-20 rounded-full border-3 border-indigo-500 bg-gradient-to-br from-indigo-50 to-indigo-100 backdrop-blur-lg shadow-lg"
              initial={{ scale: 0, opacity: 0, rotateX: -180 }}
              animate={{
                scale: [0, 1.4, 1.1, 1],
                opacity: [0, 1, 1, 1],
                rotateX: [-180, 0, 0, 0],
                boxShadow: [
                  "0 4px 20px rgba(139,92,246,0.2)",
                  "0 8px 40px rgba(139,92,246,0.4), 0 0 60px rgba(124,58,237,0.2)",
                  "0 6px 30px rgba(139,92,246,0.3)",
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
                <Circle className="w-10 h-10 text-indigo-600" />
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
          className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center backdrop-blur-sm"
          animate={{
            y: [0, 10, 0],
            borderColor: ["rgba(156, 163, 175, 1)", "rgba(101, 41, 178, 0.6)", "rgba(156, 163, 175, 1)"],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-2 h-4 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
        <p className="text-gray-600 text-sm mt-3 text-center font-medium">Scroll to explore</p>
      </motion.div>
    </section>
  )
}
