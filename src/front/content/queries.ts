import fragments from "../../graphql/fragments";
import gql from "graphql-tag";

export type TGetProductVariables = {
	id?: string;
	filter?: any;
};

export const GET_PRODUCTS = gql`
	query products($id: ID, $filter: _ProductFilter) {
		Product(id: $id, filter: $filter) {
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
