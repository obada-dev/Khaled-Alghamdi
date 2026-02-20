import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Award, Shield, Cpu, Globe, Code2, Network, Brain, Zap, Star,
  ChevronDown, Mail, Phone, Linkedin, Github, ExternalLink, Target,
  GraduationCap, Trophy, FileCheck, Users, Layers, ArrowRight,
  CheckCircle, Sparkles, Building2, User, BookOpen, Briefcase,
  MonitorSpeaker, Database, Lock, Wifi, BarChart3, Menu, X,
  MapPin, Calendar, Badge, FlaskConical, Rocket, Crown, Medal
} from "lucide-react";

const COLORS = {
  cyan: "#00f0ff",
  purple: "#b000ff",
  blue: "#0066ff",
  cyanDim: "#00f0ff33",
  purpleDim: "#b000ff33",
  blueDim: "#0066ff33",
};

function GlowText({ children, color = COLORS.cyan, className = "" }) {
  return (
    <span
      className={className}
      style={{ color, textShadow: `0 0 20px ${color}, 0 0 40px ${color}66` }}
    >
      {children}
    </span>
  );
}

function GlassCard({ children, className = "", glowColor = COLORS.cyan, hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => hover && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative rounded-2xl border transition-all duration-500 ${className}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? glowColor + "66" : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered
          ? `0 0 30px ${glowColor}22, 0 0 60px ${glowColor}11, inset 0 1px 0 rgba(255,255,255,0.05)`
          : `0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
      }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 60 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? COLORS.cyan : i % 3 === 1 ? COLORS.purple : COLORS.blue,
            boxShadow: `0 0 6px ${i % 3 === 0 ? COLORS.cyan : i % 3 === 1 ? COLORS.purple : COLORS.blue}`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function GridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{
        background: `linear-gradient(90deg, transparent, ${COLORS.cyan}44, ${COLORS.purple}44, transparent)`,
        boxShadow: `0 0 10px ${COLORS.cyan}44`,
      }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

function TypeWriter({ words, speed = 80 }) {
  const [current, setCurrent] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;
    const word = words[current];
    let timeout;
    if (!deleting && text.length < word.length) {
      timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), speed / 2);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setCurrent((c) => (c + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, current, words, speed, pause]);

  return (
    <span>
      <span style={{ color: COLORS.cyan }}>{text}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{ color: COLORS.cyan }}
      >
        |
      </motion.span>
    </span>
  );
}

function SkillBar({ name, level, color = COLORS.cyan, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 text-sm font-medium">{name}</span>
        <span className="text-sm font-bold" style={{ color }}>{level}%</span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 12px ${color}88`,
          }}
        />
      </div>
    </div>
  );
}

function TechBadge({ children, color = COLORS.cyan }) {
  return (
    <motion.span
      whileHover={{ scale: 1.08, y: -2 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-default select-none"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}44`,
        color,
        boxShadow: `0 0 10px ${color}22`,
      }}
    >
      {children}
    </motion.span>
  );
}

function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
        style={{
          background: `${COLORS.cyan}15`,
          border: `1px solid ${COLORS.cyan}44`,
          color: COLORS.cyan,
        }}
      >
        <Sparkles size={12} />
        {label}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="h-px max-w-xs mx-auto mt-6"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, ${COLORS.purple}, transparent)`,
        }}
      />
    </div>
  );
}

function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#academic", label: "Academic" },
    { href: "#skills", label: "Skills" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5,5,20,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(0,240,255,0.1)` : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
              style={{
                background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple})`,
                boxShadow: `0 0 20px ${COLORS.cyan}44`,
              }}
            >
              KA
            </div>
            <span className="font-bold text-white hidden sm:block">
              Khaled <GlowText>Alghamdi</GlowText>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-400 hover:text-white"
                style={{ position: "relative" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = COLORS.cyan;
                  e.currentTarget.style.background = `${COLORS.cyan}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                  e.currentTarget.style.background = "";
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${COLORS.cyan}22, ${COLORS.purple}22)`,
              border: `1px solid ${COLORS.cyan}44`,
              color: COLORS.cyan,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 20px ${COLORS.cyan}44`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Zap size={14} />
            Hire Me
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-400"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(5,5,20,0.98)",
              borderBottom: `1px solid ${COLORS.cyan}22`,
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-gray-300 font-medium text-sm"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050510 0%, #0a0118 50%, #050510 100%)" }}
    >
      <GridBackground />
      <ParticleField />
      <ScanLine />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${COLORS.purple}08 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${COLORS.cyan}06 0%, transparent 70%)`,
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
          style={{
            background: `linear-gradient(135deg, ${COLORS.cyan}15, ${COLORS.purple}15)`,
            border: `1px solid ${COLORS.cyan}44`,
            color: COLORS.cyan,
            boxShadow: `0 0 30px ${COLORS.cyan}22`,
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: COLORS.cyan, boxShadow: `0 0 8px ${COLORS.cyan}` }}
          />
          Available for Opportunities · Riyadh, KSA
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-none tracking-tight"
        >
          Hello, I'm{" "}
          <span
            className="block"
            style={{
              background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 30px ${COLORS.cyan}66)`,
            }}
          >
            Khaled Alghamdi
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-4 h-12 flex items-center justify-center"
        >
          <TypeWriter
            words={[
              "Computer Engineer",
              "IoT & AI Specialist",
              "Cybersecurity Expert",
              "Embedded Systems Dev",
              "Digital Transformer",
            ]}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Transforming real-world challenges into intelligent, scalable IT solutions.
          Passionate about driving digital transformation and operational efficiency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.a
            href="#achievements"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-black text-sm sm:text-base transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${COLORS.cyan}, #00b8cc)`,
              boxShadow: `0 0 30px ${COLORS.cyan}55, 0 4px 20px rgba(0,0,0,0.3)`,
            }}
          >
            <Rocket size={18} />
            View Projects
            <ArrowRight size={16} />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm sm:text-base transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${COLORS.purple}66`,
              boxShadow: `0 0 20px ${COLORS.purple}22`,
            }}
          >
            <Mail size={18} />
            Contact Me
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl mx-auto"
          style={{
            background: `linear-gradient(135deg, rgba(176,0,255,0.1), rgba(0,240,255,0.1))`,
            border: `1px solid ${COLORS.purple}66`,
            boxShadow: `0 0 40px ${COLORS.purple}22, 0 0 80px ${COLORS.purple}11`,
          }}
        >
          <Building2 size={16} style={{ color: COLORS.purple }} />
          <span className="text-xs sm:text-sm text-gray-300">
            Prepared for{" "}
            <span className="font-bold" style={{ color: COLORS.purple }}>
              Albawani IT Business Section
            </span>
            {" — "}
            <span className="text-gray-400">Attn:</span>{" "}
            <span className="font-bold text-white">Mr. Modar Sheikh Saeed</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-6 mt-12"
        >
          {[
            { icon: Shield, label: "Patent Holder" },
            { icon: Trophy, label: "#1 University" },
            { icon: Globe, label: "Top 20 Global" },
          ].map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
              <Icon size={14} style={{ color: COLORS.cyan }} />
              {label}
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-gray-600 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="text-gray-600" />
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const stats = [
    { value: "4.74", label: "GPA out of 5", icon: Star, color: COLORS.cyan },
    { value: "2nd", label: "in Batch", icon: Medal, color: COLORS.purple },
    { value: "23+", label: "Projects Done", icon: Code2, color: COLORS.blue },
    { value: "Top 20", label: "Global Ranking", icon: Globe, color: COLORS.cyan },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden" style={{ background: "#050510" }}>
      <div
        className="absolute right-0 top-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${COLORS.purple}08 0%, transparent 60%)` }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="About Me"
          title={<>Who I <GlowText>Am</GlowText></>}
          subtitle="A bridge between engineering depth and business impact"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <GlassCard className="p-8 sm:p-10" glowColor={COLORS.cyan}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.cyan}22, ${COLORS.purple}22)`,
                    border: `1px solid ${COLORS.cyan}44`,
                  }}
                >
                  <User size={22} style={{ color: COLORS.cyan }} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Khaled Alghamdi</h3>
                  <p className="text-gray-500 text-sm">Computer Engineer · Tabuk University</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-base mb-6">
                My name is Khaled Alghamdi, a Computer Engineering graduate who strongly believes that{" "}
                <span className="font-semibold" style={{ color: COLORS.cyan }}>
                  Information Technology is not just about systems and hardware
                </span>
                , but a strategic enabler that enhances operational efficiency, improves decision-making,
                and transforms real-world challenges into intelligent, scalable solutions.
              </p>

              <p className="text-gray-300 leading-relaxed text-base mb-6">
                Throughout my academic and practical journey, I have always aimed to be a{" "}
                <span className="font-semibold" style={{ color: COLORS.purple }}>
                  problem solver rather than a task executor
                </span>
                . I chose Computer Engineering because it combines engineering depth with technical flexibility,
                allowing strong integration between programming, systems, networks, and cybersecurity.
              </p>

              <p className="text-gray-300 leading-relaxed text-base mb-6">
                I specialize in{" "}
                <span className="font-semibold text-white">Embedded Systems</span> and their integration
                with IoT and AI. I am driven by the opportunity to demonstrate how{" "}
                <span className="font-semibold" style={{ color: COLORS.cyan }}>
                  IT can be a real added value
                </span>{" "}
                in supporting projects, enabling digital transformation, and becoming a valuable asset to a
                company with the scale and vision of{" "}
                <span className="font-bold text-white">Albawani</span>.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Problem Solver", "Strategic Thinker", "Team Player", "Innovation Driven"].map((t) => (
                  <TechBadge key={t} color={COLORS.cyan}>
                    <CheckCircle size={11} />
                    {t}
                  </TechBadge>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map(({ value, label, icon: Icon, color }, i) => (
                <GlassCard key={i} className="p-6 text-center" glowColor={color}>
                  <Icon size={24} className="mx-auto mb-3" style={{ color }} />
                  <div
                    className="text-3xl font-black mb-1"
                    style={{
                      background: `linear-gradient(135deg, ${color}, white)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {value}
                  </div>
                  <div className="text-gray-400 text-xs font-medium">{label}</div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="p-6" glowColor={COLORS.purple}>
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                  style={{
                    background: `${COLORS.purple}22`,
                    border: `1px solid ${COLORS.purple}44`,
                  }}
                >
                  <Building2 size={18} style={{ color: COLORS.purple }} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Target Opportunity</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Seeking transfer to{" "}
                    <span className="font-semibold text-white">IT Business Section</span> at Albawani,
                    reporting to{" "}
                    <span className="font-semibold" style={{ color: COLORS.purple }}>
                      Mr. Modar Sheikh Saeed
                    </span>
                    . Ready to deliver measurable impact from day one.
                  </p>
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function AcademicSection() {
  const certs = [
    { name: "CCNA", org: "Cisco", icon: Network, color: COLORS.blue },
    { name: "Cybersecurity Essentials", org: "Cisco", icon: Shield, color: COLORS.cyan },
    { name: "Network Security", org: "Cisco", icon: Lock, color: COLORS.purple },
    { name: "IEEE Membership", org: "Official Member", icon: Users, color: COLORS.cyan },
    { name: "Coursera Specializations", org: "Multiple Courses", icon: BookOpen, color: COLORS.blue },
    { name: "IEEE Workshops", org: "Technical Training", icon: FlaskConical, color: COLORS.purple },
  ];

  return (
    <section id="academic" className="py-32 relative" style={{ background: "#040410" }}>
      <div
        className="absolute left-0 top-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${COLORS.blue}06 0%, transparent 60%)` }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Academic Excellence"
          title={<>Education & <GlowText color={COLORS.purple}>Credentials</GlowText></>}
          subtitle="Building expertise through rigorous academic and professional development"
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <AnimatedSection className="lg:col-span-2">
            <GlassCard className="p-8 h-full relative overflow-hidden" glowColor={COLORS.cyan}>
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${COLORS.cyan}10 0%, transparent 70%)`,
                  transform: "translate(30%, -30%)",
                }}
              />
              <div className="flex items-start gap-4 mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.cyan}22, ${COLORS.blue}22)`,
                    border: `1px solid ${COLORS.cyan}44`,
                  }}
                >
                  <GraduationCap size={28} style={{ color: COLORS.cyan }} />
                </div>
                <div>
                  <h3 className="text-white text-xl font-black mb-1">University of Tabuk</h3>
                  <p className="text-gray-400 text-sm">Bachelor of Computer Engineering</p>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin size={12} className="text-gray-500" />
                    <span className="text-gray-500 text-xs">Tabuk, Saudi Arabia</span>
                    <Calendar size={12} className="text-gray-500 ml-2" />
                    <span className="text-gray-500 text-xs">Graduated with Honors</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "GPA", value: "4.74 / 5", color: COLORS.cyan },
                  { label: "Class Rank", value: "2nd in Batch", color: COLORS.purple },
                  { label: "Honors", value: "Excellent", color: COLORS.blue },
                ].map(({ label, value, color }, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 text-center"
                    style={{
                      background: `${color}10`,
                      border: `1px solid ${color}33`,
                    }}
                  >
                    <div className="text-xs text-gray-500 mb-1">{label}</div>
                    <div className="font-black text-sm sm:text-base" style={{ color }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <TechBadge color={COLORS.cyan}>
                  <Cpu size={11} />
                  Embedded Systems
                </TechBadge>
                <TechBadge color={COLORS.blue}>
                  <Wifi size={11} />
                  Computer Networks
                </TechBadge>
                <TechBadge color={COLORS.purple}>
                  <Brain size={11} />
                  Artificial Intelligence
                </TechBadge>
                <TechBadge color={COLORS.cyan}>
                  <Shield size={11} />
                  Cybersecurity
                </TechBadge>
                <TechBadge color={COLORS.blue}>
                  <Code2 size={11} />
                  Software Engineering
                </TechBadge>
              </div>
            </GlassCard>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <GlassCard className="p-8 h-full flex flex-col justify-between" glowColor={COLORS.purple}>
              <div>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.purple}22, ${COLORS.cyan}22)`,
                    border: `1px solid ${COLORS.purple}44`,
                  }}
                >
                  <Users size={24} style={{ color: COLORS.purple }} />
                </div>
                <h3 className="text-white text-xl font-black mb-2">IEEE Member</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Official member of the Institute of Electrical and Electronics Engineers —
                  the world's largest technical professional organization for advancing technology.
                </p>
              </div>
              <div
                className="rounded-xl p-4"
                style={{
                  background: `${COLORS.purple}10`,
                  border: `1px solid ${COLORS.purple}33`,
                }}
              >
                <div className="text-xs text-gray-500 mb-1">Membership Type</div>
                <div className="font-bold text-white">Student → Graduate Member</div>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.2}>
          <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
            <FileCheck size={20} style={{ color: COLORS.cyan }} />
            Professional Certifications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map(({ name, org, icon: Icon, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <GlassCard className="p-5 flex items-center gap-4" glowColor={color} hover={false}>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${color}18`,
                      border: `1px solid ${color}44`,
                    }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm leading-tight">{name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{org}</div>
                  </div>
                  <CheckCircle
                    size={16}
                    className="ml-auto flex-shrink-0"
                    style={{ color: COLORS.cyan }}
                  />
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function SkillsSection() {
  const programmingSkills = [
    { name: "Python", level: 88, color: COLORS.cyan },
    { name: "C / C++", level: 85, color: COLORS.blue },
    { name: "C#", level: 78, color: COLORS.purple },
    { name: "JavaScript", level: 75, color: COLORS.cyan },
    { name: "HTML / CSS", level: 82, color: COLORS.blue },
  ];

  const specializedSkills = [
    { name: "Embedded Systems & Firmware", level: 90, color: COLORS.purple },
    { name: "IoT Architecture & Integration", level: 88, color: COLORS.cyan },
    { name: "AI/ML Implementation", level: 78, color: COLORS.blue },
    { name: "Network & Infrastructure", level: 85, color: COLORS.purple },
    { name: "Cybersecurity & Hardening", level: 82, color: COLORS.cyan },
  ];

  const techStack = [
    { icon: Cpu, label: "Embedded Systems", color: COLORS.cyan },
    { icon: Wifi, label: "IoT Platforms", color: COLORS.blue },
    { icon: Brain, label: "AI / Machine Learning", color: COLORS.purple },
    { icon: Network, label: "CCNA Networking", color: COLORS.cyan },
    { icon: Shield, label: "Cybersecurity", color: COLORS.blue },
    { icon: Database, label: "Cloud & Servers", color: COLORS.purple },
    { icon: Code2, label: "Full Stack Dev", color: COLORS.cyan },
    { icon: MonitorSpeaker, label: "Smart Systems", color: COLORS.blue },
  ];

  return (
    <section id="skills" className="py-32 relative overflow-hidden" style={{ background: "#050510" }}>
      <div
        className="absolute right-0 bottom-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${COLORS.cyan}06 0%, transparent 60%)` }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Technical Skills"
          title={<>Tech <GlowText>Expertise</GlowText></>}
          subtitle="A comprehensive skillset spanning hardware, software, and security"
        />

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <AnimatedSection>
            <GlassCard className="p-8" glowColor={COLORS.cyan}>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <Code2 size={20} style={{ color: COLORS.cyan }} />
                Programming Languages
              </h3>
              {programmingSkills.map((s, i) => (
                <SkillBar key={i} {...s} delay={i * 0.1} />
              ))}
            </GlassCard>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <GlassCard className="p-8" glowColor={COLORS.purple}>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <Layers size={20} style={{ color: COLORS.purple }} />
                Specialized Domains
              </h3>
              {specializedSkills.map((s, i) => (
                <SkillBar key={i} {...s} delay={i * 0.1} />
              ))}
            </GlassCard>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.2}>
          <GlassCard className="p-8" glowColor={COLORS.blue}>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <Layers size={20} style={{ color: COLORS.blue }} />
              Technology Stack & Domains
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {techStack.map(({ icon: Icon, label, color }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl cursor-default"
                  style={{
                    background: `${color}0a`,
                    border: `1px solid ${color}22`,
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${color}66`;
                    e.currentTarget.style.boxShadow = `0 0 20px ${color}22`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${color}22`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${color}18`,
                      border: `1px solid ${color}33`,
                    }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <span className="text-gray-300 text-xs font-medium text-center leading-tight">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <GlassCard className="p-8 mt-8" glowColor={COLORS.cyan}>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <Briefcase size={20} style={{ color: COLORS.cyan }} />
              Practical Implementation Highlight
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4
                  className="font-bold text-base mb-3"
                  style={{ color: COLORS.cyan }}
                >
                  Secure Exam Portal — Full Stack
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Developed a fully integrated secure examination system featuring dedicated server
                  infrastructure, cloud synchronization, real-time dashboard, and advanced
                  anti-cheat security mechanisms.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 content-start">
                {[
                  "Server Architecture",
                  "Cloud Sync",
                  "Real-time Dashboard",
                  "Anti-Cheat Engine",
                  "Security Hardening",
                  "Full Stack Dev",
                ].map((tag) => (
                  <TechBadge key={tag} color={COLORS.cyan}>
                    {tag}
                  </TechBadge>
                ))}
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
}

function AchievementsSection() {
  const achievements = [
    {
      icon: Shield,
      title: "Patent Holder",
      desc: "Registered patent for an innovative technical invention during undergraduate studies — a rare and distinguished achievement.",
      tag: "Innovation",
      color: COLORS.cyan,
      highlight: true,
    },
    {
      icon: Crown,
      title: "1st Place — Tabuk University",
      desc: "Won first place at Tabuk University graduation project competition with a fully integrated IoT + AI + Embedded Systems solution.",
      tag: "Award",
      color: COLORS.purple,
      highlight: true,
    },
    {
      icon: Trophy,
      title: "3rd Place — ICCiT Expo",
      desc: "Placed 3rd nationally at the Innovative Computing and Communications in Technology Expo for the graduation project.",
      tag: "National",
      color: COLORS.blue,
    },
    {
      icon: Cpu,
      title: "Smart Wheelchair — ICCiT 3rd",
      desc: "3rd Place at ICCiT for a Smart Wheelchair with Multi-Control Modes integrating IoT, Embedded Systems, and AI.",
      tag: "IoT & AI",
      color: COLORS.cyan,
    },
    {
      icon: Globe,
      title: "Top 20 Worldwide — Black Hat MEA",
      desc: "Ranked in the Top 20 globally in a competitive Cybersecurity challenge at Black Hat Middle East & Africa.",
      tag: "Global",
      color: COLORS.purple,
      highlight: true,
    },
    {
      icon: Star,
      title: "LEAP Tech Exhibition",
      desc: "Selected as a participant and presenter at LEAP, one of the world's largest technology exhibitions held in Riyadh.",
      tag: "Exhibition",
      color: COLORS.blue,
    },
    {
      icon: BarChart3,
      title: "23+ Technical Projects",
      desc: "Completed over 23 hands-on technical projects spanning embedded systems, IoT, AI, cybersecurity, and networking.",
      tag: "Portfolio",
      color: COLORS.cyan,
    },
  ];

  return (
    <section id="achievements" className="py-32 relative overflow-hidden" style={{ background: "#040410" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${COLORS.purple}05 0%, transparent 70%)`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Awards & Recognition"
          title={<>Achievements & <GlowText color={COLORS.purple}>Awards</GlowText></>}
          subtitle="A track record of excellence validated at university, national, and global levels"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {achievements.map(({ icon: Icon, title, desc, tag, color, highlight }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-500 ${
                highlight ? "ring-1" : ""
              }`}
              style={{
                background: highlight
                  ? `linear-gradient(135deg, ${color}10, rgba(255,255,255,0.02))`
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${highlight ? color + "55" : "rgba(255,255,255,0.07)"}`,
                backdropFilter: "blur(20px)",
                ringColor: highlight ? color : "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${color}77`;
                e.currentTarget.style.boxShadow = `0 0 30px ${color}22, 0 8px 32px rgba(0,0,0,0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = highlight ? `${color}55` : "rgba(255,255,255,0.07)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
              }}
            >
              {highlight && (
                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${color}88, transparent)`,
                  }}
                />
              )}

              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${color}18`,
                    border: `1px solid ${color}44`,
                    boxShadow: highlight ? `0 0 15px ${color}33` : "none",
                  }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}33`,
                    color,
                  }}
                >
                  {tag}
                </span>
              </div>

              <div>
                <h3 className="text-white font-bold text-sm sm:text-base leading-tight mb-2">
                  {title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden" style={{ background: "#050510" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${COLORS.purple}10 0%, transparent 60%)`,
        }}
      />
      <GridBackground />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Get In Touch"
          title={<>Let's <GlowText>Connect</GlowText></>}
          subtitle="Ready to contribute from day one — prepared for practical assessments"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          <AnimatedSection>
            <GlassCard className="p-8 h-full" glowColor={COLORS.purple}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.purple}22, ${COLORS.cyan}22)`,
                    border: `1px solid ${COLORS.purple}44`,
                  }}
                >
                  <Target size={22} style={{ color: COLORS.purple }} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Direct Message</h3>
                  <p className="text-gray-500 text-xs">Albawani · IT Business Section</p>
                </div>
              </div>

              <div
                className="rounded-2xl p-6 mb-6"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.purple}10, ${COLORS.cyan}08)`,
                  border: `1px solid ${COLORS.purple}33`,
                }}
              >
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Dear{" "}
                  <span className="font-bold text-white">Mr. Modar Sheikh Saeed</span>,
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  I am{" "}
                  <span className="font-semibold" style={{ color: COLORS.cyan }}>
                    Khaled Alghamdi
                  </span>
                  , a Computer Engineering graduate with a GPA of 4.74/5, specializing in
                  Embedded Systems, IoT, AI, and Cybersecurity. I believe my technical background
                  and strategic mindset make me a strong fit for the IT Business Section at Albawani.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  I am{" "}
                  <span className="font-semibold text-white">
                    fully prepared for a probationary period or practical assessments
                  </span>{" "}
                  to demonstrate my capabilities, dedication, and the value I can bring to
                  Albawani's projects and digital transformation initiatives.
                </p>
              </div>

              <div
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{
                  background: `${COLORS.cyan}08`,
                  border: `1px solid ${COLORS.cyan}22`,
                }}
              >
                <CheckCircle size={18} style={{ color: COLORS.cyan }} />
                <span className="text-gray-300 text-sm font-medium">
                  Available for immediate start
                </span>
              </div>
            </GlassCard>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "k.alghamdi@engineer.com",
                  color: COLORS.cyan,
                  action: () => copy("k.alghamdi@engineer.com"),
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+966 5X XXX XXXX",
                  color: COLORS.purple,
                  action: () => {},
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  value: "linkedin.com/in/khaled-alghamdi",
                  color: COLORS.blue,
                  action: () => {},
                },
              ].map(({ icon: Icon, label, value, color, action }, i) => (
                <GlassCard key={i} className="p-5" glowColor={color}>
                  <button
                    onClick={action}
                    className="w-full flex items-center gap-4 text-left"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${color}18`,
                        border: `1px solid ${color}44`,
                      }}
                    >
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-500 text-xs mb-0.5">{label}</div>
                      <div className="text-white font-medium text-sm truncate">{value}</div>
                    </div>
                    <ExternalLink size={14} className="text-gray-600 flex-shrink-0" />
                  </button>
                </GlassCard>
              ))}

              <GlassCard className="p-6" glowColor={COLORS.cyan}>
                <div className="text-center">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.cyan}22, ${COLORS.purple}22)`,
                      border: `1px solid ${COLORS.cyan}44`,
                    }}
                  >
                    <Building2 size={24} style={{ color: COLORS.cyan }} />
                  </div>
                  <h4 className="text-white font-bold mb-1">Albawani Company</h4>
                  <p className="text-gray-500 text-xs mb-3">IT Business Section</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    A company with the scale, vision, and infrastructure where my skills and
                    dedication can generate real, measurable impact.
                  </p>
                </div>
              </GlassCard>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3}>
          <motion.div
            className="mt-12 text-center rounded-3xl p-10 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${COLORS.cyan}08, ${COLORS.purple}08)`,
              border: `1px solid ${COLORS.cyan}22`,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 50%, ${COLORS.purple}08 0%, transparent 70%)`,
              }}
            />
            <Sparkles
              size={32}
              className="mx-auto mb-4"
              style={{ color: COLORS.cyan }}
            />
            <h3 className="text-white text-2xl sm:text-3xl font-black mb-3">
              Ready to{" "}
              <GlowText>Prove My Value</GlowText>
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
              Whether through a practical assessment, probationary period, or direct contribution —
              I am fully committed to demonstrating how my skills can support Albawani's
              IT infrastructure and digital transformation goals.
            </p>
            <motion.a
              href="mailto:k.alghamdi@engineer.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-black"
              style={{
                background: `linear-gradient(135deg, ${COLORS.cyan}, #00b8cc)`,
                boxShadow: `0 0 30px ${COLORS.cyan}44`,
              }}
            >
              <Zap size={18} />
              Start the Conversation
              <ArrowRight size={18} />
            </motion.a>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-8 text-center border-t"
      style={{
        background: "#040410",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-gray-600 text-sm">
          Crafted by{" "}
          <span className="font-semibold" style={{ color: COLORS.cyan }}>
            Khaled Alghamdi
          </span>
          {" · "}
          <span className="text-gray-700">Computer Engineer · Tabuk University</span>
        </p>
        <p className="text-gray-700 text-xs mt-2">
          Prepared exclusively for{" "}
          <span style={{ color: COLORS.purple }}>Albawani IT Business Section</span>
          {" — Attn: Mr. Modar Sheikh Saeed"}
        </p>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        background: "#050510",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <AboutSection />
      <AcademicSection />
      <SkillsSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
