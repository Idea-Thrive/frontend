import { FC, useState, useEffect } from 'react';
import t from 'i18n';
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  Skeleton,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateFilteredIdeas as updateFilteredIdeasToStore } from 'store/slices/app-slice';
import useStateToProps from 'store/hooks/use-state-to-props';
import useDidMount from 'hooks/use-did-mount';
import { getAllCategories } from 'service/api-helper/category';
import { Category, Idea, SortingOption, Status } from 'types/types';

interface FilterProps {}

const Filter: FC<FilterProps> = () => {
  const EMPTY_ARRAY_SIZE = 0;
  const dispatch = useDispatch();
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    [],
  );
  const [selectedSortingOption, setSelectedSortingOption] =
    useState<SortingOption | null>(null);

  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const { ideas, companyId } = useStateToProps((state: any) => ({
    ideas: state.app.ideas,
    companyId: state.app.user?.company_id,
  }));

  const sortByRating = (list: Array<Idea>) =>
    list.sort((first, second) => {
      const firstRate = first.up_vote_count - first.down_vote_count;
      const secondRate = second.up_vote_count - second.down_vote_count;

      if (firstRate < secondRate) {
        return 1;
      }

      if (firstRate > secondRate) {
        return -1;
      }

      return 0;
    });

  const sortByNewerDate = (ideas: Array<Idea>) =>
    ideas.sort((first, second) => {
      const firstCreationTime = new Date(first.created_at).getTime();
      const secondCreationTime = new Date(second.created_at).getTime();

      if (firstCreationTime < secondCreationTime) {
        return 1;
      }

      if (firstCreationTime > secondCreationTime) {
        return -1;
      }

      return 0;
    });

  // TODO: Implement the logic
  const filterByStatus = (list: Array<Idea>): Array<Idea> => {
    return list;
  };

  const filterByCategory = (list: Array<Idea>): Array<Idea> =>
    list.filter((item) => selectedCategories.includes(item.category));

  const shouldSortByRate = () =>
    selectedSortingOption === SortingOption.TOP_RATED;

  const shouldSortByNewest = () =>
    selectedSortingOption === SortingOption.NEWEST;

  const shouldFilterByStatus = () => Boolean(selectedStatus);

  const shouldFilterByCategory = () =>
    selectedCategories.length !== EMPTY_ARRAY_SIZE;

  const updateFilteredIdeas = () => {
    let items = ideas;

    /**
     * Sorting by rate
     */
    if (shouldSortByRate()) {
      items = sortByRating([...items]);
    }

    /**
     * Sort by date
     */
    if (shouldSortByNewest()) {
      items = sortByNewerDate([...items]);
    }

    /**
     * Filter by status
     */
    if (shouldFilterByStatus()) {
      items = filterByStatus(items);
    }

    /**
     * Filter by category
     */
    if (shouldFilterByCategory()) {
      items = filterByCategory([...items]);
    }

    dispatch(updateFilteredIdeasToStore(items));
  };

  useEffect(() => {
    updateFilteredIdeas();
  }, [ideas, selectedSortingOption, selectedStatus, selectedCategories]);

  const updateCategories = async () => {
    try {
      const { data } = await getAllCategories({ companyId });
      setCategories(data);
    } catch (err) {
    } finally {
      setIsLoadingCategory(false);
    }
  };

  useDidMount(() => {
    updateCategories();
  });

  const shouldRenderFilterByCategory = () =>
    categories.length !== EMPTY_ARRAY_SIZE;

  const renderFilterByCategoryItems = () => (
    <MenuOptionGroup type="checkbox" title={t('byCategory')}>
      {categories.map((category, index) => (
        <MenuItemOption
          onClick={() => handleSelectCategory(category.name)}
          key={`${category}-${index}`}
          value={category.name}
        >
          {category.name}
        </MenuItemOption>
      ))}
    </MenuOptionGroup>
  );

  const handleSelectCategory = (categoryName: string) => {
    if (selectedCategories.includes(categoryName)) {
      const index = selectedCategories.indexOf(categoryName);
      setSelectedCategories(selectedCategories.splice(1, index));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const handleSortingOptionChange = (option: any) =>
    setSelectedSortingOption(option);

  const sortOptions = [{ text: 'topRated' }, { text: 'newest' }];

  const renderSortOptions = () => (
    <MenuOptionGroup title={t('order')} onChange={handleSortingOptionChange}>
      {sortOptions.map((sortOption) => (
        <MenuItemOption value={sortOption.text}>
          {t(sortOption.text)}
        </MenuItemOption>
      ))}
    </MenuOptionGroup>
  );

  const handleSelectedStatusChange = (status: any) => setSelectedStatus(status);

  const renderFilterByStatus = () => (
    <MenuOptionGroup
      title={t('filterByStatus')}
      onChange={handleSelectedStatusChange}
    >
      <MenuItemOption value={Status.APPROVED}>
        {t(Status.APPROVED)}
      </MenuItemOption>
    </MenuOptionGroup>
  );

  return (
    <Skeleton isLoaded={!isLoadingCategory}>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button}>{t('addFilter')}</MenuButton>
        <MenuList>
          {renderSortOptions()}
          <MenuDivider />
          {renderFilterByStatus()}
          {shouldRenderFilterByCategory() && (
            <>
              <MenuDivider />
              {renderFilterByCategoryItems()}
            </>
          )}
        </MenuList>
      </Menu>
    </Skeleton>
  );
};

export default Filter;
