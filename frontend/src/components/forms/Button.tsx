import classNames from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface SharedButtonAttributes {
  children: any;
  className?: string;
}

export type ButtonAttributes = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
  SharedButtonAttributes & {
    disabled?: boolean;
  };

export const Button = ({ children, className, disabled = false, ...rest }: ButtonAttributes) => {
  return (
    <button
      className={classNames('block whitespace-nowrap', 'rounded-md bg-blue-500 text-white p-2', className)}
      disabled={disabled}
      {...rest}
    >
      <span className="flex-nowrap flex whitespace-nowrap justify-center">{children}</span>
    </button>
  );
};
