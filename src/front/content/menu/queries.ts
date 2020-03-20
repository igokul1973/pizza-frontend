import fragments from "../../../graphql/fragments";
import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
	query products($id: ID) {
		Product(id: $id) {
			...ProductPart
			categories {
				name
			}
			createdAt {
				...DateTimePart
			}
			updatedAt {
				...DateTimePart
			}
		}
	}
	${fragments.productPart}
	${fragments.DateTimePart}
`;
