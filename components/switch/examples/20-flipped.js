/** @jsx jsx */

import { jsx } from '@westpac/core';
import { Switch } from '@westpac/switch';

import { Intopia } from '../../../helpers/example/components/Intopia.js';
import { Playground } from '../../../website/src/components/playground/macro';

function Example({ context }) {
	return (
		<Playground context={context}>
			<Intopia />

			<Switch name="example-flipped" label="Turn notifications" flipped />
		</Playground>
	);
}

export default Example;
