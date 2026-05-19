import { AppShell } from '../components/AppShell';
import { type InstitutionalRole } from '../app/roles';

type InstitutionalLayoutProps = {
  activeRole: InstitutionalRole;
};

export function InstitutionalLayout({ activeRole }: InstitutionalLayoutProps) {
  return <AppShell activeRole={activeRole} />;
}
