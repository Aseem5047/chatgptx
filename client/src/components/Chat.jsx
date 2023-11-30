import React, { useRef, useState, useEffect } from "react";
import autosize from "autosize";
import { useChat } from "../context/chatContext";

const Chat = () => {
	const {
		previousChats,
		setPreviousChats,
		currentTitle,
		setCurrentTitle,
		prompt,
		setPrompt,
		message,
		setMessage,
	} = useChat();
	const textareaRef = useRef(null);

	useEffect(() => {
		// Initialize autosize on the textarea
		if (textareaRef.current) {
			autosize(textareaRef.current);
		}

		// Clean up autosize on component unmount
		return () => {
			if (textareaRef.current) {
				autosize.destroy(textareaRef.current);
			}
		};
	}, []); // Run the effect only once on mount

	useEffect(() => {
		// the following logic will run only once when the currentTitle does not exist
		if (!currentTitle && prompt && message) {
			setCurrentTitle(prompt);
		}

		// console.log(`Title - ${currentTitle} Prompt - ${prompt}`);
		// console.log(message);

		if (currentTitle && prompt && message) {
			setPreviousChats((prevChats) => [
				...prevChats,
				{
					title: currentTitle,
					role: "user",
					content: prompt,
				},
				{
					title: currentTitle,
					role: message.role,
					content: message.content,
				},
			]);
			setPrompt("");
		}
	}, [message, currentTitle, setPreviousChats]);

	const handleSubmit = async (e) => {
		const options = {
			method: "POST",
			body: JSON.stringify({
				message: prompt,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const response = await fetch("http://localhost:5000", options);
			const data = await response.json();
			setMessage(data.choices[0].message);

			// console.log(data);

			// Manually trigger autosize update after clearing the content
			if (textareaRef.current) {
				autosize.destroy(textareaRef.current);
			}
		} catch (error) {
			console.log(error);
			// Handle error if needed
		}
	};

	function inputHeader(text) {
		return <h2 className="text-base font-medium">{text}</h2>;
	}

	function inputDescription(text) {
		return <span className="mt-1 text-xs text-gray-400">{text} </span>;
	}

	function preInput(header, description, toBeCentered, addBorder) {
		return (
			<div
				className={`flex flex-col justify-center ${
					!toBeCentered ? "items-start" : "items-center"
				} ${
					addBorder &&
					"hoverEffectText border border-white/20 py-2 px-4 rounded-xl"
				}`}
				onClick={
					addBorder ? () => setPrompt(header + " " + description) : undefined
				}
			>
				{header && inputHeader(header)}
				{description && inputDescription(description)}
			</div>
		);
	}

	const currentChat = previousChats
		? previousChats.filter(
				(previousChat) => previousChat.title === currentTitle
		  )
		: [];

	return (
		<div className="flex flex-col gap-4 items-center justify-between flex-1 grow py-4 w-full">
			{/* Response Section */}
			<div className=" w-full lg:w-3/4 flex-1 max-h-[62vh] overflow-x-hidden overflow-y-scroll removeScrollbar ">
				{!currentTitle ? (
					<div className="flex flex-col items-center jusify-center gap-2 text-2xl font-semibold">
						<img src="/assets/chatgpt.svg" alt="" className="w-20 h-20" />
						<p>How can I help You Today ?</p>
					</div>
				) : (
					<ul className="px-4 flex flex-col gap-4 justify-center items-center">
						{currentChat?.map((chatMessage, index) => (
							<li key={index} className={`w-full bg-white/20  p-4 rounded-xl`}>
								<div className="flex gap-3 items-center">
									{chatMessage.role === "user" ? (
										<img
											src="/assets/user.jpg"
											alt="Profile"
											className="w-10 h-10 rounded-full object-fit"
										/>
									) : (
										<img
											src="/assets/chatgpt.svg"
											alt="Profile"
											className="w-10 h-10 rounded-full object-fit"
										/>
									)}
									<div className="flex flex-col justify-center">
										<p className="text-base font-medium">{chatMessage.role}</p>
										<p className="text-base font-normal">
											{chatMessage.content}
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
			{/* Input Section */}
			<div className="flex flex-col justify-center items-center w-[95%] md:w-[85%] lg:w-[60%] relative">
				{/* Heading */}
				{preInput(
					"Welcome Aseem Gupta",
					"Ask anything from our smart and capable model",
					true,
					false
				)}

				{!currentTitle && (
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
						{preInput(
							"Make Up a story",
							"about sharky, a tooth-brushing shark superhero",
							false,
							true
						)}
						{preInput(
							"Help me Pick",
							"a birthday gift for my mother who likes cooking",
							false,
							true
						)}
						{preInput(
							"Reccomend a dish",
							"to impress a date who's a picky eater",
							false,
							true
						)}
						{preInput(
							"Show me a code snippet",
							"of a website's sticky header",
							false,
							true
						)}
					</div>
				)}

				<textarea
					ref={textareaRef}
					name="prompt"
					value={prompt}
					className="input mt-4 resize-none overflow-y-scroll"
					placeholder="Message ChatGPT..."
					onChange={(e) => setPrompt(e.target.value)}
				/>

				<span
					className={`absolute bottom-3 right-4 cursor-pointer bg-white/20 rounded-xl p-2  ${
						prompt?.length === 0 ? "hidden" : "hoverEffectText"
					}`}
					onClick={handleSubmit}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className={`w-6 h-6 `}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
						/>
					</svg>
				</span>
			</div>
		</div>
	);
};

export default Chat;
