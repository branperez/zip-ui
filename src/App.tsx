import { useState } from 'react';
import { Button, Card, CardActions, CardContent, Divider, Grid } from '@mui/material';
import ZipInput from './components/ZipInput';
import CountrySelect from './components/CountrySelect';
import SelectedLocation from './components/SelectedLocation';
import HistoryList from './components/HistoryList';
import { useLazyQuery } from '@apollo/client';
import { ZIP } from './schema';
import { Location } from './types';


const Loading = () => (
  <CardContent>
    <h5>...Loading</h5>
  </CardContent>
)

const LoadError = (e: any) => {
  const error = e?.error?.graphQLErrors[0]?.message || JSON.stringify(e);
  console.error(e);

  return (
    <CardContent>
      <h5>Error: {JSON.stringify(error)}</h5>
    </CardContent>
  )
}

const App = () => {
  const [country, setCountry] = useState({ name: 'United States', code: 'US' });
  const [zipCode, setZipCode] = useState('');
  const [previous, setPrevious] = useState<any[]>([]);
  const [
    getLocation, 
    { loading, data, error }
  ] = useLazyQuery(ZIP);

  const updatePrev = (newData: { zip: Location }) => {
    if(newData) {
      const { zip }: { zip: Location } = newData;
      const temp = previous;
      const timeStamp = new Date().getTime();

      if(previous && previous.length > 4 && data) {
        temp.pop()
      }

      if(!previous.length || (previous.length && !previous.find(prev => prev.postCode === zip.postCode))) {
        temp.unshift({ postCode: zip.postCode, city: zip.places[0].name, state: zip.places[0]?.state, timeStamp })
        setPrevious(temp)
      }
    }
  }

  return (
    <Grid container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="center" justifyContent={"space-around"}>
      <Grid item xs={4} sm={2} md={3} >
          {
            (data || !!previous.length) && <HistoryList previous={previous} />
          }
      </Grid>
      <Grid item xs={4} sm={4} md={6} >
        <Card>
          <CardContent>
            <Grid container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="center" justifyContent={"space-around"}>
              <Grid item xs={4} sm={8} md={12} >
                <CountrySelect setCountry={setCountry} country={country} />
              </Grid>
              <Grid item xs={2} sm={5} md={9} alignItems="right" >
                <ZipInput setZipCode={setZipCode} zipCode={zipCode} country={country} />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button onClick={() => (
                getLocation({ variables: { country: country.code, zipCode }, onCompleted: (updatePrev)})
              )
            } >
                Location Lookup
              </Button>
            {
              previous.length > 0 && (<Button onClick={() => setPrevious([])} >
                Clear History
              </Button>)
            }
          </CardActions>
        </Card>
        <Divider />
        <Card>
          {
            loading && <Loading />
          }
          {
            error && <LoadError error={error} />
          }
          {
            data && <SelectedLocation data={data} key={data} />
          }
        </Card>
      </Grid>
      <Grid item xs={4} sm={2} md={3} />
    </Grid>
  );
}

export default App;
