import { Button, Select } from '@greggsetzer/navigator-demo-ui';
import React from 'react';
import { Park } from '../../../common/types/apiTypes';
import { Option } from '@greggsetzer/navigator-demo-ui/dist/components/Select';
import { useFetchParksQuery } from '../../../app/store';

interface HeroSearchProps {
  onChange: (parkCode: string) => void;
  onClick: () => void;
  selectedParkCode: string;
}

const HeroSearch = ({selectedParkCode, onChange, onClick}: HeroSearchProps) => {
  const { data, error, isFetching } = useFetchParksQuery();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  }

  const handleOnClick = () => {
    onClick();
  }

  if (isFetching) {
    return <></>
  }

  if (error) {
    return <div>Error</div>
  }

  if (data) {
    const options: Option[] = data?.items.map((park: Park) => {
      return {value: park.parkCode, label: park.name }
    });

    // Add a default option.
    options.unshift({value: '', label: 'Choose a park', inactive: true });

    return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 w-full">
        <Select
          id="parkCode"
          hero={true}
          hideLabel={true}
          name="parkCode"
          label="Choose a Park"
          value={selectedParkCode}
          onChange={handleChange}
          options={options}
        />
        <Button label="Go" onClick={handleOnClick} primary={true}/>
      </div>
    )
  }

  return <></>
}

export default HeroSearch;