import { gql } from "apollo-boost";

const fragments = {
	geoDetailPart: gql`
		fragment GeoDetailPart on GeoDetail {
			id
			lat
			lng
		}
	`,
	companyPart: gql`
		fragment CompanyPart on Company {
			id
			type
			name
			description
			inn
			ogrn
			isActive
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
	locationPart: gql`
		fragment LocationPart on Location {
			id
			flat
			flat_type
			flat_type_full
			beltway_distance
			beltway_hit
			block
			block_type
			block_type_full
			house
			house_type
			house_type_full
			floor
			street
			street_type
			street_type_full
			street_fias_id
			settlement
			settlement_type
			settlement_type_full
			settlement_fias_id
			settlement_kladr_id
			area
			area_fias_id
			area_kladr_id
			area_type
			area_type_full
			city
			city_area
			city_district
			city_district_type
			city_fias_id
			region
			region_type
			region_type_full
			region_kladr_id
			region_fias_id
			postal_code
			postal_box
			country
			unrestricted_value
			value
			additionalDetails
			okato
			oktmo
			fias_id
			fias_code
			fias_level
			tax_office
			tax_office_legal
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
