import { authProviders, configureWunderGraphApplication, cors, introspect, templates } from '@wundergraph/sdk';
import { NextJsTemplate } from '@wundergraph/nextjs/dist/template';
import server from './wundergraph.server';
import operations from './wundergraph.operations';

const spaceX = introspect.graphql({
	apiNamespace: 'spacex',
	url: 'https://spacex-api.fly.dev/graphql/',
});

const rickAndMarty = introspect.graphql({
	apiNamespace: 'rickAndMarty',
	url: 'https://rickandmortyapi.com/graphql',
});

// const department = introspect.graphql({
//     apiNamespace: 'department',
//     url: 'http://54.168.234.74:4000/graphql',
// });


// const db = introspect.mysql({
// 	apiNamespace: 'wundergraph',
// 	databaseURL: 'mysql://root:root@localhost:3306/testdatabase',
// 	introspection: {
// 	  pollingIntervalSeconds: 5,
// 	},
//   })


// configureWunderGraph emits the configuration
configureWunderGraphApplication({
	apis: [spaceX,rickAndMarty],
	server,
	operations,
	codeGenerators: [
		{
			templates: [...templates.typescript.all],
		},
		{
			templates: [new NextJsTemplate()],
			path: '../components/generated',
		},
	],
	cors: {
		...cors.allowAll,
		allowedOrigins: process.env.NODE_ENV === 'production' ? ['https://*'] : ['http://*'],
		/**
		 * Please configure CORS carefully to make sure that your users are protected.
		 * Allowing all origins is usually the worst possible configuration.
		 *
		 * @docs https://docs.wundergraph.com/docs/wundergraph-config-ts-reference/configure-cors
		 */
		// allowedOrigins: process.env.NODE_ENV === 'production' ? ['http://your.app'] : ['http://localhost:3000'],
	},
	authentication: {
		cookieBased: {
			providers: [authProviders.demo()],
			authorizedRedirectUris: ['http://localhost:3000'],
		},
	},
	security: {
		enableGraphQLEndpoint: process.env.NODE_ENV !== 'production',
	},
});
