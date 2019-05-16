import React, { Component } from 'react'
import dayjs from 'dayjs'

import Hero from '../Hero';
import Filters from '../Filters';
import Hotels from '../Hotels'
import { Promise } from 'q';
import 'dayjs/locale/es'

dayjs.locale('es')
const API_URL = 'https://wt-8a099f3e7c73b2d17f4e018b6cfd6131-0.sandbox.auth0-extend.com/acamica'
const delay   = ms => new Promise(resolve => setTimeout(resolve, ms))

class App extends Component {
  constructor() {
    super()
    this.state = {
      filters: {
        dateFrom: dayjs(),
        dateTo: dayjs(),
        country: '',
        price: 0,
        rooms: 0,
      },
      hotelsBackup: [],
      hotelsFiltered: [],
      isLoading: false,
    }
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true })

      await delay(2000)

      const response = await fetch( API_URL )
      const data = await response.json()

      this.setState({ hotelsBackup: data, hotelsFiltered: data })
    } catch (error) {
      console.log('error encontrado: ', error)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  handleFilterChange = newFilters => {
    this.setState({ filters: newFilters }, () => {
      this.handleApplyFilters()
    })
  }

  handleApplyFilters = () => {
    const { filters, hotelsBackup } = this.state

    // const hotelsFiltered = hotelsBackup.filter(hotel => dayjs(hotel.availabilityFrom).isAfter(filters.dateFrom) && dayjs(hotel.availabilityTo).isAfter(filters.dateTo))
    const hotelsFiltered = hotelsBackup
      .filter(hotel => dayjs(hotel.availabilityFrom).isAfter(filters.dateFrom))
      .filter(hotel => dayjs(hotel.availabilityTo).isBefore(filters.dateTo))
      .filter(hotel => {
        if(filters.country === '' || filters.country === 'Todos los países') return true
        if(filters.country === hotel.country) return true

        return false
      })
      .filter(hotel => {
        const filterPrice = Number(filters.price)
        if(filterPrice === 0 || filterPrice === 'Cualquier precio') return true
        if(filterPrice === hotel.price) return true

        return false
      })
      .filter(hotel => {
        if(filters.rooms === 0 || filters.rooms === 'Cualquier tamaño') return true
        if(hotel.rooms >= filters.rooms) return true

        return false
      })

    this.setState({ hotelsFiltered })
  }

  parseDate = timestamp => dayjs(timestamp).format('dddd[,] D [de] MMMM [de] YYYY')

  render() {
    const { filters, hotelsFiltered, isLoading } = this.state
    return (
      <div className='container'>
        <Hero filters={ filters } />
        <Filters filters={ filters } onFilterChange={this.handleFilterChange} />
        {isLoading && (<p>Cargando Hoteles</p>)}
        {hotelsFiltered.length > 0 && ( <Hotels data={hotelsFiltered} /> )}
      </div>
    )
  }
}

export default App
