import React from 'react';
import { learnMethod } from './DataMap';
import { MethodNav } from '../components/Common/Navbars';

type Props = {
	toggleState: number;
	toggleTable: (i: number) => {};
}

function LearnMethod({ toggleState, toggleTable }: Props) {
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
