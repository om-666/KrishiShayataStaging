import React, { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, Leaf, X, Loader2, Sprout, ChevronDown, Volume2 } from "lucide-react";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState({ key: "en", label: "English" });
    const chatRef = useRef(null);

    // like it: API credentials for Reverie services (replace with env vars in production)
    const apiKey = process.env.REACT_APP_API_KEY
    const appId = process.env.REACT_APP_APP_ID 

    const sourceLanguages = [
        { key: "en", label: "English" },
        { key: "hi", label: "Hindi (हिन्दी)" },
        { key: "as", label: "Assamese (অসমীয়া)" },
        { key: "bn", label: "Bangla (বাংলা)" },
        { key: "gu", label: "Gujarati (ગુજરાતી)" },
        { key: "kn", label: "Kannada (ಕನ್ನಡ)" },
        { key: "ml", label: "Malayalam (മലയാളം)" },
        { key: "mr", label: "Marathi (मराठी)" },
        { key: "or", label: "Odia (ଓଡ଼ିଆ)" },
        { key: "pa", label: "Punjabi (ਪੰਜਾਬੀ)" },
        { key: "ta", label: "Tamil (தமிழ்)" },
        { key: "te", label: "Telugu (తెలుగు)" },
    ];

    const speakText = async (text, languageCode) => {
        try {
            const speakerMap = {
                en: "en_female",
                hi: "hi_female",
                as: "as_female",
                bn: "bn_female",
                gu: "gu_female",
                kn: "kn_female",
                ml: "ml_female",
                mr: "mr_female",
                or: "or_female",
                pa: "pa_female",
                ta: "ta_female",
                te: "te_female",
            };
            const speaker = speakerMap[languageCode] || "en_female";

            const response = await fetch("https://revapi.reverieinc.com/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "REV-API-KEY": apiKey,
                    "REV-APP-ID": appId,
                    "REV-APPNAME": "tts",
                    "speaker": speaker,
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) throw new Error("TTS API request failed");

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
            audio.onended = () => URL.revokeObjectURL(audioUrl);
        } catch (error) {
            console.error("TTS error:", error);
        }
    };

    const enableSwalekh = (querySelector, sourceLanguage, inputToolKey, domain = "1") => {
        const creds = { lang: sourceLanguage, mode: inputToolKey, apiKey, appId, querySel: querySelector, domain };
        if (window?.loadSwalekh) window.loadSwalekh(creds);
    };

    const disableSwalekh = (querySelector) => {
        if (window?.unloadSwalekh) window.unloadSwalekh({ querySel: querySelector });
    };

    useEffect(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user", time: new Date() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        let translatedInput = input;

        if (selectedLanguage.key !== "en") {
            try {
                const translationRequest = {
                    data: [input],
                    enableNmt: true,
                };
                const translationResponse = await fetch("https://revapi.reverieinc.com/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "REV-API-KEY": "abc",
                        "REV-APP-ID": "abc",
                        "src_lang": selectedLanguage.key,
                        "tgt_lang": "en",
                        "domain": "generic",
                        "REV-APPNAME": "localization",
                        "REV-APPVERSION": "3.0",
                    },
                    body: JSON.stringify(translationRequest),
                });
                const translationData = await translationResponse.json();
                translatedInput = translationData.responseList?.[0]?.outString || input;
            } catch (error) {
                console.error("Translation error:", error);
                setMessages((prev) => [
                    ...prev,
                    { text: "Error translating message.", sender: "bot", time: new Date() },
                ]);
                setIsTyping(false);
                return;
            }
        }

        try {
            const chatbotRequest = { message: translatedInput };
            const response = await fetch("https://krihsimitra.onrender.com/chatbot", {
                method: "POST",
                mode: "cors",
                redirect: "follow",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(chatbotRequest),
            });

            const data = await response.json();
            let botResponseText = data.response || "Sorry, I couldn't understand that.";

            if (selectedLanguage.key !== "en") {
                try {
                    const reverseTranslationRequest = {
                        data: [botResponseText],
                        enableNmt: true,
                    };
                    const reverseTranslationResponse = await fetch("https://revapi.reverieinc.com/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "REV-API-KEY": "abc",
                            "REV-APP-ID": "abc",
                            "src_lang": "en",
                            "tgt_lang": selectedLanguage.key,
                            "domain": "generic",
                            "REV-APPNAME": "localization",
                            "REV-APPVERSION": "3.0",
                        },
                        body: JSON.stringify(reverseTranslationRequest),
                    });
                    const reverseTranslationData = await reverseTranslationResponse.json();
                    botResponseText = reverseTranslationData.responseList?.[0]?.outString || botResponseText;
                } catch (error) {
                    console.error("Reverse translation error:", error);
                }
            }

            const botResponse = { text: botResponseText, sender: "bot", time: new Date() };
            setMessages((prev) => [...prev, botResponse]);
            setIsTyping(false);
            speakText(botResponseText, selectedLanguage.key);
        } catch (error) {
            console.error("Chatbot API Error:", error);
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                { text: "Error fetching response. Try again later.", sender: "bot", time: new Date() },
            ]);
        }
    };

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setIsLanguageDropdownOpen(false);
        enableSwalekh("#input-text", language.key, "phonetic");
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 
                          transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
            {isOpen && (
                <div className="w-80 md:w-96 h-[500px] bg-white shadow-2xl rounded-2xl fixed bottom-20 right-5 
                              flex flex-col animate-in slide-in-from-bottom-2 overflow-hidden">
                    <div className="bg-[#364641] text-white p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Leaf className="text-green-300" size={20} />
                                <div>
                                    <h3 className="font-bold text-lg">कृषि मित्र</h3>
                                    <p className="text-sm text-green-50">Krishi Mitra</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="relative mr-2">
                                    <button
                                        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                                        className="flex items-center space-x-1 bg-green-700 hover:bg-green-800 rounded-md px-2 py-1 text-sm"
                                    >
                                        <span>{selectedLanguage.label.split(" ")[0]}</span>
                                        <ChevronDown size={14} />
                                    </button>
                                    {isLanguageDropdownOpen && (
                                        <div className="absolute right-0 mt-1 bg-white text-gray-800 shadow-lg rounded-md py-1 w-48 max-h-64 overflow-y-auto z-10">
                                            {sourceLanguages.map((language) => (
                                                <button
                                                    key={language.key}
                                                    onClick={() => handleLanguageSelect(language)}
                                                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedLanguage.key === language.key ? "bg-green-50 text-green-800 font-medium" : ""}`}
                                                >
                                                    {language.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        disableSwalekh("#input-text");
                                    }}
                                    className="p-2 hover:bg-green-600 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div ref={chatRef} className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="text-center h-full flex flex-col items-center justify-center p-4">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <Sprout size={40} className="text-green-600" />
                                </div>
                                <h4 className="text-2xl font-bold text-green-800 mb-2">कृषि मित्र</h4>
                                <h5 className="text-xl font-semibold text-green-700 mb-4">Krishi Mitra</h5>
                                <p className="text-gray-600 mb-4">Your Personal Farming Assistant</p>
                                <div className="space-y-2 text-sm text-gray-500">
                                    <p>• Get expert farming advice</p>
                                    <p>• Learn about crop management</p>
                                    <p>• Discover best practices</p>
                                    <p>• 24/7 farming guidance</p>
                                </div>
                                <p className="mt-6 text-green-600 font-medium">Type your question to get started!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className="flex flex-col space-y-1 max-w-[80%]">
                                            <div
                                                className={`p-3 rounded-2xl relative ${msg.sender === "user"
                                                    ? "bg-[#364641] text-white rounded-tr-none"
                                                    : "bg-white shadow-sm text-gray-800 rounded-tl-none"}`}
                                            >
                                                {msg.text}
                                                {msg.sender === "bot" && (
                                                    <button
                                                        onClick={() => speakText(msg.text, selectedLanguage.key)}
                                                        className="absolute -right-2 -top-2 bg-green-100 hover:bg-green-200 text-green-800 p-1 rounded-full"
                                                        title="Speak"
                                                    >
                                                        <Volume2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-500 px-2">
                                                {formatTime(msg.time)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
                                            <div className="flex items-center space-x-2">
                                                <Loader2 size={16} className="animate-spin text-green-600" />
                                                <span className="text-gray-500 text-sm">Typing...</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="p-4 bg-white border-t">
                        <div className="flex items-center space-x-2">
                            <input
                                id="input-text"
                                type="text"
                                className="flex-1 p-3 border border-gray-200 rounded-full focus:outline-none 
                                         focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                                placeholder={`Ask your farming question in ${selectedLanguage.label.split(" ")[0]}...`}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 
                                         transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;