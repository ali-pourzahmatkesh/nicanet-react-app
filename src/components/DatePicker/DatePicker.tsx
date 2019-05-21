import React, { useState, useEffect } from 'react'
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import momentJalaali from 'moment-jalaali';
import styled from 'styled-components';

const Wrapper = styled.div`
  .SingleDatePicker {
    width: 100%;
  }

  .SingleDatePickerInput {
    border: 0;
    border-bottom: 1px solid #666;
    width: 100%;
  }

  .DateInput {
    width: 100%;
  }

  .DateInput_input {
    font-size: 1rem;
    text-align: left;
  }
`

type DatePickerProps = {
  id: string
  onChange?: (value: string | undefined | any) => void
  value?: any
  placeholder?: string
}


const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { id, value, onChange, placeholder = 'Date' } = props
  const [isFocused, setIsFocused] = useState<boolean>(false)

  useEffect(() => {
    moment.locale('fa');
    return () => {
      moment.locale('en');
    };
  }, [])

  return (
    <Wrapper>
      <SingleDatePicker
        isRTL
        id={id}
        orientation="vertical"
        date={value}
        focused={isFocused}
        placeholder={placeholder}
        isOutsideRange={() => false}
        onDateChange={(date) => onChange && onChange(date)}
        renderDayContents={day => momentJalaali(day).format('jD')}
        withPortal={window.matchMedia("(max-width: 400px)").matches}
        onFocusChange={({ focused }) => setIsFocused(Boolean(focused))}
        renderMonthText={month => momentJalaali(month).format('jMMMM jYYYY')}
      />
    </Wrapper>
  )
}

export default DatePicker
