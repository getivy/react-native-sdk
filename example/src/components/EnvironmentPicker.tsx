import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';

interface EnvironmentPickerProps {
  initialValue?: string;
  onValueChange: (value: string) => void;
}

const EnvironmentPicker: React.FC<EnvironmentPickerProps> = ({
  initialValue = 'Sandbox',
  onValueChange,
}) => {
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<string>(initialValue);

  const handleEnvironmentChange = (itemValue: string) => {
    setSelectedEnvironment(itemValue);
    onValueChange(itemValue);
  };

  return (
    <PickerContainer>
      <Picker
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ width: 200 }}
        selectedValue={selectedEnvironment}
        onValueChange={(itemValue) => handleEnvironmentChange(itemValue)}
        mode="dropdown"
      >
        <Picker.Item label="Development" value="Development" />
        <Picker.Item label="Sandbox" value="Sandbox" />
        <Picker.Item label="Production" value="Production" />
      </Picker>
    </PickerContainer>
  );
};

const PickerContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

export default EnvironmentPicker;
