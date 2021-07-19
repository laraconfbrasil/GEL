/** @jsx jsx */

import { jsx } from '@westpac/core';
import { Fragment } from 'react';
import { Form, FormGroup, Field, Fieldset, InputCluster, Item } from '@westpac/form';
import { Autocomplete } from '@westpac/autocomplete';
import { components } from 'react-select';
import { TextInput } from '@westpac/text-input';
import { Link, Container } from './_utils';
import { Playground } from '../../../../website/src/components/playground/macro';

const Footer = (props) => (
	<Fragment {...props}>
		Can't find your country? <Link>Enter it manually</Link>
	</Fragment>
);

const Input = ({ autoComplete, options, ...props }) => (
	<components.Input {...props} autoComplete="country" />
);

const Demo = ({ context, showCode, showDemo }) => {
	return (
		<Playground context={context} showCode={showCode} showDemo={showDemo}>
			<Container>
				<Form spacing="large">
					<FormGroup>
						<Fieldset legend="Street">
							<InputCluster>
								<Item>
									<Field hideLabel label="Line 1 of 2">
										<TextInput size="large" autocomplete="street address-line1" />
									</Field>
								</Item>
								<Item>
									<Field hideLabel label="Line 2 of 2">
										<TextInput size="large" autocomplete="street address-line2" />
									</Field>
								</Item>
							</InputCluster>
						</Fieldset>
					</FormGroup>
					<FormGroup>
						<Field label="City, town or suburb">
							<TextInput size="large" width={20} autocomplete="address-level2" />
						</Field>
					</FormGroup>
					<FormGroup>
						<Field label="State, province or region">
							<TextInput size="large" width={20} autocomplete="address-level1" />
						</Field>
					</FormGroup>
					<FormGroup>
						<Field label="Postcode or Zip code">
							<TextInput size="large" width={5} autocomplete="postal-code" />
						</Field>
					</FormGroup>
					<FormGroup>
						<Field
							label="Search for your country"
							hint="Start typing your country and select from the list"
						>
							<Autocomplete
								size="large"
								footer={Footer}
								noOptionsMessage={() => 'None found'}
								components={{ Input }}
								options={[
									{ value: '', label: 'United States' },
									{ value: '', label: 'China' },
									{ value: '', label: 'Japan' },
									{ value: '', label: 'Germany' },
									{ value: '', label: 'India' },
									{ value: '', label: 'United Kingdom' },
									{ value: '', label: 'France' },
									{ value: '', label: 'Italy' },
									{ value: '', label: 'Brazil' },
									{ value: '', label: 'Canada' },
									{ value: '', label: 'Russia' },
									{ value: '', label: 'South Korea' },
									{ value: '', label: 'Australia' },
									{ value: '', label: 'Spain' },
									{ value: '', label: 'Mexico' },
									{ value: '', label: 'Indonesia' },
									{ value: '', label: 'Netherlands' },
									{ value: '', label: 'Saudi Arabia' },
									{ value: '', label: 'Turkey' },
									{ value: '', label: 'Switzerland' },
									{ value: '', label: 'Poland' },
									{ value: '', label: 'Thailand' },
									{ value: '', label: 'Sweden' },
									{ value: '', label: 'Belgium' },
									{ value: '', label: 'Nigeria' },
								]}
							/>
						</Field>
					</FormGroup>
				</Form>
			</Container>
		</Playground>
	);
};

export default Demo;
