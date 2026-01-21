export const scamData = [
    {
        id: 1,
        title: "WhatsApp Investment Scam",
        shortDesc: "Fake crypto groups promising huge returns.",
        image: "/scam1.png",
        details: {
            whatIsIt: "Scammers add you to a random WhatsApp group, claiming to be financial experts or VIP crypto investors. They promise 'guaranteed' daily returns of 30% or more.",
            mechanics: "They post fake screenshots of other members earning massive profits to build social proof. Once you invest small, they let you withdraw to gain trust. When you invest big, they block you.",
            redFlags: ["Added to a group without permission", "Guaranteed returns (e.g., 'Double your money in 24h')", "Admins have foreign phone numbers", "Pressure to invest quickly"],
            prevention: "Never transfer money to strangers. Leave groups immediately. Adjust WhatsApp privacy settings to prevent strangers from adding you to groups.",
            recovery: "Report the group to WhatsApp. Contact your bank immediately if you sent money. Do not pay 'fees' to unlock your funds."
        }
    },
    {
        id: 2,
        title: "Phishing Links",
        shortDesc: "Fake login pages stealing your passwords.",
        image: "/scam2.png",
        details: {
            whatIsIt: "You receive an SMS or Email claiming your bank account, Netflix, or Social Media is 'locked' and you must verify your identity via a link.",
            mechanics: "The link leads to a perfect clone of the real website. When you enter your username and password, the hackers save it instantly.",
            redFlags: ["Urgent language ('Action Required Now')", "Suspicious URL (e.g., 'netflix-verify.com' instead of 'netflix.com')", "Generic greetings ('Dear Customer')"],
            prevention: "Never click links in SMS/Emails regarding account security. Go directly to the official app or website.",
            recovery: "Change your passwords immediately. Enable Two-Factor Authentication (2FA). Check for unauthorized login activity."
        }
    },
    {
        id: 3,
        title: "Job Task Scam",
        shortDesc: "Paid to 'like' videos or review products.",
        image: "/scam3.png",
        details: {
            whatIsIt: "You are offered a part-time job that pays for simple tasks like liking YouTube videos or reviewing Amazon products.",
            mechanics: "They pay you small amounts initially. Then, they ask you to pay a 'security deposit' or 'upgrade fee' to get higher-paying tasks. Once you pay, they disappear.",
            redFlags: ["Job offer via WhatsApp/Telegram from unknown number", "You have to PAY to get the job", "Easy money for zero effort"],
            prevention: "Legitimate jobs never ask you to pay them. Ignore unsolicited job offers on messaging apps.",
            recovery: "Stop paying immediately. Report the Telegram/WhatsApp user. Use local cybercrime reporting portals."
        }
    },
    {
        id: 4,
        title: "Romance Scam",
        shortDesc: "Online love interests asking for money.",
        image: "/scam4.png",
        details: {
            whatIsIt: "Someone you met online (Tinder, Facebook) establishes a deep emotional connection with you quickly but cannot meet in person.",
            mechanics: "They claim a sudden emergency (medical, stuck at customs, lost wallet) and ask for money. They promise to pay you back when they finally visit.",
            redFlags: ["Professes love very quickly", "Cannot video call/meet in person", "Constant emergencies requiring money"],
            prevention: "Never send money to someone you haven't met. Reverse image search their profile photos.",
            recovery: "Cut all contact. Report the profile on the dating datform. Don't be embarrassed; this happens to many people."
        }
    },
    {
        id: 5,
        title: "Loan App Harassment",
        shortDesc: "Predatory loans with blackmail tactics.",
        image: "/scam5.png",
        details: {
            whatIsIt: "Instant loan apps specifically targeting people in need, offering quick cash with hidden high interest rates.",
            mechanics: "When you install the app, it steals your contacts list. If you miss a payment (or even if you don't), they harass and blackmail your friends and family.",
            redFlags: ["App requires access to Camera and Contacts", "No physical office address", "Aggressive collection tactics"],
            prevention: "Only borrow from registered, regulated banks and financial institutions. Read app permissions carefully.",
            recovery: "Uninstall the app. Report to the Play Store. Inform your contacts that your phone was hacked if they are contacted."
        }
    },
    {
        id: 6,
        title: "Daraz/Courier Scam",
        shortDesc: "Fake packages or 'lucky winner' gifts.",
        image: "/scam6.png",
        details: {
            whatIsIt: "You receive a call saying you have a package or won a gift, but you need to pay a 'delivery fee' or 'customs charge'.",
            mechanics: "Sometimes a delivery rider actually arrives with a worthless item and demands payment (Cash on Delivery) for something you didn't order.",
            redFlags: ["You didn't order anything", "You have to pay to receive a 'free' gift", "Urgent demand for payment"],
            prevention: "Don't accept packages you didn't order. Tell family members not to pay for mystery parcels.",
            recovery: "Refuse the delivery. If paid, contact the courier company immediately to halt the remittance to the sender."
        }
    },
    {
        id: 7,
        title: "Ponzi Scheme",
        shortDesc: "Pyramid selling with unsustainable returns.",
        image: "/scam1.png",
        details: {
            whatIsIt: "An investment fraud that pays existing investors with funds collected from new investors.",
            mechanics: "They rely on a constant flow of new money. When recruitment slows down, the scheme collapses and everyone loses their money.",
            redFlags: ["High returns with little or no risk", "Overly consistent returns", "Difficulty receiving payments"],
            prevention: "If it sounds too good to be true, it probably is. Check if the company is registered with financial regulators.",
            recovery: "Withdraw funds immediately if possible. Report to financial authorities."
        }
    },
    {
        id: 8,
        title: "Facebook Hacking",
        shortDesc: "Account takeovers to scam your friends.",
        image: "/scam2.png",
        details: {
            whatIsIt: "A friend's account sends you a message asking for a code, money, or to vote for them in a contest.",
            mechanics: "They hack your account, then message your friends pretending to be you, asking for emergency money or to click phishing links.",
            redFlags: ["Friend asking for 'urgent' help via generic message", "Requests for OTP codes sent to your phone"],
            prevention: "Enable 2FA on Facebook. Never share OTP codes with anyone, even friends.",
            recovery: "Use Facebook's 'Hacked Account' recovery tools. Warn your friends via other channels."
        }
    },
    {
        id: 9,
        title: "ATM Skimming",
        shortDesc: "Cloned cards stealing your balance.",
        image: "/scam3.png",
        details: {
            whatIsIt: "Thieves attach a device to the ATM card slot to read your card details and a camera to record your PIN.",
            mechanics: "They create a clone of your card and use your PIN to withdraw cash from another location.",
            redFlags: ["card reader looks bulky or loose", "Tiny hidden camera pointed at the keypad", "Keypad feels thick/fake"],
            prevention: "Wiggle the card reader before use. Cover the keypad with your hand when entering PIN.",
            recovery: "Report unauthorized transactions to your bank immediately to block the card."
        }
    },
    {
        id: 10,
        title: "Lottery Scam",
        shortDesc: "Winning a lottery you never entered.",
        image: "/scam4.png",
        details: {
            whatIsIt: "You get an email/SMS saying you won a massive jackpot (e.g., Coke Lottery, Microsoft Award).",
            mechanics: "To claim the millions, you must pay 'processing fees' or 'tax' first. The prize never exists.",
            redFlags: ["You never bought a ticket", "Email from public domain (gmail/yahoo)", "Bad grammar"],
            prevention: "Ignore claims of winning lotteries you didn't enter. Legitimate lotteries subtract taxes from winnings.",
            recovery: "Stop communicating. Do not send any money."
        }
    }
];
