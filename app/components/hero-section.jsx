// "use client"

// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { motion, useAnimation } from "framer-motion"
// import { useEffect, useState } from "react"
// import { Settings, BarChart3, Circle } from "lucide-react"

// export default function HeroSection() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [animationCycle, setAnimationCycle] = useState(0)
//   const pulseControls = useAnimation()
//   const textControls = useAnimation()
//   const buttonControls = useAnimation()

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth - 0.5) * 30,
//         y: (e.clientY / window.innerHeight - 0.5) * 30,
//       })
//     }

//     window.addEventListener("mousemove", handleMouseMove)
//     return () => window.removeEventListener("mousemove", handleMouseMove)
//   }, [])

//   // Main animation sequence
//   useEffect(() => {
//     const runAnimation = async () => {
//       // Reset everything
//       await Promise.all([
//         pulseControls.set({ pathLength: 0, opacity: 0 }),
//         textControls.set({ opacity: 0, y: 30 }),
//         buttonControls.set({ opacity: 0, scale: 0.8 }),
//       ])

//       // Wait for initial fade in
//       await new Promise((resolve) => setTimeout(resolve, 800))

//       // Start pulse line animation with multiple waves
//       await pulseControls.start({
//         pathLength: 1,
//         opacity: 1,
//         transition: { duration: 2.5, ease: "easeInOut" },
//       })

//       // Animate text in letter by letter
//       await textControls.start({
//         opacity: 1,
//         y: 0,
//         transition: { duration: 1.5, ease: "easeOut" },
//       })

//       // Animate button in
//       await buttonControls.start({
//         opacity: 1,
//         scale: 1,
//         transition: { duration: 0.8, ease: "easeOut" },
//       })

//       // Wait before next cycle
//       await new Promise((resolve) => setTimeout(resolve, 5000))
//       setAnimationCycle((prev) => prev + 1)
//     }

//     runAnimation()
//   }, [animationCycle, pulseControls, textControls, buttonControls])

//   // Enhanced geometric shapes with better visibility
//   const geometricShapes = Array.from({ length: 15 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     size: Math.random() * 60 + 30,
//     rotation: Math.random() * 360,
//     delay: Math.random() * 8,
//     type: i % 4, // 0: square, 1: circle, 2: triangle, 3: hexagon
//   }))

//   // Enhanced particles
//   const particles = Array.from({ length: 30 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     size: Math.random() * 4 + 2,
//     delay: Math.random() * 8,
//     speed: Math.random() * 2 + 1,
//   }))

//   return (
//     <section className="relative min-h-screen overflow-hidden bg-white flex items-center justify-center">
//       {/* Flowing Gradient Lines Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-purple-50"></div>

//       {/* Animated Decorative elements */}
//       <motion.div
//         className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
//         animate={{ y: ["0%", "-10%", "0%"] }}
//         transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
//         animate={{ y: ["0%", "12%", "0%"] }}
//         transition={{
//           duration: 10,
//           repeat: Number.POSITIVE_INFINITY,
//           repeatType: "reverse",
//           ease: "easeInOut",
//           delay: 1,
//         }}
//       />
//       <motion.div
//         className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
//         animate={{ y: ["0%", "-8%", "0%"] }}
//         transition={{
//           duration: 9,
//           repeat: Number.POSITIVE_INFINITY,
//           repeatType: "reverse",
//           ease: "easeInOut",
//           delay: 0.5,
//         }}
//       />


//       {/* Main Content */}
//       <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
//         {/* Main Headline */}
//         <motion.div animate={textControls} className="mb-8">
//           <motion.h1
//             className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 leading-none tracking-tight mb-6"
//             style={{
//               fontFamily: "Satoshi, system-ui, sans-serif",
//             }}
//           >
//             {"The Future is".split("").map((char, i) => (
//               <motion.span
//                 key={i}
//                 initial={{ opacity: 0, y: 50, rotateX: -90 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                   rotateX: 0,
//                 }}
//                 transition={{
//                   duration: 0.15,
//                   delay: i * 0.08,
//                 }}
//               >
//                 {char === " " ? "\u00A0" : char}
//               </motion.span>
//             ))}
//             <br />
//             {"Connected.".split("").map((char, i) => (
//               <motion.span
//                 key={i + 100}
//                 className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent"
//                 initial={{ opacity: 0, y: 50, rotateX: -90 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                   rotateX: 0,
//                   backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//                 }}
//                 transition={{
//                   duration: 0.15,
//                   delay: (i + 15) * 0.08,
//                   backgroundPosition: {
//                     duration: 4,
//                     repeat: Number.POSITIVE_INFINITY,
//                     ease: "easeInOut",
//                   },
//                 }}
//                 style={{
//                   filter: "drop-shadow(0 2px 10px rgba(101,41,178,0.3))",
//                 }}
//               >
//                 {char === " " ? "\u00A0" : char}
//               </motion.span>
//             ))}
//           </motion.h1>

//           {/* Subheadline */}
//           <motion.p
//             className="text-2xl md:text-3xl text-gray-700 font-light tracking-wide"
//             style={{
//               fontFamily: "Syne, system-ui, sans-serif",
//             }}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 2.5 }}
//           >
//             Ventures. Vision. Velocity.
//           </motion.p>
//         </motion.div>

//         {/* Enhanced CTA Button */}
//         <motion.div animate={buttonControls} className="mb-16">
//           <Button
//             asChild
//             size="lg"
//             className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-bold rounded-full group overflow-hidden transition-all duration-500 shadow-lg hover:shadow-xl"
//             style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}
//           >
//             <Link href="/ventures" className="relative z-10">
//               <span>Explore Ventures</span>
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full"
//                 initial={{ scale: 0, opacity: 0 }}
//                 whileHover={{
//                   scale: 1.2,
//                   opacity: 1,
//                   transition: { duration: 0.4 },
//                 }}
//               />
//               <motion.div
//                 className="absolute inset-0 border-2 border-purple-400/50 rounded-full"
//                 initial={{ scale: 1, opacity: 0 }}
//                 whileHover={{
//                   scale: 1.1,
//                   opacity: 0.8,
//                   transition: { duration: 0.4 },
//                 }}
//                 animate={{
//                   boxShadow: [
//                     "0 0 20px rgba(101,41,178,0.2)",
//                     "0 0 40px rgba(101,41,178,0.4), 0 0 60px rgba(59,130,246,0.2)",
//                     "0 0 20px rgba(101,41,178,0.2)",
//                   ],
//                 }}
//                 transition={{
//                   duration: 3,
//                   repeat: Number.POSITIVE_INFINITY,
//                   ease: "easeInOut",
//                 }}
//               />
//             </Link>
//           </Button>
//         </motion.div>

//         {/* Enhanced Pulse Line with Icons */}
//         <div className="relative h-40 flex items-center justify-center">
//           {/* Multiple SVG Pulse Lines */}
//           <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 120" style={{ overflow: "visible" }}>
//             <defs>
//               <linearGradient id="pulseGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#6529B2" stopOpacity="0" />
//                 <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.9" />
//                 <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
//                 <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.9" />
//                 <stop offset="100%" stopColor="#6529B2" stopOpacity="0" />
//               </linearGradient>
//               <linearGradient id="pulseGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
//                 <stop offset="50%" stopColor="#6529B2" stopOpacity="0.7" />
//                 <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
//               </linearGradient>
//             </defs>

//             {/* Main Pulse Line */}
//             <motion.path
//               d="M 50 60 Q 150 30 250 60 Q 350 90 450 60 Q 550 30 650 60 Q 700 45 750 60"
//               stroke="url(#pulseGradient1)"
//               strokeWidth="4"
//               fill="none"
//               animate={pulseControls}
//               style={{
//                 filter: "drop-shadow(0 0 15px #6529B2) drop-shadow(0 0 30px #3B82F6)",
//               }}
//             />

//             {/* Secondary Pulse Line */}
//             <motion.path
//               d="M 50 60 Q 200 40 300 60 T 550 60 Q 650 40 750 60"
//               stroke="url(#pulseGradient2)"
//               strokeWidth="2"
//               fill="none"
//               initial={{ pathLength: 0, opacity: 0 }}
//               animate={{
//                 pathLength: [0, 1, 0],
//                 opacity: [0, 0.8, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Number.POSITIVE_INFINITY,
//                 delay: 1,
//                 ease: "easeInOut",
//               }}
//               style={{
//                 filter: "drop-shadow(0 0 10px #8B5CF6)",
//               }}
//             />

//             {/* Pulse Waves */}
//             {[0, 1, 2].map((wave) => (
//               <motion.circle
//                 key={wave}
//                 cx="400"
//                 cy="60"
//                 r="5"
//                 fill="none"
//                 stroke="#3B82F6"
//                 strokeWidth="2"
//                 initial={{ r: 5, opacity: 0.8 }}
//                 animate={{
//                   r: [5, 50, 100],
//                   opacity: [0.8, 0.4, 0],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Number.POSITIVE_INFINITY,
//                   delay: wave * 0.7 + 2,
//                   ease: "easeOut",
//                 }}
//               />
//             ))}
//           </svg>

//           {/* Enhanced Icons with Better Animations */}
//           <div className="relative flex justify-between items-center w-full max-w-2xl px-8">
//             {/* Gear Icon */}
//             <motion.div
//               className="flex items-center justify-center w-20 h-20 rounded-full border-3 border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 backdrop-blur-lg shadow-lg"
//               initial={{ scale: 0, opacity: 0, rotateY: -180 }}
//               animate={{
//                 scale: [0, 1.4, 1.1, 1],
//                 opacity: [0, 1, 1, 1],
//                 rotateY: [-180, 0, 0, 0],
//                 boxShadow: [
//                   "0 4px 20px rgba(101,41,178,0.2)",
//                   "0 8px 40px rgba(101,41,178,0.4), 0 0 60px rgba(147,51,234,0.2)",
//                   "0 6px 30px rgba(101,41,178,0.3)",
//                 ],
//               }}
//               transition={{
//                 duration: 1.2,
//                 delay: 1.8,
//                 ease: "easeOut",
//               }}
//               whileHover={{
//                 scale: 1.2,
//                 rotate: 360,
//                 transition: { duration: 0.8 },
//               }}
//             >
//               <motion.div
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//               >
//                 <Settings className="w-10 h-10 text-purple-600" />
//               </motion.div>
//             </motion.div>

//             {/* Bar Chart Icon */}
//             <motion.div
//               className="flex items-center justify-center w-20 h-20 rounded-full border-3 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-lg shadow-lg"
//               initial={{ scale: 0, opacity: 0, y: 100 }}
//               animate={{
//                 scale: [0, 1.4, 1.1, 1],
//                 opacity: [0, 1, 1, 1],
//                 y: [100, -10, 5, 0],
//                 boxShadow: [
//                   "0 4px 20px rgba(59,130,246,0.2)",
//                   "0 8px 40px rgba(59,130,246,0.4), 0 0 60px rgba(37,99,235,0.2)",
//                   "0 6px 30px rgba(59,130,246,0.3)",
//                 ],
//               }}
//               transition={{
//                 duration: 1.2,
//                 delay: 2.8,
//                 ease: "easeOut",
//               }}
//               whileHover={{
//                 scale: 1.2,
//                 y: -10,
//                 transition: { duration: 0.4 },
//               }}
//             >
//               <motion.div
//                 animate={{
//                   y: [0, -5, 0],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Number.POSITIVE_INFINITY,
//                   ease: "easeInOut",
//                 }}
//               >
//                 <BarChart3 className="w-10 h-10 text-blue-600" />
//               </motion.div>
//             </motion.div>

//             {/* Circle Icon */}
//             <motion.div
//               className="flex items-center justify-center w-20 h-20 rounded-full border-3 border-indigo-500 bg-gradient-to-br from-indigo-50 to-indigo-100 backdrop-blur-lg shadow-lg"
//               initial={{ scale: 0, opacity: 0, rotateX: -180 }}
//               animate={{
//                 scale: [0, 1.4, 1.1, 1],
//                 opacity: [0, 1, 1, 1],
//                 rotateX: [-180, 0, 0, 0],
//                 boxShadow: [
//                   "0 4px 20px rgba(139,92,246,0.2)",
//                   "0 8px 40px rgba(139,92,246,0.4), 0 0 60px rgba(124,58,237,0.2)",
//                   "0 6px 30px rgba(139,92,246,0.3)",
//                 ],
//               }}
//               transition={{
//                 duration: 1.2,
//                 delay: 3.8,
//                 ease: "easeOut",
//               }}
//               whileHover={{
//                 scale: 1.2,
//                 rotate: 720,
//                 transition: { duration: 1.2 },
//               }}
//             >
//               <motion.div
//                 animate={{
//                   scale: [1, 1.1, 1],
//                   rotate: [0, 180, 360],
//                 }}
//                 transition={{
//                   duration: 4,
//                   repeat: Number.POSITIVE_INFINITY,
//                   ease: "easeInOut",
//                 }}
//               >
//                 <Circle className="w-10 h-10 text-indigo-600" />
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Scroll Indicator */}
//       <motion.div
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1, delay: 5 }}
//       >
//         <motion.div
//           className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center backdrop-blur-sm"
//           animate={{
//             y: [0, 10, 0],
//             borderColor: ["rgba(156, 163, 175, 1)", "rgba(101, 41, 178, 0.6)", "rgba(156, 163, 175, 1)"],
//           }}
//           transition={{
//             duration: 2.5,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//           }}
//         >
//           <motion.div
//             className="w-2 h-4 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mt-2"
//             animate={{ y: [0, 16, 0] }}
//             transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
//           />
//         </motion.div>
//         <p className="text-gray-600 text-sm mt-3 text-center font-medium">Scroll to explore</p>
//       </motion.div>
//     </section>
//   )
// }





"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { CreativeWordShuffle } from "./creative-word-shuffle"

const words = [
  "Connected",
  "Innovative",
  "Intelligent",
  "Automated",
  "Sustainable",
  "Global",
  "Decentralized", // Longest word
  "Personalized",
  "Seamless",
  "Secure",
  "Empowering",
]

export default function HeroSection() {
  return (
    <section className="relative w-full pt-40 pb-16 md:pt-48 md:pb-24 lg:pt-56 lg:pb-32 xl:pt-72 xl:pb-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-purple-50"></div>

      {/* Animated Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{ y: ["0%", "-10%", "0%"] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{ y: ["0%", "12%", "0%"] }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{ y: ["0%", "-8%", "0%"] }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left space-y-4">
            <div className="space-y-4">
              <h1 className="text-4xl tracking-tighter md:text-5xl lg:text-6xl/none font-extrabold">
                The Future Is{" "}
                <span
                  className="inline-block align-bottom text-left 
                           min-w-[280px] 
                           sm:min-w-[340px] 
                           md:min-w-[400px] 
                           lg:min-w-[480px] 
                           xl:min-w-[520px]"
                >
                  <CreativeWordShuffle
                    words={words}
                    className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent"
                    shuffleInterval={2500}
                    glitchDuration={600}
                  />
                </span>
              </h1>
              <motion.p
                className="font-satoshi max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Connected is more than a name — it's a mindset. We build ventures that shape the future of tech, digital
                experiences, and modern living. If you're thinking ahead, you're thinking with us.
              </motion.p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/about">Discover More</Link>
              </Button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[600px] h-[240px] rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 m-auto w-36 h-36 rounded-full border-2 border-purple-300"
                      animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay: i * 1 }}
                    />
                  ))}
                  <motion.div
                    className="relative w-36 h-36 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-80"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
