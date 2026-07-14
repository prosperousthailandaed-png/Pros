update public.articles
set content_blocks = (
  select jsonb_agg(jsonb_build_object('type', 'paragraph', 'text', elem))
  from jsonb_array_elements_text(content) as elem
)
where content_blocks is null and content is not null and jsonb_array_length(content) > 0;