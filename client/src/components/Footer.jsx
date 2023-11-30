import React from "react";

const Footer = () => {
	return (
		<div className="py-4 w-full mx-auto flex  items-center justify-center flex-wrap text-center text-sm text-gray-400 ">
			©2023 <strong className="mx-1">Aseem Gupta</strong> Retain all rights over
			the site and its content.
			<span className="hidden lg:block text-gray-400 text-xs ml-2">
				ChatGPT can make mistakes. Consider checking important information.
			</span>
		</div>
	);
};

export default Footer;
