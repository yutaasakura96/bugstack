'use client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from '../../../generated/prisma/client';

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>('/api/users');
      setUsers(data);
    };
    fetchUsers().catch((err) => {
      console.error(err);
    });
  }, []);
  return (
    <Select.Root defaultValue={users[0]?.id}>
      <Select.Trigger placeholder="Assign to..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
