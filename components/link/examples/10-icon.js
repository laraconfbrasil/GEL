/** @jsx jsx */

import { GEL, jsx } from '@westpac/core';
import { Link } from '@westpac/link';
import { Body } from '@westpac/body';
import { PdfFileIcon, ArrowRightIcon } from '@westpac/icon';

const ExampleText = ({ link = '' }) => (
	<p>
		Lorem ipsum dolor {link} sit amet consectetur, adipisicing elit. Libero facilis odit voluptate
		reprehenderit laborum numquam ex optio doloribus magni repudiandae vero fugiat iusto tempora
		debitis sunt laboriosam nobis, ut voluptatum?
	</p>
);

function Example({ brand }) {
	return (
		<GEL brand={brand}>
			<h2>Default</h2>
			<Body>
				<Link href="#">Look, I’m a default link</Link>
			</Body>

			<br />
			<hr />

			<h2>Icon before</h2>

			<Body>
				<ExampleText
					link={
						<Link href="#" type="inline" iconBefore={PdfFileIcon}>
							Look, I’m an inline link
						</Link>
					}
				/>
				<Link href="#" type="standalone" iconBefore={PdfFileIcon}>
					Look, I’m a standalone link
				</Link>
			</Body>

			<br />
			<hr />

			<h2>Icon after</h2>

			<Body>
				<ExampleText
					link={
						<Link href="#" type="inline" iconAfter={ArrowRightIcon}>
							Look, I’m an inline link
						</Link>
					}
				/>
				<Link href="#" type="standalone" iconAfter={ArrowRightIcon}>
					Look, I’m a standalone link
				</Link>
			</Body>
		</GEL>
	);
}

export default Example;
