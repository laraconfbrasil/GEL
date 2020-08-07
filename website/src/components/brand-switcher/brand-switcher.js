/** @jsx jsx */

import { jsx, useBrand } from '@westpac/core';
import { forwardRef, useState } from 'react';
import { ExpandMoreIcon, ExpandLessIcon } from '@westpac/icon';
import { Button } from '@westpac/button';
import { ButtonDropdown } from '@westpac/button-dropdown';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { BASE_URL } from '../../config';
import { useBrandSwitcher } from '../providers/brand-switcher';
import { useSidebar } from '../providers/sidebar';
import {
	BOMLogo,
	BSALogo,
	STGLogo,
	WBCLogo,
	WBGLogo,
	BOMShieldLogo,
	BSAStackedLogo,
	STGDragonLogo,
} from '@westpac/symbol';

export const brandsMap = {
	WBC: {
		logo: WBCLogo,
		label: 'Westpac',
		smallLogo: WBCLogo,
	},
	STG: {
		logo: STGLogo,
		label: 'St.George',
		smallLogo: STGDragonLogo,
	},
	BOM: {
		logo: BOMLogo,
		label: 'Bank of Melbourne',
		smallLogo: BOMShieldLogo,
	},
	BSA: {
		logo: BSALogo,
		label: 'BankSA',
		smallLogo: BSAStackedLogo,
	},
	WBG: {
		logo: WBGLogo,
		label: 'Westpac Group',
		smallLogo: WBCLogo,
	},
};

const ButtonIconOverride = ({ state, icon: Icon, left, right, color, ...rest }) => {
	const { COLORS } = useBrand();
	return (
		<span
			css={{
				borderLeft: `1px solid ${COLORS.border}`,
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				marginLeft: '0.4em',
			}}
		>
			<Icon color="primary" {...rest} />
		</span>
	);
};

const ButtonOverride = forwardRef(({ state, children, ...rest }, ref) => {
	const { COLORS, PACKS } = useBrand();
	/* const {
		state: { open },
	} = useButtonDropdownContext(); */
	const open = false;
	return (
		<Button
			ref={ref}
			look="link"
			size="xlarge"
			iconAfter={open ? ExpandLessIcon : ExpandMoreIcon}
			block
			justify
			overrides={{
				Icon: {
					component: ButtonIconOverride,
					styles: (styles) => ({
						...styles,
						marginLeft: '1.5rem',
					}),
				},
			}}
			{...rest}
		>
			{children}
		</Button>
	);
});

export const BrandSwitcher = () => {
	const brandName = useRouter().query.b || '';
	const { brand, setBrand } = useBrandSwitcher();
	const [open, setOpen] = useState(false);
	const { isScrolled } = useSidebar();
	const { SPACING, COLORS, PACKS, TYPE } = useBrand();
	const Logo = brandsMap[brand].logo;

	const handleClick = (brand) => {
		setOpen(false);
		setBrand(brand);
	};

	const OptionButton = ({ brand, active, ...rest }) => {
		return (
			<button
				type="button"
				onClick={() => handleClick(brand)}
				css={{
					appearance: 'none',
					whiteSpace: 'nowrap',
					cursor: 'pointer',
					lineHeight: 1.5,
					touchAction: 'manipulation',
					userSelect: 'none',
					boxSizing: 'border-box',
					backgroundColor: 'transparent',
					border: 0,
					fontSize: '0.875rem !important',
					color: active ? COLORS.primary : COLORS.text,
					display: 'flex',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'space-between',
					height: '3.75rem',
					padding: '10px 18px 10px 18px',
					...(active && TYPE.bodyFont[700]),
					':hover, :focus': {
						backgroundColor: COLORS.background,
					},
					':focus': {
						outlineOffset: `-${PACKS.focus.outlineWidth}`,
					},
				}}
				{...rest}
			/>
		);
	};

	const BrandList = (props) => {
		return (
			//a11y: as we're using `list-style:none` CSS, we need `role="list"` for VoiceOver to announce this as a list (see https://unfetteredthoughts.net/2017/09/26/voiceover-and-list-style-type-none/)
			<ul role="list" css={{ paddingLeft: 0, listStyle: 'none', margin: 0 }} {...props}>
				{Object.entries(brandsMap).map(([key, val]) => (
					<li key={key} css={{ borderTop: `1px solid ${COLORS.border}` }}>
						<OptionButton brand={key} active={brandName === key}>
							<span css={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{val.label}</span>
							<val.smallLogo css={{ width: 50, height: 39, marginLeft: '0.4em' }} />
						</OptionButton>
					</li>
				))}
			</ul>
		);
	};

	return (
		<div
			css={{
				borderBottom: !isScrolled && `1px solid ${COLORS.border}`,
				boxShadow: isScrolled && '0 2px 5px rgba(0,0,0,0.26)',
				position: 'relative',
				zIndex: 1, //ensure shadow is above nav list item with :hover bg effect
				transition: 'box-shadow 0.2s',
			}}
		>
			<Link href={'/'} as={`${BASE_URL}?b=${brandName}`} passHref>
				<a
					css={{
						display: 'flex',
						alignItems: 'center',
						height: 90,
						paddingLeft: SPACING(3),
						paddingRight: SPACING(3),
						background: '#fff',
						':focus': {
							outlineOffset: `-${PACKS.focus.outlineWidth}`,
						},
					}}
				>
					<Logo />
				</a>
			</Link>
			<ButtonDropdown
				open={open}
				block
				text="Change brand"
				dropdown={false}
				overrides={{
					Button: {
						component: ButtonOverride,
						styles: () => ({
							textDecoration: 'none',
							color: COLORS.text,
							backgroundColor: '#fff',
							fontSize: '0.875rem',
							padding: '0 1.5rem 0 1.125rem',
							height: '4.125rem',
							position: 'relative',
							zIndex: 2,
							':hover': {
								textDecoration: 'none !important',
							},
							':focus': {
								outlineOffset: `-${PACKS.focus.outlineWidth}`,
							},
						}),
					},
					Panel: {
						styles: (styles) => ({
							...styles,
							borderRadius: 0,
							border: 0,
							boxShadow: '0 2px 5px rgba(0,0,0,0.26)',
							margin: 0,
							padding: 0,
							zIndex: 1,
						}),
					},
				}}
			>
				<BrandList />
			</ButtonDropdown>
		</div>
	);
};
