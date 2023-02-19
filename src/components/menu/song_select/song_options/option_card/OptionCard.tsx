import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { OptionCardContainer, OptionCardIcon, OptionCardName, OptionCardSelection, OptionCardStack } from './styles';

type OptionCardProps = {
  optionName: string;
  options: string[];
  selectedOption: number;
  setOption: (value: number) => void;
};

function OptionCard({ optionName, options, selectedOption, setOption }: OptionCardProps) {
  const prevOption = () => {
    if (selectedOption === 0) return;
    setOption(selectedOption - 1);
  };

  const nextOption = () => {
    if (selectedOption + 1 === options.length) return;
    setOption(selectedOption + 1);
  };

  return (
    <OptionCardContainer initial={{ scale: 1.0 }} whileHover={{ scale: 1.01 }}>
      <OptionCardName>{optionName}</OptionCardName>
      <OptionCardStack>
        <OptionCardIcon isSelectable={selectedOption !== 0}>
          <FontAwesomeIcon icon={faSquareCaretLeft} fixedWidth onClick={prevOption} />
        </OptionCardIcon>
        <OptionCardSelection>{options[selectedOption]}</OptionCardSelection>
        <OptionCardIcon isSelectable={selectedOption + 1 !== options.length}>
          <FontAwesomeIcon icon={faSquareCaretRight} fixedWidth onClick={nextOption} />
        </OptionCardIcon>
      </OptionCardStack>
    </OptionCardContainer>
  );
}

export default OptionCard;
