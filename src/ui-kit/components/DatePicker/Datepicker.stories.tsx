/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { addDays, format } from 'date-fns';
import type { Meta, StoryObj } from '@storybook/react';

import { Datepicker } from './Datepicker';

const meta: Meta<typeof Datepicker> = {
  title: 'Components/Datepicker',
  component: Datepicker,
  argTypes: {
    dropdownMode: {
      description: 'type for year and month dropdown',
    },
  },
  args: {
    label: '',
    placeholder: 'Select a date',
    hintText: '',
    errorMsg: '',
    required: false,
    disabled: false,
    reserveSpaceForError: false,
    showMonthDropdown: false,
    showYearDropdown: false,
    showMonthYearPicker: false,
    showFullMonthYearPicker: false,
    showTimeSelect: false,
    showTimeInput: false,
    showPopperArrow: false,
    dropdownMode: 'select',
    autoComplete: 'off',
    dateFormat: 'd MMMM, yyyy',
  },
};

type Story = StoryObj<typeof Datepicker>;

export const Default: Story = {
  render: function useDatepicker(args) {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div style={{ padding: '10px 10px 250px 10px' }}>
        <Datepicker {...args} selected={date} onChange={(date) => setDate(date)} />
      </div>
    );
  },
};

export const RangeDatepicker: Story = {
  render: function useDatepicker(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    let value = startDate ? format(startDate, 'd MMMM, yyyy') : undefined;
    if (endDate) {
      value = `${value} - ${format(endDate, 'd MMMM, yyyy')}`;
    }

    return (
      <div style={{ padding: '10px 10px 250px 10px' }}>
        <Datepicker
          {...args}
          selected={endDate || startDate}
          onChange={(dates) => {
            //@ts-ignore
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
          }}
          placeholder="Select dates"
          //@ts-ignore
          selectsRange
          startDate={startDate}
          excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
          endDate={endDate}
          monthsShown={2}
          shouldCloseOnSelect={Boolean(startDate) && !endDate}
          value={value}
        />
      </div>
    );
  },
};

export const AsRangePicker: Story = {
  render: function useDatepicker(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
      <div style={{ padding: '10px 10px 250px 10px', display: 'flex', gap: '10px' }}>
        <Datepicker
          {...args}
          label="Start Date"
          selectsStart
          monthsShown={2}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={(date: Date) => {
            setStartDate(date);
          }}
        />
        <Datepicker
          {...args}
          label="End Date"
          selectsEnd
          monthsShown={2}
          selected={endDate}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={(date: Date) => setEndDate(date)}
        />
      </div>
    );
  },
};

export default meta;
