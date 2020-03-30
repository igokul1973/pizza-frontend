import gql from "graphql-tag";

const fragments = {
	productPart: gql`
		fragment ProductPart on Product {
			id
			name
			description
			price
			status
			categories {
				name
			}
			imgUrl
		}
	`,
	DateTimePart: gql`
		fragment DateTimePart on _Neo4jDateTime {
			year
			month
			day
			hour
			minute
			second
			formatted
		}
	`
};

export default fragments;
