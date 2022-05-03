import { Location, Place, Country, History } from "../types";
import { CardContent } from "@mui/material";

const LocationCard = ({
    payload: {
    postCode, 
    countryAbv, 
    places
  }}: { payload: Location }) => {
    const { name, longitude, latitude, stateAbv }: Place = places[0]
  
    return (
        <CardContent>
            <h5>{name}, {stateAbv}</h5>
            <p>{postCode}, {countryAbv}</p>
            <p>Coordinates: </p>
            <p> {longitude} long - {latitude} lat</p>
        </CardContent>
    )
}

const SelectedLocation = ({ data }: {data: { zip: Location }}) => { 
      const { zip }: { zip: Location } = data
      
      return (<LocationCard payload={zip} />)
}

export default SelectedLocation
