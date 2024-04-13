import classNames from 'classnames';
import React from 'react';

type Theme = 'standard' | 'error';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  inputTheme: Theme;
}

export function Input({ inputTheme, className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={classNames(
        'block w-full rounded-md border-0 py-1.5 text-gray-900 sm:text-sm sm:leading-6 px-2',
        {
          'shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600':
            inputTheme === 'standard',
          'shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset ': inputTheme === 'error',
        },
        className
      )}
    />
  );
}
