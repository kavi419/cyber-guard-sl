import { useParams, useNavigate, Link } from 'react-router-dom';
import { scamData } from '../data/scamData';
import { motion } from 'framer-motion';

const ScamArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const scam = scamData.find(s => s.id === parseInt(id));

    if (!scam) {
        return <div className="text-white">Scam not found</div>;
    }

    return (
        <div className="relative min-h-screen w-full bg-black text-gray-200 font-mono overflow-y-auto">
            {/* Background Image */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
                style={{ backgroundImage: `url(${scam.image})` }}
            ></div>

            {/* Dark Overlay for Readability */}
            <div className="fixed inset-0 z-0 bg-black/85"></div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">

                {/* Back Link - Preserves State */}
                <Link
                    to="/"
                    state={{ view: 'scam-feed', skipLanding: true }}
                    className="mb-8 flex items-center space-x-2 text-cyber-green hover:text-white transition-colors duration-300 group w-fit"
                >
                    <span className="text-xl">&larr;</span>
                    <span className="uppercase tracking-widest text-sm border-b border-transparent group-hover:border-white">Back to Intel</span>
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block px-3 py-1 bg-red-500/20 border border-red-500 text-red-400 text-xs font-bold tracking-widest mb-4 rounded">
                        CRITICAL ALERT // ID: {scam.id.toString().padStart(3, '0')}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 glitch-effect">
                        {scam.title}
                    </h1>
                    <p className="text-xl text-gray-400 border-l-4 border-cyber-green pl-4 italic">
                        "{scam.shortDesc}"
                    </p>
                </motion.div>

                {/* Detailed Sections */}
                <div className="mt-12 space-y-12">

                    {/* What Is It */}
                    <Section title="What Is It?">
                        <p>{scam.details.whatIsIt}</p>
                    </Section>

                    {/* How It Works */}
                    <Section title="The Mechanics">
                        <p>{scam.details.mechanics}</p>
                    </Section>

                    {/* Red Flags */}
                    <Section title="Red Flags (Warning Signs)">
                        <ul className="list-none space-y-3">
                            {scam.details.redFlags.map((flag, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-red-500 mr-3">⚠</span>
                                    <span>{flag}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    {/* Prevention */}
                    <Section title="Defense / Prevention">
                        <div className="bg-cyber-green/10 border border-cyber-green p-6 rounded-lg text-cyber-green shadow-[0_0_15px_rgba(0,255,65,0.1)]">
                            <h4 className="font-bold mb-2 uppercase tracking-wide text-sm">Action Protocol</h4>
                            <p>{scam.details.prevention}</p>
                        </div>
                    </Section>

                    {/* Recovery */}
                    <Section title="Damage Control / Recovery">
                        <p className="text-gray-400">{scam.details.recovery}</p>
                    </Section>

                </div>
            </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
    >
        <h2 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center">
            <span className="w-2 h-2 bg-cyber-green mr-3 rounded-full"></span>
            {title}
        </h2>
        <div className="text-lg leading-relaxed text-gray-300 ml-5">
            {children}
        </div>
    </motion.div>
);

export default ScamArticle;
