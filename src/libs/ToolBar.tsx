interface ToolBarProps {
	children?: React.ReactNode;
}

const ToolBar: React.FC<ToolBarProps> = ({ children }) => {
	return (
		<div
			style={{
				position: 'relative',
				height: '40px',
				margin: '5px 0'
			}}>
			<nav style={{
				height: '40px',
				backgroundColor: '#f6f6f6'
			}}>
				<span style={{ fontSize: '25px', marginRight: '20px' }}>▦</span>
				<div
					style={{
						display: 'inline-flex',
						gap: '16px'
					}}>
					{children}
				</div>
			</nav >
		</div>
	);
};

export default ToolBar;
