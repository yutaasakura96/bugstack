'use client';
import { Select } from '@radix-ui/themes';

type StatusSelectFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
};

const StatusSelectField = ({ value, onValueChange }: StatusSelectFieldProps) => {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger placeholder="Update Status" mb="2" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Update Status</Select.Label>
          <Select.Item value="OPEN">Open</Select.Item>
          <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
          <Select.Item value="CLOSED">Closed</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusSelectField;
