import Editor from '@/components/Editor'

export default async function EditorPage({params, searchParams}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams; // ✅ FIX

  const type = resolvedSearchParams?.type;

  console.log("Type:", type);

  return <Editor templateId={id}  initial="draft" />;
}