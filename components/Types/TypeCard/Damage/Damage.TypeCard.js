import React from 'react';
import { Subtitle } from '../../../../components/BaseStyles/Headings';
import { Type } from '../../../../components/BaseStyles/Themes';
import { TypeDamageSection, TypeDamageTable } from '../StyledTypeCard';

function Damage({ type }) {
	return (
		<TypeDamageSection>
			<div>
				<Subtitle>Attack</Subtitle>
				<TypeDamageTable>
					<tr>
						<th>No damage to</th>
						{type?.damage_relations?.no_damage_to?.map((ndt) => (
							<td>
								<Type id={ndt.name}>
									<img alt={ndt.name} title={ndt.name} />
								</Type>
							</td>
						))}
					</tr>
					<tr>
						<th>Half damage to</th>
						{type?.damage_relations?.half_damage_to?.map((hdt) => (
							<td>
								<Type id={hdt.name}>
									<img alt={hdt.name} title={hdt.name} />
								</Type>
							</td>
						))}
					</tr>
					<tr>
						<th>Double damage to</th>
						{type?.damage_relations?.double_damage_to?.map((ddt) => (
							<td>
								<Type id={ddt.name}>
									<img alt={ddt.name} title={ddt.name} />
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
							<td>
								<Type id={ndf.name}>
									<img alt={ndf.name} title={ndf.name} />
								</Type>
							</td>
						))}
					</tr>
					<tr>
						<th>Half damage from</th>
						{type?.damage_relations?.half_damage_from?.map((hdf) => (
							<td>
								<Type id={hdf.name}>
									<img alt={hdf.name} title={hdf.name} />
								</Type>
							</td>
						))}
					</tr>
					<tr>
						<th>Double damage from</th>
						{type?.damage_relations?.double_damage_from?.map((ddf) => (
							<td>
								<Type id={ddf.name}>
									<img alt={ddf.name} title={ddf.name} />
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
