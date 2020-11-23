import React from 'react';
import { propTypes, defaultProps, Pictogram, colorMap } from '../Pictogram';
import { useBrand } from '@westpac/core';

export const CashPictogram = ({ mode, ...rest }) => {
	const { COLORS } = useBrand();
	const { outline, highlight } = colorMap(COLORS)[mode];

	return (
		<Pictogram pictogram="CashPictogram" mode={mode} {...rest}>
			<g fill="none" fillRule="evenodd">
				<path
					fill={outline}
					d="M6.499,54.2822 L67.93,54.2822 L67.93,20.5002 L6.499,20.5002 L6.499,54.2822 Z M73.393,22.8152 L73.395,22.7992 C73.395,21.5962 70.33,17.9992 68.25,17.9992 L6.18,17.9992 C4.978,17.9992 4,18.9782 4,20.1802 L4,54.7432 C4,55.7992 6.448,59.3202 8.626,59.7402 C8.76,59.7672 8.898,59.7822 9.04,59.7822 L71.39,59.7822 C72.515,59.7822 73.43,58.8672 73.43,57.7432 L73.43,23.1802 C73.43,23.0552 73.414,22.9342 73.393,22.8152 L73.393,22.8152 Z"
				/>
				<path
					fill={outline}
					d="M11.1311 43.4352C15.7171 43.4352 16.6801 46.5332 16.6801 49.1312 16.6801 49.8222 17.2401 50.3812 17.9301 50.3812L31.0671 50.3812C30.1851 49.6822 29.3801 48.8442 28.6701 47.8812L19.1141 47.8812C18.6861 43.9762 16.2181 41.4532 12.3891 41.0062L12.4401 33.8302C16.2771 33.3882 18.7521 30.8642 19.1801 26.9532L28.6341 26.9532C29.3361 25.9932 30.1311 25.1542 31.0031 24.4532L17.9971 24.4532C17.3061 24.4532 16.7471 25.0122 16.7471 25.7032 16.7471 28.3012 15.7841 31.3992 11.1981 31.3992 10.5111 31.3992 9.9531 31.9542 9.9481 32.6402L9.88107726 42.1762C9.8791 42.5092 10.0091 42.8302 10.2441 43.0662 10.4791 43.3022 10.7981 43.4352 11.1311 43.4352M55.1902 47.8814L45.8452 47.8814C45.1362 48.8444 44.3312 49.6824 43.4482 50.3814L56.3742 50.3814C57.0642 50.3814 57.6242 49.8214 57.6242 49.1314 57.6242 46.5324 58.5862 43.4354 63.1732 43.4354 63.8602 43.4354 64.4182 42.8804 64.4232 42.1944L64.4892504 32.6574C64.4922 32.3244 64.3612 32.0044 64.1262 31.7684 63.8922 31.5314 63.5722 31.3994 63.2392 31.3994 58.6532 31.3994 57.6902 28.3014 57.6902 25.7024 57.6902 25.0124 57.1312 24.4524 56.4402 24.4524L43.5122 24.4524C44.3852 25.1534 45.1802 25.9924 45.8812 26.9524L55.2572 26.9524C55.6852 30.8584 58.1532 33.3814 61.9812 33.8274L61.9312 41.0044C58.0932 41.4454 55.6182 43.9704 55.1902 47.8814"
				/>
				<path
					fill={highlight}
					d="M39.9719,43.2525 C39.6229,43.6645 39.1869,43.9485 38.6719,44.1155 L38.6719,38.9075 C39.2979,39.1385 39.7719,39.4365 40.0759,39.8105 C40.4449,40.2625 40.6299,40.8015 40.6299,41.4265 C40.6299,42.1255 40.4099,42.7335 39.9719,43.2525 M34.8779,33.1485 C34.5789,32.7255 34.4299,32.2655 34.4299,31.7705 C34.4299,31.2295 34.5939,30.7345 34.9199,30.2865 C35.2109,29.8885 35.5969,29.5985 36.0649,29.4065 L36.0649,34.0935 C35.5469,33.8435 35.1469,33.5305 34.8779,33.1485 M42.8409,37.2075 C42.0799,36.3025 40.6849,35.5575 38.6719,34.9685 L38.6719,29.6165 C39.3309,30.0415 39.7649,30.6985 39.9439,31.6165 L43.4839,31.1545 C43.2419,29.7555 42.6819,28.6385 41.8049,27.8035 C41.0129,27.0495 39.9599,26.5775 38.6719,26.3595 L38.6719,24.8985 L38.2649,24.8985 L36.2359,24.8985 L36.0649,24.8985 L36.0649,26.3155 C34.5429,26.4995 33.3089,27.0815 32.3799,28.0835 C31.4139,29.1235 30.9319,30.4085 30.9319,31.9385 C30.9319,33.4495 31.3579,34.7345 32.2119,35.7935 C33.0379,36.8185 34.3259,37.5895 36.0649,38.1115 L36.0649,43.9325 C35.6289,43.6875 35.2269,43.3325 34.8639,42.8545 C34.4539,42.3125 34.1739,41.6685 34.0249,40.9225 L30.3719,41.3145 C30.6519,43.1515 31.2959,44.5745 32.3039,45.5825 C33.2739,46.5525 34.5329,47.1375 36.0649,47.3555 L36.0649,49.9345 L36.2359,49.9345 L38.2649,49.9345 L38.6719,49.9345 L38.6719,47.2445 C40.2949,46.9405 41.5819,46.2585 42.5259,45.1905 C43.5469,44.0335 44.0579,42.6105 44.0579,40.9225 C44.0579,39.4105 43.6519,38.1725 42.8409,37.2075"
				/>
			</g>
		</Pictogram>
	);
};

CashPictogram.defaultProps = {
	...defaultProps,
	viewBoxWidth: 78,
	viewBoxHeight: 78,
	assistiveText: 'Cash',
	copyrightYear: '2020',
};
CashPictogram.propTypes = propTypes;
