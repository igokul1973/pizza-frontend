import { gql } from "apollo-boost";

const fragments = {
	geoDetailPart: gql`
		fragment GeoDetailPart on GeoDetail {
			id
			lat
			lng
		}
	`,
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
	companyProfilePart: gql`
		fragment CompanyProfilePart on CompanyProfile {
			id
			marketingDescription
			categories {
				ServiceCategory {
					id
					name
				}
			}
		}
	`,
	userPart: gql`
		fragment UserPart on User {
			id
			isActive
			role
			email
			phone
			authType
			isRegistrationComplete
		}
	`,
	accountPart: gql`
		fragment AccountPart on Account {
			id
			type
			isActive
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
	`,
	DatePart: gql`
		fragment DatePart on _Neo4jDate {
			year
			month
			day
			formatted
		}
	`
};

export default fragments;
