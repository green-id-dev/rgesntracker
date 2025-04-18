import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ExpandableText = ({ title, markdown }: { title: string; markdown: string }) => {
  const [expanded, setExpanded] = useState(false);
  const maxChar = 400;

  const shouldTruncate = markdown && markdown.length > maxChar;
  const displayText = expanded || !shouldTruncate ? markdown : markdown.slice(0, maxChar) + '...';

  return (
    <div>
      <p className="font-semibold text-gray-800 mb-2">{title}</p>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => (
            <p className="text-sm text-gray-700 whitespace-pre-line mb-2" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside text-sm text-gray-700 mb-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside text-sm text-gray-700 mb-2" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="mb-1" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-black" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-md font-semibold mt-4 mb-2 text-gray-800" {...props} />
          ),
        }}
      >
        {displayText}
      </ReactMarkdown>
      {shouldTruncate && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-sm text-blue-600 hover:underline"
        >
          {expanded ? 'Voir moins' : 'Voir plus'}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;