/** @jsx jsx */

import { jsx } from '@westpac/core';
import { TextInput, Textarea, Select } from '@westpac/text-input';

import { Intopia } from '../../../helpers/example/components/Intopia.js';
import { Playground } from '../../../website/src/components/playground/macro';

function Example({ context }) {
	const overridesWithTokens = {};

	overridesWithTokens['@westpac/text-input'] = {
		TextInput: {
			styles: styles => ({
				...styles,
				borderColor: 'palevioletred',
			}),
		},
		Select: {
			styles: styles => ({
				...styles,
				borderColor: 'forestgreen',
			}),
		},
		Textarea: {
			styles: styles => ({
				...styles,
				borderColor: 'royalblue',
			}),
		},
	};

	return (
		<Playground context={context} brand={overridesWithTokens}>
			<Intopia ignore />

			<h2>With overrides applied</h2>
			<TextInput />
			<br />
			<Select name="thing">
				<option>Select</option>
				<option>1</option>
				<option>2</option>
				<option>3</option>
			</Select>
			<br />
			<Textarea />

			<h2>With overrides and component overrides</h2>
			<TextInput
				overrides={{
					TextInput: {
						styles: styles => ({ ...styles, borderWidth: '3px' }),
					},
				}}
			/>
			<br />
			<Select
				name="thing"
				overrides={{
					Select: {
						styles: styles => ({ ...styles, borderWidth: '3px' }),
					},
				}}
			>
				<option>Select</option>
				<option>1</option>
				<option>2</option>
				<option>3</option>
			</Select>
			<br />
			<Textarea
				overrides={{
					Textarea: {
						styles: styles => ({ ...styles, borderWidth: '3px' }),
					},
				}}
			/>
		</Playground>
	);
}

export default Example;
