/** @jsx jsx */

import { jsx, useBrand, useMediaQuery } from '@westpac/core';
import { blenderReconciler } from './_utils';

// ==============================
// Component
// ==============================
const Header = ({ state, ...rest }) => <div {...rest} />;

// ==============================
// Styles
// ==============================

const PANEL_HEADER = 'panel-header';

const baseStyles = () => {
	return {
		label: PANEL_HEADER,
		padding: ['0.625rem 0.75rem', null, '0.625rem 1.5rem'],
		borderBottom: '1px solid',
		borderTopRightRadius: `calc(0.1875rem - 1px)`,
		borderTopLeftRadius: `calc(0.1875rem - 1px)`,
		'@media print': {
			borderBottom: '1px solid #000',
		},
	};
};

// Shared styling to also be used by a parent component to create modifier classes
export const headerStyleMap = () => {
	const { COLORS } = useBrand();
	return {
		label: PANEL_HEADER,
		hero: {
			backgroundColor: COLORS.hero,
			borderBottom: `1px solid ${COLORS.hero}`,
			color: '#fff',
		},
		faint: {
			backgroundColor: COLORS.background,
			borderBottom: `1px solid ${COLORS.border}`,
			color: COLORS.text,
		},
	};
};

const headerStyles = (_, { look }) => {
	const mq = useMediaQuery();
	const styleMap = headerStyleMap();

	return mq({
		...baseStyles(),
		...styleMap[look],
	})[0];
};

export const blenderStyles = () => blenderReconciler(baseStyles());

// ==============================
// Attributes
// ==============================

const headerAttributes = () => null;

// ==============================
// Exports
// ==============================

export const defaultHeader = {
	component: Header,
	styles: headerStyles,
	attributes: headerAttributes,
};

export const blenderHeader = {
	component: Header,
	styles: blenderStyles,
	attributes: headerAttributes,
};
