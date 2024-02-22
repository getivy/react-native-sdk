import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';

interface CurrencyPickerProps {
  initialValue?: string;
  onCurrencyChange: (currency: string) => void;
}

const CurrencyPicker: React.FC<CurrencyPickerProps> = ({
  initialValue = 'EUR',
  onCurrencyChange,
}) => {
  const [selectedCurrency, setSelectedCurrency] =
    useState<string>(initialValue);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    onCurrencyChange(currency);
  };

  return (
    <PickerContainer>
      <Picker
        style={{ width: 200 }}
        selectedValue={selectedCurrency}
        onValueChange={(itemValue) => handleCurrencyChange(itemValue)}
        mode="dropdown"
      >
        <Picker.Item label="EUR" value="EUR" />
        <Picker.Item label="GBP" value="GBP" />
      </Picker>
    </PickerContainer>
  );
};

const PickerContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

export default CurrencyPicker;
