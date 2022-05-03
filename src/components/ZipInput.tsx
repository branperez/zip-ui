import { TextField } from "@mui/material"
import { useState } from "react";
import { Country } from "../types";

const ZipInput = (payload: { setZipCode: any, zipCode: string, country: Country }) => {
    const { setZipCode, country } = payload
    const [isValid, setIsValid] = useState(true)

    const handleChange = (e: any) => {
        if(country.code === "US" && (e.target.value.length > 5 || e.target.value.match(/[^0-9]/g))) {
          setIsValid(false)
        } else {
          setIsValid(true)
          setZipCode(e.target.value)
        }
    }

    return (
        <TextField 
              label="Zip Code" 
              variant="filled"
              error={!isValid}
              helperText="please enter a valid postal code"
              onChange={handleChange}
        />
    )
}

export default ZipInput