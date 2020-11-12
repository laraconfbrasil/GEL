/** @jsx jsx */

import { jsx, CacheProvider } from '@emotion/core';
import { useState } from 'react';
import createCache from '@emotion/cache';
import 'core-js/features/weak-set';

import { useBrand } from './Brand';
import { reset } from './reset';

const coreLabel = 'core';
const seen = new WeakSet();

const AddRootClass = ({ children }) => {
	let [cache] = useState(() => {
		return createCache({
			stylisPlugins: [
				// Prepend all CSS selectors that are children of the GEL wrapper (Core) with `.GEL` parent class to increase specificity
				(context, content, selectors, parents, line, column, length, id) => {
					if (
						context !== 2 ||
						id === 107 || //@keyframes
						seen.has(selectors) ||
						seen.has(parents) ||
						!selectors.length ||
						selectors[0] === ''
					) {
						return;
					}

					seen.add(selectors);

					// Prepend selector with `.GEL `
					for (let i = 0; i < selectors.length; i++) {
						/**
						 * Don't process the following...
						 * 1. `html` or `body` selectors, possible if styles are passed to Emotion's `<Global />` component within the `<GEL>` wrapper (e.g. <GEL><Global styles={{ 'body': { margin: 0 } }} /></GEL>)
						 * 2. Core components (we don't want to increase Core's specificity)
						 * 3. Selectors already prepended with `.GEL `
						 */
						if (
							!['html', 'body'].includes(selectors[i]) /* 1 */ &&
							!selectors[i].includes(`-${coreLabel}`) /* 2 */ &&
							!selectors[i].includes('.GEL') /* 3 */
						) {
							selectors[i] = `.GEL ${selectors[i]}`;
						}
					}
				},
			],
		});
	});
	return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export const Core = ({ noReset, noPrefix, children }) => {
	const { COLORS, TYPE, PACKS } = useBrand();

	return (
		<div
			className="GEL"
			css={{
				label: coreLabel,
				lineHeight: 1.428571429,
				color: COLORS.text,
				fontFeatureSettings: '"liga" 1', // Enable OpenType ligatures in IE
				...TYPE.bodyFont[400],
				'& *:focus': {
					...PACKS.focus,
				},
				'& button:-moz-focusring, & [type="button"]:-moz-focusring, & [type="reset"]:-moz-focusring, & [type="submit"]:-moz-focusring': {
					// button:focus because of normalize reset (needs higher specificity)
					...PACKS.focus,
				},
				'& ::selection': {
					backgroundColor: COLORS.tints.primary20,
				},
				'&': {
					...(!noReset && reset),
				},
			}}
		>
			{noPrefix ? children : <AddRootClass>{children}</AddRootClass>}
		</div>
	);
};
