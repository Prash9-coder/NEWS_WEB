import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation();

    const footerLinks = {
        categories: [
            { name: t('header.india'), path: '/category/india' },
            { name: t('header.world'), path: '/category/world' },
            { name: t('header.business'), path: '/category/business' },
            { name: t('header.technology'), path: '/category/technology' },
            { name: t('header.sports'), path: '/category/sports' },
            { name: t('header.entertainment'), path: '/category/entertainment' },
        ],
        company: [
            { name: t('footer.about'), path: '/about' },
            { name: t('footer.contact'), path: '/contact' },
            { name: 'Careers', path: '/careers' },
            { name: 'Advertise', path: '/advertise' },
        ],
        legal: [
            { name: t('footer.privacy'), path: '/privacy-policy' },
            { name: t('footer.terms'), path: '/terms-of-service' },
            { name: 'Cookie Policy', path: '/cookie-policy' },
            { name: 'Disclaimer', path: '/disclaimer' },
        ],
    };

    const socialLinks = [
        { icon: Facebook, color: 'hover:text-blue-600', url: '#' },
        { icon: Twitter, color: 'hover:text-sky-500', url: '#' },
        { icon: Instagram, color: 'hover:text-pink-600', url: '#' },
        { icon: Youtube, color: 'hover:text-red-600', url: '#' },
        { icon: Linkedin, color: 'hover:text-blue-700', url: '#' }
    ];

    return (
        <footer className="bg-secondary text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Newsletter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 mb-12"
                >
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-2xl font-black mb-2">{t('home.newsletter')}</h3>
                            <p className="text-white/90">{t('home.newsletterText')}</p>
                        </div>
                        <div className="flex space-x-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-3 rounded-lg text-gray-900 outline-none w-full md:w-80"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-primary px-6 py-3 rounded-lg font-bold whitespace-nowrap hover:bg-gray-100 transition-colors"
                            >
                                {t('home.subscribe')}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-black text-lg mb-4 uppercase">{t('footer.categories')}</h4>
                        <ul className="space-y-2">
                            {footerLinks.categories.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="font-black text-lg mb-4 uppercase">{t('footer.company')}</h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="font-black text-lg mb-4 uppercase">{t('footer.legal')}</h4>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="border-t border-gray-700 pt-8 mb-8"
                >
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex items-center space-x-3">
                            <Mail className="text-primary" size={20} />
                            <span className="text-gray-400 text-sm">contact@newshub.com</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Phone className="text-primary" size={20} />
                            <span className="text-gray-400 text-sm">+91 1800-XXX-XXXX</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <MapPin className="text-primary" size={20} />
                            <span className="text-gray-400 text-sm">New Delhi, India</span>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-t border-gray-700 pt-8">
                    <div className="mb-4 md:mb-0">
                        <Link to="/">
                            <h2 className="text-2xl font-black mb-2">
                                <span className="gradient-text">NEWS</span>HUB
                            </h2>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            © 2024 NewsHub. {t('footer.copyright')}
                        </p>
                    </div>

                    <div className="flex space-x-4">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.url}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center ${social.color} transition-colors`}
                            >
                                <social.icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;