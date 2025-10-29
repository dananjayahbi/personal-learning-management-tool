'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import '../app/highlight.css';

interface MarkdownViewerProps {
  content: string;
  frontmatter?: Record<string, any>;
  fileName: string;
}

export default function MarkdownViewer({ content, frontmatter, fileName }: MarkdownViewerProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* File header */}
      <div className="mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-700">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          {fileName.replace('.md', '')}
        </h1>
        {frontmatter && Object.keys(frontmatter).length > 0 && (
          <div className="mt-3 space-y-1">
            {Object.entries(frontmatter).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="font-medium text-zinc-600 dark:text-zinc-400">{key}: </span>
                <span className="text-zinc-700 dark:text-zinc-300">{String(value)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Markdown content */}
      <article className="prose prose-zinc dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100
        prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-5 prose-h1:leading-tight
        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:leading-snug
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:leading-snug
        prose-h4:text-lg prose-h4:mt-5 prose-h4:mb-2 prose-h4:leading-normal
        prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:leading-loose prose-p:my-4
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100 prose-strong:font-semibold
        prose-em:italic prose-em:text-zinc-700 dark:prose-em:text-zinc-300
        prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-700
        prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:my-6
        prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/10
        prose-blockquote:py-3 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:my-6
        prose-ul:list-disc prose-ul:my-5 prose-ul:space-y-2
        prose-ol:list-decimal prose-ol:my-5 prose-ol:space-y-2
        prose-li:text-zinc-700 dark:prose-li:text-zinc-300 prose-li:leading-relaxed prose-li:my-2
        prose-table:border-collapse prose-table:w-full prose-table:my-8
        prose-th:bg-zinc-100 dark:prose-th:bg-zinc-800 prose-th:p-3 prose-th:text-left prose-th:font-semibold
        prose-td:border prose-td:border-zinc-200 dark:prose-td:border-zinc-700 prose-td:p-3
        prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
        prose-hr:border-zinc-200 dark:prose-hr:border-zinc-700 prose-hr:my-10
      ">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeHighlight]}
          components={{
            // Custom rendering for code blocks
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline ? (
                <code className={className} {...props}>
                  {children}
                </code>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
