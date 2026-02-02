import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
console.log('Total posts:', posts.length);
posts.forEach(post => {
  console.log('ID:', post.id, '| Slug:', post.slug, '| Data slug:', post.data.slug);
});
