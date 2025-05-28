import React, { useRef, useState } from 'react';

interface SlideZoneProps {
	title: string,
	children: React.ReactNode;
}

const SlideZone: React.FC<SlideZoneProps> = ({ title, children }) => {
	title = title ?? '';
	const offSet: number = 20;
	const [isOpen, setIsOpen] = useState(true);
	const contentRef = useRef<HTMLDivElement>(null);

	const toggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className="bg-light border rounded">
			<div onClick={toggle}
				style={{
					cursor: 'default',
					backgroundColor: '#ffffff',
				}} >
				<span style={{ userSelect: 'none' }}>
					{(isOpen ? ' ⯆ ' : ' ⯈ ') + title}
				</span>
			</div>

			<div
				ref={contentRef}
				style={{
					overflow: 'hidden',
					height: isOpen ? (contentRef.current?.scrollHeight != undefined ? contentRef.current?.scrollHeight + offSet * 2 : 'auto') : 0,
					transition: 'height 0.2s ease',
				}}
			>
				<div
					style={{
						height: isOpen ? `${offSet}px` : '0px',
					}} >
				</div>
				{children}
				<div
					style={{
						height: isOpen ? `${offSet}px` : '0px',
					}} >
				</div>
			</div>
		</div>
	);
};

export default SlideZone;
