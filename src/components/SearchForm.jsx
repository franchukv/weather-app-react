import { useState, useEffect, useRef } from 'react';
import useDebounce from '../hooks/useDebounce';
import useApp from '../hooks/useApp';
import useForecast from '../hooks/useForecast';
import getLocations from '../utils/getLocations';
import getForecast from '../utils/getForecast';
import formateLocationName from '../utils/formateLocationName';

const SearchForm = () => {
  const { toggleIsForecastLoading, toggleIsForecastActive } = useApp();
  const { locationInfo, addForecast, addLocationInfo } = useForecast();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [locations, setLocations] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const formRef = useRef(null);
  const selectedLocationRef = useRef(null);

  const handleFocus = (event) => {
    if (event.target.value.length) {
      setIsDropdownOpen(true);
    }
  };

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleClickOutsideForm = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleItemKeyDown = (event, location) => {
    const keyCode = event.code;
    const allowedKeyCodes = ['ArrowUp', 'ArrowDown', 'Enter', 'Space'];

    if (allowedKeyCodes.includes(keyCode)) {
      event.preventDefault();

      if (keyCode === 'ArrowUp') {
        const prevItem = event.target.previousElementSibling;

        if (prevItem) {
          prevItem.focus();
        }
      }

      if (keyCode === 'ArrowDown') {
        const nextItem = event.target.nextElementSibling;

        if (nextItem) {
          nextItem.focus();
        }
      }

      if (keyCode === 'Enter' || keyCode === 'Space') {
        handleLocation(event, location);
      }
    }
  };

  const handleLocation = (event, location) => {
    const { latitude, longitude, timezone } = location;

    toggleSelectedLocation(event);
    toggleIsForecastLoading(true);
    setIsDropdownOpen(false);

    (async () => {
      try {
        const result = await getForecast(latitude, longitude);

        if (result !== null) {
          addForecast(result);
          addLocationInfo({
            name: formateLocationName(location),
            timezone: timezone,
          });
          toggleIsForecastActive(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        toggleIsForecastLoading(false);
      }
    })();
  };

  const toggleSelectedLocation = (event) => {
    if (selectedLocationRef.current) {
      selectedLocationRef.current.classList.remove('selected');
      selectedLocationRef.current.setAttribute('tabindex', '0');
    }

    event.target.classList.add('selected');
    event.target.setAttribute('tabindex', '-1');
    selectedLocationRef.current = event.target;
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideForm);

    return () => document.removeEventListener('click', handleClickOutsideForm);
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsFormLoading(true);

      (async () => {
        try {
          setLocations(await getLocations(debouncedSearchTerm));
          setIsDropdownOpen(true);
        } catch (error) {
          console.error(error);
        } finally {
          setIsFormLoading(false);
        }
      })();
    }
  }, [debouncedSearchTerm]);

  return (
    <form
      className={`search-form ${isFormLoading ? 'loading' : ''}`}
      onFocus={handleFocus}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <input
        type="search"
        className="search-form__input"
        placeholder="Enter your location"
        value={searchTerm}
        onInput={handleInput}
      />

      <ul className={`search-form__list ${isDropdownOpen ? 'open' : ''}`}>
        {locations !== null ? (
          locations.map((location) => {
            const { id } = location;
            const locationName = formateLocationName(location);

            return (
              <li
                className={`search-form__item ${
                  locationInfo.name === locationName ? 'selected' : ''
                }`}
                tabIndex="0"
                key={id}
                onClick={(event) => handleLocation(event, location)}
                onKeyDown={(event) => handleItemKeyDown(event, location)}
              >
                {locationName}
              </li>
            );
          })
        ) : (
          <li className="search-form__item disabled">
            No place with this name was found
          </li>
        )}
      </ul>
    </form>
  );
};

export default SearchForm;
