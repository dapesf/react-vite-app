import { Link } from 'react-router-dom'
import React from 'react'
import { Logo } from '../libs/Logo'
import style from './css/SideBar.module.css'

const SideBar: React.FC = () => {
	const sectionStyle: React.CSSProperties = {
		marginBottom: '2rem',
	}

	const titleStyle: React.CSSProperties = {
		fontSize: '0.9rem',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: '#bdc3c7',
		marginBottom: '0.5rem',
	}

	const linkStyle: React.CSSProperties = {
		display: 'block',
		color: '#ecf0f1',
		textDecoration: 'none',
		padding: '0.3rem 0.5rem',
		borderRadius: '4px',
		marginBottom: '0.3rem',
	}

	return (
		<div className={style['side-container']}>
			<Logo></Logo>

			{/* Thao tác chính */}
			<div style={sectionStyle}>
				<div style={titleStyle}>Thao tác chính</div>
				<Link to="/" style={linkStyle}>Dashboard</Link>
				<Link to="/reports" style={linkStyle}>Reports</Link>
			</div>

			{/* Các Master */}
			<div style={sectionStyle}>
				<div style={titleStyle}>Các Master</div>
				<Link to="/" style={linkStyle}>User Master</Link>
				<Link to="/products" style={linkStyle}>Product Master</Link>
			</div>
		</div>
	)
}

export { SideBar }
