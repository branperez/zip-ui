import { gql } from "@apollo/client";

export const ZIP = gql`
query zipcode($country: String!, $zipCode: String!) {
  zip(country: $country, zipCode: $zipCode) {
    postCode
    country
    countryAbv
    places {
      name
      longitude
      state
      stateAbv
      latitude
    }
  }
}
`