// lib
import React from 'react'
import debounce from 'lodash/debounce'
import Popper from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

// src
import defaults from './defaults'
import SearchField from './SearchField'
import SuggestList from './SuggestList'
var googleMaps = window.google
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}

class PlaceSuggest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSuggestsHidden: true,
      isLoading: false,
      userInput: props.initialValue,
      activeSuggest: null,
      suggests: [],
      timer: null,
      anchorEl: null,
      open: false,
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onAfterInputChange = this.onAfterInputChange.bind(this)

    if (props.queryDelay) {
      this.onAfterInputChange = debounce(
        this.onAfterInputChange,
        props.queryDelay,
      )
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.initialValue !== props.initialValue) {
      this.setState({ userInput: props.initialValue })
    }
  }

  componentWillMount() {
    if (typeof window === 'undefined') {
      return
    }

    const googleMaps = window.google.maps

    if (!googleMaps) {
      console.error('Google map api was not found in the page.')
      return
    }
    this.googleMaps = googleMaps
    this.autocompleteService = new googleMaps.places.AutocompleteService()
    this.geocoder = new googleMaps.Geocoder()
  }

  componentWillUnmount() {
    onSuggestSelect
    clearTimeout(this.state.timer)
  }

  onInputChange = (userInput, anchorEl) => {
    this.setState({ userInput, anchorEl }, this.onAfterInputChange)
  }

  onAfterInputChange = () => {
    this.showSuggests()
    this.props.onChange(this.state.userInput)
  }

  onInputFocus = () => {
    this.props.onFocus()
    this.showSuggests()
  }

  onInputBlur = () => {
    if (!this.state.ignoreBlur) {
      this.hideSuggests()
    }
  }

  onNext = () => this.activateSuggest('next')

  onPrev = () => this.activateSuggest('prev')

  onSelect = () => this.selectSuggest(this.state.activeSuggest)

  onSuggestMouseDown = () => this.setState({ ignoreBlur: true })

  onSuggestMouseOut = () => this.setState({ ignoreBlur: false })

  onSuggestNoResults = () => {
    this.props.onSuggestNoResults(this.state.userInput)
  }

  update(userInput) {
    this.setState({ userInput })
    this.props.onChange(userInput)
  }

  clear() {
    this.setState({ userInput: '' }, this.hideSuggests)
  }

  searchSuggests() {
    if (!this.state.userInput) {
      this.updateSuggests()
      return
    }
    const options = {
      input: this.state.userInput,
    }
    const val = ['location', 'radius', 'bounds', 'types']
    val.forEach(option => {
      if (this.props[option]) {
        options[option] = this.props[option]
      }
    })

    if (this.props.country) {
      options.componentRestrictions = {
        country: this.props.country,
      }
    }

    this.setState({ isLoading: true }, () => {
      this.autocompleteService.getPlacePredictions(options, suggestsGoogle => {
        this.setState({ isLoading: false })
        this.updateSuggests(
          suggestsGoogle || [], // can be null
          () => {
            if (
              this.props.autoActivateFirstSuggest &&
              !this.state.activeSuggest
            ) {
              this.activateSuggest('next')
            }
          },
        )
      })
    })
  }

  updateSuggests(suggestsGoogle = [], callback) {
    var suggests = [],
      regex = new RegExp(escapeRegExp(this.state.userInput), 'gim'),
      skipSuggest = this.props.skipSuggest,
      maxFixtures = 10,
      fixturesSearched = 0,
      activeSuggest = null

    this.props.fixtures.forEach(suggest => {
      if (fixturesSearched >= maxFixtures) {
        return
      }

      if (!skipSuggest(suggest) && suggest.label.match(regex)) {
        fixturesSearched++

        suggest.placeId = suggest.label
        suggest.isFixture = true
        suggests.push(suggest)
      }
    })

    suggestsGoogle.forEach(suggest => {
      if (!skipSuggest(suggest)) {
        suggests.push({
          label: this.props.getSuggestLabel(suggest),
          placeId: suggest.place_id,
          isFixture: false,
        })
      }
    })

    activeSuggest = this.updateActiveSuggest(suggests)
    this.setState({ suggests, activeSuggest }, callback)
  }

  updateActiveSuggest(suggests = []) {
    let activeSuggest = this.state.activeSuggest

    if (activeSuggest) {
      const newSuggest = suggests.find(
        listedSuggest =>
          activeSuggest.placeId === listedSuggest.placeId &&
          activeSuggest.isFixture === listedSuggest.isFixture,
      )

      activeSuggest = newSuggest || null
    }

    return activeSuggest
  }

  showSuggests() {
    this.searchSuggests()
    this.setState({ isSuggestsHidden: false })
  }

  hideSuggests = () => {
    this.props.onBlur(this.state.userInput)
    const timer = setTimeout(() => {
      this.setState({
        isSuggestsHidden: true,
        activeSuggest: null,
      })
    }, 100)

    this.setState({ timer })
  }

  activateSuggest(direction) {
    // eslint-disable-line complexity
    if (this.state.isSuggestsHidden) {
      this.showSuggests()
      return
    }

    const suggestsCount = this.state.suggests.length - 1,
      next = direction === 'next'
    let newActiveSuggest = null,
      newIndex = 0,
      i = 0

    for (i; i <= suggestsCount; i++) {
      if (this.state.suggests[i] === this.state.activeSuggest) {
        newIndex = next ? i + 1 : i - 1
      }
    }

    if (!this.state.activeSuggest) {
      newIndex = next ? 0 : suggestsCount
    }

    if (newIndex >= 0 && newIndex <= suggestsCount) {
      newActiveSuggest = this.state.suggests[newIndex]
    }

    this.props.onActivateSuggest(newActiveSuggest)

    this.setState({ activeSuggest: newActiveSuggest })
  }

  selectSuggest = suggest => {
    if (!suggest) {
      suggest = {
        label: this.state.userInput,
      }
    }

    this.setState({
      isSuggestsHidden: true,
      userInput: suggest.label,
      anchorEl: null,
    })

    if (suggest.location) {
      this.setState({ ignoreBlur: false })
      this.props.onSuggestSelect(suggest)
      return
    }

    this.geocodeSuggest(suggest)
  }

  geocodeSuggest(suggest) {
    this.geocoder.geocode(
      suggest.placeId && !suggest.isFixture
        ? { placeId: suggest.placeId }
        : { address: suggest.label },
      (results, status) => {
        if (status !== this.googleMaps.GeocoderStatus.OK) {
          return
        }

        var gmaps = results[0],
          location = gmaps.geometry.location

        suggest.gmaps = gmaps
        suggest.location = {
          lat: location.lat(),
          lng: location.lng(),
        }

        this.props.onSuggestSelect(suggest)
      },
    )
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  render() {
    return (
      <div>
        <SearchField
          width={this.props.width}
          value={this.state.userInput}
          onChange={this.onInputChange}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
          onNext={this.onNext}
          onPrev={this.onPrev}
          onSelect={this.onSelect}
          onEscape={this.hideSuggests}
        />

        <Popper
          id="simple-popper"
          open={Boolean(this.state.anchorEl)}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          placement="bottom-start"
        >
          <Paper>
            <SuggestList
              width={this.props.width}
              suggests={this.state.suggests}
              onSuggestNoResults={this.onSuggestNoResults}
              onSuggestMouseDown={this.onSuggestMouseDown}
              onSuggestMouseOut={this.onSuggestMouseOut}
              onSuggestSelect={this.selectSuggest}
            />
          </Paper>
        </Popper>
      </div>
    )
  }
}

PlaceSuggest.defaultProps = defaults

export default PlaceSuggest
