import React from 'react';
import { learnMethod } from '/helpers/DataMap';
import { MethodNav } from '/components/BaseStyles/Navbars';

function LearnMethod({ toggleState, toggleTable }) {
	return (
		<MethodNav>
			{Object.keys(learnMethod).map((l, i) => (
				<button
					className={toggleState === i ? 'button_active' : ''}
					onClick={() => toggleTable(i)}
					key={learnMethod[l]}
				>
					<p>{learnMethod[l].replace(/-/g, ' ')}</p>
				</button>
			))}
		</MethodNav>
	);
}

export default LearnMethod;
