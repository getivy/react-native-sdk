import React, { useState } from 'react';
import styled from 'styled-components/native';

interface MarketTextInputProps {
  initialValue?: string;
  onValueChange: (value: string) => void;
}

const MarketTextInput: React.FC<MarketTextInputProps> = ({
  initialValue = 'DE',
  onValueChange,
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const [prevValue, setPrevValue] = useState<string>(initialValue);

  const handleBlur = () => {
    if (value !== prevValue) {
      onValueChange(value);
      setPrevValue(value);
    }
  };

  return (
    <Container>
      <StyledText>Market:</StyledText>
      <StyledTextInput
        value={value}
        onChangeText={setValue}
        placeholder="Market"
        onBlur={handleBlur}
      />
    </Container>
  );
};

const StyledText = styled.Text`
  font-size: 16px;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  border-width: 1px;
  border-color: #000;
  width: 70%;
  text-align: center;
`;

const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default MarketTextInput;
