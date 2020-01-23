/** @jsx jsx */

import { jsx, useBrand, overrideReconciler } from '@westpac/core';
import { useState, useEffect, useRef, forwardRef } from 'react';
import { useOutsideClick } from '@westpac/hooks';
import PropTypes from 'prop-types';

import {
	ButtonDropdown as BtnDropdownWrapper,
	buttonDropdownStyles,
} from './overrides/buttonDropdown';
import { Panel, panelStyles } from './overrides/panel';
import { Button } from './Button';
import pkg from '../package.json';

// ==============================
// Component
// ==============================
export const ButtonDropdown = ({
	text,
	dropdownSize,
	block,
	children,
	className,
	overrides: componentOverrides,
	...rest
}) => {
	const {
		OVERRIDES: { [pkg.name]: tokenOverrides },
		[pkg.name]: brandOverrides,
	} = useBrand();
	const [open, setOpen] = useState(false);
	const panelRef = useRef();
	const buttonRef = useRef();

	const defaultOverrides = {
		ButtonDropdown: {
			styles: buttonDropdownStyles,
			component: BtnDropdownWrapper,
			attributes: (_, a) => a,
		},
		Panel: {
			styles: panelStyles,
			component: Panel,
			attributes: (_, a) => a,
		},
	};

	const state = {
		open,
		dropdownSize,
		block,
		overrides: componentOverrides,
		...rest,
	};

	const overrides = overrideReconciler(
		defaultOverrides,
		tokenOverrides,
		brandOverrides,
		componentOverrides
	);

	const handleOpen = () => {
		if (open) {
			setOpen(false);
			setTimeout(() => buttonRef.current.focus(), 1);
		} else {
			setOpen(true);
			setTimeout(() => panelRef.current.focus(), 1);
		}
	};

	useOutsideClick(panelRef, () => {
		if (open) {
			setOpen(false);
		}
	});

	// on escape close
	const keyHandler = event => {
		if (open && event.keyCode === 27) handleOpen();
	};

	// bind key events
	useEffect(() => {
		window.document.addEventListener('keydown', keyHandler);
		return () => {
			window.document.removeEventListener('keydown', keyHandler);
		};
	});

	return (
		<overrides.ButtonDropdown.component
			className={className}
			{...overrides.ButtonDropdown.attributes(state)}
			css={overrides.ButtonDropdown.styles(state)}
		>
			<Button
				{...rest}
				ref={buttonRef}
				aria-label="Dropdown. Hit enter to open dropdown"
				aria-haspopup={true}
				onClick={handleOpen}
				dropdown={true}
				block={block}
				overrides={componentOverrides}
			>
				{text}
			</Button>
			<overrides.Panel.component
				ref={panelRef}
				tabIndex="-1"
				aria-label="Use the ESC key to close"
				{...overrides.Panel.attributes(state)}
				css={overrides.Panel.styles(state)}
			>
				{children}
			</overrides.Panel.component>
		</overrides.ButtonDropdown.component>
	);
};

// ==============================
// Types
// ==============================
ButtonDropdown.propTypes = {
	/**
	 * Button text
	 */
	text: PropTypes.string.isRequired,

	/**
	 * Dropdown size
	 */
	dropdownSize: PropTypes.string.isRequired,

	/**
	 * The override API
	 */
	overrides: PropTypes.shape({
		ButtonDropdown: PropTypes.shape({
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

ButtonDropdown.defaultProps = {
	dropdownSize: 'medium',
};