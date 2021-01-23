import { FC, KeyboardEvent } from 'react';
import { Box, Input, Text, Icon, Flex } from '@chakra-ui/react';
import { FaAngleDown } from 'react-icons/fa';
import { useSearchableSelect } from './useSearchableSelect';
import { Option } from './types';

export const SearchableSelect: FC<{
  displayNum?: number;
  placeholder?: string;
  searchPlaceholder: string;
  options: Option[];
  onSelectOption: (selectedValue: Option['value']) => void;
}> = ({
  placeholder = '選択してください',
  searchPlaceholder,
  displayNum = 4,
  options,
  onSelectOption,
}) => {
  const {
    filterdOptions,
    selectedOption,
    keyword,
    showOptions,
    setShowOptions,
    inputRef,
    optionRefs,
    handleSelectClick,
    handleSelectKeyDown,
    handleInputChange,
    handleInputKeyDown,
    handleOptionClick,
    handleOptionKeyDown,
    isSelectedOption,
  } = useSearchableSelect(options, onSelectOption);

  return (
    <Box width="100%">
      {!showOptions ? (
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          height="40px"
          pl="16px"
          pr="64px"
          borderRadius={6}
          borderWidth="1px"
          backgroundColor="white"
          tabIndex={0}
          onClick={handleSelectClick}
          onKeyDown={handleSelectKeyDown}
        >
          <Text mr="auto">{selectedOption?.label || placeholder}</Text>
          <Flex position="absolute" right="10px">
            <Box
              width="1px"
              height="16px"
              backgroundColor="gray.200"
              mr="10px"
            />
            <Icon as={FaAngleDown} color="gray.400" />
          </Flex>
        </Box>
      ) : (
        <Box position="relative">
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100vh"
            backgroundColor="transparent"
            onClick={() => setShowOptions(false)}
          />
          <Input
            ref={inputRef}
            placeholder={searchPlaceholder}
            height="40px"
            px="16px"
            borderTopRadius={6}
            borderBottomRadius={0}
            backgroundColor="white"
            value={keyword}
            onChange={handleInputChange}
            autoFocus
            onKeyDown={handleInputKeyDown}
          />
          <Box
            position="absolute"
            top="40px"
            left="0"
            width="100%"
            maxH={`${40 * displayNum + 40 / 2}px`}
            overflow="scroll"
            borderWidth="1px"
            zIndex={1}
          >
            {filterdOptions.map((option, index) => (
              <Box
                key={option.label}
                ref={optionRefs[index]}
                display="flex"
                alignItems="center"
                height="40px"
                px="16px"
                tabIndex={0}
                backgroundColor={
                  isSelectedOption(option.value) ? 'blue.200' : 'white'
                }
                _hover={{
                  bg: isSelectedOption(option.value) ? 'blue.200' : 'blue.100',
                }}
                onClick={() => handleOptionClick(option)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  handleOptionKeyDown(e, option, index);
                }}
              >
                {option.label}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
