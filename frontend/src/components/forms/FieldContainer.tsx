import classNames from 'classnames';
import React, { ReactNode } from 'react';

type FieldContainerProps = {
  children: ReactNode;
  className?: classNames.Value;
  meta?: {
    touched?: boolean | null;
    error?: string | null;
  };
  hideErrors?: boolean;
};

export function FieldContainer({
  children,
  meta = { touched: false, error: null },
  hideErrors,
  className,
}: FieldContainerProps) {
  const showError = !!(meta.touched && meta.error);

  return (
    <div className={classNames(className, 'w-full max-w-md', { 'pb-6': !showError, 'pb-1': showError })}>
      {children}

      {!hideErrors && showError && typeof meta.error === 'string' && (
        <div className="text-red-400 text-xs">{meta.error}</div>
      )}
    </div>
  );
}
