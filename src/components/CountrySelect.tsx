import { Autocomplete, TextField } from '@mui/material';
import countries from '../countries.json';
import { Country } from '../types';

const CountrySelect = ({ setCountry, country }: { setCountry: any, country: Country }) => (
    <Autocomplete 
        value={country}
        onChange={(e: any, newValue: Country | null) => {
          if(newValue) return setCountry(newValue)}}
        options={
          countries}
        renderInput={(params) => <TextField {...params} label="Country" />}
        getOptionLabel={(option) => option.name}
    />
)

export default CountrySelect