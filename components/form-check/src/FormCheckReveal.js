/** @jsx jsx */

import { jsx, useBrand, overrideReconciler } from '@westpac/core';
import { Fragment, useState, useLayoutEffect, useRef, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';

import { defaultFormCheckReveal } from './overrides/formCheckReveal';
import { defaultTrigger } from './overrides/trigger';
import { defaultPanel } from './overrides/panel';

import { FormCheck } from './FormCheck';
import { Option } from './Option';
import pkg from '../package.json';

// ==============================
// Component
// ==============================

export const FormCheckReveal = ({
	show,
	data,
	children,
	overrides: componentOverrides,
	...rest
}) => {
	const {
		OVERRIDES: { [pkg.name]: tokenOverrides },
		[pkg.name]: brandOverrides,
	} = useBrand();

	const [isOpen, setIsOpen] = useState(false);
	const firstNewOptionRef = useRef();

	const defaultOverrides = {
		FormCheckReveal: defaultFormCheckReveal,
		Trigger: defaultTrigger,
		Panel: defaultPanel,
	};

	useLayoutEffect(() => {
		if (isOpen) {
			firstNewOptionRef.current.focus();
		}
	}, [isOpen]);

	const handleOpen = (event) => {
		setIsOpen((currentState) => !currentState);
	};

	const state = {
		show,
		isOpen,
		...rest,
	};

	const {
		FormCheckReveal: {
			component: FormCheckReveal,
			styles: formCheckRevealStyles,
			attributes: formCheckRevealAttributes,
		},
		Trigger: { component: Trigger, styles: triggerStyles, attributes: triggerAttributes },
		Panel: { component: Panel, styles: panelStyles, attributes: panelAttributes },
	} = overrideReconciler(defaultOverrides, tokenOverrides, brandOverrides, componentOverrides);

	let allChildren = [];
	if (data) {
		data.map(({ text, ...rest }, index) => {
			allChildren.push(
				<Option ref={index === show ? firstNewOptionRef : null} key={index} {...rest}>
					{text}
				</Option>
			);
		});
	} else {
		allChildren = Children.map(children, (child, index) => {
			return cloneElement(child, {
				ref: index === show ? firstNewOptionRef : null,
			});
		});
	}

	const revealCount = allChildren.length - show;
	state.revealCount = revealCount;

	return (
		<FormCheckReveal
			{...rest}
			state={state}
			{...formCheckRevealAttributes(state)}
			css={formCheckRevealStyles(state)}
		>
			{show === -1 || revealCount === 0 ? (
				allChildren
			) : (
				<Fragment>
					{allChildren.slice(0, show)}
					<Trigger
						onClick={handleOpen}
						state={state}
						{...triggerAttributes(state)}
						css={triggerStyles(state)}
					/>
					<Panel state={state} {...panelAttributes(state)} css={panelStyles(state)}>
						{allChildren.slice(show)}
					</Panel>
				</Fragment>
			)}
		</FormCheckReveal>
	);
};

FormCheckReveal.propTypes = {
	/**
	 * Show only the given number of Form check options, hide/show toggle the remainder
	 */
	show: PropTypes.number.isRequired,

	/**
	 * Form check item(s)
	 */
	children: PropTypes.node,

	/**
	 * The override API
	 */
	overrides: PropTypes.shape({
		FormCheckReveal: PropTypes.shape({
			styles: PropTypes.func,
			component: PropTypes.elementType,
			attributes: PropTypes.func,
		}),
		Trigger: PropTypes.shape({
			styles: PropTypes.func,
			component: PropTypes.elementType,
			attributes: PropTypes.func,
		}),
		Panel: PropTypes.shape({
			styles: PropTypes.func,
			component: PropTypes.elementType,
			attributes: PropTypes.func,
		}),
	}),
};

export const defaultProps = {
	show: -1,
};

FormCheckReveal.defaultProps = defaultProps;
