/** @jsx jsx */

import { jsx } from '@westpac/core';
import {
	MastercardAcceptedSymbol,
	BPayLandSymbol,
	AppleStoreSymbol,
	WBCLogo,
	STGLogo,
} from '@westpac/symbol';
import { Cell, Grid, Name } from './_utils';
import { Fragment } from 'react';

import { Intopia } from '../../../helpers/example/components/Intopia.js';
import { Playground } from '../../../website/src/components/playground/macro';

const Wrapper = ({ children, symbol, assistiveText, viewBoxWidth, viewBoxHeight, ...rest }) => (
	<Fragment>
		<div {...rest}>{children}</div>
		<div css={{ marginBottom: '1rem' }}>
			<Name>{symbol}</Name>
		</div>
	</Fragment>
);

function Example({ context }) {
	const overridesWithTokens = {};
	overridesWithTokens['@westpac/symbol'] = {
		Symbol: {
			styles: styles => ({
				...styles,
				outline: '1px solid red',
			}),
			component: Wrapper,
		},
	};

	return (
		<Playground context={context} brand={overridesWithTokens}>
			<Intopia ignore />

			<h2>With overrides applied</h2>
			<Grid>
				<Cell>
					<MastercardAcceptedSymbol />
				</Cell>
				<Cell>
					<BPayLandSymbol />
				</Cell>
				<Cell>
					<AppleStoreSymbol />
				</Cell>
				<Cell>
					<WBCLogo />
				</Cell>
				<Cell>
					<STGLogo />
				</Cell>
			</Grid>

			<h2>With overrides and component overrides</h2>
			<MastercardAcceptedSymbol
				overrides={{
					Svg: {
						styles: styles => ({
							...styles,
							outline: '3px dotted green',
						}),
					},
				}}
			/>
		</Playground>
	);
}

export default Example;
