import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import { prisma } from '../../../prisma/client';
import IssueStatusBadge from '../../components/IssueStatusBadge';

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const issueId = parseInt(id);
  // TODO: simplify id validation
  if (isNaN(issueId) || id !== issueId.toString()) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  // TODO: remove delay
  await delay(2000);
  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex gap="4" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <Text>{issue?.description}</Text>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
