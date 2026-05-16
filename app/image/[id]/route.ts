import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  // Next.js 15: params is a promise
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;

  const { data } = await supabase
    .from('products')
    .select('image_url')
    .eq('id', id)
    .single();

  if (data?.image_url) {
    return NextResponse.redirect(data.image_url);
  }

  return new NextResponse('Image not found', { status: 404 });
}
