/** @jsx jsx */

import {
	jsx,
	useBrand,
	getLabel,
	classNames,
	getModifier,
	styleReconciler,
	formatClassName,
} from '@westpac/core';

import { defaultProps } from '../blender/Tabcordion';

// ==============================
// Component
// ==============================

const AccordionBtn = ({ state: _, ...rest }) => <button type="button" {...rest} />;

const BlenderAccordionBtn = ({ className, ...rest }) => (
	<AccordionBtn className={formatClassName(className)} {...rest} />
);

// ==============================
// Styles
// ==============================

const accordionBtnStyles = (_, { look, hidden, first, last, closed }) => {
	const { COLORS, SPACING, PACKS } = useBrand();
	const styleMap = {
		soft: {
			...(first && {
				borderTopLeftRadius: '0.1875rem',
				borderTopRightRadius: '0.1875rem',
			}),
			...(last
				? {
						borderBottomLeftRadius: closed ? '0.1875rem' : 0,
						borderBottomRightRadius: closed ? '0.1875rem' : 0,
				  }
				: {}),
		},
		lego: {
			borderLeftWidth: '0.375rem',

			// Closed indicator
			'::before': {
				content: '""',
				display: 'block',
				opacity: hidden ? 0 : 1,
				position: 'absolute',
				zIndex: 0,
				top: '-1px',
				left: '-0.375rem',
				bottom: 0,
				borderLeft: `0.375rem solid ${COLORS.hero}`,
				transition: 'opacity 0.3s ease',
			},
		},
	};

	return {
		label: getLabel('tabcordion-accordionBtn'),
		display: 'flex',
		position: 'relative',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		color: COLORS.text,
		backgroundColor: COLORS.light,
		padding: `0.8125rem ${SPACING(3)}`,
		border: `1px solid ${COLORS.border}`,
		borderBottomWidth: !last && closed && 0, //reset
		textAlign: 'left',
		cursor: 'pointer',
		...PACKS.typeScale.bodyFont[9],
		...styleMap[look],
	};
};

// ==============================
// Blender Styles
// ==============================

const blenderStyles = (_, { hidden }) => {
	const props = { hidden };
	const baseStyles = accordionBtnStyles(_, { ...defaultProps, hidden: true });

	let modifiers = getModifier({ ...defaultProps, hidden: true }, props);
	if (!modifiers.length) return baseStyles;

	const modifierStyles = accordionBtnStyles(_, { ...props, look: 'soft' });
	const reconciledStyles = styleReconciler(baseStyles, modifierStyles);

	let label = baseStyles.label;
	const modifier = modifiers[0];

	switch (modifier) {
		case 'hidden':
			if (!hidden) label = `${label}-open`;
			Object.assign(reconciledStyles, {
				['.__convert__tabcordion-accordionBtn-icon']: { transform: 'rotate(180deg)' },
			});
			break;
		default:
			label = `${label}-${modifier}`;
			break;
	}

	return { label, ...reconciledStyles };
};

export const accordionBtnLegoStyles = (_) => {
	const baseStyles = accordionBtnStyles(_, defaultProps);
	const legoStyles = accordionBtnStyles(_, { look: 'lego', hidden: true });
	const openLegoStyles = accordionBtnStyles(_, { look: 'lego', hidden: false });
	const reconLegoStyles = styleReconciler(baseStyles, legoStyles);
	const reconOpenLegoStyles = styleReconciler(baseStyles, openLegoStyles);
	const finalOpenLegoStyles = styleReconciler(reconLegoStyles, reconOpenLegoStyles);

	return {
		[`.__convert__${baseStyles.label}`]: {
			...reconLegoStyles,
			':last-of-type': {
				borderBottomLeftRadius: 0,
				borderBottomRightRadius: 0,
			},
		},
		[`.__convert__${baseStyles.label}-open`]: finalOpenLegoStyles,
	};
};
// ==============================
// Attributes
// ==============================

const accordionBtnAttributes = (_, { tabId, panelId, hidden }) => ({
	id: tabId,
	'aria-controls': panelId,
	'aria-expanded': !hidden,
});

const blenderAttributes = (_, { panelId, hidden }) => ({
	'aria-controls': panelId,
	'aria-expanded': !hidden,
	'data-js': 'tabcordion-accordionBtn__version__',
	className: classNames({ [`__convert__tabcordion-accordionBtn-open`]: !hidden }),
});

// ==============================
// Exports
// ==============================

export const defaultAccordionBtn = {
	component: AccordionBtn,
	styles: accordionBtnStyles,
	attributes: accordionBtnAttributes,
};

export const blenderAccordionBtn = {
	component: BlenderAccordionBtn,
	styles: blenderStyles,
	attributes: blenderAttributes,
};