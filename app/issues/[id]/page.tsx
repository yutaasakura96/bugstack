import { Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
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
  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Box>
        <Heading>{issue?.title}</Heading>
        <Flex gap="4" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card mt="4" className="prose">
          <ReactMarkdown>{issue?.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon /> <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
