'use client';
import { Select } from '@radix-ui/themes';

const AssigneeSelect = () => {
  return (
    <Select.Root defaultValue="1">
      <Select.Trigger placeholder="Assign to..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">user1</Select.Item>
          <Select.Item value="2">user2</Select.Item>
          <Select.Item value="3">user3</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
