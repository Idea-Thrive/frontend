import { FC, useState, useEffect } from 'react';
import t from 'i18n';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  HStack,
} from '@chakra-ui/react';
import { FiDelete } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { updateFilteredIdeas } from 'store/slices/app-slice';
import useStateToProps from 'store/hooks/use-state-to-props';

interface FilterProps {
  onFilterChange: (filter: string) => void;
  onFilterClear: () => void;
}

const Filter: FC<FilterProps> = ({ onFilterChange, onFilterClear }) => {
  const DEFAULT_BUTTON_TEXT = 'addFilter';
  const [buttonText, setButtonText] = useState(t(DEFAULT_BUTTON_TEXT));
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const { ideas } = useStateToProps((state: any) => ({
    ideas: state.app.ideas,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFilteredIdeas(ideas));
  }, [ideas]);

  const filterItems = [
    { text: 'approved' },
    { text: 'topRated' },
    { text: 'newest' },
  ];

  const handleFilterClick = (text: string) => {
    onFilterChange(text);
    setButtonText(t(text));
    setSelectedFilter(text);
  };

  const shouldRenderClearFilter = () => Boolean(selectedFilter);

  const clearFilter = () => {
    onFilterClear();
    setButtonText(t(DEFAULT_BUTTON_TEXT));
    setSelectedFilter(null);
  };

  return (
    <Menu>
      <MenuButton as={Button}>{buttonText}</MenuButton>
      <MenuList>
        {shouldRenderClearFilter() && (
          <MenuItem onClick={clearFilter}>
            <HStack spacing={2}>
              <FiDelete />
              <Text>{t('clearFilter')}</Text>
              <Text fontWeight="bold">{t(selectedFilter!)}</Text>
            </HStack>
          </MenuItem>
        )}
        {filterItems
          .filter((filter) => filter.text !== selectedFilter)
          .map((filter, index) => (
            <MenuItem
              key={`item-${filter.text}-${index}`}
              onClick={() => handleFilterClick(filter.text)}
            >
              {t(filter.text)}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};

export default Filter;
