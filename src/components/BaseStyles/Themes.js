import styled from 'styled-components';

export const lightTheme = {
	main: '#c4c4c4',
	secondary: '#161616',
	red: '#cc0000',
	purple: '#5e318f',
	background:
		'url("https://www.transparenttextures.com/patterns/asfalt-light.png")',
};

export const darkTheme = {
	main: '#161616',
	secondary: '#c4c4c4',
	red: '#cc0000',
	purple: '#5e318f',
	background:
		'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
};



export const Type = styled.div`
	&#normal {
		background-color: #969592;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/normal.png);
		}
	}

	&#fire {
		background-color: #db4249;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/fire.png);
		}
	}

	&#water {
		background-color: #55b8e2;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/water.png);
		}
	}

	&#grass {
		background-color: #459f4d;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/grass.png);
		}
	}

	&#electric {
		background-color: #dbb508;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/electric.png);
		}
	}

	&#ice {
		background-color: #6db5ba;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/ice.png);
		}
	}

	&#fighting {
		background-color: #d77a49;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/fighting.png);
		}
	}

	&#poison {
		background-color: #82549a;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/poison.png);
		}
	}

	&#ground {
		background-color: #9a5e41;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/ground.png);
		}
	}

	&#flying {
		background-color: #5983ef;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/flying.png);
		}
	}

	&#psychic {
		background-color: #e76e9a;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/psychic.png);
		}
	}

	&#bug {
		background-color: #9eb559;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/bug.png);
		}
	}

	&#rock {
		background-color: #a28d79;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/rock.png);
		}
	}

	&#ghost {
		background-color: #a2729a;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/ghost.png);
		}
	}

	&#dark {
		background-color: #555461;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/dark.png);
		}
	}

	&#dragon {
		background-color: #1085a2;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/dragon.png);
		}
	}

	&#steel {
		background-color: #7d879a;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/steel.png);
		}
	}

	&#fairy {
		background-color: #ef9bb6;
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/fairy.png);
		}
	}
`;

export const DamageClass = styled.td`
	text-transform: capitalize;
	&#physical {
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/seals/home/move-physical.png);
		}
	}

	&#special {
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/seals/home/move-special.png);
		}
	}

	&#status {
		img {
			content: url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/seals/home/move-status.png);
		}
	}
`;
