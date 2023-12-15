import { useEffect, useState } from 'react'
import type { ChangeEvent, PropsWithChildren, FunctionComponent } from 'react'
import styles from './Explore.module.scss'
import { Divider, Stack, Box, Typography, Autocomplete, TextField, Select, Chip, MenuItem, IconButton } from '@mui/material'
import { AutocompleteProps, SelectProps } from '@mui/material'
import { PlaceOutlined as PinIcon, CalendarMonthOutlined as CalenderIcon, AttachMoney as MoneyIcon, SearchOutlined, RestartAlt as ResetIcon } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers'
import type { DatePickerProps } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { useDebounce } from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { fetchLocations, setLocation, setPrice, setToDate, setFromDate, resetFilters } from '../../app/slices/exploreSlice'
import type { LocationType, PriceType } from '../../services/types'
import { useNavigate } from 'react-router-dom'

type Props = {}

const prices: PriceType[] = [
  { id: 1, from: 50, to: 200 },
  { id: 2, from: 200, to: 400 },
  { id: 3, from: 400, to: 500 },
  { id: 4, from: 500, to: 750 },
  { id: 5, from: 750, to: 1000 },
  { id: 6, from: 1000, to: 9999 },
]

const places = [
  "Istanbul",
  "Dubai",
  "Miami",
  "Chicago",
  "Dallas",
  "Havana",
  "Berlin",
  "London",
  "Ankara",
  "Orlando",
  "Cape Town",
  "Santroni",
  "Madrid",
  "Lisbon",
  "New Orleans"
]

const isLocation = (ele: NonNullable<string | LocationType> | null): ele is LocationType => {
  return (ele as LocationType).name !== undefined
}

const Explore = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { entities, loading } = useAppSelector((state) => state.explore.locations)
  const locationValue = useAppSelector((state) => state.explore.location)
  const priceValue = useAppSelector((state) => state.explore.price)
  const dateRange = useAppSelector((state) => state.explore.date)

  const [search, setSearch] = useState("")
  const query = useDebounce(search)

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleLocationChange: AutocompleteProps<LocationType, false, any, any>['onChange'] = (_, value) => {
    if (isLocation(value)) {
      dispatch(setLocation(value.name))
    }
    else {
      dispatch(setLocation(''))
    }
  }

  const handlePriceChange: SelectProps['onChange'] = (e) => {
    const value = e.target.value
    const selected = prices.find(range => range.id == value)

    if (selected) {
      dispatch(setPrice(selected))
    }
  }

  const handleFromDateChange: DatePickerProps<Dayjs>['onChange'] = (value) => {
    dispatch(setFromDate(value?.format('YYYY-MM-DD') || null))
  }

  const handleToDateChange: DatePickerProps<Dayjs>['onChange'] = (value) => {
    dispatch(setToDate(value?.format('YYYY-MM-DD') || null))
  }

  const handleSearch = () => {
    navigate('/tours')
  }

  const handleReset = () => {
    dispatch(resetFilters())
  }

  useEffect(() => {
    if (query) {
      dispatch(fetchLocations(query))
    }
  }, [query])

  const chipClick = (place: string) => {
    dispatch(setLocation(place))
    navigate('/tours')
  }

  const location = entities.find((ele) => ele.name === locationValue)

  return (
    <div>
      <div className={styles.Backdrop}>

      </div>
      <Box className={styles.Pickers}>
        <Stack direction={'row'} className={styles.PickerStack}>
          <IconButton color='primary' onClick={handleReset}><ResetIcon /></IconButton>

          <Field icon={PinIcon} title='Location'>
            <Autocomplete
              value={location}
              options={entities}
              loading={loading === 'pending'}
              getOptionLabel={(option: LocationType) =>
                `${option.name}`
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={search}
                  onChange={handleChangeSearch}
                  variant='standard'
                  placeholder='Where do you want to go?'
                />
              )}
              onChange={handleLocationChange}
            />
          </Field>
          <Divider orientation='vertical' variant='middle' light sx={{ height: '50%', transform: 'translateY(50%)', margin: 0 }} />
          <Field icon={CalenderIcon} title='Choose Date'>
            <Stack direction={'row'} gap={1}>
              <DatePicker
                value={dayjs(dateRange.from)}
                slots={{
                  textField: (params) => <TextField {...params} variant='standard' />
                }}
                onChange={handleFromDateChange}
              />
              <DatePicker
                value={dayjs(dateRange.to)}
                slots={{
                  textField: (params) => <TextField {...params} variant='standard' />
                }}
                onChange={handleToDateChange}
              />
            </Stack>
          </Field>
          <Divider orientation='vertical' variant='middle' light sx={{ height: '50%', transform: 'translateY(50%)', margin: 0 }} />
          <Field icon={MoneyIcon} title='Price'>
            <Select variant='standard' placeholder='Choose here' value={priceValue.id} onChange={handlePriceChange}>
              {prices.map(option => <MenuItem value={option.id === null ? undefined : option.id}>{`$${option.from}-$${option.to}`}</MenuItem>)}
            </Select>
          </Field>
          <IconButton color='primary' onClick={handleSearch}><SearchOutlined /></IconButton>
        </Stack>
        <Stack direction={'row'} flexWrap={'wrap'} gap={1} marginTop={5} justifyContent={'space-around'}>
          {places.map(place => <Chip key={place} label={place} variant="outlined" onClick={() => chipClick(place)} />)}
        </Stack>
      </Box >
    </div >
  )
}

interface FieldProps {
  icon: FunctionComponent
  title: string
}

const Field = ({ children, icon: Icon, title }: PropsWithChildren<FieldProps>) => {
  return (
    <Stack px={4} py={4} boxSizing={'border-box'}>
      <Stack direction={'row'} alignItems={'center'} gap={1}>
        <Icon />
        <Typography variant='subtitle2'>{title}</Typography>
      </Stack>
      {children}
    </Stack>
  )
}

export default Explore