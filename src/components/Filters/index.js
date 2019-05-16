import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import DateFilter from '../DateFilter';
import OptionsFilter from '../OptionsFilter';

const countryOptions = [
  { value: undefined, name: 'Todos los países' },
  { value: 'Argentina', name: 'Argentina' },
  { value: 'Brasil', name: 'Brasil' },
  { value: 'Chile', name: 'Chile' },
  { value: 'Uruguay', name: 'Uruguay' },
]

const priceOptions = [
  { value: undefined, name: 'Cualquier precio' },
  { value: 1, name: '$' },
  { value: 2, name: '$$' },
  { value: 3, name: '$$$' },
  { value: 4, name: '$$$$' },
]

const roomOptions = [
  { value: undefined, name: 'Cualquier tamaño' },
  { value: 10, name: 'Hotel pequeño' },
  { value: 20, name: 'Hotel mediano' },
  { value: 30, name: 'Hotel grande' },
]

const Filters = ({ filters, onFilterChange }) => {

  const handleOptionChange = ({ name, value }) => {
    const newFilters = { ...filters, [name]: value }
    onFilterChange(newFilters)
  }

  return (
    <nav className="navbar is-info" style={ {justifyContent: 'center'} }>
      <div className="navbar-item">
        <DateFilter
          date={ filters.dateFrom }
          onDateChange={handleOptionChange}
          name="dateFrom"
          icon="sign-in-alt" />
      </div>
      <div className="navbar-item">
        <DateFilter
          date={ filters.dateTo }
          onDateChange={handleOptionChange}
          name="dateTo"
          icon="sign-out-alt" />
      </div>
      <div className="navbar-item">
        <OptionsFilter
          name="country"
          options={countryOptions}
          selected={ filters.country }
          onOptionChange={handleOptionChange}
          icon="globe" />
      </div>
      <div className="navbar-item">
        <OptionsFilter
          name="price"
          options={priceOptions}
          selected={filters.price}
          onOptionChange={handleOptionChange}
          icon="dollar-sign"
        />
      </div>
      <div className="navbar-item">
        <OptionsFilter
          name="rooms"
          options={roomOptions}
          selected={filters.rooms}
          onOptionChange={handleOptionChange}
          icon="bed"
        />
      </div>
    </nav>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape({
    dateFrom: PropTypes.instanceOf(dayjs),
    dateTo: PropTypes.instanceOf(dayjs),
    country: PropTypes.string,
    price: PropTypes.number,
    rooms: PropTypes.number,
  }),
  onFilterChange: PropTypes.func,
}

export default Filters
