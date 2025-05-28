import React from 'react'
import logo from "../assets/logo.png"

const Logo: React.FC = () => {
	return (
		<div>
			<img src={logo} alt="Italian Trulli" width="100" height="100"></img>
		</div>
	)
};

export { Logo }
