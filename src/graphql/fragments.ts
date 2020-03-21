import { gql } from "apollo-boost";

const fragments = {
	productPart: gql`
		fragment ProductPart on Product {
			id
			name
			description
			price
			status
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
