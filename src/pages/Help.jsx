import React, { useState } from 'react'
import { HelpCircle, Mail, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Help = () => {
    const faqs = [
        {
            question: "How do I join a project?",
            answer: "Navigate to the 'Projects' tab, browse for a project that interests you, and click on it to view details. If the project is open for collaboration, you'll see a 'Request to Join' button."
        },
        {
            question: "Can I create my own project?",
            answer: "Absolutely! Go to the Dashboard or Projects page and click 'Post Project'. Fill in the details about your idea, the skills you need, and publish it for others to see."
        },
        {
            question: "How do I edit my profile?",
            answer: "Click on your profile avatar in the top right corner or the 'My Profile' link in the sidebar. Once there, click the 'Edit Profile' button to update your details, skills, and certificates."
        },
        {
            question: "Is my personal information visible to everyone?",
            answer: "By default, your academic profile (Name, Department, Skills) is visible to other students to facilitate collaboration. Your contact details (like phone number) are kept private unless you share them."
        },
        {
            question: "How do I upload a certificate?",
            answer: "Go to your Profile page, enter 'Edit Mode', and scroll down to the 'Certificates & Documents' section. Click the upload area to add your PDF certificates."
        }
    ]

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4 py-8">
                <h1 className="text-4xl font-black font-outfit text-white tracking-tight">Help & Support</h1>
                <p className="text-platinum/60 max-w-xl mx-auto">
                    Find answers to common questions or get in touch with our support team directly.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* FAQ Section */}
                <div className="md:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                        <HelpCircle className="mr-3 text-lavender" /> Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <Accordion key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-6">
                    <div className="bg-[#2D2B3F] p-6 rounded-2xl border border-white/5 sticky top-24">
                        <div className="w-12 h-12 bg-lavender/10 rounded-xl flex items-center justify-center text-lavender mb-4">
                            <Mail size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
                        <p className="text-sm text-platinum/60 mb-6">
                            Can't find the answer you're looking for? Our team is here to help. Drop us an email.
                        </p>

                        <a
                            href="mailto:support@kingspulse.edu?subject=Support Request"
                            className="block w-full py-3 bg-lavender hover:bg-[#7D7AFF] text-white text-center rounded-xl font-bold transition-all shadow-lg shadow-lavender/20"
                        >
                            Email Support
                        </a>

                        <p className="text-[10px] text-platinum/30 text-center mt-4 uppercase tracking-widest">
                            Response time: 24-48 Hours
                        </p>
                    </div>
                </div>
            </div>
            <div className="h-20"></div>
        </div>
    )
}

const Accordion = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-[#1E1D2B] border border-white/5 rounded-xl overflow-hidden transition-all hover:border-lavender/20">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left"
            >
                <span className="font-bold text-platinum/90">{question}</span>
                {isOpen ? <ChevronUp className="text-lavender" /> : <ChevronDown className="text-platinum/40" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-5 pt-0 text-sm text-platinum/50 leading-relaxed border-t border-white/5 mx-5 mt-2">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Help
