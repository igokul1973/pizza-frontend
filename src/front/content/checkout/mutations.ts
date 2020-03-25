import gql from "graphql-tag";

export const CREATE_CUSTOMER = gql`
    mutation createCustomer(
        $name: String!
        $phone: String!
        $email: String!
        $password: String!
        $createdAt: _Neo4jDateTimeInput!
        $updatedAt: _Neo4jDateTimeInput!
    ) {
        CreateCustomer(
            name: $name,
            phone: $phone
            email: $email
            password: $password
            createdAt: $createdAt
            updatedAt: $updatedAt
        ) {
            id
            name
        }
    }
`;

export const CREATE_CUSTOMER_ADDRESS = gql`
    mutation createCustomerAddress(
        $street: String!
        $city: String!
        $state: String!
        $zip: String!
        $addressCategory: AddressCategoryEnum!
    ) {
        CreateCustomerAddress(
            street: $street,
            city: $city,
            state: $state,
            zip: $zip,
            addressCategory: $addressCategory
        ) {
            id
        }
    }
`;

export const ADD_CUSTOMER_ADDRESS_CUSTOMER = gql`
    mutation AddCustomerAddressCustomer(
        $from: _CustomerInput!
        $to: _CustomerAddressInput!
    ) {
        AddCustomerAddressCustomer(
            from: $from
            to: $to
        ) {
            from {id}
            to {id}
        }
    }
`;

export const CREATE_ORDER = gql`
    mutation createOrder(
        $details: String!
        $status: OrderStatusEnum!
        $createdAt: _Neo4jDateTimeInput!
        $updatedAt: _Neo4jDateTimeInput!
    ) {
        CreateOrder(
            details: $details,
            status: $status,
            createdAt: $createdAt,
            updatedAt: $updatedAt
        ) {
            id
            details
            createdAt {formatted}
            updatedAt {formatted}
        }
    }
`;

export const CREATE_ORDER_ITEM = gql`
    mutation createOrderItem(
        $name: String!
        $price: Float!
        $quantity: Int!
        $productId: String!
    ) {
        CreateOrderItem(
            name: $name,
            price: $price ,
            quantity: $quantity
            productId: $productId
        ) {
            id
            total
        }
    }
`;

export const ADD_ORDER_ORDER_ITEMS = gql`
    mutation addOrderOrderItems(
        $from: _OrderInput!
        $to: _OrderItemInput!
    ) {
        AddOrderOrderItems(
            from: $from,
            to: $to
        ) {
            from {id}
            to {id}
        }
    }
`;

export const ADD_CUSTOMER_ORDERS = gql`
    mutation addCustomerOrders(
        $from: _CustomerInput!
        $to: _OrderInput!
    ) {
        AddCustomerOrders(
            from: $from,
            to: $to
        ) {
            from {id}
            to {id}
        }
    }
`;

