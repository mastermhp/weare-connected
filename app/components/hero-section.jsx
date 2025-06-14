"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { CreativeWordShuffle } from "./creative-word-shuffle"
import { useEffect, useState, useRef } from "react"
import { Sparkles, Zap, Target, ArrowRight, Play, Globe, Cpu, Network } from "lucide-react"

const words = [
  "Connected",
  "Innovative",
  "Intelligent",
  "Automated",
  "Sustainable",
  "Global",
  "Decentralized",
  "Personalized",
  "Seamless",
  "Secure",
  "Empowering",
]

// 3D Floating Node Component
const FloatingNode = ({ x, y, z, delay = 0, icon: Icon, label, color }) => (
  <motion.div
    className="absolute"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      zIndex: z,
    }}
    initial={{ opacity: 0, scale: 0, rotateY: -180 }}
    animate={{
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: [0, -20, 0],
      rotateX: [0, 10, 0],
    }}
    transition={{
      duration: 2,
      delay,
      y: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay: delay + 1,
      },
      rotateX: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay: delay + 0.5,
      },
    }}
    whileHover={{
      scale: 1.2,
      rotateY: 15,
      transition: { duration: 0.3 },
    }}
  >
    <div className={`relative group cursor-pointer`}>
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 ${color} rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300`}
        style={{ transform: "scale(2)" }}
      />

      {/* Main Node */}
      <div
        className={`relative w-16 h-16 ${color.replace("bg-", "bg-gradient-to-br from-")} to-white/20 rounded-full border border-white/30 backdrop-blur-xl flex items-center justify-center shadow-2xl`}
      >
        <Icon className="w-8 h-8 text-white" />

        {/* Pulse Ring */}
        <motion.div
          className="absolute inset-0 border-2 border-white/40 rounded-full"
          animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
        />
      </div>

      {/* Label */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        {label}
      </motion.div>
    </div>
  </motion.div>
)

// 3D Connection Lines Component
const ConnectionLines = ({ nodes }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none">
    <defs>
      <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
        <stop offset="50%" stopColor="rgba(147, 51, 234, 0.6)" />
        <stop offset="100%" stopColor="rgba(236, 72, 153, 0.4)" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {nodes.map((node, i) =>
      nodes.slice(i + 1).map((targetNode, j) => (
        <motion.line
          key={`${i}-${j}`}
          x1={`${node.x}%`}
          y1={`${node.y}%`}
          x2={`${targetNode.x}%`}
          y2={`${targetNode.y}%`}
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0],
            strokeWidth: [1, 3, 1],
          }}
          transition={{
            duration: 4,
            delay: (i + j) * 0.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )),
    )}
  </svg>
)

// Quantum Particles
const QuantumParticle = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      x: [0, Math.random() * 200 - 100],
      y: [0, Math.random() * 200 - 100],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeOut",
    }}
  />
)

// 3D Holographic Display
const HolographicDisplay = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const displayRef = useRef(null)

  const nodes = [
    { x: 20, y: 30, icon: Globe, label: "Global Network", color: "bg-blue-500" },
    { x: 80, y: 25, icon: Cpu, label: "AI Processing", color: "bg-purple-500" },
    { x: 60, y: 60, icon: Network, label: "Connected Systems", color: "bg-pink-500" },
    { x: 25, y: 75, icon: Zap, label: "Real-time Data", color: "bg-yellow-500" },
    { x: 75, y: 80, icon: Target, label: "Precision Analytics", color: "bg-green-500" },
    { x: 50, y: 15, icon: Sparkles, label: "Innovation Hub", color: "bg-indigo-500" },
  ]

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (displayRef.current) {
        const rect = displayRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        setRotation({
          x: (e.clientY - centerY) / 20,
          y: (e.clientX - centerX) / 20,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.div
      ref={displayRef}
      className="relative w-full h-[600px] perspective-1000"
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
    >
      {/* Main Holographic Container */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl" />

        {/* Quantum Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <QuantumParticle key={i} delay={i * 0.1} />
          ))}
        </div>

        {/* Connection Lines */}
        <ConnectionLines nodes={nodes} />

        {/* 3D Floating Nodes */}
        {nodes.map((node, i) => (
          <FloatingNode
            key={i}
            x={node.x}
            y={node.y}
            z={i + 1}
            delay={i * 0.2}
            icon={node.icon}
            label={node.label}
            color={node.color}
          />
        ))}

        {/* Central Core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{
              rotateY: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotateY: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            {/* Outer Rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 m-auto rounded-full border border-gradient-to-r from-blue-400/40 to-purple-400/40"
                style={{
                  width: 100 + i * 50,
                  height: 100 + i * 50,
                  borderImage: "linear-gradient(45deg, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4)) 1",
                }}
                animate={{
                  rotate: i % 2 === 0 ? 360 : -360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { duration: 15 + i * 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 3 + i, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
              />
            ))}

            {/* Central Orb */}
            <motion.div
              className="relative w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow-2xl"
              style={{
                boxShadow: "0 0 50px rgba(147, 51, 234, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.2)",
              }}
              animate={{
                boxShadow: [
                  "0 0 50px rgba(147, 51, 234, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.2)",
                  "0 0 80px rgba(59, 130, 246, 0.9), inset 0 0 30px rgba(255, 255, 255, 0.3)",
                  "0 0 50px rgba(147, 51, 234, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              {/* Inner Glow */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent" />

              {/* Core Symbol */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Network className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Data Flow Streams */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
              style={{
                width: "120%",
                top: `${15 + i * 10}%`,
                left: "-10%",
                transform: `rotate(${i * 22.5}deg)`,
                transformOrigin: "center",
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Holographic Scan Lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59, 130, 246, 0.03) 2px, rgba(59, 130, 246, 0.03) 4px)",
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  )
}

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const { scrollY } = useScroll()

  const y1 = useTransform(scrollY, [0, 500], [0, -100])
  const y2 = useTransform(scrollY, [0, 500], [0, -200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <motion.section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Ultra Dynamic Background */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

        {/* Animated Mesh Gradient */}
        <motion.div
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
                rgba(59, 130, 246, 0.3) 0%, 
                rgba(147, 51, 234, 0.2) 25%, 
                rgba(236, 72, 153, 0.1) 50%, 
                transparent 70%)
            `,
          }}
        />

        {/* Dynamic Grid */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px) rotate(${mousePosition.x * 5}deg)`,
          }}
        />

        {/* Floating Geometric Shapes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 0.5,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-3xl border border-white/5 rounded-2xl transform rotate-45" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px] items-center">
          {/* Left Content */}
          <motion.div
            className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left space-y-8"
            style={{ y: y1 }}
          >
            {/* Ultra Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative bg-black/30 backdrop-blur-3xl border border-white/20 rounded-full px-8 py-4 flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </motion.div>
                <span className="text-white font-semibold text-base">Shaping Digital Reality</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Zap className="w-5 h-5 text-blue-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Epic Heading */}
            <div className="space-y-8">
              <motion.h1
                className="text-4xl tracking-tighter md:text-5xl lg:text-6xl/none xl:text-7xl/none font-black text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                The Future Is{" "}
                <span className="inline-block align-bottom text-left min-w-[300px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] xl:min-w-[700px]">
                  <CreativeWordShuffle
                    words={words}
                    className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    shuffleInterval={2000}
                    glitchDuration={800}
                  />
                </span>
              </motion.h1>

              <motion.p
                className="font-light max-w-[500px] text-slate-200 text-lg md:text-xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Connected transcends boundaries — we architect digital ecosystems that revolutionize industries,
                redefine experiences, and create tomorrow's reality. Join us in building the impossible.
              </motion.p>
            </div>

            {/* Premium CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <Button
                  asChild
                  size="lg"
                  className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-2xl px-8 py-6 text-lg font-bold rounded-full"
                >
                  <Link href="/about" className="flex items-center gap-3">
                    Explore Universe
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="relative group">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <Button
                  variant="outline"
                  size="lg"
                  className="relative border-2 border-white/30 bg-white/5 backdrop-blur-3xl text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-lg font-bold rounded-full"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Experience Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Revolutionary 3D Display */}
          <motion.div className="relative hidden lg:block" style={{ y: y2 }}>
            <HolographicDisplay />
          </motion.div>
        </div>
      </div>

      {/* Ultra Smooth Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="relative"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="w-8 h-14 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
            <motion.div
              className="w-2 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
              animate={{
                opacity: [0.4, 1, 0.4],
                height: [24, 32, 24],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm font-medium">
            Scroll to Explore
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
