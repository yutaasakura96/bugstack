'use client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '../../../generated/prisma/client';

type AssigneeSelectFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
};

const AssigneeSelectField = ({ value, onValueChange }: AssigneeSelectFieldProps) => {
  const { data: users, error } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  if (error) return null;
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger placeholder="Assign to..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelectField;
