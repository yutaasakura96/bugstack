'use client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { Status } from '../../../generated/prisma/client';

const IssueStatusFilter = () => {
  const statuses: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get('status') ?? ''}
      onValueChange={(status) => {
        const params = new URLSearchParams(searchParams);
        if (status && status !== 'ALL') {
          params.set('status', status);
        } else {
          params.delete('status');
        }
        if (searchParams.get('orderBy')) {
          params.set('orderBy', searchParams.get('orderBy')!);
        }

        const query = params.size ? `?${params.toString()}` : '';
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value ?? 'ALL'} value={status.value ?? 'ALL'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
