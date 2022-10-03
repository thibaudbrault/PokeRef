/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { GenNav } from '../../../../components/BaseStyles/Navbars';

function Nav({ setGame }) {
	return (
		<GenNav>
			<ol>
				<li>
					<button>Gen I</button>
					<div>
						<button
							onClick={() => {
								setGame('red');
							}}
						>
							Red
						</button>
						<button
							onClick={() => {
								setGame('blue');
							}}
						>
							Blue
						</button>
						<button
							onClick={() => {
								setGame('yellow');
							}}
						>
							Yellow
						</button>
					</div>
				</li>
				<li>
					<button>Gen II</button>
					<div>
						<button
							onClick={() => {
								setGame('gold');
							}}
						>
							Gold
						</button>
						<button
							onClick={() => {
								setGame('silver');
							}}
						>
							Silver
						</button>
						<button
							onClick={() => {
								setGame('crystal');
							}}
						>
							Crystal
						</button>
					</div>
				</li>
				<li>
					<button>Gen III</button>
					<div>
						<button
							onClick={() => {
								setGame('ruby');
							}}
						>
							Ruby
						</button>
						<button
							onClick={() => {
								setGame('sapphire');
							}}
						>
							Sapphire
						</button>
						<button
							onClick={() => {
								setGame('emerald');
							}}
						>
							Emerald
						</button>
						<button
							onClick={() => {
								setGame('firered');
							}}
						>
							Fire Red
						</button>
						<button
							onClick={() => {
								setGame('leafgreen');
							}}
						>
							Leaf Green
						</button>
					</div>
				</li>
				<li>
					<button>Gen IV</button>
					<div>
						<button
							onClick={() => {
								setGame('diamond');
							}}
						>
							Diamond
						</button>
						<button
							onClick={() => {
								setGame('pearl');
							}}
						>
							Pearl
						</button>
						<button
							onClick={() => {
								setGame('platinum');
							}}
						>
							Platinum
						</button>
						<button
							onClick={() => {
								setGame('heartgold');
							}}
						>
							Heart Gold
						</button>
						<button
							onClick={() => {
								setGame('soulsilver');
							}}
						>
							Soul Silver
						</button>
					</div>
				</li>
				<li>
					<button>Gen V</button>
					<div>
						<button
							onClick={() => {
								setGame('black');
							}}
						>
							Black
						</button>
						<button
							onClick={() => {
								setGame('white');
							}}
						>
							White
						</button>
						<button
							onClick={() => {
								setGame('black-2');
							}}
						>
							Black 2
						</button>
						<button
							onClick={() => {
								setGame('white-2');
							}}
						>
							White 2
						</button>
					</div>
				</li>
				<li>
					<button>Gen VI</button>
					<div>
						<button
							onClick={() => {
								setGame('x');
							}}
						>
							X
						</button>
						<button
							onClick={() => {
								setGame('y');
							}}
						>
							Y
						</button>
						<button
							onClick={() => {
								setGame('omega-ruby');
							}}
						>
							Omega Ruby
						</button>
						<button
							onClick={() => {
								setGame('alpha-sapphire');
							}}
						>
							Alpha Sapphire
						</button>
					</div>
				</li>
				<li>
					<button>Gen VII</button>
					<div>
						<button
							onClick={() => {
								setGame('sun');
							}}
						>
							Sun
						</button>
						<button
							onClick={() => {
								setGame('moon');
							}}
						>
							Moon
						</button>
						<button
							onClick={() => {
								setGame('ultra-sun');
							}}
						>
							Ultra Sun
						</button>
						<button
							onClick={() => {
								setGame('ultra-moon');
							}}
						>
							Ultra Moon
						</button>
						<button
							onClick={() => {
								setGame('lets-go-pikachu');
							}}
						>
							Let's Go Pikachu
						</button>
						<button
							onClick={() => {
								setGame('lets-go-eevee');
							}}
						>
							Let's Go Eevee
						</button>
					</div>
				</li>
				<li>
					<button>Gen VIII</button>
					<div>
						<button
							onClick={() => {
								setGame('sword');
							}}
						>
							Sword
						</button>
						<button
							onClick={() => {
								setGame('shield');
							}}
						>
							Shield
						</button>
					</div>
				</li>
			</ol>
		</GenNav>
	);
}

export default Nav;
