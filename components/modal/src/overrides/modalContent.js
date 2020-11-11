/** @jsx jsx */

import { jsx, getLabel, formatClassName } from '@westpac/core';

// ==============================
// Component
// ==============================

const ModalContent = ({ state: _, ...rest }) => <div {...rest} />;

const BlenderModalContent = ({ state, className, ...rest }) => (
	<div className={formatClassName(className)} {...rest} />
);

// ==============================
// Styles
// ==============================

const modalContentStyles = () => ({
	label: getLabel('modal-content'),
	position: 'relative',
	backgroundColor: '#fff',
	borderRadius: '0.1875rem',
	boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
	pointerEvents: 'auto',
});

// ==============================
// Attributes
// ==============================

const modalContentAttributes = () => null;

// ==============================
// Exports
// ==============================

export const defaultModalContent = {
	component: ModalContent,
	styles: modalContentStyles,
	attributes: modalContentAttributes,
};

export const blenderModalContent = {
	component: BlenderModalContent,
	styles: modalContentStyles,
	attributes: modalContentAttributes,
};
