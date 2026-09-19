import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Globe, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';
import emailOpening from '@/assets/email_opening.gif';

const CONTACTS = [
  { label: 'EMAIL', value: 'nuhahaq787@gmail.com', href: 'mailto:nuhahaq787@gmail.com', Icon: Mail },
  { label: 'LOCATION', value: 'Toronto, Ontario', href: 'https://www.google.com/maps/search/?api=1&query=Toronto%2C%20Ontario', Icon: MapPin },
  { label: 'WEBSITE', value: 'tahniahaq.space', href: 'https://www.tahniahaq.space', Icon: Globe },
  { label: 'LINKEDIN', value: 'linkedin.com/in/tahnia-haq', href: 'https://www.linkedin.com/in/tahnia-haq', Icon: Linkedin },
  { label: 'GITHUB', value: 'github.com/devlabsmobile98-ops', href: 'https://github.com/devlabsmobile98-ops', Icon: Github },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden px-6 py-24 md:py-32" style={{ background: '#fff8f0', color: '#023047' }}>
      <div className="absolute top-12 left-[-2rem] text-[20vw] leading-none font-black opacity-[0.035] select-none" aria-hidden="true">HELLO</div>
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5 }}>
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black tracking-[0.2em]" style={{ background: '#ffb703' }}>
              <Sparkles className="w-4 h-4" /> INBOX: OPEN
            </p>
            <h2 id="contact-heading" className="mt-6 font-black uppercase leading-[0.79] tracking-[-0.07em]" style={{ fontSize: 'clamp(4.5rem, 11vw, 9rem)' }}>
              REACH<br />OUT,<br /><span style={{ color: '#ff4d6d' }}>MY FRIEND.</span>
            </h2>
            <p className="max-w-md mt-7 text-lg md:text-xl font-bold leading-snug">
              Got a project idea, a role, or a confusing problem? Step One: Contact Me
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, rotate: 5, scale: 0.94 }} whileInView={{ opacity: 1, rotate: 2, scale: 1 }} whileHover={{ rotate: 0, scale: 1.02 }} viewport={{ once: true, amount: 0.25 }} transition={{ type: 'spring', stiffness: 130, damping: 16 }} className="relative mx-auto w-full max-w-md">
            <div className="overflow-hidden border-[3px]" style={{ borderColor: '#023047', boxShadow: '12px 12px 0 #ff4d6d' }}>
              <img src={emailOpening} alt="An animated red and orange envelope opening" className="block w-full" />
            </div>
          </motion.div>
        </div>

        <div className="mt-20 border-t-[3px]" style={{ borderColor: '#023047' }}>
          {CONTACTS.map(({ label, value, href, Icon }, index) => (
            <motion.a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} whileHover={{ x: 10, backgroundColor: '#023047', color: '#fff8f0' }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.05 }} className="group grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[5rem_10rem_1fr_auto] gap-3 md:gap-6 items-center py-5 border-b-[3px] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4" style={{ borderColor: '#023047' }} aria-label={`${label}: ${value}`}>
              <span className="text-xs font-black opacity-50">0{index + 1}</span>
              <span className="hidden md:flex items-center gap-2 text-xs font-black tracking-[0.16em]"><Icon className="w-4 h-4" /> {label}</span>
              <span className="font-black text-base sm:text-xl md:text-2xl tracking-tight break-all">{value}</span>
              <ArrowUpRight className="w-6 h-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          ))}
        </div>

        <footer className="mt-12 flex flex-col sm:flex-row gap-3 justify-between text-[11px] font-black uppercase tracking-[0.14em] opacity-70">
          <span>© 2026 Nuha Tahnia Haq. All rights reserved.</span>
          <span>Coded by an unusually specific engineer (ME)</span>
        </footer>
      </div>
    </section>
  );
}
