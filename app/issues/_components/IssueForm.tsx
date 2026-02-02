'use client';
import { IssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Issue } from '../../../generated/prisma/client';
import ErrorMessage from '../../components/ErrorMessage';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
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
        <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register('title')} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          control={control}
          defaultValue={issue?.description}
          name="description"
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
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
