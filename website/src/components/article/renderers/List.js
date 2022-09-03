/** @jsx jsx */

import { jsx, useBrand, useMediaQuery } from '@westpac/core';
import { Cell } from '@westpac/grid';
import { List as GELList } from '@westpac/list';
import merge from 'lodash.merge';

export const List = (props) => {
	const {
		GEL: { COLORS },
	} = useBrand();
	const mq = useMediaQuery();
	return (
		<Cell width={[12, 10, 8]} left={[1, 2, null, 3]}>
			<GELList
				overrides={{
					List: {
						styles: (styles, { type }) =>
							merge({}, styles, {
								...mq({
									...styles,
									marginBottom: ['2.635rem', '3.375rem'],
									'> li::before': {
										...(type === 'bullet' && { backgroundColor: COLORS.icon }),
										borderColor: COLORS.icon,
									},
								})[0],
							}),
					},
				}}
				{...props}
			/>
		</Cell>
	);
};