import React from 'react';
import PageBuilderClient from '@/components/Admin/PageBuilder/PageBuilderClient';

export default async function AdminPageBuilder({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const resolvedParams = await params;
    return <PageBuilderClient slug={resolvedParams.slug} />;
}
