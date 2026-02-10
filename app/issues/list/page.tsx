import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import { Status } from '../../../generated/prisma/client';
import { prisma } from '../../../prisma/client';
import Pagination from '../../components/Pagination';
import IssueActions from './IssueActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const { status, orderBy, orderDirection, page } = await searchParams;
  const statuses = Object.values(Status);
  const validStatus = status && statuses.includes(status) ? status : undefined;

  const validOrderBy = orderBy && columnNames.includes(orderBy) ? orderBy : undefined;
  const validOrderDirection = orderDirection === 'desc' ? 'desc' : 'asc';

  const validPage = page ? parseInt(page) : 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      ...(validStatus && { status: validStatus }),
    },
    ...(validOrderBy && {
      orderBy: {
        [validOrderBy]: validOrderDirection,
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

  return (
    <Flex direction="column" gap="5">
      <IssueActions />
      <IssueTable issues={issues} orderBy={validOrderBy} orderDirection={validOrderDirection} status={validStatus} />
      <Pagination itemCount={totalCount} pageSize={pageSize} currentPage={validPage} />
    </Flex>
  );
};
export const dynamic = 'force-dynamic';

export default IssuesPage;

export const metadata: Metadata = {
  title: 'BugStack - Issue List',
  description: 'View all issues',
};
