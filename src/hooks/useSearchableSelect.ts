import {
  useState,
  useMemo,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  createRef,
} from 'react';

interface SearchableSelectOption {
  label: string;
  value: string;
}

export const useSearchableSelect = <T extends SearchableSelectOption>(
  options: T[],
  onSelectOption: (val: T['value']) => void,
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedValue, setSelectedValue] = useState<T['value']>('');
  const [keyword, setKeyword] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (keyword === '') {
      setSelectedValue('');
      onSelectOption('');
    }
  }, [keyword, setSelectedValue, onSelectOption]);

  const selectOption = (option: T) => {
    setSelectedValue(option.value);
    onSelectOption(option.value);
    setKeyword(option.label);
    setShowOptions(false);

    onSelectOption(option.value);
  };

  const filterdOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toUpperCase().includes(keyword.toUpperCase()),
      ),
    [keyword, options],
  );
  const optionRefs = filterdOptions.map(() => createRef<HTMLDivElement>());

  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue],
  );

  const handleSelectClick = () => {
    setShowOptions(true);
  };

  const handleSelectKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const { key } = e;
    if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      setShowOptions(true);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === '') {
      setKeyword('');
    }

    setKeyword(event.currentTarget.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === 'ArrowDown') {
      e.preventDefault();
      if (optionRefs[0]) {
        optionRefs[0].current?.focus();
      }
    }
  };

  const handleOptionKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    option: T,
    index: number,
  ) => {
    e.preventDefault();
    const { key } = e;
    if (key === 'ArrowDown') {
      if (index + 1 < optionRefs.length) {
        optionRefs[index + 1].current?.focus();
      }
    } else if (key === 'ArrowUp') {
      if (index > 0) {
        optionRefs[index - 1].current?.focus();
      } else {
        inputRef.current?.focus();
      }
    } else if (key === 'Enter' || key === ' ') {
      selectOption(option);
    }
  };

  const handleOptionClick = (option: T) => {
    selectOption(option);
  };

  const isSelectedOption = useMemo(
    () => (targetValue: SearchableSelectOption['value']) =>
      targetValue === selectedValue,
    [selectedValue],
  );

  return {
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
  } as const;
};
