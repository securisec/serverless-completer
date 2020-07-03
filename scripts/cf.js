const $ = require('cheerio');
const Axios = require('axios').default;
const path = require('path');
const { writeFileSync } = require('fs');

let basePath = 'AWS_ApiGateway.html';

const baseURL =
	'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/';
let name = basePath.match(/_(\w+)\./)[1].toLowerCase()

var hold = {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: `cf${name}`,
	description: `CF ${name}`,
	properties: {
		Type: {
			type: 'string',
			enum: [],
		},
	},
	anyOf: [],
};

let typeProperties = (t, p, desc) => {
	let r = {
		if: { properties: { Type: { const: t } } },
		then: {
			properties: {
				Properties: {
					description: path.join(baseURL, desc),
					type: 'object',
					properties: p,
				},
			},
		},
	};
	return r;
};

const makeRequest = (bpath) => {
	let url =
		'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/' + bpath;
	return Axios.get(url)
		.then((res) => {
			return res.data;
		})
		.catch(console.log);
};

let getData = makeRequest(basePath)
	.then((data) => {
		let match = $('.listitem>p>a', data).get();
		return Promise.all(
			match.map((item) => {
				let t = $(item);
				hold.properties.Type.enum.push(t.text());
				let pUrl = t.attr('href');
				return makeRequest(pUrl)
					.then((newdata) => {
						let holdProperties = {};
						let pType = $($('.variablelist', newdata)[0]);
						$('.term>.code', pType).map((i, elem) => {
							let propertyName = $(elem).text();
							holdProperties[propertyName] = {};
						});
						hold.anyOf.push(typeProperties(t.text(), holdProperties, pUrl));
					})
					.catch((err) => {
						console.log(err);
						throw err;
					});
			})
		);
	})
	.catch(console.log);

getData
	.then(() => {
		console.log(JSON.stringify(hold, null, 2));
		let wp = path.resolve(__dirname, `../schemas/aws/cf/${name}.json`);
		writeFileSync(wp, JSON.stringify(hold), { flag: 'w' });
		console.log(wp);
	})
	.catch(console.log);
