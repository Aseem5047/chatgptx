import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext({
	previousChats: [],
	currentTitle: null,
	prompt: "",
	message: null,
	setPreviousChats: () => {},
	setCurrentTitle: () => {},
	setPrompt: () => {},
	setMessage: () => {},
});

export const ChatProvider = ({ children }) => {
	const [previousChats, setPreviousChats] = useState([]);
	const [currentTitle, setCurrentTitle] = useState(null);
	const [prompt, setPrompt] = useState("");
	const [message, setMessage] = useState(null);
	const value = {
		previousChats,
		setPreviousChats,
		currentTitle,
		setCurrentTitle,
		prompt,
		setPrompt,
		message,
		setMessage,
	};
	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
	return useContext(ChatContext);
};
