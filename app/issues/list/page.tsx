import { IssueStatusBadge, Link } from '@/app/components';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { Issue, Status } from '../../../generated/prisma/client';
import { prisma } from '../../../prisma/client';
import Pagination from '../../components/Pagination';
import IssueActions from './IssueActions';

interface Props {
  searchParams: { status?: Status; orderBy?: keyof Issue; page?: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    {
      label: 'Issue',
      value: 'title',
    },
    {
      label: 'Status',
      value: 'status',
      className: 'hidden md:table-cell',
    },
    {
      label: 'Created',
      value: 'createdAt',
      className: 'hidden md:table-cell',
    },
  ];

  const { status, orderBy, page } = await searchParams;
  const statuses = Object.values(Status);
  const validStatus = status && statuses.includes(status) ? status : undefined;

  const validOrderBy =
    orderBy && columns.some((col) => col.value === orderBy) ? orderBy : undefined;

  const validPage = page ? parseInt(page) : 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      ...(validStatus && { status: validStatus }),
    },
    ...(validOrderBy && {
      orderBy: {
        [validOrderBy]: 'asc',
      },
    }),
    skip: (validPage - 1) * pageSize,
    take: pageSize,
  });

  const totalCount = await prisma.issue.count({
    where: {
      ...(validStatus && { status: validStatus }),
    },
  });
  // TODO: Add Descending order sort
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink
                  href={{
                    pathname: '/issues/list',
                    query: { status, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === orderBy && <ArrowUpIcon className="inline" />}
              </Table.ColumnHeaderCell>
            ))}
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
      <div className="mt-5">
        <Pagination itemCount={totalCount} pageSize={pageSize} currentPage={validPage} />
      </div>
    </div>
  );
};
export const dynamic = 'force-dynamic';

export default IssuesPage;
