import React, { FC } from 'react';
import ReactDatepicker, { ReactDatePickerProps } from 'react-datepicker';
import { FaCalendarDays } from 'react-icons/fa6';

import { Input } from '../Input';
import './Datepicker.scss';

export interface IDatepickerProps extends ReactDatePickerProps {
  label?: string;
  hintText?: string;
  errorMsg?: string;
  placeholder?: string;
  reserveSpaceForError?: boolean;
  dropdownMode?: 'scroll' | 'select';
  autoComplete?: 'on' | 'off';
  inputSmall?: boolean;
}

export const Datepicker: FC<IDatepickerProps> = ({
  name,
  label,
  hintText,
  errorMsg,
  onChange,
  disabled,
  required,
  placeholder,
  selected,
  reserveSpaceForError,
  dateFormat = 'd MMMM, yyyy',
  dropdownMode = 'scroll',
  autoComplete = 'off',
  showPopperArrow,
  popperModifiers,
  inputSmall,
  ...rest
}) => {
  const shouldModifyPopperOffeset = reserveSpaceForError || Boolean(hintText) || Boolean(errorMsg);

  return (
    <div className="ui-datepicker">
      <ReactDatepicker
        {...rest}
        name={name}
        showPopperArrow={showPopperArrow}
        onChange={onChange}
        dateFormat={dateFormat}
        selected={selected}
        placeholderText={placeholder}
        disabled={disabled}
        required={required}
        dropdownMode={dropdownMode}
        autoComplete={autoComplete}
        popperModifiers={
          shouldModifyPopperOffeset
            ? [
                {
                  name: 'offset',
                  fn(state) {
                    state.y = 80;

                    return state;
                  },
                },
              ]
            : popperModifiers
        }
        customInput={
          <Input
            label={label}
            errorMsg={errorMsg}
            hintText={hintText}
            reserveSpaceForError={reserveSpaceForError}
            small={inputSmall}
            endAdornment={<FaCalendarDays size={inputSmall ? 14 : 18} />}
          />
        }
      />
    </div>
  );
};
