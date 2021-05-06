import React from 'react';
import { getColors } from '../_utils';
import { propTypes, defaultProps, Pictogram } from '../Pictogram';

export const GlobeAustraliaPictogram = ({ mode, ...rest }) => {
	const { outline, highlight } = getColors(mode);

	return (
		<Pictogram pictogram="GlobeAustraliaPictogram" mode={mode} {...rest}>
			<g fill="none" fillRule="evenodd">
				<path
					fill={outline}
					d="M38.718 5.9c11.398 0 21.429 5.947 27.17 14.895a32.104 32.104 0 0 1 6.271 19.088c0 17.792-14.474 32.267-32.266 32.267-11.404 0-21.437-5.95-27.177-14.903A32.093 32.093 0 0 1 6.45 38.168C6.45 20.375 20.926 5.9 38.718 5.9zm0 2.502a29.95 29.95 0 0 0-3.445.198c1.258 2.395.558 3.37-2.097 2.926-4.379-.733 1.43 5.243-4.882 5.48-6.312.238-3.876 9.16-7.503 9.16-2.343 0-4.392-1.828-6.148-5.485A29.605 29.605 0 0 0 8.95 38.169c0 12.215 7.397 22.736 17.946 27.32.832-.017 1.655.05 1.855.17.836.506.08-3.023 1.48-3.023 1.398 0 8.62-2.14 10.668-1.07s6.245 3.527 4.557 3.81c-1.506.253-2.599.617-.363 1.873 13.36-2.926 23.393-14.854 23.393-29.08 0-16.414-13.355-29.767-29.768-29.767z"
				/>
				<path
					fill={highlight}
					d="M48.413 58.1c-1.043.698-3.175-.013-4.258-1.791-1.082-1.779-.787-2.767-1.378-3.162-.59-.395-.393-.395-.984 0-.59.395-.984.296-1.87-.593-.886-.889-1.575-1.284-2.756-1.284-1.18 0-1.574-.297-3.149.494-1.575.79-2.165 2.075-3.15 2.075-.984 0-2.165-.1-2.854.395-.689.494-.196.79-1.18.79-.985 0-1.87-1.284-1.674-2.667.197-1.384-1.28-3.26-1.968-4.15-.69-.89-1.87-3.853.197-5.533 2.066-1.68 4.822-1.976 5.314-2.865.492-.89.492.24.69-1.482.196-1.723 1.476-.89 1.968-1.878.492-.988 1.574-2.569 2.263-2.173.69.395 1.181 1.086 1.575.889.394-.198.394-.395.689-.89.295-.493 1.083-1.58 2.559-1.778 1.404-.188 2.362-.197 3.392.254 1.03.451.446.734-.243 1.722-.689.988.197 1.581.886 1.779.69.197 2.362 2.173 3.051 1.778.69-.395 1.476-1.58 1.476-2.47 0-.89.394-3.162.394-3.458 0-.296.492-1.087 1.181 1.482.69 2.569 1.224 1.684 1.673 2.668.45.984.492.988.492 2.075 0 1.086 2.166 3.853 2.658 4.347.492.494 3.445 4.545 2.46 6.719-.984 2.173-2.46 4.15-3.444 6.125-.985 1.976-2.967 1.884-4.01 2.582zm.399 2.255c.487-.232.88.163.684.537-.197.374-.534 1.034-.684 1.034-.15 0-.329.13-.329.42s-.416.292-.587.146c-.171-.146-.571-1.16-.477-1.474.048-.16-.377-.585-.128-.858.25-.274 1.033.427 1.52.195z"
				/>
				<path
					fill={outline}
					d="M31.202 21.84c-1.642-1.098-6.242 2.463-6.242 4.27 0 1.807 2.331 3.4 3.326 2.629.994-.77 4.56-5.803 2.916-6.9zm-1.684 11.498c.802-.555-5.582-1.86-7.97-4.427-1.858-1.998-1.886-2.01-2.928-1.288-.96.664 3.128 7.61 10.898 5.715zm23.128-8.967c3.08 0 2.167 4.23 1.844 4.579-.323.35-5.177.657-6.326 0-1.15-.657-1.65-2.772-2.978-2.772-1.329 0-6.158-2.359-7.207-4.107-1.05-1.748 11.588 2.3 14.667 2.3zm9.919 25.345c-.01.888-.172 2.876-1.309 3.188-.794.217.145 1.72.549 1.296.744-.781 1.842-1.08 1.405-3.157-.438-2.077-.641-1.758-.645-1.327zM60.01 53.83c-.297.304-.774.902-1.08 1.027-.57.233-1.54.679-2.004.679-.464 0-1.009.543-1.316.908-.307.366.094.9.473.9.38 0 1.632-.124 1.732-.687.1-.563.85-.894 1.116-.894.266 0 1.15-.976 1.491-1.185.342-.21-.341-.823-.413-.749zM32.48 25.485c.343-1.079 1.48.915 2.116 1.701.636.787 0 .787-1.484.787-.884 0-1.268-.128-1.46-.178-.51-.132.484-1.232.828-2.31z"
				/>
			</g>
		</Pictogram>
	);
};

GlobeAustraliaPictogram.defaultProps = {
	...defaultProps,
	viewBoxWidth: 78,
	viewBoxHeight: 78,
	assistiveText: 'Globe showing Australia',
	copyrightYear: '2021',
};
GlobeAustraliaPictogram.propTypes = propTypes;