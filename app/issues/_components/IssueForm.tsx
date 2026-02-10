'use client';
import { issueFormSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Callout, Flex, Spinner, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Issue } from '../../../generated/prisma/client';
import ErrorMessage from '../../components/ErrorMessage';
import StatusSelectField from './StatusSelectField';
import AssigneeSelectField from './AssigneeSelectField';

// TODO: Fix Hydration issue with SimpleMDE
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueFormSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      title: issue?.title ?? '',
      description: issue?.description ?? '',
      ...(issue && {
        status: issue.status,
        assignedToUserId: issue.assignedToUserId ?? 'unassigned',
      }),
    },
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        const payload = {
          ...data,
          assignedToUserId:
            data.assignedToUserId === 'unassigned' || data.assignedToUserId === undefined
              ? null
              : data.assignedToUserId,
        };
        await axios.patch(`/api/issues/${issue.id}`, payload);
      } else {
        await axios.post('/api/issues', { title: data.title, description: data.description });
      }
      router.push('/issues/list');
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        {issue && (
          <Flex justify="between" gap="5">
            <Box>
              <label htmlFor="status" className="block font-bold">
                Status
              </label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <StatusSelectField value={field.value ?? 'OPEN'} onValueChange={field.onChange} />
                )}
              />
            </Box>
            <Box>
              <label htmlFor="assignedToUserId" className="block font-bold">
                Assigned To
              </label>
              <Controller
                control={control}
                name="assignedToUserId"
                render={({ field }) => (
                  <AssigneeSelectField
                    value={field.value ?? 'unassigned'}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </Box>
          </Flex>
        )}
        <label htmlFor="title" className="block font-bold">
          Title
        </label>
        <TextField.Root
          placeholder="e.g. Missing bug"
          {...register('title')}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <label htmlFor="description" className="block font-bold">
          Description
        </label>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="e.g. I'm having a problem with the..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
