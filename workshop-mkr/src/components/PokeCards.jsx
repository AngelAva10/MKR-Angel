import React, { useEffect, useState } from "react";
import DataCard from "./DataCard";
import { Grid, CircularProgress } from "@mui/material";
import { Form } from "./Form";

export const PokeCards = () => {
  const [search, setSearch] = useState('spearow')
  const [state, setState] = useState()
  const handleSearch = (e) => {
    e.preventDefault()
    console.log(e.target.pokemon.value)

    setSearch(e.target.pokemon.value)

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20%22`)
        const data = await response.json()
        const { results } = data
        .then(data => { 
          data.results.forEach(pokemon => {
              console.log(pokemon.url, pokemon.name)
          }) })
      

      
        setState({ results })
      }
      catch (error) {
        console.error(error)
      }

    }
    fetchData()
  }, [search])


  console.log(search)
  if (!state) return <CircularProgress />
  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Form handleOnChange={handleSearch} />
        </Grid>
        <Grid xs={4}>
          <DataCard title={search} subtitle={state.name}/>
        </Grid>
        <Grid xs={4}>
        <DataCard title={search} subtitle={state.name}/>
        </Grid>
        <Grid xs={4}>
        <DataCard title={search} subtitle={state.name}/>
        </Grid>
        <Grid xs={4}>
        <DataCard title={search} subtitle={state.name}/>
        </Grid>
        <Grid xs={4}>
        <DataCard title={search} subtitle={state.name}/>
        </Grid>
        <Grid xs={4}>
        <DataCard title={search} subtitle={state.name}/>
        </Grid>
      </Grid>
    </div>
  )
}
