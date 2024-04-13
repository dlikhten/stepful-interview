import classNames from 'classnames';
import { ReactComponentLike } from 'prop-types';
import { ReactNode } from 'react';

export type LabelStyle = 'visible' | 'hidden' | 'none';

type LabelProps = {
  component?: ReactComponentLike;
  labelStyle?: LabelStyle;
  children: ReactNode;
  htmlFor?: string;
  className?: string;
};

export function Label({ component: Component = 'label', labelStyle, children, htmlFor, className }: LabelProps) {
  return (
    <Component
      className={classNames(
        {
          'block text-sm font-medium leading-6 text-gray-900': labelStyle === 'visible',
          'invisible h-0 block': labelStyle === 'none',
          invisible: labelStyle === 'hidden',
        },
        className
      )}
      htmlFor={htmlFor}
    >
      {children}
    </Component>
  );
}
