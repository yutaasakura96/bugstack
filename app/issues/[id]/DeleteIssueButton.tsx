import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red">
      <Link href={`/issues/${issueId}/delete`}>Delete Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
