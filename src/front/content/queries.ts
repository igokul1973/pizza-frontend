import fragments from "../../graphql/fragments";
import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
	query products($id: ID) {
		Product(id: $id) {
			...ProductPart
			categories {
				name
			}
			createdAt {
				year
				month
				day
				hour
				minute
				second
				formatted
			}
			updatedAt {
				year
				month
				day
				hour
				minute
				second
				formatted
			}
		}
	}
	${fragments.productPart}
`;
