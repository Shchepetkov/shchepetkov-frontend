import type { FC, HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  hover?: boolean;
  gradient?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      title,
      description,
      hover = false,
      gradient = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700';
    const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';
    const gradientClasses = gradient ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700' : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          hoverClasses,
          gradientClasses,
          className
        )}
        {...props}
      >
        {(title || description) && (
          <div className="p-6 pb-4">
            {title && (
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        )}
        <div className={cn('p-6', !title && !description && 'pt-6')}>
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
