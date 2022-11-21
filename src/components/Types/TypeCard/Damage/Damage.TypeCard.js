import React from 'react';
import { Subtitle } from '/components/Common/Headings';
import { Type } from '/components/Common/Themes';
import { TypeDamageSection, TypeDamageTable } from '../StyledTypeCard';
import Image from 'next/image';

function Damage({ type }) {
	return (
		<TypeDamageSection>
			<div>
				<Subtitle>Attack</Subtitle>
				<TypeDamageTable>
					<tr>
						<th>No damage to</th>
						{type?.damage_relations?.no_damage_to?.map((ndt) => (
							<td key={ndt.name}>
								<Type id={ndt.name}>
									<Image
										alt={ndt.name}
										title={ndt.name}
										width={32}
										height={32}
									/>
								</Type>
							</td>
						))}
					</tr>
					<tr>
						<th>Half damage to</th>
						{type?.damage_relations?.half_damage_to?.map((hdt) => (
							<td key={hdt.name}>
								<Type id={hdt.name}>
									<Image
										alt={hdt.name}
										title={hdt.name}
										width={32}
										height={32}
									/>
								</Type>
							</td>
						))}
					</tr>
					<tr>
						<th>Double damage to</th>
						{type?.damage_relations?.double_damage_to?.map((ddt) => (
							<td key={ddt.name}>
								<Type id={ddt.name}>
									<Image
										alt={ddt.name}
										title={ddt.name}
										width={32}
										height={32}
									/>
								</Type>
							</td>
						))}
					</tr>
				</TypeDamageTable>
			</div>
			<div>
				<Subtitle>Defense</Subtitle>
				<TypeDamageTable>
					<tr>
						<th>No damage from</th>
						{type?.damage_relations?.no_damage_from?.map((ndf) => (
							<td key={ndf.name}>
								<Type id={ndf.name}>
									<Image
										alt={ndf.name}
										title={ndf.name}
										width={32}
										height={32}
									/>
								</Type>
							</td>
						))}
					</tr>
					<tr>
						<th>Half damage from</th>
						{type?.damage_relations?.half_damage_from?.map((hdf) => (
							<td key={hdf.name}>
								<Type id={hdf.name}>
									<Image
										alt={hdf.name}
										title={hdf.name}
										width={32}
										height={32}
									/>
								</Type>
							</td>
						))}
					</tr>
					<tr>
						<th>Double damage from</th>
						{type?.damage_relations?.double_damage_from?.map((ddf) => (
							<td key={ddf.name}>
								<Type id={ddf.name}>
									<Image
										alt={ddf.name}
										title={ddf.name}
										width={32}
										height={32}
									/>
								</Type>
							</td>
						))}
					</tr>
				</TypeDamageTable>
			</div>
		</TypeDamageSection>
	);
}

export default Damage;