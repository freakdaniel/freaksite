import { motion } from "framer-motion";

const MobileTabSwitcher = ({ activeTab, onTabChange, tabs, accentColor, id = "tab-switcher" }) => {
    return (
        <div className="flex bg-white/5 p-1 rounded-xl mb-6 relative w-full max-w-sm mx-auto backdrop-blur-sm border border-white/10">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex-1 relative py-2 text-xs font-bold font-sync tracking-wider transition-colors duration-300 z-10 ${
                        activeTab === tab.id ? "text-white" : "text-white/40 hover:text-white/60"
                    }`}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId={`${id}-activeTabPill`}
                            className="absolute inset-0 rounded-lg shadow-lg"
                            style={{ backgroundColor: accentColor || "#ffffff", opacity: 0.15 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                    )}
                     {activeTab === tab.id && (
                        <motion.div
                            layoutId={`${id}-activeTabBorder`}
                            className="absolute inset-0 rounded-lg border"
                             style={{ borderColor: accentColor || "#ffffff", opacity: 0.3 }}
                             transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                    )}
                    
                    <span className="relative z-20 top-px">{tab.label}</span>
                </button>
            ))}
        </div>
    );
};

export default MobileTabSwitcher;