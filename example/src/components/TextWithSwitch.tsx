import React, { useState } from 'react';
import styled from 'styled-components/native';

interface TextWithSwitchProps {
  initialSwitchState?: boolean;
  textValue: string;
  onSwitchChange: (value: boolean) => void;
}

const TextWithSwitch: React.FC<TextWithSwitchProps> = ({
  initialSwitchState = false,
  textValue,
  onSwitchChange,
}) => {
  const [isEnabled, setIsEnabled] = useState(initialSwitchState);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    onSwitchChange(!isEnabled);
  };

  return (
    <Container>
      <StyledText>{textValue}</StyledText>
      <StyledSwitch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const StyledText = styled.Text`
  font-size: 16px;
`;

const StyledSwitch = styled.Switch``;

export default TextWithSwitch;
