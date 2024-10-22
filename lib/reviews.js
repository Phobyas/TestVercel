import { readdir, readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function getReview(slug){
    const text = await readFile(`./content/reviews/${slug}.md`, 'utf8');
    const { content, data: { title, date, image } } = matter(text);
    const body = marked(content);
    return { slug, title, date, image, body };
  } 

export async function getReviews(){
  const slugs = await getSlugs();
  const reviews = [];
  for (const slug of slugs) {
    const review = await getReview(slug);
    reviews.push(review);
  }
  //SORT REVIEWS BY MOST RECENT FIRST
  reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

  return reviews;
}

export async function getSlugs(){
  const files = await readdir('./content/reviews');
  return files.filter((file) => file.endsWith('.md'))
  .map((file) => file.slice(0, -".md".length));
}