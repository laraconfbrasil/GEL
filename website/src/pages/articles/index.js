/** @jsx jsx */

import { jsx, useMediaQuery } from '@westpac/core';

import {
	CustomRenderer,
	Wrapper,
	Hero,
	ActionBar,
	Footer,
	Container,
	Grid,
} from '../../components/article';
import { PageContextProvider } from '../../components/providers/pageContext';
import { Footer as StickyFooter } from '../../components/layout/footer.js';
import { Head } from '../../components/head';

import { getApolloClient } from '../../apollo';
import { gql } from '@apollo/client';

const Home = ({ content }) => {
	const mq = useMediaQuery();
	return (
		<Wrapper>
			<Head title="Articles" />
			<PageContextProvider>
				<main css={{ paddingBottom: '3.0625rem' }}>
					<Hero />
					<ActionBar />
					<Container
						css={mq({
							marginTop: ['1.875rem', '2.25rem', '3rem', '3.375rem', '3.75rem'],
						})}
					>
						<Grid>{content?.document ? <CustomRenderer document={content.document} /> : null}</Grid>
					</Container>
					<Footer />
				</main>
				<StickyFooter type="article" />
			</PageContextProvider>
		</Wrapper>
	);
};

export async function getServerSideProps({ req, res }) {
	res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

	const client = getApolloClient();

	const queryRes = await client.query({
		query: gql`
			query article($url: String!) {
				articles(where: { url: { equals: $url } }) {
					id
					content {
						document(hydrateRelationships: true)
					}
				}
			}
		`,
		variables: {
			url: '/home',
		},
	});

	const homeArticle = queryRes?.data?.articles[0] || null;
	const content = homeArticle?.content || null;
	return {
		props: {
			content,
		},
	};
}

export default Home;
