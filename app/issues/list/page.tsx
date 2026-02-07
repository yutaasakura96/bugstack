import { IssueStatusBadge, Link } from '@/app/components';
import { Table } from '@radix-ui/themes';
import { Status } from '../../../generated/prisma/client';
import { prisma } from '../../../prisma/client';
import IssueActions from './IssueActions';

interface Props {
  searchParams: { status?: Status };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const { status } = await searchParams;
  const statuses = Object.values(Status);
  const validStatus = status && statuses.includes(status) ? status : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: validStatus,
    },
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export const dynamic = 'force-dynamic';

export default IssuesPage;
