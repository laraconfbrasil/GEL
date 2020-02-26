/** @jsx jsx */

import { jsx } from '@westpac/core';
import { Switch } from '@westpac/switch';

import { Intopia } from '../../../helpers/example/components/Intopia.js';
import { Playground } from '../../../website/src/components/playground/macro';

function Example({ context }) {
	return (
		<Playground context={context}>
			<Intopia />

			<Switch
				name="example-toggletext"
				label="This example uses custom Yes/No toggle text"
				toggleText={['Yes', 'No']}
			/>
			<Switch name="no-toggletext" label="Pass an empty array for no toggle text" toggleText={[]} />
		</Playground>
	);
}

export default Example;
