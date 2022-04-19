import React from 'react';
import { MethodNav } from '../BaseStyles/Navbars';

function Method({ toggleState, toggleTable }) {
	return (
		<MethodNav>
			<button
				className={toggleState === 1 ? 'button_active' : ''}
				onClick={() => toggleTable(1)}
			>
				<p>Level Up</p>
			</button>
			<button
				className={toggleState === 2 ? 'button_active' : ''}
				onClick={() => toggleTable(2)}
			>
				<p>TM /HM</p>
			</button>
			<button
				className={toggleState === 3 ? 'button_active' : ''}
				onClick={() => toggleTable(3)}
			>
				<p>Egg</p>
			</button>
			<button
				className={toggleState === 4 ? 'button_active' : ''}
				onClick={() => toggleTable(4)}
			>
				<p>Tutor</p>
			</button>
		</MethodNav>
	);
}

export default Method;
