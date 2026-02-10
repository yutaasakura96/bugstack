'use client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { Issue, Status } from '../../../generated/prisma/client';
import { Skeleton } from '../../components';

const StatusSelect = ({ issue, isLoading = false }: { issue: Issue; isLoading?: boolean }) => {
  const router = useRouter();

  if (isLoading) return <Skeleton height="2rem" />;

  const updateStatus = async (status: Status) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, { status });
      toast.success('Status updated successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };
  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={updateStatus}>
        <Select.Trigger placeholder="Update Status" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Update Status</Select.Label>
            <Select.Item value="OPEN">Open</Select.Item>
            <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
            <Select.Item value="CLOSED">Closed</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
